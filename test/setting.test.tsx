import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SettingsScreen from "../app/(auth)/settings";
import { useRouter } from "expo-router";

// Mock useRouter
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("SettingsScreen", () => {
  let mockRouterPush: jest.Mock;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  it("renders correctly", () => {
    const { getByTestId, getByText } = render(<SettingsScreen />);

    expect(getByTestId("settings-screen")).toBeTruthy();
    expect(getByTestId("back-button")).toBeTruthy();
    expect(getByTestId("save-button")).toBeTruthy();

    // Kiểm tra nội dung tiêu đề và nút
    expect(getByText("Setting Screen")).toBeTruthy();
    expect(getByText("Save")).toBeTruthy();
  });

  it("navigates to Profile screen when Back button is pressed", () => {
    const { getByTestId } = render(<SettingsScreen />);
    
    fireEvent.press(getByTestId("back-button"));

    expect(mockRouterPush).toHaveBeenCalledTimes(1);
    expect(mockRouterPush).toHaveBeenCalledWith("/Profile");
  });

  it("handles save button press correctly", () => {
    const { getByTestId } = render(<SettingsScreen />);

    fireEvent.press(getByTestId("save-button"));

    // Kiểm tra nếu có logic xử lý khi nhấn nút Save
    // Nếu nút Save có thực hiện điều gì đó, hãy mock và kiểm tra nó
    // Ví dụ: expect(mockFunction).toHaveBeenCalled();
  });
});
