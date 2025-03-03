import React, { useState, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";

const SignUpScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const signUp = useCallback(async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Lỗi", "Định dạng email không hợp lệ!");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp!");
      return;
    }

    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert("Thành công", "Vui lòng kiểm tra email để xác nhận tài khoản!");
      router.push("/sign-in");
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Đăng ký thất bại, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  }, [email, password, confirmPassword, router]);

  return (
    <View className="flex-1 bg-white justify-center px-5">
      <View className="mt-5">
        <Text className="text-2xl text-center font-bold mb-6">Register</Text>

        <TextInput
          className="p-5 bg-gray-200 rounded-lg mb-4"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="p-5 bg-gray-200 rounded-lg mb-4"
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          className="p-5 bg-gray-200 rounded-lg mb-8"
          placeholder="Confirm password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          className={`bg-green-600 p-4 rounded-lg items-center ${loading ? "opacity-50" : ""}`}
          onPress={signUp}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-semibold">Register</Text>}
        </TouchableOpacity>

        <View className="flex items-center mt-5">
          <TouchableOpacity onPress={() => router.push("/sign-in")}>
            <Text className="text-green-500 font-semibold">Do you already have an account?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
