import React, { useState, useEffect } from "react";
import BookCard from "./assets/components/BookCards";
import ProgressBar from "./assets/components/ProgressBar";
import bibleBooks from "./data/bibleBooks";
import debounce from "./utils/debounce";

const BibleReadingTracker = () => {
  const totalChapters = bibleBooks.reduce(
    (sum, book) => sum + book.chapters,
    0
  );

  const [progress, setProgress] = useState(() => {
    const savedProgress = localStorage.getItem("bibleReadingProgress");
    return savedProgress
      ? JSON.parse(savedProgress)
      : bibleBooks.map((book) => ({ name: book.name, chaptersRead: 0 }));
  });

  // Função para salvar o progresso no localStorage
  const saveProgress = () => {
    localStorage.setItem("bibleReadingProgress", JSON.stringify(progress));
  };

  // Debounce da função saveProgress com um delay de 500ms
  const debouncedSaveProgress = debounce(saveProgress, 500);

  // Efeito que executa o debouncedSaveProgress sempre que o progresso mudar
  useEffect(() => {
    debouncedSaveProgress();
  }, [progress, debouncedSaveProgress]);

  const handleInputChange = (index, value) => {
    const updatedProgress = [...progress];
    const chaptersRead = Math.max(
      0,
      Math.min(parseInt(value || 0, 10), bibleBooks[index].chapters)
    );
    updatedProgress[index] = { ...updatedProgress[index], chaptersRead };
    setProgress(updatedProgress);
  };

  const resetProgress = () => {
    if (window.confirm("Você tem certeza que deseja reiniciar o progresso?")) {
      const resetData = bibleBooks.map((book) => ({
        name: book.name,
        chaptersRead: 0,
      }));
      setProgress(resetData);
    }
  };

  const totalChaptersRead = progress.reduce(
    (sum, book) => sum + book.chaptersRead,
    0
  );

  const percentageRead = ((totalChaptersRead / totalChapters) * 100).toFixed(2);

  return (
    <div className="tracker">
      <h1>Progresso da Leitura Bíblica</h1>
      <ProgressBar
        totalChaptersRead={totalChaptersRead}
        totalChapters={totalChapters}
      />
      <h4>
        Total do Progresso: {totalChaptersRead} / {totalChapters} capítulos (
        {percentageRead}%)
      </h4>
      <button className="reset-button" onClick={resetProgress}>
        Reiniciar Progresso
      </button>
      <div className="books-container">
        {bibleBooks.map((book, index) => (
          <BookCard
            key={book.name}
            book={book}
            progress={progress[index]}
            onInputChange={(value) => handleInputChange(index, value)}
          />
        ))}
      </div>
    </div>
  );
};

export default BibleReadingTracker;
