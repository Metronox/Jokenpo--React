import { useState } from "react";
import pedra from "./assets/pedra.png";
import papel from "./assets/papel.png";
import tesoura from "./assets/tesoura.png";

// Componentes
import Buttons from "./components/Buttons.jsx";
import Score from "./components/Score.jsx";
import Result from "./components/Result.jsx";

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

return (
    <main className="pixel-app">
      <div className="pixel-card">
        <h1 className="pixel-title">JOKENPÔ</h1>

        {/* Placar */}
        <Score win={score.win} draw={score.draw} lose={score.lose} />

        {/* Botões */}
        <div style={{ display: "flex", gap: 12, marginTop: 16 , justifyContent: "center" }}>
          {CHOICES.map((c) => (
            <Buttons
              key={c.id}
              img={c.img}
              label={c.label}
              onClick={() => handlePlay(c)}
            />
          ))}
        </div>

        {/* Resultado */}
        <Result outcome={outcome} />

        {/* Escolhas */}
        <p style={{ marginTop: 12}}>
          Sua escolha: <strong>{playerChoice?.label ?? "-"}</strong>
        </p>
        <p style={{ marginTop: 4}}>
          Máquina: <strong>{cpuChoice?.label ?? "-"}</strong>
        </p>
        
        {/* Botão Reiniciar */}
        <button
          onClick={handleReset}
          className="pixel-btn"
          style={{ marginTop: 12 }}
        >
          Reiniciar jogo
        </button>
      </div>  
    </main>
  );
}
