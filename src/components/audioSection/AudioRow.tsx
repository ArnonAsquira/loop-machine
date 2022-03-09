import { FC, useState } from "react";

interface IAudioRowProps {
  color: string;
  audioElement: HTMLAudioElement;
}

const AudioRow: FC<IAudioRowProps> = ({ color, audioElement }) => {
  const [audioState, setAudioState] = useState<"play" | "pause">("pause");

  const activateAudioAction = async (action: "play" | "pause") => {
    await audioElement[action]();
  };

  return (
    <div className="audio-row">
      <button
        onClick={() => {
          const newState = audioState === "pause" ? "play" : "pause";
          setAudioState(newState);
          activateAudioAction(newState);
        }}
      >
        {audioState === "pause" ? "play" : "pause"}
      </button>
    </div>
  );
};

export default AudioRow;
