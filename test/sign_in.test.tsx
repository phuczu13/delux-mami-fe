import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import SignInScreen from "../app/(auth)/sign-in";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import { renderHook } from "@testing-library/react";
import { useCallback } from "react";

// Mock Firebase Auth
jest.mock("@react-native-firebase/auth", () => {
  const mockAuth = {
    signInWithEmailAndPassword: jest.fn(),
  };

  return {
    __esModule: true,
    default: jest.fn(() => mockAuth),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

// Mock Expo Router
jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

// Dữ liệu user giả dùng để kiểm thử
const user = [{
  "id": 1,
  "email": "DVT41557@gmail.com",
  "password": "Diepvanthanh1@",
},
{
  "id": 2,
  "email": "thanhciute17",
  "password": "DVT41557a@",
},
{
  "id": 3,
  "email": "phucpham21109@gmail.com",
  "password": "Nagn13@@",
},
];

describe("Login", () => {
  let setLoading: jest.Mock;
  let signIn: (email: string, password: string) => Promise<void>;

  beforeEach(() => {
    setLoading = jest.fn();

    const { result } = renderHook(() =>
      useCallback(async (inputEmail: string, inputPassword: string) => {
        if (!inputEmail.trim() || !inputPassword.trim()) {
          throw new Error("Vui lòng nhập đầy đủ email và mật khẩu!");
        }

        setLoading(true);
        try {
          await auth().signInWithEmailAndPassword(inputEmail, inputPassword);
        } catch (error: any) {
          throw new Error(error.message || "Đăng nhập thất bại!");
        } finally {
          setLoading(false);
        }
      }, [])
    );

    signIn = result.current;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Báo lỗi khi email hoặc mật khẩu trống", async () => {
    await expect(signIn("", "")).rejects.toThrow(
      "Vui lòng nhập đầy đủ email và mật khẩu!"
    );
  });

  it("Đăng nhập thành công khi kiểm tra tài khoản có tồn tại", async () => {
    const mockSignIn = auth().signInWithEmailAndPassword as jest.Mock;
    const mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  
    // Lặp qua danh sách user và kiểm tra từng tài khoản
    for (const u of user) {
      if (u.email && u.password) {
        // Giả lập Firebase trả về user ID
        mockSignIn.mockResolvedValueOnce({ user: { uid: `uid-${u.id}` } });
  
        await act(async () => {
          await signIn(u.email, u.password);
        });
  
        // Kiểm tra đăng nhập với email & password của từng user
        expect(mockSignIn).toHaveBeenCalledWith(u.email, u.password);
  
        // Kiểm tra điều hướng sau khi đăng nhập
        expect(mockRouterPush).toHaveBeenCalledWith("/(tabs)/Home");
      }
    }
  });

  it("Đăng nhập thất bại khi kiểm tra tài khoản không tồn tại", async () => {})

  it("Đăng nhập thất bại khi sai mật khẩu", async () => {
    const mockSignIn = auth().signInWithEmailAndPassword as jest.Mock;
    const mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });

    //Lặp qua danh sách user và kiểm tra từng tài khoản
    for (const u of user) {
      if (u.email && u.password) {
        // Giả lập Firebase trả về lỗi khi đăng nhập
        mockSignIn.mockRejectedValueOnce(new Error("Sai mật khẩu"));

        await expect(signIn(u.email, "wrongpassword")).rejects.toThrow(
          "Sai mật khẩu"
        );
      }
    }
  })

  it("Gọi auth.signInWithEmailAndPassword khi nhập đúng email & password", async () => {
    (auth().signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({});

    await act(async () => {
      await expect(
        signIn("diepvanthanh24@gmail.com", "Diepvanthanh1@")
      ).resolves.not.toThrow();
    });

    console.log((auth().signInWithEmailAndPassword as jest.Mock).mock.calls);
    expect(auth().signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(auth().signInWithEmailAndPassword).toHaveBeenCalledWith(
      "diepvanthanh24@gmail.com",
      "Diepvanthanh1@"
    );
    expect(setLoading).toHaveBeenCalledTimes(2);
  });

  it("Xử lý lỗi khi nhập sai email hoặc mật khẩu", async () => {
    (auth().signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(
      new Error("Sai email hoặc mật khẩu")
    );
  
    await act(async () => {
      await expect(
        signIn("wrongemail@gmail.com", "WrongPassword123")
      ).rejects.toThrow("Sai email hoặc mật khẩu");
    });
  
    expect(auth().signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(auth().signInWithEmailAndPassword).toHaveBeenCalledWith(
      "wrongemail@gmail.com",
      "WrongPassword123"
    );
    expect(setLoading).toHaveBeenCalledTimes(2);
  });

  it("Xử lý lỗi khi đăng nhập thất bại", async () => {
    (auth().signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(
      new Error("Sai mật khẩu")
    );

    await expect(signIn("test@example.com", "wrongpassword")).rejects.toThrow(
      "Sai mật khẩu"
    );
  });
});

// Mock setImmediate cho Jest khi sử dụng Alert
global.setImmediate = global.setImmediate || ((fn: (...args: any[]) => void, ...args: any[]) => setTimeout(fn, 0));

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
    expect(alertSpy).toHaveBeenCalledWith(
      "Lỗi",
      "Vui lòng nhập đầy đủ email và mật khẩu!"
    );
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
      expect(alertSpy).toHaveBeenCalledWith(
        "Thành công",
        "Đăng nhập thành công!"
      );
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
