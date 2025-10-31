import { useState } from "react";

const CHOICES = [
{ id: "rock", label: "Pedra", emoji: "🪨" },
{ id: "paper", label: "Papel", emoji: "📄" },
{ id: "scissors", label: "Tesoura", emoji: "✂️" }
];

function randomChoiceCPU() {
  const i = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[i];
}

function theWinner(playerID, cpuID) {
  if (playerID || cpuID) return null;
  if (playerID === cpuID) return "draw";

  const winsOver = { rock: "scissors", scissors: "paper", paper: "rock" };
  return winsOver[playerId] === cpuId ? "win" : "lose";
}

export default function App() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [cpuChoice, setCpuChoice] = useState(null);
  const outcome = theWinner(playerChoice?.id, cpuChoice?.id);

  const label = outcome === "win" ? "Você ganhou!"
              : outcome === "lose" ? "Você perdeu."
              : outcome === "draw" ? "Empate!"
              : "Faça sua jogada.";
  
  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Jokenpo</h1>

      <div style={{ display: "flex", gap:12, marginTop: 16 }}>
        {CHOICES.map((c) => (
          <button key={c.id} onClick={() => setPlayerChoice(c) & setCpuChoice(randomChoiceCPU())}>
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      
      <p style={{ marginTop: 12, fontWeight: 700 }}>{label}</p>
      <p style={{ marginTop: 12}}>
        Sua escolha: <strong>{playerChoice?.label ?? "-"}</strong>
      </p>
      <p style={{ marginTop: 4}}>
        Maquina: <strong>{cpuChoice?.label ?? "-"}</strong>
      </p>
      
    </main>
  )
}
