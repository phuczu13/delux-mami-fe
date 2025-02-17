import React from "react";
import { TextInput, View, Image, Text } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { KeyboardType } from "react-native";
interface InputProps {
  placeholder: string;
  keyboardType?: KeyboardType;
  onChangeText: (value: string) => void;
  className?: string;
  value: string;
  title?: string;
  iconName?: string;
}
const Input: React.FC<InputProps> = ({
  placeholder,
  keyboardType,
  onChangeText,
  value,
  title,
  className,
  iconName,
}) => {
  return (
    <View>
      <Text>{title}</Text>
      <View className="w-full border-[2px] pl-2 border-gray-200 flex-row items-center rounded-2xl h-12">
        {iconName && <Feather name={iconName} size={25} color="gray" />}
        <TextInput
          className={`w-full pl-2 focus:outline-none text-gray-400 ${className}`}
          onChangeText={(newText) => {
            onChangeText(newText);
          }}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};

export default Input;
