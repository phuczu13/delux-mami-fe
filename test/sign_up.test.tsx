import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import SignUpScreen from "../app/(auth)/sign-up";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { renderHook } from "@testing-library/react";

// Mock Firebase Auth
jest.mock("@react-native-firebase/auth", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    createUserWithEmailAndPassword: jest.fn().mockResolvedValue({}),
  })),
}));

// Mock useRouter
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

// Mock Alert
jest.spyOn(Alert, "alert").mockImplementation(() => {});
describe("Sign Up", () => {
  let mockRouterPush: jest.Mock;
  let mockCreateUser: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks(); // Reset tất cả mock trước mỗi test
    mockRouterPush = jest.fn();
    mockCreateUser = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (auth as unknown as jest.Mock).mockReturnValue({
      createUserWithEmailAndPassword: mockCreateUser,
    });
  });

  it("Báo lỗi khi thiếu thông tin", () => {
    const { getByTestId } = render(<SignUpScreen />);

    fireEvent.press(getByTestId("register-button"));

    expect(Alert.alert).toHaveBeenCalledWith("Lỗi", "Vui lòng điền đầy đủ thông tin!");
  });

  it("Báo lỗi khi email không hợp lệ", () => {
    const { getByTestId } = render(<SignUpScreen />);

    fireEvent.changeText(getByTestId("email-input"), "invalid-email");
    fireEvent.changeText(getByTestId("password-input"), "Password@123");
    fireEvent.changeText(getByTestId("confirm-password-input"), "Password@123");

    fireEvent.press(getByTestId("register-button"));

    expect(Alert.alert).toHaveBeenCalledWith("Lỗi", "Định dạng email không hợp lệ!");
  });

  it("Báo lỗi khi mật khẩu không đủ mạnh", () => {
    const { getByTestId } = render(<SignUpScreen />);

    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "123456");
    fireEvent.changeText(getByTestId("confirm-password-input"), "123456");

    fireEvent.press(getByTestId("register-button"));

    expect(Alert.alert).toHaveBeenCalledWith(
      "Lỗi",
      "Mật khẩu phải có ít nhất 6 ký tự, bao gồm ít nhất một chữ cái in hoa, một chữ số và một ký tự đặc biệt!"
    );
  });

  it("Báo lỗi khi mật khẩu xác nhận không khớp", () => {
    const { getByTestId } = render(<SignUpScreen />);

    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "Password@123");
    fireEvent.changeText(getByTestId("confirm-password-input"), "Password@456");

    fireEvent.press(getByTestId("register-button"));

    expect(Alert.alert).toHaveBeenCalledWith("Lỗi", "Mật khẩu xác nhận không khớp!");
  });

  it("Gọi Firebase khi đăng ký hợp lệ", async () => {
    mockCreateUser.mockResolvedValueOnce({});

    const { getByTestId } = render(<SignUpScreen />);

    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "Password@123");
    fireEvent.changeText(getByTestId("confirm-password-input"), "Password@123");

    fireEvent.press(getByTestId("register-button"));

    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledWith("test@example.com", "Password@123");
    }, { timeout: 3000 });

    expect(Alert.alert).toHaveBeenCalledWith("Thành công", "Vui lòng kiểm tra email để xác nhận tài khoản!");
    expect(mockRouterPush).toHaveBeenCalledWith("/sign-in");
  });

  it("Báo lỗi khi Firebase trả về lỗi", async () => {
    mockCreateUser.mockRejectedValueOnce(new Error("Lỗi Firebase!"));

    const { getByTestId } = render(<SignUpScreen />);

    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "Password@123");
    fireEvent.changeText(getByTestId("confirm-password-input"), "Password@123");

    fireEvent.press(getByTestId("register-button"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Lỗi", "Lỗi Firebase!");
    }, { timeout: 3000 });
  });
});

describe("SignUpScreen", () => {
  let mockRouterPush: jest.Mock;
  let mockCreateUser: jest.Mock;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    mockCreateUser = jest.fn();
    
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (auth as unknown as jest.Mock).mockReturnValue({
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
