import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const SignInScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View className="flex-1 bg-white justify-center px-5">
      <View className="mt-5">
        <Text className="text-2xl text-center font-bold mb-6">Login</Text>

        <TextInput
          className="p-5 bg-gray-200 rounded-lg mb-4"
          placeholder="Email or phone number"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="p-5 bg-gray-200 rounded-lg mb-8"
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          className="bg-green-600 p-4 rounded-lg items-center"
          onPress={() => router.push('/(tabs)/Home')}
        >
          <Text className="text-white font-semibold">Login</Text>
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
