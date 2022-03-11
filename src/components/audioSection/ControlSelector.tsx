import { FC } from "react";

interface IControlSelectorProps {
  options: string[];
  onChange: (value: string) => void;
}

const ControlSelector: FC<IControlSelectorProps> = ({ options, onChange }) => {
  return (
    <select onChange={(e) => onChange(e.target.value)}>
      {options.map((option, i) => (
        <option key={i} value={option}>
          X{option}
        </option>
      ))}
    </select>
  );
};

export default ControlSelector;
