import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'

const ListTransaction = () => {
    const router = useRouter();

    const iconColors: Record<string, string> = {
      "text-yellow-500": "#eab308",
      "text-purple-500": "#9333ea",
      "text-red-500": "#ef4444",
    };

    const transactions = [
        {
          id: 1,
          category: "Shopping",
          icon: "shopping-bag",
          amount: "- $120",
          status: "Expense",
          time: "10:00 AM",
          color: "bg-yellow-100",
          iconColor: "text-yellow-500",
        },
        {
          id: 2,
          category: "Salary",
          icon: "money",
          amount: "+ $80",
          status: "Income",
          time: "06:50 PM",
          color: "bg-purple-100",
          iconColor: "text-purple-500",
        },
        {
          id: 3,
          category: "Food",
          icon: "restaurant",
          amount: "- $32",
          status: "Expense",
          time: "07:30 PM",
          color: "bg-red-100",
          iconColor: "text-red-500",
        },
        {
            id: 4,
            category: "Shopping",
            icon: "shopping-bag",
            amount: "- $120",
            status: "Expense",
            time: "10:00 AM",
            color: "bg-yellow-100",
            iconColor: "text-yellow-500",
          },
          {
            id: 5,
            category: "Salary",
            icon: "money",
            amount: "+ $80",
            status: "Income",
            time: "06:50 PM",
            color: "bg-purple-100",
            iconColor: "text-purple-500",
          },
          {
            id: 6,
            category: "Food",
            icon: "restaurant",
            amount: "- $32",
            status: "Expense",
            time: "07:30 PM",
            color: "bg-red-100",
            iconColor: "text-red-500",
          },
          
    ];

  return (
    <ScrollView className='bg-gray-100'>
        <View className='pt-10'>
          <View className='p-5'>
            <View className='flex-row justify-between w-full items-center'>
                <View>
                  <TouchableOpacity className="bg-slate-200 flex justify-center items-center w-10 h-10 rounded-full" onPress={() => router.push('/Home')}>
                    <Ionicons name="chevron-back" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text className='text-2xl w-full text-center font-semibold'>History Transaction</Text>
                </View>
                <View className="w-10">
                </View>
            </View>
            <View className='mt-5'>
                {transactions.map((item) => (
                    <View key={item.id} className="flex-row justify-between items-center bg-white p-4 mt-3 rounded-lg">
                    <View className="flex-row items-center space-x-3">
                        <View className={`p-2 rounded-full ${item.color}`}>
                        {item.category === "Shopping" ? (
                            <FontAwesome name={item.icon as any} size={20} color={iconColors[item.iconColor] || "black"} />
                        ) : (
                            <MaterialIcons name={item.icon as any} size={20} color={iconColors[item.iconColor] || "black"} />
                        )}
                        </View>
                        <View>
                        <View className='ml-2'>
                          <Text className="font-semibold text-gray-800">{item.category}</Text>
                          <Text className={item.status === "Income" ? "text-green-500 text-xs" : "text-red-500 text-xs"}>
                              {item.status}
                          </Text>
                        </View>
                        </View>
                    </View>
                    <View className="items-end">
                        <Text className={item.status === "Income" ? "text-green-500 font-bold" : "text-red-500 font-bold"}>{item.amount}</Text>
                        <Text className="text-gray-400 text-xs">{item.time}</Text>
                    </View>
                    </View>
                ))}
            </View>
          </View> 
        </View>
    </ScrollView>
  )
}

export default ListTransaction