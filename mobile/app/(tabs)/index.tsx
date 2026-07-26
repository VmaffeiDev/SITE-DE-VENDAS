import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { VehicleCard } from "@/components/VehicleCard";
import { fetchVehicles, getWhatsAppLink, type Vehicle } from "@/lib/api";

const C = {
  ink: "#111111",
  graphite: "#2f343b",
  line: "#e5e7eb",
  mist: "#f5f6f8",
  white: "#ffffff"
};

const quickActions = [
  {
    label: "Ver estoque",
    icon: "grid" as const,
    action: "estoque"
  },
  {
    label: "Financiamento",
    icon: "dollar-sign" as const,
    action: "whatsapp:Olá, quero simular financiamento de um veículo."
  },
  {
    label: "Falar com consultor",
    icon: "message-circle" as const,
    action: "whatsapp:Olá, quero ajuda para escolher um veículo."
  },
  {
    label: "Consignar meu carro",
    icon: "repeat" as const,
    action: "consignar"
  }
];

export default function HomeScreen() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function load(isRefresh = false) {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    try {
      const data = await fetchVehicles();
      setVehicles(data);
    } catch {
      // keep previous data on refresh
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => { load(); }, []);

  const featured = vehicles.filter((v) => v.featured).slice(0, 6);
  const latest = [...vehicles]
    .sort((a, b) => (b.lastUpdate ?? "").localeCompare(a.lastUpdate ?? ""))
    .slice(0, 6);

  function handleAction(action: string) {
    if (action === "estoque") {
      router.push("/estoque");
    } else if (action === "consignar") {
      router.push("/consignar");
    } else if (action.startsWith("whatsapp:")) {
      WebBrowser.openBrowserAsync(getWhatsAppLink(action.slice(9)));
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={s.center}>
        <ActivityIndicator size="large" color={C.ink} />
      </SafeAreaView>
    );
  }

  const displayVehicles = featured.length ? featured : latest;

  return (
    <SafeAreaView style={s.root} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => load(true)} tintColor={C.ink} />
        }
      >
        {/* Header */}
        <View style={s.header}>
          <Text style={s.logo}>VMAFFEI</Text>
          <Text style={s.logoSub}>Motors</Text>
        </View>

        {/* Hero */}
        <View style={s.heroSection}>
          <Text style={s.heroEyebrow}>Veículos selecionados</Text>
          <Text style={s.heroTitle}>Encontre o veículo certo para você.</Text>
          <Text style={s.heroDescription}>
            Estoque atualizado automaticamente. Atendimento por WhatsApp,
            financiamento e consignação.
          </Text>
          <Pressable
            style={s.heroBtn}
            onPress={() => router.push("/estoque")}
            accessibilityRole="button"
            accessibilityLabel="Ver estoque completo"
          >
            <Text style={s.heroBtnText}>Ver estoque completo</Text>
            <Feather name="arrow-right" size={16} color="#ffffff" />
          </Pressable>
        </View>

        {/* Quick actions */}
        <View style={s.section}>
          <View style={s.grid2}>
            {quickActions.map((item) => (
              <Pressable
                key={item.label}
                style={({ pressed }) => [s.actionCard, pressed && s.actionCardPressed]}
                onPress={() => handleAction(item.action)}
                accessibilityRole="button"
                accessibilityLabel={item.label}
              >
                <View style={s.actionIcon}>
                  <Feather name={item.icon} size={20} color={C.white} />
                </View>
                <Text style={s.actionLabel}>{item.label}</Text>
                <Feather name="chevron-right" size={14} color="#9ca3af" style={s.actionChevron} />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Featured vehicles */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <View>
              <Text style={s.sectionEyebrow}>Destaques</Text>
              <Text style={s.sectionTitle}>Selecionados para você</Text>
            </View>
            <Pressable onPress={() => router.push("/estoque")} accessibilityRole="link">
              <Text style={s.seeAll}>Ver todos</Text>
            </Pressable>
          </View>
          {displayVehicles.length === 0 ? (
            <Text style={s.emptyText}>Nenhum veículo em destaque no momento.</Text>
          ) : (
            displayVehicles.map((v) => <VehicleCard key={v.id} vehicle={v} />)
          )}
        </View>

        {/* Trust bar */}
        <View style={s.trustSection}>
          <Text style={s.trustTitle}>Atendimento premium,{"\n"}negociação transparente.</Text>
          <View style={s.trustGrid}>
            {[
              { icon: "shield" as const, label: "Procedência conferida", desc: "Dados técnicos, fotos reais e atendimento direto." },
              { icon: "check-circle" as const, label: "Negociação acompanhada", desc: "Do primeiro contato até a entrega do veículo." },
              { icon: "file-text" as const, label: "Documentação orientada", desc: "Suporte para compra, venda ou consignação." }
            ].map((item) => (
              <View key={item.label} style={s.trustCard}>
                <Feather name={item.icon} size={22} color="#ffffff" />
                <Text style={s.trustCardTitle}>{item.label}</Text>
                <Text style={s.trustCardDesc}>{item.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Latest vehicles */}
        {latest.length > 0 && (
          <View style={s.section}>
            <View style={s.sectionHeader}>
              <View>
                <Text style={s.sectionEyebrow}>Últimas entradas</Text>
                <Text style={s.sectionTitle}>Novidades no estoque</Text>
              </View>
              <Pressable onPress={() => router.push("/estoque")} accessibilityRole="link">
                <Text style={s.seeAll}>Explorar</Text>
              </Pressable>
            </View>
            {latest.map((v) => <VehicleCard key={v.id} vehicle={v} />)}
          </View>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.white },
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: C.white },
  header: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8
  },
  logo: { fontSize: 20, fontWeight: "900", color: C.ink, letterSpacing: 0.5 },
  logoSub: { fontSize: 14, fontWeight: "600", color: C.graphite },
  heroSection: {
    backgroundColor: C.ink,
    marginHorizontal: 20,
    marginVertical: 12,
    borderRadius: 16,
    padding: 24
  },
  heroEyebrow: {
    fontSize: 10,
    fontWeight: "800",
    color: "rgba(255,255,255,0.5)",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    marginBottom: 10
  },
  heroTitle: { fontSize: 26, fontWeight: "900", color: "#ffffff", lineHeight: 32, marginBottom: 10 },
  heroDescription: { fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 20, marginBottom: 20 },
  heroBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 11
  },
  heroBtnText: { fontSize: 14, fontWeight: "700", color: "#ffffff" },
  section: { paddingHorizontal: 20, paddingBottom: 8 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 },
  sectionEyebrow: {
    fontSize: 10,
    fontWeight: "800",
    color: C.graphite,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    marginBottom: 3
  },
  sectionTitle: { fontSize: 20, fontWeight: "900", color: C.ink },
  seeAll: { fontSize: 13, fontWeight: "800", color: C.ink },
  emptyText: { fontSize: 14, color: C.graphite, textAlign: "center", paddingVertical: 24 },
  grid2: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 24 },
  actionCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: C.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.line,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1
  },
  actionCardPressed: { opacity: 0.8 },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: C.ink,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  actionLabel: { fontSize: 13, fontWeight: "800", color: C.ink, flex: 1 },
  actionChevron: { marginTop: 4 },
  trustSection: {
    backgroundColor: C.ink,
    marginHorizontal: 20,
    marginVertical: 24,
    borderRadius: 16,
    padding: 24
  },
  trustTitle: { fontSize: 22, fontWeight: "900", color: "#ffffff", lineHeight: 30, marginBottom: 20 },
  trustGrid: { gap: 12 },
  trustCard: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    padding: 16,
    gap: 8
  },
  trustCardTitle: { fontSize: 14, fontWeight: "800", color: "#ffffff" },
  trustCardDesc: { fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 18 }
});
