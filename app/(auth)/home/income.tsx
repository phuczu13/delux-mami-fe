import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Switch, Image ,Modal,Pressable} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import "nativewind";
import { useRouter } from 'expo-router';

const IncomeScreen = () => {
  const [repeat, setRepeat] = useState(false);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const [value, setValue] = useState("$0");

  const handleChange = (text: string) => {
    // Loại bỏ tất cả ký tự không phải số
    const numericValue = text.replace(/[^0-9]/g, "");

    // Cập nhật giá trị, giữ nguyên "$"
    setValue(numericValue ? `$${numericValue}` : "$");
  };

  const handleFocus = () => {
    // Nếu giá trị hiện tại là "$0", xóa số 0 để nhập số mới
    if (value === "$0") {
      setValue("$");
    }
  };

  const handleBlur = () => {
    // Nếu người dùng không nhập gì, đặt lại thành "$0"
    if (value === "$") {
      setValue("$0");
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="bg-[#1fb255] px-5 pt-14 pb-5 rounded-b-3xl">
        <View className='flex-row justify-between items-center text-center'>
          <TouchableOpacity className=""
          onPress={() => router.push("/(tabs)/Home")}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-center text-xl font-bold">Income</Text>
          <TouchableOpacity
          onPress={() => setModalVisible(true)}
          >
            <Image
              source={{ uri: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhs82CuyRUTbXTJnqEnCZnffO6R6OBOmrplqM1D9rwJN-e-taTZ-_R-XHWU0SPTmPHtovxAO34DgPXze1bAejaLUC5UDXTpTY6jMKic0vLOAX4IdynpNV2oJW1E2-nPM4gqkUhgkw/s0/unitag_qrcode.png" }}
              className="w-10 h-10"
            />
          </TouchableOpacity>
        </View>
        <Text className="text-white text-lg mt-4">How much?</Text>
        <TextInput className='text-white text-4xl' 
        value={value}
        onChangeText={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        keyboardType="numeric"
        />
      </View>
      <View className="p-6 -mt-5 bg-white rounded-t-3xl shadow-md">
        <TextInput className="bg-gray-100 p-4 rounded-lg mb-4" placeholder="Category" />
        <TextInput className="bg-gray-100 p-4 rounded-lg mb-4" placeholder="Description" />
        <TextInput className="bg-gray-100 p-4 rounded-lg mb-4" placeholder="Wallet" />
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-lg font-semibold">Repeat</Text>
            <Text className="text-gray-500 text-sm">Repeat transaction</Text>
          </View>
          <Switch value={repeat} onValueChange={setRepeat} />
        </View>
        <TouchableOpacity className="bg-purple-600 p-4 rounded-lg">
          <Text className="text-white text-center text-lg font-bold">Continue</Text>
        </TouchableOpacity>

        //Modal chọn phương thức nhập dữ liệu
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
              <Text className="text-white font-semibold">📷 Chụp ảnh</Text>
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
        
      </View>
    </ScrollView>
  );
};

export default IncomeScreen;
