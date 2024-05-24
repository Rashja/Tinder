// SignIn.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import SignIn from "./SignIn";
import { apiLogIn } from "../../apis/auth/auth";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// Mocking the navigate function
const mockedNavigate = vi.fn();

// Mocking the useNavigate hook
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

vi.mock("js-cookie", () => {
  return {
    __esModule: true,
    default: {
      set: vi.fn(),
    },
  };
});
vi.mock("../../apis/auth/auth", () => ({
  apiLogIn: vi.fn(),
}));

// Mocking toast to capture error messages
vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe("Sign In", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render correctly", () => {
    render(<SignIn />);
    const header = screen.getByRole("heading");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(/Welcome To Tinder/);
  });

  it("should render Form", async () => {
    render(<SignIn />);
    const form = screen.getByRole("form");
    const userNameInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    expect(form).toBeInTheDocument();
    expect(userNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("should log in the user and navigate to the profile page on successful submit", async () => {
    // Mocking the API response
    const mockApiResponse = { token: "fake_token" };
    apiLogIn.mockResolvedValue({ data: mockApiResponse });

    render(<SignIn />);

    // Fill out the form
    const email = "test@example.com";
    const password = "password";
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: email },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: password },
    });

    // Click the submit button
    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

    // Wait for the API call and navigation
    await waitFor(() => {
      expect(apiLogIn).toHaveBeenCalledWith(email, password);
      expect(Cookies.set).toHaveBeenCalledWith(
        "auth_token",
        mockApiResponse.token
      );
      expect(mockedNavigate).toHaveBeenCalledWith("/profile");
    });
  });

  it("should display an error message on 404 error", async () => {
    // Mocking the API response for 404 error
    const mockError = { error: "User not found" };
    (apiLogIn as vi.Mock).mockResolvedValue(mockError);

    render(<SignIn />);

    // Fill out the form
    const email = "test@example.com";
    const password = "wrongpassword";
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: email },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: password },
    });

    // Click the submit button
    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

    // Wait for the API call and error handling
    await waitFor(() => {
      expect(apiLogIn).toHaveBeenCalledWith(email, password);
      expect(toast.error).toHaveBeenCalledWith("User not found", {
        position: "bottom-right",
      });
    });
  });
});
