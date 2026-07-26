import { Feather } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getWhatsAppLink } from "@/lib/api";

const C = {
  ink: "#111111",
  graphite: "#2f343b",
  line: "#e5e7eb",
  mist: "#f5f6f8",
  white: "#ffffff",
  green: "#25d366"
};

const steps = [
  {
    icon: "message-circle" as const,
    title: "Entre em contato",
    desc: "Fale com um consultor pelo WhatsApp ou preencha o formulário no site."
  },
  {
    icon: "file-text" as const,
    title: "Avaliação do veículo",
    desc: "Agendamos uma visita para avaliar e fotografar o veículo."
  },
  {
    icon: "tag" as const,
    title: "Definição do preço",
    desc: "Sugerimos o valor ideal com base no mercado atual."
  },
  {
    icon: "check-circle" as const,
    title: "Venda e repasse",
    desc: "Cuidamos da negociação e repassamos o valor combinado após a venda."
  }
];

export default function ConsignarScreen() {
  function handleWhatsApp() {
    const link = getWhatsAppLink(
      "Olá, quero consignar meu veículo na VMAFFEI Motors. Pode me passar mais informações?"
    );
    WebBrowser.openBrowserAsync(link);
  }

  function handleForm() {
    WebBrowser.openBrowserAsync("https://consultordevendasvictormaffei.com/consignar");
  }

  return (
    <SafeAreaView style={s.root} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={s.header}>
          <Text style={s.eyebrow}>Consignação</Text>
          <Text style={s.title}>Venda seu carro{"\n"}com a nossa estrutura.</Text>
          <Text style={s.subtitle}>
            Anunciamos, atendemos os compradores e cuidamos de toda a negociação.
            Você só recebe o valor combinado.
          </Text>
        </View>

        {/* Steps */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Como funciona</Text>
          <View style={s.stepsWrap}>
            {steps.map((step, i) => (
              <View key={step.title} style={s.step}>
                <View style={s.stepLeft}>
                  <View style={s.stepIcon}>
                    <Feather name={step.icon} size={18} color="#ffffff" />
                  </View>
                  {i < steps.length - 1 && <View style={s.stepLine} />}
                </View>
                <View style={s.stepBody}>
                  <Text style={s.stepTitle}>{step.title}</Text>
                  <Text style={s.stepDesc}>{step.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Benefits */}
        <View style={s.benefitsSection}>
          <Text style={s.benefitsTitle}>Por que consignar aqui?</Text>
          {[
            "Você não precisa lidar com compradores desconhecidos",
            "Seu carro permanece disponível enquanto anuncia",
            "Documentação e transferência orientadas por nós",
            "Sem taxa de anúncio — só cobramos na venda"
          ].map((b) => (
            <View key={b} style={s.benefit}>
              <Feather name="check" size={16} color={C.ink} />
              <Text style={s.benefitText}>{b}</Text>
            </View>
          ))}
        </View>

        {/* CTAs */}
        <View style={s.ctaSection}>
          <Pressable
            style={({ pressed }) => [s.whatsappBtn, pressed && s.btnPressed]}
            onPress={handleWhatsApp}
            accessibilityRole="button"
            accessibilityLabel="Consignar via WhatsApp"
          >
            <Feather name="message-circle" size={20} color="#ffffff" />
            <Text style={s.whatsappBtnText}>Consignar via WhatsApp</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [s.formBtn, pressed && s.btnPressed]}
            onPress={handleForm}
            accessibilityRole="button"
            accessibilityLabel="Preencher formulário no site"
          >
            <Feather name="external-link" size={18} color={C.ink} />
            <Text style={s.formBtnText}>Preencher formulário no site</Text>
          </Pressable>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.white },
  header: {
    backgroundColor: C.ink,
    padding: 24,
    paddingTop: 28
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "800",
    color: "rgba(255,255,255,0.5)",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    marginBottom: 12
  },
  title: { fontSize: 28, fontWeight: "900", color: "#ffffff", lineHeight: 34, marginBottom: 12 },
  subtitle: { fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 20 },
  section: { padding: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "900", color: C.ink, marginBottom: 20 },
  stepsWrap: { gap: 0 },
  step: { flexDirection: "row", gap: 14 },
  stepLeft: { alignItems: "center", width: 40 },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.ink,
    alignItems: "center",
    justifyContent: "center"
  },
  stepLine: { flex: 1, width: 2, backgroundColor: C.line, marginVertical: 4, minHeight: 20 },
  stepBody: { flex: 1, paddingBottom: 24 },
  stepTitle: { fontSize: 15, fontWeight: "800", color: C.ink, marginBottom: 4, marginTop: 8 },
  stepDesc: { fontSize: 13, color: C.graphite, lineHeight: 19 },
  benefitsSection: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: C.mist,
    borderRadius: 14,
    padding: 20,
    gap: 12
  },
  benefitsTitle: { fontSize: 15, fontWeight: "900", color: C.ink, marginBottom: 4 },
  benefit: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  benefitText: { flex: 1, fontSize: 13, color: C.graphite, lineHeight: 19 },
  ctaSection: { paddingHorizontal: 20, gap: 12 },
  whatsappBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: C.green,
    borderRadius: 12,
    height: 52
  },
  whatsappBtnText: { fontSize: 16, fontWeight: "800", color: "#ffffff" },
  formBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: C.mist,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.line,
    height: 52
  },
  formBtnText: { fontSize: 15, fontWeight: "700", color: C.ink },
  btnPressed: { opacity: 0.82 }
});
