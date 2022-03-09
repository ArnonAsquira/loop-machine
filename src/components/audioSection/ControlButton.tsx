import { FC, MouseEventHandler } from "react";

interface IControlButtonProp {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ControlButton: FC<IControlButtonProp> = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

export default ControlButton;
