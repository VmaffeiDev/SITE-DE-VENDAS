import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

const COLORS = {
  ink: "#111111",
  graphite: "#2f343b",
  line: "#e5e7eb",
  mist: "#f5f6f8"
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.ink,
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopColor: COLORS.line,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
          letterSpacing: 0.2
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => <Feather name="home" size={22} color={color} />
        }}
      />
      <Tabs.Screen
        name="estoque"
        options={{
          title: "Estoque",
          tabBarIcon: ({ color }) => <Feather name="grid" size={22} color={color} />
        }}
      />
      <Tabs.Screen
        name="consignar"
        options={{
          title: "Consignar",
          tabBarIcon: ({ color }) => <Feather name="repeat" size={22} color={color} />
        }}
      />
    </Tabs>
  );
}
