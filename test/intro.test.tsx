import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import IntroScreen from "../app/(auth)/intro"; // Cập nhật đường dẫn đúng
import { useRouter } from "expo-router";

// Mock useRouter
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("IntroScreen", () => {
  let mockRouterPush: jest.Mock;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  it("renders correctly", () => {
    const { getByTestId } = render(<IntroScreen />);
    expect(getByTestId("intro-screen")).toBeTruthy();
    expect(getByTestId("welcome-text").children[0]).toBe("Welcome to Delux");
    expect(getByTestId("slogan-text").children[0]).toBe("Luxurious - Premium - Opulent");
    expect(getByTestId("intro-image")).toBeTruthy();
    expect(getByTestId("start-button")).toBeTruthy();
  });

  it("navigates to Sign In screen when Start now button is pressed", () => {
    const { getByTestId } = render(<IntroScreen />);
    fireEvent.press(getByTestId("start-button"));
    expect(mockRouterPush).toHaveBeenCalledWith("/sign-in");
  });
});
