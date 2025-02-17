import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const SignUpScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');


  return (
    <View className="flex-1 bg-white justify-center px-5">
      <View className="mt-5">
        <Text className="text-2xl text-center font-bold mb-6">Register</Text>

        <TextInput
          className="p-5 bg-gray-200 rounded-lg mb-4"
          placeholder="Email or phone number"
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
          value={confirmpassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          className="bg-green-600 p-4 rounded-lg items-center"
          onPress={() => router.push('/(auth)/sign-in')}
        >
          <Text className="text-white font-semibold">Register</Text>
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
