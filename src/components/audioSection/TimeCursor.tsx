import { Dispatch, FC, SetStateAction, useMemo, useRef } from "react";
import { minutesToSeconds } from "../../utils/general";

interface ITimeCursorProps {
  duration: number;
  currentTime: number;
  setStartingTime: Dispatch<SetStateAction<number>>;
}

const TimeCursor: FC<ITimeCursorProps> = ({
  duration,
  currentTime,
  setStartingTime,
}) => {
  const curosrRef = useRef<HTMLInputElement>(null);

  const parsedDuration = useMemo(() => {
    return minutesToSeconds(duration);
  }, [duration]);

  return (
    <div className="time-cursor">
      <span>{minutesToSeconds(currentTime)}</span>
      <input
        type="range"
        min={0}
        max={duration}
        ref={curosrRef}
        value={currentTime}
        onChange={() => {
          curosrRef.current && setStartingTime(Number(curosrRef.current.value));
        }}
      />
      <span>{parsedDuration}</span>
    </div>
  );
};

export default TimeCursor;
