import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import SignInScreen from "../app/(auth)/sign-in";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

// Mock Firebase Auth
jest.mock("@react-native-firebase/auth", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    signInWithEmailAndPassword: jest.fn(),
  })),
}));

// Mock Expo Router
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("SignInScreen", () => {
  let mockRouterPush: jest.Mock;
  let mockSignIn: jest.Mock;
  let alertSpy: jest.SpyInstance;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    mockSignIn = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (auth as unknown as jest.Mock).mockReturnValue({
      signInWithEmailAndPassword: mockSignIn,
    });

    alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByTestId } = render(<SignInScreen />);

    expect(getByTestId("login-title")).toBeTruthy();
    expect(getByTestId("email-input")).toBeTruthy();
    expect(getByTestId("password-input")).toBeTruthy();
    expect(getByTestId("login-button")).toBeTruthy();
    expect(getByTestId("signup-button")).toBeTruthy();
  });

  it("displays an error alert if email or password is empty", () => {
    const { getByTestId } = render(<SignInScreen />);
    
    fireEvent.press(getByTestId("login-button"));

    expect(mockSignIn).not.toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith("Lỗi", "Vui lòng nhập đầy đủ email và mật khẩu!");
  });

  it("calls Firebase sign-in when valid credentials are entered", async () => {
    const { getByTestId } = render(<SignInScreen />);

    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "password123");

    fireEvent.press(getByTestId("login-button"));

    expect(mockSignIn).toHaveBeenCalledWith("test@example.com", "password123");
  });

  it("shows error alert when Firebase sign-in fails", async () => {
    mockSignIn.mockRejectedValueOnce(new Error("Đăng nhập thất bại"));

    const { getByTestId } = render(<SignInScreen />);
    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "wrongpassword");

    await act(async () => {
      fireEvent.press(getByTestId("login-button"));
    });

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("Lỗi", "Đăng nhập thất bại");
    });
  });

  it("navigates to Home screen after successful login", async () => {
    mockSignIn.mockResolvedValueOnce({});

    const { getByTestId } = render(<SignInScreen />);
    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "password123");

    await act(async () => {
      fireEvent.press(getByTestId("login-button"));
    });

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/(tabs)/Home");
      expect(alertSpy).toHaveBeenCalledWith("Thành công", "Đăng nhập thành công!");
    });
  });

  it("shows loading indicator while signing in", async () => {
    mockSignIn.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000)) // Giả lập delay
    );

    const { getByTestId } = render(<SignInScreen />);
    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "password123");

    fireEvent.press(getByTestId("login-button"));

    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  it("hides loading indicator after login failure", async () => {
    mockSignIn.mockRejectedValueOnce(new Error("Lỗi đăng nhập"));

    const { getByTestId, queryByTestId } = render(<SignInScreen />);
    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "password123");

    await act(async () => {
      fireEvent.press(getByTestId("login-button"));
    });

    await waitFor(() => {
      expect(queryByTestId("loading-indicator")).toBeNull();
    });
  });

  it("navigates to Sign-Up screen when 'Are you a new user?' is pressed", () => {
    const { getByTestId } = render(<SignInScreen />);

    fireEvent.press(getByTestId("signup-button"));

    expect(mockRouterPush).toHaveBeenCalledWith("/sign-up");
  });
});
