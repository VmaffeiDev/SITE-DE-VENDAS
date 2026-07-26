import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

import { formatCurrency, formatMileage, type Vehicle } from "@/lib/api";

const C = {
  ink: "#111111",
  graphite: "#2f343b",
  line: "#e5e7eb",
  mist: "#f5f6f8"
};

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const router = useRouter();
  const image = vehicle.images[0];

  return (
    <Pressable
      style={({ pressed }) => [s.card, pressed && s.cardPressed]}
      onPress={() => router.push(`/veiculo/${vehicle.id}`)}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalhes de ${vehicle.title}`}
    >
      <View style={s.imageWrap}>
        {image ? (
          <Image
            source={image}
            style={s.image}
            contentFit="cover"
            transition={200}
            accessibilityLabel={vehicle.title}
          />
        ) : (
          <View style={[s.image, s.imagePlaceholder]}>
            <Feather name="image" size={32} color="#9ca3af" />
          </View>
        )}
        <View style={s.badge}>
          <Text style={s.badgeText}>
            {vehicle.source === "consignment" ? "Consignação" : "Disponível"}
          </Text>
        </View>
      </View>

      <View style={s.body}>
        <Text style={s.title} numberOfLines={2}>{vehicle.title}</Text>
        <Text style={s.subtitle}>{vehicle.brand} {vehicle.model}</Text>

        <View style={s.meta}>
          <View style={s.metaItem}>
            <Feather name="calendar" size={14} color={C.graphite} />
            <Text style={s.metaText}>{vehicle.year}</Text>
          </View>
          <View style={s.metaItem}>
            <Feather name="activity" size={14} color={C.graphite} />
            <Text style={s.metaText}>{formatMileage(vehicle.mileage)}</Text>
          </View>
        </View>

        <View style={s.footer}>
          <View>
            <Text style={s.priceLabel}>Preço</Text>
            <Text style={s.price}>{formatCurrency(vehicle.price)}</Text>
          </View>
          <View style={s.arrow}>
            <Feather name="arrow-right" size={18} color={C.ink} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.line,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2
  },
  cardPressed: { opacity: 0.93, transform: [{ scale: 0.99 }] },
  imageWrap: { position: "relative", aspectRatio: 4 / 3 },
  image: { width: "100%", height: "100%" },
  imagePlaceholder: { backgroundColor: C.mist, alignItems: "center", justifyContent: "center" },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2
  },
  badgeText: { fontSize: 10, fontWeight: "800", color: C.ink, letterSpacing: 0.6, textTransform: "uppercase" },
  body: { padding: 16, gap: 10 },
  title: { fontSize: 16, fontWeight: "800", color: C.ink, lineHeight: 22 },
  subtitle: { fontSize: 13, color: C.graphite, marginTop: -4 },
  meta: { flexDirection: "row", gap: 16 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  metaText: { fontSize: 13, color: C.graphite },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderTopWidth: 1,
    borderTopColor: C.line,
    paddingTop: 12
  },
  priceLabel: { fontSize: 10, fontWeight: "800", color: C.graphite, letterSpacing: 0.7, textTransform: "uppercase" },
  price: { fontSize: 22, fontWeight: "900", color: C.ink, marginTop: 2 },
  arrow: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: C.mist,
    alignItems: "center",
    justifyContent: "center"
  }
});
