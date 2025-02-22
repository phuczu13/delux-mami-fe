import React from "react";
import { render ,fireEvent} from "@testing-library/react-native";
import HomeScreen from "../app/(tabs)/Home";
import { useRouter } from "expo-router";

// Kiểm tra xem HomeScreen có render đúng không
test("Renders HomeScreen correctly", () => {
  const { getByText } = render(<HomeScreen />);
  
  expect(getByText("Account Balance")).toBeTruthy();
  expect(getByText("$8386")).toBeTruthy();
  expect(getByText("Recent Transaction")).toBeTruthy();
});

// // Kiểm tra xem HomeScreen có hiển thị các giao dịch gần đây không
// test("Displays recent transactions", () => {
//     const { getByText } = render(<HomeScreen />);
  
//     expect(getByText("Shopping")).toBeTruthy();
//     expect(getByText("Food")).toBeTruthy();
// //     expect(getByText("Salary")).toBeTruthy();
// //   });

// // Kiểm tra xem modal có mở và đóng được không
//   test("Opens and closes modal when clicking + button", () => {
//     const { getByTestId, getByText, queryByText } = render(<HomeScreen />);
    
//     // Kiểm tra modal ban đầu chưa hiển thị
//     expect(queryByText("Category")).toBeNull();
  
//     // Bấm nút mở modal
//     fireEvent.press(getByTestId("open-modal"));
  
//     // Kiểm tra modal xuất hiện
//     expect(getByText("Category")).toBeTruthy();
    
//     // Bấm nút Cancel để đóng modal
//     fireEvent.press(getByText("Cancel"));
  
//     // Kiểm tra modal đã đóng
//     expect(queryByText("Category")).toBeNull();
//   });

//   // Kiểm tra xem khi click vào ảnh đại diện có chuyển hướng đến Profile screen không

//   jest.mock("expo-router", () => ({
//     useRouter: jest.fn(() => ({
//       push: jest.fn(),
//     })),
//   }));
  
//   test("Navigates to Profile screen when clicking profile image", () => {
//     const router = useRouter();
//     const { getByTestId } = render(<HomeScreen />);
    
//     fireEvent.press(getByTestId("profile-button"));
  
//     expect(router.push).toHaveBeenCalledWith("/(tabs)/Profile");
//   });