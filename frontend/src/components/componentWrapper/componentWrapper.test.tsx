import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { ComponentWrapper } from "./ComponentWrapper";
import { apiProfileComplete } from "../../apis/user/user";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
}));

vi.mock("../../apis/user/user", () => ({
  apiProfileComplete: vi.fn(),
}));

vi.mock("js-cookie", () => ({
  default: {
    remove: vi.fn(),
  },
}));

const MockComponent = () => <div>Mock Component</div>;

describe("ComponentWrapper", () => {
  const navigateMock = vi.fn();
  const locationMock = { pathname: "/" };

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as vi.Mock).mockReturnValue(navigateMock);
    (useLocation as vi.Mock).mockReturnValue(locationMock);
  });

  it("should navigate to /explore if profile is complete and pathname is /", async () => {
    (apiProfileComplete as vi.Mock).mockResolvedValue({
      data: { completeProfile: true },
    });

    const WrappedComponent = ComponentWrapper(MockComponent);

    render(<WrappedComponent />);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/explore");
    });
  });

  it("should navigate to /profile if profile is not complete and pathname is /", async () => {
    (apiProfileComplete as vi.Mock).mockResolvedValue({
      data: { completeProfile: false },
    });

    const WrappedComponent = ComponentWrapper(MockComponent);

    render(<WrappedComponent />);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/profile");
    });
  });

  it("should remove auth token and navigate to / if completeProfile is undefined and pathname is /profile", async () => {
    (apiProfileComplete as vi.Mock).mockResolvedValue({
      data: { completeProfile: undefined },
    });

    locationMock.pathname = "/profile";

    const WrappedComponent = ComponentWrapper(MockComponent);

    render(<WrappedComponent />);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/");
      expect(Cookies.remove).toHaveBeenCalledWith("auth_token");
    });
  });

  it("should navigate to /profile if profile is not complete and pathname is /explore", async () => {
    (apiProfileComplete as vi.Mock).mockResolvedValue({
      data: { completeProfile: false },
    });

    locationMock.pathname = "/explore";

    const WrappedComponent = ComponentWrapper(MockComponent);

    render(<WrappedComponent />);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/profile");
    });
  });

  it("should remove auth token and navigate to / if completeProfile is undefined and pathname is /explore", async () => {
    (apiProfileComplete as vi.Mock).mockResolvedValue({
      data: { completeProfile: undefined },
    });

    locationMock.pathname = "/explore";

    const WrappedComponent = ComponentWrapper(MockComponent);

    render(<WrappedComponent />);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/");
      expect(Cookies.remove).toHaveBeenCalledWith("auth_token");
    });
  });
});
