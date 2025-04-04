import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  Button,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Octicons from "@expo/vector-icons/Octicons";
import { useRouter } from "expo-router";
import { PlusCircle } from "lucide-react-native";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const HomeScreen: React.FC = () => {
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
      status: "Expense",
      time: "10:00 AM",
      color: "bg-yellow-100",
      iconColor: "text-yellow-500",
    },
    {
      id: 2,
      category: "Salary",
      icon: "money",
      amount: "+ $80",
      status: "Income",
      time: "06:50 PM",
      color: "bg-purple-100",
      iconColor: "text-purple-500",
    },
    {
      id: 3,
      category: "Food",
      icon: "restaurant",
      amount: "- $32",
      status: "Expense",
      time: "07:30 PM",
      color: "bg-red-100",
      iconColor: "text-red-500",
    },
  ];

  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const chartData = {
    labels: ["Jan", "Feb"],
    income: [540, 700], // Income data
    expense: [400, 600], // Expense data
  };

  // Chuyển đổi dữ liệu để hiển thị hai cột tách biệt
  const formattedData = {
    labels: chartData.labels,
    datasets: [
      { data: chartData.income }, // Income (Xanh)
      { data: chartData.expense }, // Expense (Đỏ)
    ],
  };

  return (
    <ScrollView className="bg-gray-100 pt-10">
      <View className="p-5">
        <View className="flex-row w-full justify-between items-center">
          <View className="w-1/6">
            <TouchableOpacity onPress={() => router.push("/(tabs)/Profile")}>
              <Image
                source={{
                  uri: "https://i.pinimg.com/736x/37/31/e7/3731e7e191d56c77907c8b8eb87e93da.jpg",
                }}
                className="w-12 h-12 rounded-full border-[#7F3DFF] border"
              />
            </TouchableOpacity>
          </View>
          <View className="">
            <TouchableOpacity className="flex-row gap-2 items-center border border-[#7F3DFF] rounded-full px-5 py-2">
              <Text className="text-lg text-gray-500 font-semibold">
                January
              </Text>
              <Octicons name="chevron-down" size={22} color="gray" />
            </TouchableOpacity>
          </View>
          <View className="w-1/6 justify-end flex-row">
            <TouchableOpacity onPress={() => router.push("/home/notification")}>
              <FontAwesome name="bell" size={20} color="#7F3DFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-4 items-center">
          <Text className="text-gray-500">Account Balance</Text>
          <Text className="text-3xl font-bold text-gray-800">$8386</Text>
        </View>

        <View className="mt-4 flex-row justify-between">
          <View className="bg-green-100 p-3 rounded-lg flex-row items-center gap-1">
            <FontAwesome name="arrow-up" size={16} color="green" />
            <Text className="text-green-600 font-semibold">Income</Text>
            <Text className="text-green-700 font-bold">$5678</Text>
          </View>
          <View className="bg-red-100 p-3 rounded-lg flex-row items-center gap-1">
            <FontAwesome name="arrow-down" size={16} color="red" />
            <Text className="text-red-600 font-semibold">Expenses</Text>
            <Text className="text-red-700 font-bold">$1234</Text>
          </View>
        </View>

        <View className="mt-5 px-4">
          <Text className="text-lg font-bold mb-3 text-center">
            Monthly Financial Overview
          </Text>
          <BarChart
            data={formattedData}
            width={Dimensions.get("window").width - 40} // Responsive width
            height={250}
            yAxisLabel="$"
            yAxisSuffix=""
            fromZero
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Màu chữ
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              barPercentage: 0.6, // Điều chỉnh độ rộng cột
              propsForBackgroundLines: { strokeDasharray: "4" },
            }}
            style={{ borderRadius: 10, alignSelf: "center" }}
            showValuesOnTopOfBars
          />
        </View>

        <View className="mt-6">
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-600 font-semibold">
              Recent Transaction
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(auth)/home/list-transaction")}
            >
              <Text className="text-purple-500 font-semibold">See All</Text>
            </TouchableOpacity>
          </View>

          {transactions.map((item) => (
            <View
              key={item.id}
              className="flex-row justify-between items-center bg-white p-4 mt-3 rounded-lg"
            >
              <View className="flex-row items-center space-x-3">
                <View className={`p-2 rounded-full ${item.color}`}>
                  {item.category === "Shopping" ? (
                    <FontAwesome
                      name={item.icon as any}
                      size={20}
                      color={iconColors[item.iconColor] || "black"}
                    />
                  ) : (
                    <MaterialIcons
                      name={item.icon as any}
                      size={20}
                      color={iconColors[item.iconColor] || "black"}
                    />
                  )}
                </View>
                <View className="ml-2">
                  <Text className="font-semibold text-gray-800">
                    {item.category}
                  </Text>
                  <Text
                    className={
                      item.status === "Income"
                        ? "text-green-500 text-xs"
                        : "text-red-500 text-xs"
                    }
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text
                  className={
                    item.status === "Income"
                      ? "text-green-500 font-semibold"
                      : "text-red-500 font-semibold"
                  }
                >
                  {item.amount}
                </Text>
                <Text className="text-gray-400 text-xs">{item.time}</Text>
              </View>
            </View>
          ))}
        </View>
        <View className="flex-col items-center text-center mt-6">
          <Button
            title="Add"
            onPress={() => setModalVisible(true)}
            color="black"
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View className="flex-1 items-center justify-end bg-black/20">
              <View className="bg-white p-4 rounded-t-[30px] w-full">
                <Text className="text-lg font-bold text-center mb-4">
                  Category
                </Text>
                <Pressable
                  className="bg-[#1fb255] p-3 rounded-lg mb-2"
                  onPress={() => {
                    router.push("/(auth)/home/income");
                    setModalVisible(false);
                  }}
                >
                  <Text className="text-white text-center">Add new income</Text>
                </Pressable>
                <Pressable
                  className="bg-red-600 p-3 rounded-lg mb-2"
                  onPress={() => {
                    router.push("/(auth)/home/expenses");
                    setModalVisible(false);
                  }}
                >
                  <Text className="text-white text-center">
                    Add new expense
                  </Text>
                </Pressable>
                <Pressable
                  className="bg-gray-400 p-3 rounded-lg"
                  onPress={() => setModalVisible(false)}
                >
                  <Text className="text-white text-center">Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
