import { FC, MouseEventHandler } from "react";

interface IControlButtonProp {
  text: string | JSX.Element;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ControlButton: FC<IControlButtonProp> = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

export default ControlButton;
