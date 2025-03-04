import React, { useState, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";

const SignInScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = useCallback(async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }

    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert("Thành công", "Đăng nhập thành công!");
      router.push("/(tabs)/Home");
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Đăng nhập thất bại!");
    } finally {
      setLoading(false);
    }
  }, [email, password, router]);

  return (
    <View className="flex-1 bg-white justify-center px-5">
      <View className="mt-5">
        <Text className="text-2xl text-center font-bold mb-6">Login</Text>

        <TextInput
          className="p-5 bg-gray-200 rounded-lg mb-4"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="p-5 bg-gray-200 rounded-lg mb-8"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity accessibilityRole="button"
          className={`bg-green-600 p-4 rounded-lg items-center ${loading ? "opacity-50" : ""}`}
          onPress={signIn}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-semibold">Login</Text>}
        </TouchableOpacity>

        <View className="flex items-center mt-5">
          <TouchableOpacity onPress={() => router.push("/sign-up")}>
            <Text className="text-green-500 font-semibold">Are you a new user?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;
