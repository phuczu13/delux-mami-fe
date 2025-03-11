import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import SignUpScreen from "../app/(auth)/sign-up";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

// Mock Firebase Auth
jest.mock("@react-native-firebase/auth", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    createUserWithEmailAndPassword: jest.fn(),
  })),
}));

// Mock useRouter
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

// Mock Alert
jest.spyOn(Alert, "alert").mockImplementation(() => {});

describe("SignUpScreen", () => {
  let mockRouterPush: jest.Mock;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByTestId } = render(<SignUpScreen />);
    expect(getByTestId("register-title")).toBeTruthy();
    expect(getByTestId("email-input")).toBeTruthy();
    expect(getByTestId("password-input")).toBeTruthy();
    expect(getByTestId("confirm-password-input")).toBeTruthy();
    expect(getByTestId("register-button")).toBeTruthy();
  });

  it("shows an alert if fields are empty", async () => {
    const { getByTestId } = render(<SignUpScreen />);

    await act(async () => {
      fireEvent.press(getByTestId("register-button"));
    });

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Lỗi", "Vui lòng điền đầy đủ thông tin!");
    });
  });

  it("shows an alert if email is invalid", async () => {
    const { getByTestId } = render(<SignUpScreen />);
    fireEvent.changeText(getByTestId("email-input"), "invalid-email");
    fireEvent.changeText(getByTestId("password-input"), "password123");
    fireEvent.changeText(getByTestId("confirm-password-input"), "password123");

    await act(async () => {
      fireEvent.press(getByTestId("register-button"));
    });

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Lỗi", "Định dạng email không hợp lệ!");
    });
  });

  it("shows an alert if passwords do not match", async () => {
    const { getByTestId } = render(<SignUpScreen />);
    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "password123");
    fireEvent.changeText(getByTestId("confirm-password-input"), "password321");

    await act(async () => {
      fireEvent.press(getByTestId("register-button"));
    });

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Lỗi", "Mật khẩu xác nhận không khớp!");
    });
  });

  it("navigates to Sign In screen after successful registration", async () => {
    (auth().createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({});

    const { getByTestId } = render(<SignUpScreen />);
    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "password123");
    fireEvent.changeText(getByTestId("confirm-password-input"), "password123");

    await act(async () => {
      fireEvent.press(getByTestId("register-button"));
    });

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/sign-in");
    });
  });

  it("navigates to Sign In when clicking the link", () => {
    const { getByTestId } = render(<SignUpScreen />);
    fireEvent.press(getByTestId("navigate-signin"));
    expect(mockRouterPush).toHaveBeenCalledWith("/sign-in");
  });
});
