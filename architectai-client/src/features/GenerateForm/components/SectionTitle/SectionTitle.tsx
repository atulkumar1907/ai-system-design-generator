import "./SectionTitle.css";

interface Props {
  title: string;
  subtitle?: string;
}

export const SectionTitle = ({ title, subtitle }: Props) => {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};