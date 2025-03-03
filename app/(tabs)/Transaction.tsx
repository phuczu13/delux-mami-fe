import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const TransactionScreen: React.FC = () => {

  const iconColors: Record<string, string> = {
    "text-yellow-500": "#eab308",
    "text-purple-500": "#9333ea",
    "text-red-500": "#ef4444",
  };

  const transactions = [
    {
      id: 1,
      category: "Shopping",
      icon: "shopping-bag",
      amount: "- $120",
      description: "Buy some clothes",
      time: "10:00 AM",
      color: "bg-yellow-100",
      iconColor: "text-yellow-500",
    },
    {
      id: 2,
      category: "Wallet",
      icon: "credit-card",
      amount: "- $80",
      description: "Open card",
      time: "03:30 PM",
      color: "bg-purple-100",
      iconColor: "text-purple-500",
    },
    {
      id: 3,
      category: "Book",
      icon: "book",  // Dùng FontAwesome5 để hỗ trợ tốt hơn
      amount: "- $32",
      description: "Buy a Conan",
      time: "07:30 PM",
      color: "bg-red-100",
      iconColor: "text-red-500",
    },
    
    {
      id: 4,
      category: "Salary",
      icon: "money",
      amount: "+ $5000",
      description: "Salary for July",
      time: "04:30 PM",
      color: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      id: 5,
      category: "Transportation",
      icon: "car",
      amount: "- $18",
      description: "Charging Tesla",
      time: "08:30 PM",
      color: "bg-blue-100",
      iconColor: "text-blue-500",
    },
  ];

  return (
    <ScrollView className="bg-gray-100 pt-10">
      <View className="p-5">
        <View className="flex-row justify-between items-center mt-4">
          <TouchableOpacity className="flex-row items-center px-4 py-2 bg-gray-100 rounded-full">
            <Text className="text-gray-600 mr-2">Month</Text>
            <MaterialIcons name="keyboard-arrow-down" size={18} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="filter-list" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Báo cáo tài chính */}
        <TouchableOpacity className="mt-4 bg-purple-100 py-3 px-4 rounded-xl">
          <Text className="text-purple-700 font-semibold text-center">
            See your financial report
          </Text>
        </TouchableOpacity>

        {/* Danh sách giao dịch */}
        <View className="mt-6">
          <Text className="text-gray-500 font-semibold text-lg mb-2">Today</Text>
          {transactions.slice(0, 3).map((item) => (
            <View key={item.id} className="flex-row items-center bg-gray-50 p-3 rounded-lg mb-3">
              <View className={`p-3 rounded-full ${item.color}`}>
                <FontAwesome name={item.icon as any} size={18} color={iconColors[item.iconColor] || "black"} />
              </View>
              <View className="flex-1 ml-3">
                <Text className="font-semibold">{item.category}</Text>
                <Text className="text-gray-400 text-sm">{item.description}</Text>
              </View>
              <View className="items-end">
                <Text className={`font-semibold ${item.amount.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                  {item.amount}
                </Text>
                <Text className="text-gray-400 text-sm">{item.time}</Text>
              </View>
            </View>
          ))}

          <Text className="text-gray-500 font-semibold text-lg mb-2 mt-4">Yesterday</Text>
          {transactions.slice(3).map((item) => (
            <View key={item.id} className="flex-row items-center bg-gray-50 p-3 rounded-lg mb-3">
              <View className={`p-3 rounded-full ${item.color}`}>
                <FontAwesome name={item.icon as any} size={18} color={item.iconColor} />
              </View>
              <View className="flex-1 ml-3">
                <Text className="font-semibold">{item.category}</Text>
                <Text className="text-gray-400 text-sm">{item.description}</Text>
              </View>
              <View className="items-end">
                <Text className={`font-semibold ${item.amount.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                  {item.amount}
                </Text>
                <Text className="text-gray-400 text-sm">{item.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default TransactionScreen;
