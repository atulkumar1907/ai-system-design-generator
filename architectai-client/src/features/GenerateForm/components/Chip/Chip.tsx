import "./Chip.css";

interface Props {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export const Chip = ({ label, active = false, onClick }: Props) => {
  return (
    <button
      className={`chip ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};