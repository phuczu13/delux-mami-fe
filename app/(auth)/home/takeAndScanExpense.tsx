import React, { useState } from 'react';
import { View, Button, Image, ActivityIndicator, Alert, Text, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const GOOGLE_CLOUD_VISION_API_KEY = "AIzaSyA6AjixXUNl-y2egUortvsH8H6G8w0azpg"; // 🔑 Thay bằng API Key của bạn
const BACKEND_API_URL = "https://expense-tracker-be-three.vercel.app/API/AI"; // API backend

const takeAndScanExpense = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [textResult, setTextResult] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.status !== 'granted') {
      Alert.alert('Permission required', 'Camera access is needed to take pictures.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      setImageUri(result.assets[0].uri);
      uploadImage(result.assets[0].base64);
    }
  };

  const uploadImage = async (base64: string) => {
    setLoading(true);
    setTextResult(null);
    try {
      const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_VISION_API_KEY}`,
        {
          requests: [{
            image: { content: base64 },
            features: [{ type: 'TEXT_DETECTION' }],
          }],
        }
      );

      const textAnnotations = response.data.responses[0]?.textAnnotations;
      if (textAnnotations && textAnnotations.length > 0) {
        setTextResult(textAnnotations[0].description);
      } else {
        setTextResult('Không tìm thấy văn bản nào!');
      }

      Alert.alert('Success', 'Image processed successfully! Check result below.');
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to process image.');
    } finally {
      setLoading(false);
    }
  };

  const postTransaction = async () => {
    if (!textResult) {
      Alert.alert("Lỗi", "Không có dữ liệu để gửi!");
      return;
    }

    const prompt = `Hóa đơn thanh toán: ${textResult}`;
    console.log("Prompt gửi đi:", prompt);

    try {
      const response = await axios.post(
        BACKEND_API_URL,
        { userPrompt: prompt },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      
      console.log("Response:", response.data);
      Alert.alert("Thành công", "Dữ liệu đã được gửi lên API!");
    } catch (error: any) {
      console.error("Lỗi khi gửi dữ liệu:", error.response?.data || error.message);
      Alert.alert("Lỗi", "Không thể gửi dữ liệu. Vui lòng thử lại!");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Button title="📷 Chụp Ảnh" onPress={pickImage} />

      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginTop: 10 }} />}

      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />}

      {textResult && (
        <ScrollView style={{ marginTop: 20, maxHeight: 300, width: "100%", backgroundColor: "#f0f0f0", padding: 10, borderRadius: 10 }}>
          <Text>{textResult}</Text>
        </ScrollView>
      )}

      {textResult && (
        <TouchableOpacity onPress={postTransaction} style={{ backgroundColor: "#28A745", padding: 15, borderRadius: 10, marginTop: 20 }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>📤 Gửi Dữ Liệu</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default takeAndScanExpense;
