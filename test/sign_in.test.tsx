import React from "react";
import { render, fireEvent,waitFor,act } from "@testing-library/react-native";
import SignInScreen from "../app/(auth)/sign-in"; 
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";

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

  beforeEach(() => {
    mockRouterPush = jest.fn();
    mockSignIn = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (auth as unknown as jest.Mock).mockReturnValue({
      signInWithEmailAndPassword: mockSignIn,
    });
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
  });

  it("calls Firebase sign-in when valid credentials are entered", async () => {
    const { getByTestId } = render(<SignInScreen />);

    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "password123");

    fireEvent.press(getByTestId("login-button"));

    expect(mockSignIn).toHaveBeenCalledWith("test@example.com", "password123");
  });

  it("navigates to Home screen after successful login", async () => {
    mockSignIn.mockResolvedValueOnce({}); // Giả lập đăng nhập thành công
  
    const { getByTestId } = render(<SignInScreen />);
    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "password123");
  
    await act(async () => {
      fireEvent.press(getByTestId("login-button"));
    });
  
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/(tabs)/Home");
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
});
