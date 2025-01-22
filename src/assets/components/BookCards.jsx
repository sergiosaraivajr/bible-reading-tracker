import React from "react";

const BookCard = ({ book, progress, onInputChange }) => {
  const isCompleted = progress.chaptersRead === book.chapters;

  const handleIncrement = () => {
    const newValue = Math.min(progress.chaptersRead + 1, book.chapters);
    onInputChange(newValue);
  };

  return (
    <div className={`book-card ${isCompleted ? "completed" : ""}`}>
      <h3>{book.name}</h3>
      <label htmlFor={`chapters-${book.name}`}>Capítulos Lidos:</label>
      <div className="input-container">
        <input
          id={`chapters-${book.name}`}
          type="number"
          min="0"
          max={book.chapters}
          value={progress.chaptersRead || ""}
          onChange={(e) => onInputChange(parseInt(e.target.value, 10))}
          aria-label={`Capítulos lidos de ${book.name}`}
        />
        <button
          className="increment-button"
          onClick={handleIncrement}
          aria-label={`Adicionar +1 capítulo a ${book.name}`}
        >
          +1
        </button>
      </div>
      <p>
        Progresso: {progress.chaptersRead || 0} / {book.chapters} capítulos
      </p>
    </div>
  );
};

export default BookCard;
