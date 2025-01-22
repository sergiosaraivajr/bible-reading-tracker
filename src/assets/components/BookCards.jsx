import React from "react";

const BookCard = ({ book, progress, onInputChange }) => {
  const isCompleted = progress.chaptersRead === book.chapters;

  return (
    <div className={`book-card ${isCompleted ? "completed" : ""}`}>
      <h3>{book.name}</h3>
      <label htmlFor={`chapters-${book.name}`}>Capítulos Lidos:</label>
      <input
        id={`chapters-${book.name}`}
        type="number"
        min="0"
        max={book.chapters}
        value={progress.chaptersRead || ""}
        onChange={(e) => onInputChange(e.target.value)}
        aria-label={`Capítulos lidos de ${book.name}`}
      />
      <p>
        Progresso: {progress.chaptersRead || 0} / {book.chapters} capítulos
      </p>
    </div>
  );
};

export default BookCard;
