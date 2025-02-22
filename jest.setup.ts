import React, { Component, ReactNode } from 'react';
jest.mock("expo-font", () => ({
    useFonts: () => [true, jest.fn()],
  }));


jest.mock('@expo/vector-icons', () => {
    return {
      FontAwesome: 'FontAwesome',  // Mock FontAwesome
      MaterialIcons: 'MaterialIcons',  // Mock MaterialIcons
      Octicons: 'Octicons',  // Mock Octicons
      Ionicons: 'Ionicons',  // Mock Ionicons nếu sử dụng
    };
  });

  jest.mock('react-native', () => {
    const RN = jest.requireActual('react-native');
    RN.View = jest.fn().mockImplementation(({ children }) => children);
    RN.ScrollView = jest.fn().mockImplementation(({ children }) => children);
    RN.TouchableOpacity = jest.fn().mockImplementation(({ children }) => children);
    return RN;
  });
  
  