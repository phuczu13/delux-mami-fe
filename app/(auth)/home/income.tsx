import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
  Pressable,
} from "react-native";
import DatePicker from "react-native-date-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";

const IncomeScreen = () => {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const user = auth().currentUser;

  // State chứa dữ liệu giao dịch
  const [transaction, setTransaction] = useState({
    userID: user?.uid || "",
    transactionType: "Income",
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

  // Cập nhật ngày khi người dùng chọn
  useEffect(() => {
    setTransaction((prev) => ({ ...prev, date: date.toISOString() }));
  }, [date]);

  // Gửi dữ liệu lên backend
  const handleSubmit = async () => {
    if (!transaction.userID || !transaction.type || !transaction.totalMoney || !transaction.description) {
      Alert.alert("❌ Lỗi!", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      console.log("📤 Gửi dữ liệu:", transaction);

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
      <View className="bg-[#1fb255] px-5 pt-14 pb-5 rounded-b-3xl">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity onPress={() => router.push("/(tabs)/Home")}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>

          <Text className="text-white text-xl font-bold">Income</Text>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={{
                uri: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhs82CuyRUTbXTJnqEnCZnffO6R6OBOmrplqM1D9rwJN-e-taTZ-_R-XHWU0SPTmPHtovxAO34DgPXze1bAejaLUC5UDXTpTY6jMKic0vLOAX4IdynpNV2oJW1E2-nPM4gqkUhgkw/s0/unitag_qrcode.png",
              }}
              className="w-10 h-10"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Form nhập liệu */}
      <View className="p-6 -mt-5 bg-white rounded-t-3xl shadow-md">
        <Text className="text-lg font-semibold mb-2">Transaction Type</Text>
        <TextInput className="bg-gray-100 p-4 rounded-lg mb-4" value="Income" editable={false} />

        <TextInput
          className="bg-gray-100 p-4 rounded-lg mb-4"
          placeholder="Category"
          onChangeText={(text) => setTransaction({ ...transaction, type: text })}
        />

        <TextInput
          className="bg-gray-100 p-4 rounded-lg mb-4"
          placeholder="Total Money"
          keyboardType="numeric"
          value={transaction.totalMoney}
          onChangeText={(text) => {
            // Kiểm tra nếu text là số nguyên dương
            if (/^\d+$/.test(text) || text === "") {
              setTransaction({ ...transaction, totalMoney: text });
            } else {
              Alert.alert("❌ Lỗi!", "Chỉ được nhập số nguyên dương!");
            }
          }}
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
        <TouchableOpacity className="bg-purple-600 p-4 rounded-lg mt-4" onPress={handleSubmit}>
          <Text className="text-white text-center text-lg font-bold">Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Modal chọn phương thức nhập */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <Pressable className="flex-1 justify-center bg-black/50" onPress={() => setModalVisible(false)}>
          <View className="bg-white p-6 rounded-lg mx-10 items-center">
            <Text className="text-lg font-semibold mb-4">Chọn phương thức nhập dữ liệu</Text>

            <TouchableOpacity
              className="bg-blue-500 p-4 rounded-lg w-52 items-center mb-3"
              onPress={() => {
                setModalVisible(false);
                router.push("/(auth)/home/takeAndScanIncome");
              }}
            >
              <Text className="text-white font-semibold">📷 Scan ảnh</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-green-500 p-4 rounded-lg w-52 items-center"
              onPress={() => {
                setModalVisible(false);
                router.push("/(auth)/home/scanAddIncome");
              }}
            >
              <Text className="text-white font-semibold">🖼 Chọn ảnh từ thư viện</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};

export default IncomeScreen;
