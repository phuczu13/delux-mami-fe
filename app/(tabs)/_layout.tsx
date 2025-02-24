import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Transaction") {
            iconName = focused ? "swap-horizontal" : "swap-horizontal-outline";
          } else if (route.name === "Budget") {
            iconName = focused ? "pie-chart" : "pie-chart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#7C3AED", // Màu tím khi active
        tabBarInactiveTintColor: "gray", // Màu xám khi không active
      })}
    >
      <Tabs.Screen name="Home" />
      <Tabs.Screen name="Transaction" />
      <Tabs.Screen name="Budget" />
      <Tabs.Screen name="Profile" />
    </Tabs>
  );
}
