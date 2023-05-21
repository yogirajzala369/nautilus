import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Calculator from "./Calculator";

jest.mock("react-confetti", () => () => null); // Mocking the Confetti component

describe("Calculator component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the calculator component", () => {
    render(<Calculator />);
    expect(screen.getByText("CALCULATOR")).toBeInTheDocument();
  });

  it("appends the value to the expression when clicking on number buttons", () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("6"));
    fireEvent.click(screen.getByText("9"));

    // Assert that the expression input field displays the correct value
    expect(screen.getByRole("textbox", { name: /expression/i })).toHaveValue(
      "369"
    );
  });

  it('clears the expression when clicking on the "Clear" button', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("6"));
    fireEvent.click(screen.getByText("C"));

    // Assert that the expression input field is cleared
    expect(screen.getByRole("textbox", { name: /expression/i })).toHaveValue(
      ""
    );
  });

  it('removes the last character from the expression when clicking on the "DEL" button', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("6"));
    fireEvent.click(screen.getByText("DEL"));

    // Assert that the expression input field has the correct value
    expect(screen.getByRole("textbox", { name: /expression/i })).toHaveValue(
      "3+"
    );
  });

  it('evaluates the expression when clicking on the "Calculate" button', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText("C"));
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("6"));
    fireEvent.click(screen.getByText("Calculate"));

    // Assert that the result input field displays the correct result
    expect(screen.getByRole("textbox", { name: /result/i })).toHaveValue("9");
  });
});
