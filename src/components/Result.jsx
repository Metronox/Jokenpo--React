export default function Result({ outcome }) {
  const text =
    outcome === "win"  ? "Você ganhou!" :
    outcome === "lose" ? "Você perdeu." :
    outcome === "draw" ? "Empate!" :
    "Faça sua jogada.";

  const cls =
    outcome === "win"  ? "result win" :
    outcome === "lose" ? "result lose" :
    outcome === "draw" ? "result draw" :
    "result";

  return (
    <p className={cls}>{text}</p>
  );
}