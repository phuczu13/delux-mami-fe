import React from "react";
import { Tabs } from "expo-router";

export default function TabsLayout() {

  return (
    <Tabs screenOptions={{ headerShown: false }}>

      <Tabs.Screen name="Home" />
      <Tabs.Screen name="Transaction" />
      <Tabs.Screen name="Budget" />
      <Tabs.Screen name="Profile" />

    </Tabs>
  );
}
