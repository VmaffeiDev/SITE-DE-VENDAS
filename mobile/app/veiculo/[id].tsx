import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { fetchVehicleById, formatCurrency, formatMileage, getWhatsAppLink, type Vehicle } from "@/lib/api";

const { width: SCREEN_W } = Dimensions.get("window");

const C = {
  ink: "#111111",
  graphite: "#2f343b",
  line: "#e5e7eb",
  mist: "#f5f6f8",
  white: "#ffffff",
  green: "#25d366"
};

export default function VehicleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const flatRef = useRef<FlatList>(null);

  useEffect(() => {
    if (!id) return;
    fetchVehicleById(id)
      .then((v) => { setVehicle(v); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [id]);

  function handleWhatsApp() {
    if (!vehicle) return;
    const msg = `Olá! Tenho interesse no ${vehicle.title} (${vehicle.year}) anunciado por ${formatCurrency(vehicle.price)}. Poderia me dar mais informações?`;
    WebBrowser.openBrowserAsync(getWhatsAppLink(msg));
  }

  if (loading) {
    return (
      <SafeAreaView style={s.center}>
        <ActivityIndicator size="large" color={C.ink} />
      </SafeAreaView>
    );
  }

  if (error || !vehicle) {
    return (
      <SafeAreaView style={s.center}>
        <Feather name="alert-circle" size={36} color="#d1d5db" />
        <Text style={s.errorTitle}>Veículo não encontrado</Text>
        <Text style={s.errorText}>O veículo pode ter sido vendido ou removido.</Text>
      </SafeAreaView>
    );
  }

  const specs = [
    { icon: "calendar" as const, label: "Ano", value: vehicle.year },
    { icon: "activity" as const, label: "Quilometragem", value: formatMileage(vehicle.mileage) },
    { icon: "zap" as const, label: "Combustível", value: vehicle.fuel || "—" },
    { icon: "settings" as const, label: "Câmbio", value: vehicle.transmission || "—" },
    { icon: "droplet" as const, label: "Cor", value: vehicle.color || "—" }
  ].filter((s) => s.value && s.value !== "—");

  return (
    <SafeAreaView style={s.root} edges={["bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Gallery */}
        {vehicle.images.length > 0 ? (
          <View>
            <FlatList
              ref={flatRef}
              data={vehicle.images}
              keyExtractor={(_, i) => String(i)}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const page = Math.round(e.nativeEvent.contentOffset.x / SCREEN_W);
                setActiveImage(page);
              }}
              renderItem={({ item }) => (
                <Image
                  source={item}
                  style={{ width: SCREEN_W, aspectRatio: 4 / 3 }}
                  contentFit="cover"
                  accessibilityLabel={vehicle.title}
                />
              )}
            />
            {vehicle.images.length > 1 && (
              <View style={s.dots}>
                {vehicle.images.map((_, i) => (
                  <View
                    key={i}
                    style={[s.dot, i === activeImage && s.dotActive]}
                    accessibilityLabel={`Foto ${i + 1} de ${vehicle.images.length}`}
                  />
                ))}
              </View>
            )}
          </View>
        ) : (
          <View style={s.imagePlaceholder}>
            <Feather name="image" size={48} color="#d1d5db" />
          </View>
        )}

        {/* Title & Price */}
        <View style={s.titleSection}>
          <View style={s.badge}>
            <Text style={s.badgeText}>
              {vehicle.source === "consignment" ? "Consignação" : "Disponível"}
            </Text>
          </View>
          <Text style={s.vehicleTitle}>{vehicle.title}</Text>
          <Text style={s.vehicleSubtitle}>{vehicle.brand} · {vehicle.model}</Text>
          <Text style={s.price}>{formatCurrency(vehicle.price)}</Text>
        </View>

        {/* Specs */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>Ficha técnica</Text>
          <View style={s.specsGrid}>
            {specs.map((spec) => (
              <View key={spec.label} style={s.specItem}>
                <Feather name={spec.icon} size={16} color={C.graphite} />
                <View>
                  <Text style={s.specLabel}>{spec.label}</Text>
                  <Text style={s.specValue}>{spec.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Features */}
        {vehicle.features.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionLabel}>Opcionais</Text>
            <View style={s.featuresGrid}>
              {vehicle.features.map((f) => (
                <View key={f} style={s.featureItem}>
                  <Feather name="check" size={13} color={C.ink} />
                  <Text style={s.featureText}>{f}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Description */}
        {vehicle.description ? (
          <View style={s.section}>
            <Text style={s.sectionLabel}>Descrição</Text>
            <Text style={s.description}>{vehicle.description}</Text>
          </View>
        ) : null}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Sticky CTA */}
      <View style={s.stickyBar}>
        <View style={s.stickyPrice}>
          <Text style={s.stickyPriceLabel}>Preço</Text>
          <Text style={s.stickyPriceValue}>{formatCurrency(vehicle.price)}</Text>
        </View>
        <Pressable
          style={({ pressed }) => [s.whatsappBtn, pressed && s.btnPressed]}
          onPress={handleWhatsApp}
          accessibilityRole="button"
          accessibilityLabel="Tenho interesse — falar no WhatsApp"
        >
          <Feather name="message-circle" size={20} color="#ffffff" />
          <Text style={s.whatsappBtnText}>Tenho interesse</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.white },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.white,
    gap: 10,
    padding: 24
  },
  errorTitle: { fontSize: 18, fontWeight: "800", color: C.ink, marginTop: 8 },
  errorText: { fontSize: 14, color: C.graphite, textAlign: "center" },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    backgroundColor: C.white
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.line },
  dotActive: { backgroundColor: C.ink, width: 18 },
  imagePlaceholder: {
    aspectRatio: 4 / 3,
    backgroundColor: C.mist,
    alignItems: "center",
    justifyContent: "center"
  },
  titleSection: { padding: 20, paddingBottom: 8 },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: C.mist,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 12
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: C.graphite,
    letterSpacing: 0.6,
    textTransform: "uppercase"
  },
  vehicleTitle: { fontSize: 22, fontWeight: "900", color: C.ink, lineHeight: 28 },
  vehicleSubtitle: { fontSize: 14, color: C.graphite, marginTop: 4, marginBottom: 12 },
  price: { fontSize: 30, fontWeight: "900", color: C.ink },
  section: { paddingHorizontal: 20, paddingBottom: 20 },
  sectionLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: C.graphite,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 14,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: C.line
  },
  specsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  specItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    width: "47%",
    backgroundColor: C.mist,
    borderRadius: 10,
    padding: 12
  },
  specLabel: { fontSize: 10, color: C.graphite, fontWeight: "600", marginBottom: 2 },
  specValue: { fontSize: 14, fontWeight: "800", color: C.ink },
  featuresGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: C.mist,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  featureText: { fontSize: 13, color: C.ink, fontWeight: "600" },
  description: { fontSize: 14, color: C.graphite, lineHeight: 22 },
  stickyBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    paddingBottom: 24,
    backgroundColor: C.white,
    borderTopWidth: 1,
    borderTopColor: C.line
  },
  stickyPrice: { flex: 1 },
  stickyPriceLabel: { fontSize: 10, fontWeight: "700", color: C.graphite, letterSpacing: 0.6, textTransform: "uppercase" },
  stickyPriceValue: { fontSize: 20, fontWeight: "900", color: C.ink },
  whatsappBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: C.green,
    borderRadius: 12,
    height: 52
  },
  whatsappBtnText: { fontSize: 15, fontWeight: "800", color: "#ffffff" },
  btnPressed: { opacity: 0.82 }
});
