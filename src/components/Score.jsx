export default function Score({ win, draw, lose }) {
  return (
    <div className="pixel-score">
      <span>Vitórias:<strong>{win}</strong></span>
      <span>Empates:<strong>{draw}</strong></span>
      <span>Derrotas:<strong>{lose}</strong></span>
    </div>
  );
}
