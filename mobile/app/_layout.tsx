import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="veiculo/[id]"
          options={{
            headerShown: true,
            headerTitle: "",
            headerBackTitle: "Voltar",
            headerStyle: { backgroundColor: "#ffffff" },
            headerTintColor: "#111111",
            headerShadowVisible: false
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
