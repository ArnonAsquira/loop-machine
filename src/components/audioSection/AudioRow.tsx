import { FC, useState } from "react";

interface IAudioRowProps {
  name: string;
  color: string;
  audioElement: HTMLAudioElement;
  play: boolean;
  loop: boolean;
}

const AudioRow: FC<IAudioRowProps> = ({
  color,
  audioElement,
  name,
  play,
  loop,
}) => {
  const [mute, setMute] = useState<boolean>(false);

  if (play) {
    audioElement.play();
  } else {
    audioElement.pause();
    audioElement.currentTime = 0;
  }

  audioElement.loop = loop;
  audioElement.muted = mute;

  return (
    <div className="audio-row" style={{ backgroundColor: color }} key={name}>
      <h2>
        {name}: {audioElement.duration}
      </h2>
      <button onClick={() => setMute(!mute)}>{mute ? "unmute" : "mute"}</button>
    </div>
  );
};

export default AudioRow;
