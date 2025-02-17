import Ionicons from '@expo/vector-icons/build/Ionicons';
import { useRouter } from 'expo-router'
import React from 'react'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';


const ExportData = () => {

    const router = useRouter();

    return (
        <ScrollView className='pt-10 px-4'>
            <View className="">
                <TouchableOpacity className="bg-slate-200 flex justify-center items-center w-10 h-10 rounded-full"
                onPress={() => router.push ('/Profile')}
                >
                    <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View className='py-5'>Export Data nè</View>
            <View className='flex items-start'>
                <TouchableOpacity className='px-3 py-2 flex bg-slate-300'>
                    <Text>Nhấn dô</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default ExportData;