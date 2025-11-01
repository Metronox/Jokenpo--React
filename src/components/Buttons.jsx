export default function Buttons({ img, label, onClick }) {
  return (
    <button className="pixel-btn" onClick={onClick}>
      <img className="pixel-img" src={img} alt={label} />
      {label}
    </button>
  );
}