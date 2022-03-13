import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import svgDict from "../../constants/svgIcons";
import VolumeAdjuster from "./VolumeAdujster";

interface IAudioRowProps {
  name: string;
  color: string;
  audioElement: HTMLAudioElement;
  play: boolean;
  loop: boolean;
  setDuration: Dispatch<SetStateAction<number>> | null;
  setCurrentTime: Dispatch<SetStateAction<number>> | null;
  updatedCurrentTime: number;
  stop: boolean;
  playbackSpeed: number;
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
  stop,
  playbackSpeed,
}) => {
  const [mute, setMute] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);

  // play/stop functionality
  useEffect(() => {
    if (play) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }, [play, audioElement]);

  // loop functionality
  useEffect(() => {
    audioElement.loop = loop;
  }, [loop, audioElement]);

  // mute functionality
  useEffect(() => {
    audioElement.muted = mute;
  }, [mute, audioElement]);

  // setting the duration of the tracks
  useEffect(() => {
    if (setDuration) {
      audioElement.onloadedmetadata = () => {
        const rawDuration = audioElement.duration;
        setDuration(rawDuration);
      };
    }
  }, [audioElement, setDuration]);

  // updating the currentTime of the tracks
  useEffect(() => {
    audioElement.currentTime = updatedCurrentTime;
  }, [updatedCurrentTime, audioElement]);

  // controling the current time of the tracks from the father component
  useEffect(() => {
    if (setCurrentTime) {
      audioElement.ontimeupdate = () => {
        setCurrentTime(audioElement.currentTime);
      };
    }
  }, [audioElement, setCurrentTime]);

  // stop tracks functionalitys
  useEffect(() => {
    if (stop) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  }, [stop, audioElement]);

  // playback speed adjustment functionality
  useEffect(() => {
    audioElement.playbackRate = playbackSpeed;
  }, [playbackSpeed, audioElement]);

  // volume speed adjustment functionality
  useEffect(() => {
    audioElement.volume = volume;
  }, [volume, audioElement]);

  return (
    <div className="audio-row" style={{ backgroundColor: color }} key={name}>
      <h3>{name}</h3>
      <button onClick={() => setMute(!mute)}>
        {mute ? svgDict["unmute"] : svgDict["mute"]}
      </button>
      <VolumeAdjuster
        volume={volume}
        changeVolume={(newVolume: number) => setVolume(newVolume)}
      />
    </div>
  );
};

export default AudioRow;
