import { useState } from "react";
import pedra from "./assets/pedra.png";
import papel from "./assets/papel.png";
import tesoura from "./assets/tesoura.png";

const CHOICES = [
{ id: "rock", label: "Pedra", img: pedra },
{ id: "paper", label: "Papel", img: papel },
{ id: "scissors", label: "Tesoura", img: tesoura }
];

function randomChoiceCPU() {
  const i = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[i];
}

function theWinner(playerID, cpuID) {
  if (!playerID || !cpuID) return null;
  if (playerID === cpuID) return "draw";

  const winsOver = { rock: "scissors", scissors: "paper", paper: "rock" };
  return winsOver[playerID] === cpuID ? "win" : "lose";
}

export default function App() {
  // Estados
  const [playerChoice, setPlayerChoice] = useState(null);
  const [cpuChoice, setCpuChoice] = useState(null);
  const [score, setScore] = useState({ win: 0, lose: 0, draw: 0 });

  // Função Jogar            
  function handlePlay(choiceObj) {
    const player = choiceObj;
    const cpu = randomChoiceCPU();
    const result = theWinner(player.id, cpu.id);

    setPlayerChoice(player);
    setCpuChoice(cpu);

    if (result) {
      setScore((prev) => ({
        win: prev.win + (result === "win" ? 1 : 0),
        lose: prev.lose + (result === "lose" ? 1 : 0),
        draw: prev.draw + (result === "draw" ? 1 : 0),
      }));
    }
  }

  // Função Reiniciar
  function handleReset() {
    setScore({ win: 0, lose: 0, draw: 0 });
    setPlayerChoice(null);
    setCpuChoice(null);
  }

  // Possibilidades de resultado
  const outcome = theWinner(playerChoice?.id, cpuChoice?.id);
  const label = outcome === "win" ? "Você ganhou!"
              : outcome === "lose" ? "Você perdeu."
              : outcome === "draw" ? "Empate!"
              : "Faça sua jogada.";

return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Jokenpô</h1>

      {/* Placar */}
      <div style={{
        display: "flex",
        gap: 16,
        marginTop: 8,
        padding: "8px 12px",
        border: "1px solid #ddd",
        borderRadius: 8,
        width: "fit-content"
      }}>
        <span>Vitórias: <strong>{score.win}</strong></span>
        <span>Empates: <strong>{score.draw}</strong></span>
        <span>Derrotas: <strong>{score.lose}</strong></span>
      </div>


      {/* Botões */}
      <div style={{ display: "flex", gap:12, marginTop: 16 }}>
        {CHOICES.map((c) => (
          <button key={c.id} onClick={() => handlePlay(c)}
          style={{ display: "flex", alignItems: "center", gap: 8 }}>
           <img src={c.img} alt={c.label} width={28} height={28} />
           {c.label}
          </button>
        ))}
      </div>

      {/* Resultado */}
      <p style={{ marginTop: 12, fontWeight: 700 }}>{label}</p> 
      <p style={{ marginTop: 12}}>
        Sua escolha: <strong>{playerChoice?.label ?? "-"}</strong>
      </p>
      <p style={{ marginTop: 4}}>
        Máquina: <strong>{cpuChoice?.label ?? "-"}</strong>
      </p>
      
      {/* Botão Reiniciar */}
      <button
        onClick={handleReset}
        style={{
          marginTop: 12,
          padding: "8px 12px",
          borderRadius: 999,
          border: "1px solid #ddd",
          background: "#f7f7f7",
          cursor: "pointer",  
        }}
      >
        Reiniciar jogo
      </button>
    </main>
  );
}
