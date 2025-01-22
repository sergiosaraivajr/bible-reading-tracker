import React from "react";

const ProgressBar = ({ totalChaptersRead, totalChapters }) => {
  const percentageRead = ((totalChaptersRead / totalChapters) * 100).toFixed(2);

  return (
    <div className="progress-bar">
      <div
        className="progress-bar__fill"
        style={{ width: `${percentageRead}%` }}
        aria-label={`Progresso total: ${percentageRead}%`}
      ></div>
      <p className="progress-bar__text">
        Progresso Total: {totalChaptersRead} / {totalChapters} capítulos (
        {percentageRead}%)
      </p>
    </div>
  );
};

export default ProgressBar;
