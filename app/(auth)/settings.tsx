import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const SettingsScreen = () => {
  const router = useRouter();

  return (
    <ScrollView testID="settings-screen" className="bg-white px-4 pt-14">
      <View testID="back-button-container">
        <TouchableOpacity
          testID="back-button"
          className="bg-slate-200 flex justify-center items-center w-10 h-10 rounded-full"
          onPress={() => router.push("/Profile")}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View testID="title-container" className="items-center">
        <Text testID="settings-title" className="text-gray-700 text-2xl">
          Setting Screen
        </Text>
      </View>

      <TouchableOpacity
        testID="save-button"
        className="bg-purple-600 p-4 rounded-full mx-6 mt-6 items-center"
      >
        <Text testID="save-button-text" className="text-white font-semibold">
          Save
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SettingsScreen;
