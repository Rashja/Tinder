import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { it, expect, describe, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
  it("should render button by Name", () => {
    render(<Button name="click" />);
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent(/click/);
  });

  it("should render button by correct type", () => {
    const handleClick = vi.fn();
    render(<Button name="click" type="submit" onClick={handleClick} />);
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveProperty("type", "submit");
  });

  it("should button clicked by function property", async () => {
    const handleClick = vi.fn();
    render(<Button name="click" onClick={handleClick} />);
    const btn = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(btn);

    expect(handleClick).toBeCalled();
  });
});
