import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/progress/ranking"
        );
        const data = await response.json();
        setRanking(data);
      } catch (err) {
        console.error("Erro ao buscar o ranking:", err);
      }
    };

    fetchRanking();
  }, []);

  return (
    <div className="dashboard">
      <h1>Ranking de Progresso</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Capítulos Lidos</th>
            <th>Progresso (%)</th>
            <th>Última Atualização</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((user, index) => (
            <tr key={user.userId}>
              <td>{user.userName}</td>
              <td>{user.totalChaptersRead}</td>
              <td>{user.percentageRead}%</td>
              <td>{new Date(user.lastUpdated).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
