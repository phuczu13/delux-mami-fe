  jest.mock("expo-font", () => ({
    loadAsync: jest.fn(),
  }));
  jest.mock('@expo/vector-icons', () => {
      const MockAntDesign = () => null; // Trả về null để tránh render
      MockAntDesign.displayName = 'AntDesign';
      return {
        AntDesign: MockAntDesign,
        loadFont: jest.fn(), // Mock phương thức tải font
        getImageSource: jest.fn(), // Mock phương thức khác nếu cần
     };
    });
    
    // Mock expo-font để ngăn tải font
    jest.mock('expo-font', () => ({
      loadAsync: jest.fn().mockResolvedValue(true), // Giả lập tải font thành công
      isLoaded: jest.fn().mockReturnValue(true), // Giả lập font đã tải
    }));

  module.exports = {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  };
  