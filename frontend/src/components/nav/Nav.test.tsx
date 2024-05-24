import { render, screen } from "@testing-library/react";
import Nav from "./Nav";
import "@testing-library/jest-dom/vitest";
import { it, expect, describe, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Rendering Nav component", () => {
  it("should render button with text 'Log in' when user has not logged in", () => {
    render(<Nav isLoggedIn={false} />);
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent(/Log in/);
  });

  it("should render button with text 'Log out' when user has logged in", () => {
    render(<Nav isLoggedIn={true} />);
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent(/Log out/);
  });

  it("button clicked the navAction must be trigger", async () => {
    const mockNavAction = vi.fn();
    render(<Nav isLoggedIn={true} navAction={mockNavAction} />);
    const btn = screen.getByRole("button");

    const user = userEvent.setup();
    await user.click(btn);
    expect(mockNavAction).toHaveBeenCalled();
  });
});
