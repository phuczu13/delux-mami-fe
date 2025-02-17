import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Switch } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import "nativewind";
import { useRouter } from 'expo-router';

const IncomeScreen = () => {
  const [amount, setAmount] = useState('0');
  const [repeat, setRepeat] = useState(false);
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="bg-green-600 p-6 rounded-b-3xl">
        <TouchableOpacity className="mb-4"
        onPress={() => router.push("/(tabs)/Home")}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-center text-xl font-bold">Income</Text>
        <Text className="text-white text-lg mt-4">How much?</Text>
        <Text className="text-white text-5xl font-bold">${amount}</Text>
      </View>
      <View className="p-6 -mt-5 bg-white rounded-t-3xl shadow-md">
        <TextInput className="bg-gray-100 p-4 rounded-lg mb-4" placeholder="Category" />
        <TextInput className="bg-gray-100 p-4 rounded-lg mb-4" placeholder="Description" />
        <TextInput className="bg-gray-100 p-4 rounded-lg mb-4" placeholder="Wallet" />
        <TouchableOpacity className="flex-row items-center bg-gray-100 p-4 rounded-lg mb-4">
          <Ionicons name="attach" size={20} color="gray" />
          <Text className="text-gray-500 ml-2">Add attachment</Text>
        </TouchableOpacity>
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
      </View>
    </ScrollView>
  );
};

export default IncomeScreen;
