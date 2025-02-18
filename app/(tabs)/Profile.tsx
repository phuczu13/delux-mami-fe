import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ProfileScreen: React.FC = () => {

  const router = useRouter();

  return (
    <ScrollView className="bg-gray-100 pt-10">
      <View className="p-5">
        {/* Header */}
        <View className="flex flex-row justify-between items-center">
          <View className="flex-row gap-4 items-center">
            {/* Avatar */}
            <Image
              className="border border-[#7F3DFF]"
              source={{
                uri: "https://i.pinimg.com/736x/58/d3/43/58d343ff7b3636efd0c18c7d6d2ccac5.jpg",
              }}
              style={{ width: 80, height: 80, borderRadius: 40 }}

            />
            {/* Username */}
            <View>
              <Text className="text-gray-500">Username</Text>
              <Text className="font-bold text-xl">Phuczu13</Text>
            </View>
          </View>
          {/* Edit Button */}
          <TouchableOpacity className="bg-gray-300 px-4 py-2 rounded-lg flex-row items-center">
            <Ionicons name="create-outline" size={18} color="black" />
            <Text className="ml-2 font-semibold">Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Options */}
        <View className="bg-white rounded-xl mt-10">
          <TouchableOpacity className="p-4 flex-row items-center gap-3"
            onPress={() => router.push("/(auth)/account")}
          >
            <View className="bg-purple-100 rounded-2xl px-[9px] py-2">
              <FontAwesome5 name="user" size={22} color="#6B46C1" />
            </View>
            <Text className="font-semibold">Account</Text>
          </TouchableOpacity>

          <TouchableOpacity className="p-4 flex-row items-center gap-3 border-t border-gray-200"
            onPress={() => router.push("/(auth)/settings")}
          >
            <View className="bg-blue-100 rounded-2xl p-2">
              <Ionicons name="settings-outline" size={22} color="#3182CE" />
            </View>
            <Text className="font-semibold">Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity className="p-4 flex-row items-center gap-3 border-t border-gray-200"
            onPress={() => router.push("/(auth)/export-data")}
          >
            <View className="bg-green-100 rounded-2xl p-2">
              <MaterialIcons name="file-download" size={22} color="#38A169" />
            </View>
            <Text className="font-semibold">Export Data</Text>
          </TouchableOpacity>

          <TouchableOpacity className="p-4 flex-row items-center gap-3 border-t border-gray-200"
          onPress={() => router.push('/(auth)/sign-in')}
          >
            <View className="bg-red-100 rounded-2xl p-2">
              <MaterialIcons name="logout" size={22} color="#E53E3E" />
            </View>
            <Text className="font-semibold text-red-500">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
