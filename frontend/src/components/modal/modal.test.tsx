import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Modal from "./Modal";

let setShowModal = vi.fn();

describe("Modal", () => {
  it("should render modal correctly", () => {
    render(
      <Modal
        showModal={true}
        setShowModal={setShowModal}
        children={<p>modal body</p>}
      />
    );
    const dialog = screen.getByRole("dialog");
    const modalBody = screen.getByText(/modal body/);
    const overlay = screen.getByTestId("overlay");

    expect(dialog).toBeInTheDocument();
    expect(modalBody).toBeInTheDocument();
    expect(overlay).toBeInTheDocument();
  });
  it("check the functionality of Modal", () => {
    render(
      <Modal
        showModal={true}
        setShowModal={setShowModal}
        children={<p>modal body</p>}
      />
    );
    const span = screen.getByText("X");
    const overlay = screen.getByTestId("overlay");

    expect(span).toBeInTheDocument();

    fireEvent.click(span);
    expect(setShowModal).toHaveBeenCalledWith(false);
    fireEvent.click(overlay);

    expect(setShowModal).toHaveBeenCalledWith(false);
  });
});
