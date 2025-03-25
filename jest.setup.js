// ✅ Mock expo-font (chỉ mock 1 lần)
jest.mock("expo-font", () => ({
  loadAsync: jest.fn().mockResolvedValue(true), // Giả lập tải font thành công
  isLoaded: jest.fn().mockReturnValue(true), // Giả lập font đã tải
}));

// ✅ Mock @expo/vector-icons
jest.mock("@expo/vector-icons", () => {
  const MockIcon = (props) => null; // Tránh render lỗi
  return {
    AntDesign: MockIcon,
    FontAwesome: MockIcon,
    Ionicons: MockIcon,
  };
});

// ✅ Mock expo-router
jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn(), replace: jest.fn() })),
}));

// ✅ Mock NativeEventEmitter để tránh lỗi Firebase/React Navigation
jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter", () => {
  return jest.fn().mockImplementation(() => ({
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }));
});

// ✅ Mock react-native-date-picker
jest.mock("react-native-date-picker", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// ✅ Xử lý setImmediate để tránh lỗi Firebase
global.setImmediate = (callback, ...args) => setTimeout(callback, 0, ...args);
