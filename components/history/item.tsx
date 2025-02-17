import { formatCurrency } from "@/utils/format-currency";
import React from "react";
import { Text, View } from "react-native";
interface HistoryItemProps {
  description: string;
  createdAt: string;
  amount: number;
  type: string;
  icon: string;
}
const HistoryItem: React.FC<HistoryItemProps> = ({
  amount,
  icon,
  description,
  createdAt,
  type,
}) => {
  return (
    <View className="bg-white w-full flex-row items-center my-2">
      <Text className="p-2 w-10 h-10 text-center  rounded-lg flex-row items-center bg-gray-100  m-2">
        {icon}
      </Text>
      <View>
        <Text className="font-semibold text-lg">{description}</Text>
        <Text className="text-sm text-gray-400">{createdAt}</Text>
      </View>
      <View className="ml-auto mr-2 text-right">
        <Text
          className={`font-semibold ${
            amount > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          { amount > 0 ? "+" : ""}{formatCurrency(amount, "VND", "vi-VN")}
        </Text>
        <Text className="ml-auto text-sm text-gray-400">{type}</Text>
      </View>
    </View>
  );
};

export default HistoryItem;
