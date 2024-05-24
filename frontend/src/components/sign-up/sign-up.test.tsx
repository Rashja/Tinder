// SignIn.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import SignUp from "./SignUp";
import { apiRegister } from "../../apis/auth/auth";
import { toast } from "react-toastify";

// Mock the apiRegister function
vi.mock("../../apis/auth/auth", () => ({
  apiRegister: vi.fn(),
}));
// Mocking toast to capture error messages
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("Sign Up", () => {
  beforeEach(() => {
    render(<SignUp closeModal={() => {}} />);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render header correctly", () => {
    const header = screen.getByRole("heading");

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(/Welcome To Tinder/);
  });
  it("should render form for sign up correctly", () => {
    const form = screen.getByRole("form");
    const email = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");
    const confirmPassword = screen.getByPlaceholderText("Confirm Password");

    expect(form).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
  });
  it("should match for password ", () => {
    const form = screen.getByRole("form");
    const email = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");
    const confirmPassword = screen.getByPlaceholderText("Confirm Password");

    fireEvent.change(email, {
      target: { value: "email@gamil.com" },
    });
    fireEvent.change(password, { target: { value: "password" } });
    fireEvent.change(confirmPassword, { target: { value: "unMatchPassword" } });
    fireEvent.submit(form);
    expect(toast.error).toHaveBeenCalledWith(
      "password and confirm password does not match",
      {
        position: "bottom-right",
      }
    );
  });
  it("should password is valid ", () => {
    const form = screen.getByRole("form");
    const email = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");
    const confirmPassword = screen.getByPlaceholderText("Confirm Password");

    fireEvent.change(email, {
      target: { value: "email@gamil.com" },
    });
    fireEvent.change(password, { target: { value: "password" } });
    fireEvent.change(confirmPassword, { target: { value: "password" } });
    fireEvent.submit(form);
    expect(toast.error).toHaveBeenCalledWith(
      "Password must be at least 6 characters long, one uppercase letter, one lowercase letter, one number",
      {
        position: "bottom-right",
      }
    );
  });
  it("should sign up with correct criteria ", async () => {
    (apiRegister as vi.Mock).mockResolvedValue({ data: "success" });
    const form = screen.getByRole("form");
    const email = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");
    const confirmPassword = screen.getByPlaceholderText("Confirm Password");

    fireEvent.change(email, {
      target: { value: "email@gamil.com" },
    });
    fireEvent.change(password, { target: { value: "<Password12345" } });
    fireEvent.change(confirmPassword, { target: { value: "<Password12345" } });
    fireEvent.submit(form);
    await waitFor(() => {
      expect(apiRegister).toHaveBeenCalledWith(
        "email@gamil.com",
        "<Password12345"
      );
      expect(toast.success).toHaveBeenCalledWith("Congrats, please log in", {
        position: "bottom-right",
      });
    });
  });
});
