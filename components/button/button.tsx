import React from "react";
import { TouchableOpacity, Text } from "react-native";
interface ButtonProps {
  onPress: () => {};
  title: string;
  className?: string;
}
const Button: React.FC<ButtonProps> = ({ onPress, title, className }) => {
  return (
    <TouchableOpacity
      className={`w-full bg-blue-400 rounded-2xl ${className}`}
      onPress={onPress}
    >
      <Text className="text-white font-semibold text-center p-[14px] ">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
