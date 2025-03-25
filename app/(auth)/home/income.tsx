import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
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

  // Xử lý gửi dữ liệu
  const handleSubmit = useCallback(async () => {
    if (!transaction.userID) {
      Alert.alert("❌ Lỗi!", "Bạn chưa đăng nhập!");
      return;
    }
    if (!transaction.type) {
      Alert.alert("❌ Lỗi!", "Vui lòng nhập danh mục!");
      return;
    }
    if (!transaction.totalMoney) {
      Alert.alert("❌ Lỗi!", "Vui lòng nhập số tiền!");
      return;
    }
    if (Number(transaction.totalMoney) <= 0) {
      Alert.alert("❌ Lỗi!", "Số tiền phải lớn hơn 0!");
      return;
    }

    try {
      console.log("📤 Gửi dữ liệu:", transaction);
      const response = await fetch(
        "https://expense-tracker-be-three.vercel.app/API/createTransaction",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(transaction),
        }
      );

      const text = await response.text();
      console.log("📥 Phản hồi server:", text);

      if (!response.ok) throw new Error(`Lỗi ${response.status}: ${text}`);

      Alert.alert("🎉 Thành công!", "Giao dịch đã được thêm.");
      router.push("/(tabs)/Home");
    } catch (error) {
      console.error("🚨 Lỗi khi gửi giao dịch:", error);
      Alert.alert(
        "❌ Lỗi!",
        `Không thể thêm giao dịch.\nLý do: ${error.message}`
      );
    }
  }, [transaction, router]);

  return (
    <ScrollView className="flex-1 bg-white" testID="income-screen">
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
        <TextInput
          className="bg-gray-100 p-4 rounded-lg mb-4"
          value="Income"
          editable={false}
        />
        <TextInput
          className="bg-gray-100 p-4 rounded-lg mb-4"
          placeholder="Category"
          onChangeText={(text) =>
            setTransaction((prev) => ({ ...prev, type: text }))
          }
        />
        <TextInput
          className="bg-gray-100 p-4 rounded-lg mb-4"
          placeholder="Total Money"
          keyboardType="numeric"
          value={transaction.totalMoney}
          onChangeText={(text) => {
            if (/^\d+$/.test(text) || text === "") {
              setTransaction((prev) => ({ ...prev, totalMoney: text }));
            } else {
              Alert.alert("❌ Lỗi!", "Chỉ được nhập số nguyên dương!");
            }
          }}
        />
        <TextInput
          className="bg-gray-100 p-4 rounded-lg mb-4"
          placeholder="Description"
          onChangeText={(text) =>
            setTransaction((prev) => ({ ...prev, description: text }))
          }
        />
        <TouchableOpacity
          className="bg-gray-100 p-4 rounded-lg mb-4"
          onPress={() => setOpen(true)}
        >
          <Text>{new Date(transaction.date).toDateString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-purple-600 p-4 rounded-lg mt-4"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center text-lg font-bold">
            Continue
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal QR */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg shadow-lg w-80">
            <Text className="text-lg font-bold mb-4 text-center">
              Hãy chọn chức năng bạn muốn
            </Text>
            <TouchableOpacity
              className="bg-blue-500 p-4 rounded-lg mb-2"
              onPress={() => {
                setModalVisible(false);
                router.push("/(auth)/home/scanAddIncome");
              }}
            >
              <Text className="text-white text-center">Dùng ảnh có sẵn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-green-500 p-4 rounded-lg mb-2"
              onPress={() => {
                setModalVisible(false);
                router.push("/(auth)/home/takeAndScanIncome");
              }}
            >
              <Text className="text-white text-center">Chụp ảnh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-500 p-4 rounded-lg"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white text-center">❌ Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default IncomeScreen;
