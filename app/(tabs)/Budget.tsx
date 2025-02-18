import React from "react";
import { View, Text, ScrollView } from "react-native";

const BudgetScreen: React.FC = () => {
  return (
      <ScrollView className="bg-white pt-10">
      <View className="p-5">
        <Text className="font-semibold text-xl">Budget nè</Text>
      </View>
    </ScrollView>
  );
};

export default BudgetScreen;
