import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SettingsScreen from "../app/(auth)/settings";
import { useRouter } from "expo-router";

// Mock `expo-router`
jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

// Mock `@expo/vector-icons`
jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
}));

describe("SettingsScreen", () => {
  let routerMock: any;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    routerMock = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(routerMock);

    // Mock console.log để kiểm tra khi nhấn Save
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("renders correctly", () => {
    const { getByTestId, getByText } = render(<SettingsScreen />);
    
    expect(getByTestId("settings-title")).toBeTruthy();
    expect(getByTestId("back-button")).toBeTruthy();
    expect(getByTestId("save-button")).toBeTruthy();

    // Kiểm tra nội dung tiêu đề
    });

  it("navigates back when back button is pressed", () => {
    const { getByTestId } = render(<SettingsScreen />);
    fireEvent.press(getByTestId("back-button"));
    expect(routerMock.push).toHaveBeenCalledWith("/Profile");
  });

  it("triggers save button action", () => {
    const { getByTestId } = render(<SettingsScreen />);
    fireEvent.press(getByTestId("save-button"));
    expect(consoleSpy).toHaveBeenCalledWith("Save button pressed");
  });

  it("does not crash if useRouter is not available", () => {
    (useRouter as jest.Mock).mockReturnValue(undefined);
    expect(() => render(<SettingsScreen />)).not.toThrow();
  });
});
