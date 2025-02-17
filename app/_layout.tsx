import { Stack } from "expo-router";
import React from "react";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="(auth)" />
      <Stack.Screen options={{ headerShown: false }} name="(tabs)" />
    </Stack>
  );
}
