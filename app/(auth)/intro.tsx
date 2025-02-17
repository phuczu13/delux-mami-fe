import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Image } from "react-native";
import { useRouter } from "expo-router";

const IntroScreen = () => {

  const router = useRouter();

  return (
    <View>
      <Text className='text-center text-4xl mt-10'>
        Welcome to Delux
      </Text>
      <Image
        source={{
          uri: "https://i.pinimg.com/736x/58/d3/43/58d343ff7b3636efd0c18c7d6d2ccac5.jpg",
        }}
        style={{ width: 300, height: 300, alignSelf: "center", marginTop: 20 }}
      />
      <Text className='text-center text-lg mt-10'>
        Luxurious - Premium - Opulent
      </Text>
      <View className='mt-10'>
        <TouchableOpacity 
          className='flex justify-center items-center text-white mx-10 p-4 rounded-full bg-green-600'
          onPress={() => router.push("/sign-in")}>
          Start now
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IntroScreen;
