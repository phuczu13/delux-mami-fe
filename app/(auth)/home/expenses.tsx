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

const ExpenseScreen = () => {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const user = auth().currentUser;

  // State chứa dữ liệu giao dịch
  const [transaction, setTransaction] = useState({
    userID: user?.uid || "",
    transactionType: "Expense",
    type: "",
    totalMoney: "",
    description: "",
    date: date.toISOString(),
  });

  // Cập nhật userID khi user thay đổi
  useEffect(() => {
    if (user?.uid && transaction.userID !== user.uid) {
      setTransaction((prev) => ({ ...prev, userID: user.uid }));
    }
  }, [user, transaction]); // Thêm transaction để đảm bảo state không cập nhật liên tục

  // Cập nhật ngày khi người dùng chọn
  useEffect(() => {
    setTransaction((prev) => ({ ...prev, date: date.toISOString() }));
  }, [date]);

  // Gửi dữ liệu lên backend
  const handleSubmit = async () => {
    if (
      !transaction.userID ||
      !transaction.type ||
      !transaction.totalMoney ||
      !transaction.description
    ) {
      Alert.alert("❌ Lỗi!", "Vui lòng nhập đầy đủ thông tin!");
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
        `Không thể thêm giao dịch.\nLý do: ${(error as Error).message}`
      );
    }
  };

  return (
    <ScrollView className="flex-1 bg-white" testID="expense-screen">
      {/* Header */}
      <View
        className="bg-[#ea0000] px-5 pt-14 pb-5 rounded-b-3xl"
        testID="header"
      >
        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/Home")}
            testID="back-button"
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>

          <Text className="text-white text-xl font-bold" testID="screen-title">
            Expense
          </Text>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            testID="qr-button"
          >
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
      <View
        className="p-6 -mt-5 bg-white rounded-t-3xl shadow-md"
        testID="form"
      >
        <TextInput
          className="bg-gray-100 p-4 rounded-lg mb-4"
          value="Expense"
          editable={false}
          testID="transaction-type"
        />
        <TextInput
          className="bg-gray-100 p-4 rounded-lg mb-4"
          placeholder="Category"
          onChangeText={(text) =>
            setTransaction({ ...transaction, type: text })
          }
          testID="category-input"
        />
        <TextInput
          className="bg-gray-100 p-4 rounded-lg mb-4"
          placeholder="Total Money"
          keyboardType="numeric"
          value={transaction.totalMoney}
          onChangeText={(text) => {
            if (/^\d+$/.test(text) || text === "") {
              setTransaction({ ...transaction, totalMoney: text });
            } else {
              Alert.alert("❌ Lỗi!", "Chỉ được nhập số nguyên dương!");
            }
          }}
          testID="total-money-input"
        />
        <TextInput
          className="bg-gray-100 p-4 rounded-lg mb-4"
          placeholder="Description"
          onChangeText={(text) =>
            setTransaction({ ...transaction, description: text })
          }
          testID="description-input"
        />
        <TouchableOpacity
          className="bg-gray-100 p-4 rounded-lg mb-4"
          onPress={() => setOpen(true)}
          testID="date-picker-button"
        >
          <Text>{new Date(transaction.date).toDateString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-purple-600 p-4 rounded-lg mt-4"
          onPress={handleSubmit}
          testID="submit-button"
        >
          <Text className="text-white text-center text-lg font-bold">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        testID="qr-modal"
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg shadow-lg w-80">
            <Text className="text-lg font-bold mb-4 text-center">
              Hãy chọn chức năng bạn muốn
            </Text>

            {/* Điều hướng đến trang quét mã QR */}
            <TouchableOpacity
              className="bg-blue-500 p-4 rounded-lg mb-2"
              onPress={() => {
                setModalVisible(false);
                router.push("/(auth)/home/scanAddExpense"); // Điều hướng đến trang quét mã QR
              }}
              testID="navigate-scanQR"
            >
              <Text className="text-white text-center">Dùng ảnh có sẵn</Text>
            </TouchableOpacity>

            {/* Điều hướng đến trang nhập mã thủ công */}
            <TouchableOpacity
              className="bg-green-500 p-4 rounded-lg mb-2"
              onPress={() => {
                setModalVisible(false);
                router.push("/(auth)/home/takeAndScanExpense"); // Điều hướng đến trang nhập mã thủ công
              }}
              testID="navigate-manualInput"
            >
              <Text className="text-white text-center">Chụp ảnh</Text>
            </TouchableOpacity>

            {/* Nút đóng modal */}
            <TouchableOpacity
              className="bg-gray-500 p-4 rounded-lg"
              onPress={() => setModalVisible(false)}
              testID="close-modal"
            >
              <Text className="text-white text-center">❌ Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ExpenseScreen;
