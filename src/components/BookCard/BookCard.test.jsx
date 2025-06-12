import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import BookCard from "./BookCard";

const book = {
    id: 1,
    title: "Book",
    author: "Author",
    year: 2024,
    status: "pending",
};

test("calls edit and delete when buttons are clicked", () => {
    // Arrange
    let editClicked = false;
    let deleteClicked = false;
    const handleEdit = () => {
        editClicked = true;
    };
    const handleDelete = () => {
        deleteClicked = true;
    };

    // Act
    const { getByText } = render(
        <BookCard book={book} onEdit={handleEdit} onDelete={handleDelete} />,
    );
    getByText(/edit/i).click();
    getByText(/delete/i).click();

    // Assert
    expect(editClicked).toBe(true);
    expect(deleteClicked).toBe(true);
});
