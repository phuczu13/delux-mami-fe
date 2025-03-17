import React, { useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const SettingsScreen = () => {
  const router = useRouter();

  const handleBackPress = useCallback(() => router.push("/Profile"), [router]);
  const handleSave = useCallback(() => console.log("Save button pressed"), []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4 pt-6">
        {/* Back Button */}
        <View className="mb-4">
          <TouchableOpacity
            testID="back-button"
            className="bg-slate-200 flex justify-center items-center w-10 h-10 rounded-full"
            onPress={handleBackPress}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View className="items-center">
          <Text testID="settings-title" className="text-gray-700 text-2xl font-semibold">
            Settings
          </Text>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          testID="save-button"
          className="bg-purple-600 p-4 rounded-full mx-6 mt-6 items-center"
          onPress={handleSave}
        >
          <Text className="text-white font-semibold">Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
