import AudioRow from "./AudioRow";
import { retrieveAudioFiles } from "../../utils/audioFiles";
import { apiBaseUrl } from "../../constants/api";
import { useEffect, useState } from "react";
import { IAudioElementObj } from "../../types/audioTypes";
import { audioRowColors } from "../../constants/audio";
import TimeCursor from "./TimeCursor";
import ControlPannel from "./ControlPannel";

const AudioContainer = () => {
  const [audioFiles, setAudioFiles] = useState<IAudioElementObj[]>([]);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [startingTime, setStartingTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playingAllTracks, setPlayAllTracks] = useState<boolean>(false);
  const [loop, setLoop] = useState<boolean>(false);
  const [stop, setStop] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    const createAudioElements = async () => {
      setLoading("loading audio files");
      const audioFiles = await retrieveAudioFiles(apiBaseUrl);
      setLoading(null);
      if (typeof audioFiles === "string") {
        return setAudioFiles([]);
      }
      setAudioFiles(audioFiles);
    };
    createAudioElements();
  }, []);

  useEffect(() => {
    if (currentTime >= duration && playingAllTracks && !loop) {
      setPlayAllTracks(false);
      setStop(true);
    }
  }, [currentTime, duration, playingAllTracks, loop]);

  return (
    <div className="audio-container">
      <TimeCursor
        duration={duration}
        currentTime={currentTime}
        setStartingTime={setStartingTime}
      />
      {audioFiles.map((audioObj, i) => (
        <AudioRow
          color={audioRowColors[i] || "red"}
          name={audioObj.name}
          audioElement={audioObj.element}
          play={playingAllTracks}
          loop={loop}
          setDuration={i === 0 ? setDuration : null}
          setCurrentTime={i === 0 ? setCurrentTime : null}
          updatedCurrentTime={startingTime}
          stop={stop}
          playbackSpeed={playbackSpeed}
        />
      ))}
      <ControlPannel
        setPlaying={setPlayAllTracks}
        currentlyPlaying={playingAllTracks}
        setIsLooping={setLoop}
        isLooping={loop}
        setStartingTime={setStartingTime}
        currentTime={currentTime}
        duration={duration}
        setStop={setStop}
        setPlaybackSpeed={setPlaybackSpeed}
      />
      {loading}
    </div>
  );
};

export default AudioContainer;
