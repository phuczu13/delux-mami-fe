import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { MediaTypeOptions } from "../../..//node_modules/expo-image-picker/build/ImagePicker.types";
import auth from "@react-native-firebase/auth";

const GOOGLE_VISION_API_KEY = "AIzaSyA6AjixXUNl-y2egUortvsH8H6G8w0azpg"; // 🔑 Nhập API Key của bạn

const scanAddIncome = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [textResult, setTextResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const user = auth().currentUser;

  // 🖼️ Chọn ảnh từ thư viện
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;

      if (!selectedImageUri) {
        Alert.alert("Lỗi", "Không thể lấy đường dẫn ảnh!");
        return;
      }

      setImageUri(selectedImageUri);
      recognizeText(selectedImageUri);
    } else {
      Alert.alert("Lỗi", "Bạn chưa chọn ảnh nào!");
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

    const prompt = `Hóa đơn thu nhập: ${textResult}`;
    console.log("Prompt gửi đi:", prompt);

    try {
      const response = await axios.post(
        "https://expense-tracker-be-three.vercel.app/API/AI",
        {
          userID: user?.uid || "",
          userPrompt: prompt,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);

      // 🟢 Thêm thông báo khi gửi thành công
      Alert.alert("Thành công", "Hóa đơn đã được tạo thành công!");
    } catch (error: any) {
      console.error(
        "Lỗi khi gửi dữ liệu:",
        error.response?.data || error.message
      );
      Alert.alert("Lỗi", "Không thể gửi dữ liệu. Vui lòng thử lại!");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <TouchableOpacity
        onPress={pickImage}
        style={{ backgroundColor: "#007AFF", padding: 15, borderRadius: 10 }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>📷 Chọn Ảnh</Text>
      </TouchableOpacity>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      )}

      {loading && (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginTop: 20 }}
        />
      )}

      {textResult && (
        <ScrollView style={{ marginTop: 20, maxHeight: 300, width: "100%", backgroundColor: "#f0f0f0", padding: 10, borderRadius: 10 }}>
          <Text>{textResult}</Text>
        </ScrollView>
      )}

      {/* 📤 Nút gửi dữ liệu */}
      {textResult && (
        <TouchableOpacity
          onPress={postTransaction}
          style={{
            backgroundColor: "#28A745",
            padding: 15,
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            📤 Gửi Dữ Liệu
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default scanAddIncome;
