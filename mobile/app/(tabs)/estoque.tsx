import { Feather } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { VehicleCard } from "@/components/VehicleCard";
import { fetchVehicles, type Vehicle } from "@/lib/api";

const C = {
  ink: "#111111",
  graphite: "#2f343b",
  line: "#e5e7eb",
  mist: "#f5f6f8",
  white: "#ffffff"
};

type SortKey = "recent" | "price_asc" | "price_desc" | "mileage";

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: "Recentes", value: "recent" },
  { label: "Menor preço", value: "price_asc" },
  { label: "Maior preço", value: "price_desc" },
  { label: "Menor KM", value: "mileage" }
];

export default function EstoqueScreen() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("recent");
  const [refreshing, setRefreshing] = useState(false);

  async function load(isRefresh = false) {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    try {
      const data = await fetchVehicles();
      setVehicles(data);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let result = q
      ? vehicles.filter(
          (v) =>
            v.title.toLowerCase().includes(q) ||
            v.brand.toLowerCase().includes(q) ||
            v.model.toLowerCase().includes(q)
        )
      : vehicles;

    switch (sort) {
      case "price_asc":
        result = [...result].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
        break;
      case "price_desc":
        result = [...result].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case "mileage":
        result = [...result].sort((a, b) => (a.mileage ?? Infinity) - (b.mileage ?? Infinity));
        break;
      case "recent":
      default:
        result = [...result].sort((a, b) =>
          (b.lastUpdate ?? "").localeCompare(a.lastUpdate ?? "")
        );
    }
    return result;
  }, [vehicles, query, sort]);

  if (loading) {
    return (
      <SafeAreaView style={s.center}>
        <ActivityIndicator size="large" color={C.ink} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.root} edges={["top"]}>
      {/* Header */}
      <View style={s.topBar}>
        <Text style={s.title}>Estoque</Text>
        <Text style={s.count} accessibilityLabel={`${filtered.length} veículos encontrados`}>
          {filtered.length} veículo{filtered.length !== 1 ? "s" : ""}
        </Text>
      </View>

      {/* Search */}
      <View style={s.searchWrap}>
        <Feather name="search" size={16} color="#9ca3af" style={s.searchIcon} />
        <TextInput
          style={s.search}
          placeholder="Buscar marca, modelo..."
          placeholderTextColor="#9ca3af"
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          autoCorrect={false}
          accessibilityLabel="Buscar veículos"
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery("")} accessibilityLabel="Limpar busca" hitSlop={8}>
            <Feather name="x" size={16} color="#9ca3af" />
          </Pressable>
        )}
      </View>

      {/* Sort pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.sortRow}
      >
        {SORT_OPTIONS.map((opt) => (
          <Pressable
            key={opt.value}
            style={[s.sortPill, sort === opt.value && s.sortPillActive]}
            onPress={() => setSort(opt.value)}
            accessibilityRole="button"
            accessibilityState={{ selected: sort === opt.value }}
          >
            <Text style={[s.sortPillText, sort === opt.value && s.sortPillTextActive]}>
              {opt.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Results */}
      <FlatList
        data={filtered}
        keyExtractor={(v) => v.id}
        renderItem={({ item }) => <VehicleCard vehicle={item} />}
        contentContainerStyle={s.list}
        showsVerticalScrollIndicator={false}
        onRefresh={() => load(true)}
        refreshing={refreshing}
        ListEmptyComponent={
          <View style={s.emptyWrap}>
            <Feather name="search" size={36} color="#d1d5db" />
            <Text style={s.emptyTitle}>Nenhum resultado</Text>
            <Text style={s.emptyText}>Tente buscar por outro termo.</Text>
            {query.length > 0 && (
              <Pressable style={s.clearBtn} onPress={() => setQuery("")}>
                <Text style={s.clearBtnText}>Limpar busca</Text>
              </Pressable>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.white },
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: C.white },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12
  },
  title: { fontSize: 26, fontWeight: "900", color: C.ink },
  count: { fontSize: 13, color: C.graphite, fontWeight: "600" },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 10,
    backgroundColor: C.mist,
    paddingHorizontal: 12,
    height: 44
  },
  searchIcon: { marginRight: 8 },
  search: { flex: 1, fontSize: 15, color: C.ink },
  sortRow: { paddingHorizontal: 20, paddingBottom: 12, gap: 8 },
  sortPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: C.line,
    backgroundColor: C.white
  },
  sortPillActive: { backgroundColor: C.ink, borderColor: C.ink },
  sortPillText: { fontSize: 13, fontWeight: "700", color: C.graphite },
  sortPillTextActive: { color: "#ffffff" },
  list: { paddingHorizontal: 20, paddingBottom: 24 },
  emptyWrap: { alignItems: "center", paddingTop: 60, gap: 8 },
  emptyTitle: { fontSize: 18, fontWeight: "800", color: C.ink, marginTop: 8 },
  emptyText: { fontSize: 14, color: C.graphite },
  clearBtn: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: C.ink
  },
  clearBtnText: { fontSize: 14, fontWeight: "700", color: "#ffffff" }
});
