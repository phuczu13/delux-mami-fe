import Ionicons from '@expo/vector-icons/build/Ionicons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { MenuProvider } from 'react-native-popup-menu';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Shopping for bae', time: '6:50 PM', status: "Expenses", amount: "- $1.999", read: false },
    { id: 2, title: 'Salary in February', time: '10:37 PM', status: "Income", amount: "+ $502", read: true },
    { id: 3, title: 'Shopping for bae', time: '6:50 PM', status: "Expenses", amount: "- $1.999", read: false },
    { id: 4, title: 'Salary in February', time: '10:37 PM', status: "Income", amount: "+ $502", read: false },

  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const router = useRouter();
  return (
    <MenuProvider>
      <ScrollView className="flex pt-10 bg-gray-100">
        <View className='p-5'>
          <View className="flex-row justify-between items-center mb-4">
            <TouchableOpacity className="bg-slate-200 flex justify-center items-center w-10 h-10 rounded-full" onPress={() => router.push('/Home')}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-xl font-bold">Notifications</Text>
            <Menu>
              <MenuTrigger>
                <Text className="text-xl font-bold">•••</Text>
              </MenuTrigger>
              <MenuOptions className="bg-white shadow-md rounded-lg p-2">
                <MenuOption onSelect={markAllAsRead}>
                  <Text className="text-lg p-2">Mark all read</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className={`p-3 flex-row justify-between mb-3 rounded-lg ${item.read ? 'bg-gray-200' : 'bg-white'}`}>
                <View>
                  <Text className="text-lg font-semibold">{item.title}</Text>
                  <Text className={item.status === "Income" ? "text-green-500 text-sm" : "text-red-500 text-sm"}>
                    {item.status}
                  </Text>
                </View>
                <View className='justify-center'>
                  <Text className={item.status === "Income" ? "text-green-500 text-end text-sm font-semibold" : "text-red-500 text-end text-sm font-semibold"}>{item.amount}</Text>
                  <Text className="text-gray-500 text-end text-xs mt-1">{item.time}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </MenuProvider>
  );
};

export default NotificationScreen;
  