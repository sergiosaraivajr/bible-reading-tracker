import React, { useState, useEffect } from "react";
import BookCard from "./assets/components/BookCards";
import ProgressBar from "./assets/components/ProgressBar";

const bibleBooks = [
  { name: "Gênesis", chapters: 50 },
  { name: "Êxodo", chapters: 40 },
  { name: "Levítico", chapters: 27 },
  { name: "Números", chapters: 36 },
  { name: "Deuteronômio", chapters: 34 },
  { name: "Josué", chapters: 24 },
  { name: "Juízes", chapters: 21 },
  { name: "Rute", chapters: 4 },
  { name: "1 Samuel", chapters: 31 },
  { name: "2 Samuel", chapters: 24 },
  { name: "1 Reis", chapters: 22 },
  { name: "2 Reis", chapters: 25 },
  { name: "1 Crônicas", chapters: 29 },
  { name: "2 Crônicas", chapters: 36 },
  { name: "Esdras", chapters: 10 },
  { name: "Neemias", chapters: 13 },
  { name: "Ester", chapters: 10 },
  { name: "Jó", chapters: 42 },
  { name: "Salmos", chapters: 150 },
  { name: "Provérbios", chapters: 31 },
  { name: "Eclesiastes", chapters: 12 },
  { name: "Cânticos", chapters: 8 },
  { name: "Isaías", chapters: 66 },
  { name: "Jeremias", chapters: 52 },
  { name: "Lamentações", chapters: 5 },
  { name: "Ezequiel", chapters: 48 },
  { name: "Daniel", chapters: 12 },
  { name: "Oséias", chapters: 14 },
  { name: "Joel", chapters: 3 },
  { name: "Amós", chapters: 9 },
  { name: "Obadias", chapters: 1 },
  { name: "Jonas", chapters: 4 },
  { name: "Miquéias", chapters: 7 },
  { name: "Naum", chapters: 3 },
  { name: "Habacuque", chapters: 3 },
  { name: "Sofonias", chapters: 3 },
  { name: "Ageu", chapters: 2 },
  { name: "Zacarias", chapters: 14 },
  { name: "Malaquias", chapters: 4 },
  { name: "Mateus", chapters: 28 },
  { name: "Marcos", chapters: 16 },
  { name: "Lucas", chapters: 24 },
  { name: "João", chapters: 21 },
  { name: "Atos", chapters: 28 },
  { name: "Romanos", chapters: 16 },
  { name: "1 Coríntios", chapters: 16 },
  { name: "2 Coríntios", chapters: 13 },
  { name: "Gálatas", chapters: 6 },
  { name: "Efésios", chapters: 6 },
  { name: "Filipenses", chapters: 4 },
  { name: "Colossenses", chapters: 4 },
  { name: "1 Tessalonicenses", chapters: 5 },
  { name: "2 Tessalonicenses", chapters: 3 },
  { name: "1 Timóteo", chapters: 6 },
  { name: "2 Timóteo", chapters: 4 },
  { name: "Tito", chapters: 3 },
  { name: "Filemom", chapters: 1 },
  { name: "Hebreus", chapters: 13 },
  { name: "Tiago", chapters: 5 },
  { name: "1 Pedro", chapters: 5 },
  { name: "2 Pedro", chapters: 3 },
  { name: "1 João", chapters: 5 },
  { name: "2 João", chapters: 1 },
  { name: "3 João", chapters: 1 },
  { name: "Judas", chapters: 1 },
  { name: "Apocalipse", chapters: 22 },
];

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

  useEffect(() => {
    localStorage.setItem("bibleReadingProgress", JSON.stringify(progress));
  }, [progress]);

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
