import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import DatePicker from "react-native-date-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";

const ExpenseScreen = () => {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const user = auth().currentUser;

  // State chứa dữ liệu giao dịch
  const [transaction, setTransaction] = useState({
    userID: user?.uid || "", // Đặt giá trị mặc định
    transactionType: "Expense", // Đổi từ "Income" thành "Expense"
    type: "",
    totalMoney: "",
    description: "",
    date: date.toISOString(),
  });

  // Cập nhật userID khi user thay đổi
  useEffect(() => {
    if (user?.uid) {
      setTransaction((prev) => ({ ...prev, userID: user.uid }));
    }
  }, [user]);

  // Cập nhật date khi người dùng chọn ngày mới
  useEffect(() => {
    setTransaction((prev) => ({ ...prev, date: date.toISOString() }));
  }, [date]);

  // Xử lý gửi dữ liệu lên backend
  const handleSubmit = async () => {
    if (!transaction.userID || !transaction.type || !transaction.totalMoney || !transaction.description) {
      Alert.alert("❌ Lỗi!", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      console.log("📤 Dữ liệu gửi đi:", transaction);

      const response = await fetch("https://expense-tracker-be-three.vercel.app/API/createTransaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      });

      const text = await response.text();
      console.log("📥 Phản hồi server:", text);

      if (!response.ok) throw new Error(`Lỗi ${response.status}: ${text}`);

      Alert.alert("🎉 Thành công!", "Giao dịch đã được thêm.");
      router.push("/(tabs)/Home");
    } catch (error) {
      console.error("🚨 Lỗi khi gửi giao dịch:", error);
      Alert.alert("❌ Lỗi!", `Không thể thêm giao dịch.\nLý do: ${(error as Error).message}`);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-[#ff3b30] px-5 pt-14 pb-5 rounded-b-3xl">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity onPress={() => router.push("/(tabs)/Home")}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-center text-xl font-bold">Expense</Text>
          <View style={{ width: 24 }} /> {/* Placeholder để giữ bố cục */}
        </View>
      </View>

      {/* Form nhập liệu */}
      <View className="p-6 -mt-5 bg-white rounded-t-3xl shadow-md">
        <Text className="text-lg font-semibold mb-2">Transaction Type</Text>
        <TextInput className="bg-gray-100 p-4 rounded-lg mb-4" value="Expense" editable={false} />

        <TextInput
          className="bg-gray-100 p-4 rounded-lg mb-4"
          placeholder="Category"
          onChangeText={(text) => setTransaction({ ...transaction, type: text })}
        />

        <TextInput
          className="bg-gray-100 p-4 rounded-lg mb-4"
          placeholder="Total Money"
          keyboardType="numeric"
          onChangeText={(text) => setTransaction({ ...transaction, totalMoney: text })}
        />

        <TextInput
          className="bg-gray-100 p-4 rounded-lg mb-4"
          placeholder="Description"
          onChangeText={(text) => setTransaction({ ...transaction, description: text })}
        />

        {/* Date Picker */}
        <TouchableOpacity className="bg-gray-100 p-4 rounded-lg mb-4" onPress={() => setOpen(true)}>
          <Text>{new Date(transaction.date).toDateString()}</Text>
        </TouchableOpacity>

        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          onConfirm={(selectedDate) => {
            setOpen(false);
            setDate(selectedDate);
          }}
          onCancel={() => setOpen(false)}
        />

        {/* Submit Button */}
        <TouchableOpacity className="bg-purple-600 p-4 rounded-lg mt-4 " onPress={handleSubmit}>
          <Text className="text-white text-center text-lg font-bold">Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ExpenseScreen;
