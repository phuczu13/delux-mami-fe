import { Stack } from "expo-router";
import React from "react";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>

      <Stack.Screen name="expenses" />
      <Stack.Screen name="income" />
      <Stack.Screen name="notification" />
      <Stack.Screen name="list-transaction" />


    </Stack>
  );
}
