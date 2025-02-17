import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icon
import { useRouter } from "expo-router";

const wallets = [
    { id: 1, name: "Wallet", amount: "$123", icon: "wallet" },      // Hợp lệ
    { id: 2, name: "Chase", amount: "$1234", icon: "logo-usd" },    // Hợp lệ
    { id: 3, name: "Citi", amount: "$6789", icon: "card" },         // Sửa icon
    { id: 4, name: "Paypal", amount: "$2222", icon: "logo-paypal" } // Hợp lệ
  ];  

const AccountScreen: React.FC = () => {

    const router = useRouter();

  return (
    <ScrollView className="bg-white px-4 pt-14">
      {/* Header */}
      <View className="">
        <TouchableOpacity className="bg-slate-200 flex justify-center items-center w-10 h-10 rounded-full"
        onPress={() => router.push ('/Profile')}
        >
            <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Account Balance */}
      <View className="items-center">
        <Text className="text-gray-500">Account Balance</Text>
        <Text className="text-3xl font-bold">$8386</Text>
      </View>

      {/* Wallet List */}
      <View className="">
        {wallets.map((wallet) => (
          <View key={wallet.id} className="flex-row justify-between items-center py-4 border-b border-gray-200">
            <View className="flex-row items-center gap-3">
              <Ionicons className="px-3 py-2 bg-slate-200 rounded-xl" name={wallet.icon} size={24} color="#4A90E2"></Ionicons>
              <Text className="text-lg">{wallet.name}</Text>
            </View>
            <Text className="text-lg font-semibold">{wallet.amount}</Text>
          </View>
        ))}
      </View>

      {/* Add Wallet Button */}
      <TouchableOpacity className="bg-purple-600 p-4 rounded-full mx-6 mt-6 items-center">
        <Text className="text-white font-semibold">+ Add new wallet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AccountScreen;
