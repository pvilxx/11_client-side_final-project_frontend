import { test, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import BookForm from "./BookForm";

test("calls onSubmit when form is submitted", () => {
    // Arrange
    let submitted = false;
    const onSubmit = () => {
        submitted = true;
    };
    const { getByPlaceholderText, getByRole } = render(
        <BookForm addBook={onSubmit} show={true} />,
    );

    // Act
    fireEvent.change(getByPlaceholderText(/title/i), { target: { value: "Libro" } });
    fireEvent.change(getByPlaceholderText(/author/i), { target: { value: "Autor" } });
    fireEvent.change(getByPlaceholderText(/year/i), { target: { value: "2024" } });
    fireEvent.click(getByRole("button", { name: /add/i }));

    // Assert
    expect(submitted).toBe(true);
});
