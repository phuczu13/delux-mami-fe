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
  let mockCreateUser: jest.Mock;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    mockCreateUser = jest.fn();
    
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (auth as jest.Mock).mockReturnValue({
      createUserWithEmailAndPassword: mockCreateUser,
    });

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
    fireEvent.changeText(getByTestId("password-input"), "Password@123");
    fireEvent.changeText(getByTestId("confirm-password-input"), "Password@123");

    await act(async () => {
      fireEvent.press(getByTestId("register-button"));
    });

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Lỗi", "Định dạng email không hợp lệ!");
    });
  });

  it("shows an alert if password is too weak", async () => {
    const { getByTestId } = render(<SignUpScreen />);
    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "123456");
    fireEvent.changeText(getByTestId("confirm-password-input"), "123456");

    await act(async () => {
      fireEvent.press(getByTestId("register-button"));
    });

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Lỗi",
        "Mật khẩu phải có ít nhất 6 ký tự, bao gồm ít nhất một chữ cái in hoa, một chữ số và một ký tự đặc biệt!"
      );
    });
  });

  it("shows an alert if passwords do not match", async () => {
    const { getByTestId } = render(<SignUpScreen />);
    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "Password@123");
    fireEvent.changeText(getByTestId("confirm-password-input"), "Password@321");

    await act(async () => {
      fireEvent.press(getByTestId("register-button"));
    });

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Lỗi", "Mật khẩu xác nhận không khớp!");
    });
  });

  it("navigates to Sign In screen after successful registration", async () => {
    mockCreateUser.mockResolvedValueOnce({});
    
    const { getByTestId } = render(<SignUpScreen />);
    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "Password@123");
    fireEvent.changeText(getByTestId("confirm-password-input"), "Password@123");

    await act(async () => {
      fireEvent.press(getByTestId("register-button"));
    });

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Thành công", "Vui lòng kiểm tra email để xác nhận tài khoản!");
      expect(mockRouterPush).toHaveBeenCalledWith("/sign-in");
    });
  });

  it("shows an alert on registration failure", async () => {
    mockCreateUser.mockRejectedValueOnce(new Error("Đăng ký thất bại!"));

    const { getByTestId } = render(<SignUpScreen />);
    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "Password@123");
    fireEvent.changeText(getByTestId("confirm-password-input"), "Password@123");

    await act(async () => {
      fireEvent.press(getByTestId("register-button"));
    });

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Lỗi", "Đăng ký thất bại!");
    });
  });

  it("disables button and shows loader during signup", async () => {
    mockCreateUser.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 2000)) // Giả lập đăng ký mất 2s
    );

    const { getByTestId, queryByTestId } = render(<SignUpScreen />);
    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "Password@123");
    fireEvent.changeText(getByTestId("confirm-password-input"), "Password@123");

    await act(async () => {
      fireEvent.press(getByTestId("register-button"));
    });

    expect(getByTestId("register-button")).toBeDisabled();
    expect(queryByTestId("loading-indicator")).toBeTruthy();

    await waitFor(() => {
      expect(getByTestId("register-button")).not.toBeDisabled();
    });
  });

  it("navigates to Sign In when clicking the link", () => {
    const { getByTestId } = render(<SignUpScreen />);
    fireEvent.press(getByTestId("navigate-signin"));
    expect(mockRouterPush).toHaveBeenCalledWith("/sign-in");
  });

  it("accepts user input correctly", () => {
    const { getByTestId } = render(<SignUpScreen />);
    
    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "Password@123");
    fireEvent.changeText(getByTestId("confirm-password-input"), "Password@123");

    expect(getByTestId("email-input").props.value).toBe("test@example.com");
    expect(getByTestId("password-input").props.value).toBe("Password@123");
    expect(getByTestId("confirm-password-input").props.value).toBe("Password@123");
  });
});
