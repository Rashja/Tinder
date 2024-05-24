import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { it, expect, describe, vi } from "vitest";
import Input from "./Input";

describe("Input rendering", () => {
  it("should render Input with properties have been passed", () => {
    render(
      <Input
        type="text"
        placeholder="User name"
        labelName="User name"
        onChange={() => {}}
      />
    );

    const input = screen.getByRole("textbox");

    expect(input).toBeInTheDocument();
    expect(input).toHaveProperty("type", "text");
    expect(input).toHaveProperty("placeholder", "User name");
  });
  it("should have label name by inout props", () => {
    render(
      <Input
        type="text"
        placeholder="User name"
        labelName="User name"
        onChange={() => {}}
      />
    );
    const label = screen.getByLabelText("User name");

    expect(label).toBeInTheDocument();
  });

  it("should onchange has the correct value", () => {
    render(
      <Input
        type="text"
        placeholder="User name"
        labelName="User name"
        onChange={(e) => {}}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "23" } });
    expect(input.value).toBe("23");
  });
});
