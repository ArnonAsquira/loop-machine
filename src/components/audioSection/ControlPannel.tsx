import { Dispatch, FC, SetStateAction, useCallback } from "react";
import svgDict from "../../constants/svgIcons";
import ControlButton from "./ControlButton";
import ControlSelector from "./ControlSelector";

interface IControlPannelProps {
  setPlaying: Dispatch<SetStateAction<boolean>>;
  currentlyPlaying: boolean;
  setIsLooping: Dispatch<SetStateAction<boolean>>;
  isLooping: boolean;
  setStartingTime: Dispatch<SetStateAction<number>>;
  currentTime: number;
  duration: number;
  setStop: Dispatch<SetStateAction<boolean>>;
  setPlaybackSpeed: Dispatch<SetStateAction<number>>;
}

const ControlPannel: FC<IControlPannelProps> = ({
  setPlaying,
  currentlyPlaying,
  isLooping,
  setIsLooping,
  setStartingTime,
  currentTime,
  duration,
  setStop,
  setPlaybackSpeed,
}) => {
  const handleTimeJump = useCallback(
    (origianlTime: number, timeTojump: number, maxTime: number) => {
      const newTime = origianlTime + timeTojump;
      if (newTime < 0) {
        return setStartingTime(0);
      }
      if (newTime > maxTime) {
        return setStartingTime(maxTime);
      }
      return setStartingTime(newTime);
    },
    [setStartingTime]
  );

  const handleChangePlaybackSpeed = useCallback(
    (value: string) => {
      if (!Number(value)) {
        return;
      } else {
        setPlaybackSpeed(Number(value));
      }
    },
    [setPlaybackSpeed]
  );

  return (
    <div className="control-pannel">
      <ControlButton
        text={currentlyPlaying ? svgDict["pause"] : svgDict["play"]}
        onClick={() => {
          setPlaying(!currentlyPlaying);
          setStop(false);
        }}
      />
      <ControlButton
        text={svgDict["stop"]}
        onClick={() => {
          setStop(true);
          setPlaying(false);
        }}
      />
      <ControlButton
        text={isLooping ? "unloop" : svgDict["loop"]}
        onClick={() => setIsLooping(!isLooping)}
      />
      <ControlButton
        text={svgDict["forward5"]}
        onClick={() => handleTimeJump(currentTime, 5, duration)}
      />
      <ControlButton
        text={svgDict["replay5"]}
        onClick={() => handleTimeJump(currentTime, -5, duration)}
      />
      <ControlSelector
        options={["1", "1.5", "2", "0.5"]}
        onChange={handleChangePlaybackSpeed}
      />
    </div>
  );
};

export default ControlPannel;
