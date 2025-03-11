import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { useRouter } from "expo-router";

const IntroScreen = () => {
  const router = useRouter();

  return (
    <View testID="intro-screen">
      <Text testID="welcome-text" className="text-center text-4xl mt-10">
        Welcome to Delux
      </Text>
      <Image
        testID="intro-image"
        source={{
          uri: "https://i.pinimg.com/736x/58/d3/43/58d343ff7b3636efd0c18c7d6d2ccac5.jpg",
        }}
        style={{ width: 300, height: 300, alignSelf: "center", marginTop: 20 }}
      />
      <Text testID="slogan-text" className="text-center text-lg mt-10">
        Luxurious - Premium - Opulent
      </Text>
      <View className="mt-10">
        <TouchableOpacity
          testID="start-button"
          className="flex justify-center items-center text-white mx-10 p-4 rounded-full bg-green-600"
          onPress={() => router.push("/sign-in")}
        >
          <Text className="text-white font-semibold">Start now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IntroScreen;
