import "./ToggleCard.css";

interface Props {
  title: string;
  description: string;
  active?: boolean;
  onClick?: () => void;
}

export const ToggleCard = ({
  title,
  description,
  active = false,
  onClick,
}: Props) => {
  return (
    <div
      className={`toggle-card ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};