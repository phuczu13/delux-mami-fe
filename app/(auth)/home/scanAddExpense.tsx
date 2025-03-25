import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert, Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { MediaTypeOptions } from '../../..//node_modules/expo-image-picker/build/ImagePicker.types';
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const GOOGLE_VISION_API_KEY = "AIzaSyA6AjixXUNl-y2egUortvsH8H6G8w0azpg"; // 🔑 Nhập API Key của bạn

const scanAddExpense = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [textResult, setTextResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const user = auth().currentUser;
  const router = useRouter();

  // 🖼️ Chọn ảnh từ thư viện
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      recognizeText(result.assets[0].uri);
    }
  };

  // 🧠 Gửi ảnh lên Google Cloud Vision API để nhận diện văn bản
  const recognizeText = async (imageUri: string) => {
    try {
      setLoading(true);
      setTextResult(null);

      // Chuyển ảnh thành base64
      const base64Image = await convertImageToBase64(imageUri);

      const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`,
        {
          requests: [
            {
              image: { content: base64Image },
              features: [{ type: "TEXT_DETECTION" }],
            },
          ],
        }
      );

      const textAnnotations = response.data.responses[0].textAnnotations;
      if (textAnnotations && textAnnotations.length > 0) {
        setTextResult(textAnnotations[0].description);
      } else {
        setTextResult("Không tìm thấy văn bản nào!");
      }
    } catch (error) {
      console.error("Lỗi OCR:", error);
      setTextResult("Lỗi khi nhận diện văn bản.");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Chuyển ảnh thành base64 để gửi lên API
  const convertImageToBase64 = async (imageUri: string): Promise<string> => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result?.toString().split(",")[1];
        resolve(base64data || "");
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const postTransaction = async () => {
    if (!textResult) {
      Alert.alert("Lỗi", "Không có dữ liệu để gửi!");
      return;
    }

    const prompt = `Hóa đơn thanh toán: ${textResult}`;
   
    try {
      const response = await axios.post(
        "https://expense-tracker-be-three.vercel.app/API/AI",
        { userID: user?.uid || "",
          userPrompt: prompt },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);
      
      // Hiển thị thông báo thành công
      Alert.alert(
        "Thành công",
        "Đã xử lý hóa đơn thành công!",
        [
          {
            text: "OK",
            onPress: () => {
              // Điều hướng về trang home
              router.push("/(tabs)/Home");
            }
          }
        ]
      );

    } catch (error: any) {
      console.error("Lỗi khi gửi dữ liệu:", error.response?.data || error.message);
      Alert.alert("Lỗi", "Không thể gửi dữ liệu. Vui lòng thử lại!");
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#f8f9fa]">
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#ff3b30', '#ff6b6b']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-5 pt-14 pb-8 rounded-b-[40px]"
      >
        <View className="flex-row justify-between items-center">
          <TouchableOpacity 
            onPress={() => router.push("/(tabs)/Home")}
            className="bg-white/30 rounded-full p-3 backdrop-blur-lg"
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold tracking-wide">Scan Bill</Text>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      {/* Main Content */}
      <Animatable.View 
        animation="fadeInUp"
        duration={800}
        className="flex-1 items-center justify-center p-6 -mt-6 bg-white rounded-t-[40px] shadow-lg"
      >
        <View className="w-full max-w-md">
          {/* Image Preview with Animation */}
          {imageUri && (
            <Animatable.View 
              animation="zoomIn"
              duration={500}
              className="mb-6 items-center"
            >
              <View className="shadow-2xl rounded-2xl overflow-hidden">
                <Image 
                  source={{ uri: imageUri }} 
                  className="w-80 h-80 rounded-2xl"
                  resizeMode="cover"
                />
                <BlurView
                  intensity={80}
                  tint="dark"
                  className="absolute bottom-0 w-full p-3"
                >
                  <Text className="text-white text-center text-sm">Tap to scan another</Text>
                </BlurView>
              </View>
            </Animatable.View>
          )}

          {/* Loading Indicator with Animation */}
          {loading && (
            <Animatable.View 
              animation="pulse"
              iterationCount="infinite"
              className="my-6 items-center"
            >
              <ActivityIndicator size="large" color="#ff3b30" />
              <Text className="text-center text-gray-600 mt-3 font-medium">
                Processing your bill...
              </Text>
            </Animatable.View>
          )}

          {/* Scan Button with Shadow */}
          <TouchableOpacity 
            onPress={pickImage}
            className="shadow-lg"
          >
            <LinearGradient
              colors={imageUri ? ['#4CAF50', '#45a049'] : ['#ff3b30', '#ff6b6b']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="py-4 px-6 rounded-2xl mb-4 flex-row items-center justify-center"
            >
              <Ionicons 
                name={imageUri ? "camera" : "scan-outline"} 
                size={24} 
                color="white" 
              />
              <Text className="text-white font-bold text-lg ml-3">
                {imageUri ? 'Scan Another Bill' : 'Start Scanning'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Process Button with Animation */}
          {textResult && (
            <Animatable.View
              animation="fadeInUp"
              duration={500}
              className="shadow-lg"
            >
              <TouchableOpacity 
                onPress={postTransaction}
                className="bg-[#28A745] py-4 px-6 rounded-2xl flex-row items-center justify-center"
                style={{
                  shadowColor: "#28A745",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                }}
              >
                <Ionicons name="cloud-upload" size={24} color="white" />
                <Text className="text-white font-bold text-lg ml-3">
                  Process Bill
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          )}

          {/* Recognized Text with Better Styling */}
          {textResult && (
            <Animatable.View 
              animation="fadeIn"
              duration={800}
              className="mt-6 p-5 bg-gray-50 rounded-2xl border border-gray-100"
            >
              <Text className="text-gray-700 font-medium mb-2">Recognized Text:</Text>
              <Text className="text-gray-600 leading-relaxed">{textResult}</Text>
            </Animatable.View>
          )}
        </View>
      </Animatable.View>
    </ScrollView>
  );
};

export default scanAddExpense;