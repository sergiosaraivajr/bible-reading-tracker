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

  //salvar progresso no server
  const sendProgressToServer = async () => {
    const userName = prompt("Digite seu nome para salvar o progresso:"); // Solicita o nome do usuário
    if (!userName) return;

    const progressData = {
      userId: "unique-user-id", // Você pode gerar um ID único para cada usuário
      userName,
      totalChaptersRead,
      totalChapters,
      percentageRead,
    };

    try {
      const response = await fetch("http://localhost:5000/api/progress/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(progressData),
      });

      if (response.ok) {
        alert("Progresso salvo com sucesso!");
      } else {
        alert("Erro ao salvar o progresso.");
      }
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao conectar ao servidor.");
    }
  };

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
      <div className="buttons-container">
        <button className="reset-button" onClick={resetProgress}>
          Reiniciar Progresso
        </button>
        <button className="save-button" onClick={sendProgressToServer}>
          Salvar Progresso
        </button>
      </div>
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
