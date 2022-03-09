import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

interface IAudioRowProps {
  name: string;
  color: string;
  audioElement: HTMLAudioElement;
  play: boolean;
  loop: boolean;
  setDuration: Dispatch<SetStateAction<number>> | null;
  setCurrentTime: Dispatch<SetStateAction<number>> | null;
  updatedCurrentTime: number;
}

const AudioRow: FC<IAudioRowProps> = ({
  color,
  audioElement,
  name,
  play,
  loop,
  setDuration,
  setCurrentTime,
  updatedCurrentTime,
}) => {
  const [mute, setMute] = useState<boolean>(false);

  useEffect(() => {
    if (play) {
      audioElement.play();
    } else {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  }, [play, audioElement]);

  useEffect(() => {
    audioElement.loop = loop;
  }, [loop, audioElement]);

  useEffect(() => {
    audioElement.muted = mute;
  }, [mute, audioElement]);

  useEffect(() => {
    if (setDuration) {
      audioElement.onloadedmetadata = () => {
        const rawDuration = audioElement.duration;
        setDuration(rawDuration);
      };
    }
  }, [audioElement, setDuration]);

  useEffect(() => {
    audioElement.currentTime = updatedCurrentTime;
  }, [updatedCurrentTime, audioElement]);

  useEffect(() => {
    if (setCurrentTime) {
      audioElement.ontimeupdate = () => {
        setCurrentTime(audioElement.currentTime);
      };
    }
  }, [audioElement, setCurrentTime]);

  return (
    <div className="audio-row" style={{ backgroundColor: color }} key={name}>
      <h2>{name}</h2>
      <button onClick={() => setMute(!mute)}>{mute ? "unmute" : "mute"}</button>
    </div>
  );
};

export default AudioRow;
