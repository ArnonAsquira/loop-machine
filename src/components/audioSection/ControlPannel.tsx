import { Dispatch, FC, SetStateAction, useCallback } from "react";
import ControlButton from "./ControlButton";

interface IControlPannelProps {
  setPlaying: Dispatch<SetStateAction<boolean>>;
  currentlyPlaying: boolean;
  setIsLooping: Dispatch<SetStateAction<boolean>>;
  isLooping: boolean;
  setStartingTime: Dispatch<SetStateAction<number>>;
  currentTime: number;
  duration: number;
}

const ControlPannel: FC<IControlPannelProps> = ({
  setPlaying,
  currentlyPlaying,
  isLooping,
  setIsLooping,
  setStartingTime,
  currentTime,
  duration,
}) => {
  const handleTimeJump = useCallback(
    (origianlTime: number, timeTojump: number, maxTime: number) => {
      const newTime = origianlTime - timeTojump;
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

  return (
    <div className="control-pannel">
      <ControlButton
        text={currentlyPlaying ? "stop" : "play"}
        onClick={() => {
          setPlaying(!currentlyPlaying);
        }}
      />
      <ControlButton
        text={isLooping ? "unloop" : "loop"}
        onClick={() => setIsLooping(!isLooping)}
      />
      <ControlButton
        text={"jump 5 seconds"}
        onClick={() => handleTimeJump(currentTime, 5, duration)}
      />
      <ControlButton
        text={"return 5 seconds"}
        onClick={() => handleTimeJump(currentTime, -5, duration)}
      />
    </div>
  );
};

export default ControlPannel;
