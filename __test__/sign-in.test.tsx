import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import SignInScreen from "../app/(auth)/sign-in";
import { firebase } from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";

// Mocking auth và useRouter
jest.mock("@react-native-firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("SignInScreen", () => {
  let mockRouter: { push: jest.Mock };

  beforeEach(() => {
    mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });
 it("hiển thị giao diện đúng", () => {
    const { getByPlaceholderText, getByRole } = render(<SignInScreen />);
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByRole("button", { name: /login/i })).toBeTruthy();
  });

  it("hiển thị cảnh báo khi email hoặc mật khẩu trống", async () => {
    const { getByRole } = render(<SignInScreen />);

    jest.spyOn(Alert, "alert").mockImplementation(() => {});

    await act(async () => {
        fireEvent.press(getByRole("button", { name: /login/i }));
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      "Lỗi",
      "Vui lòng nhập đầy đủ email và mật khẩu!"
    );
  });

});