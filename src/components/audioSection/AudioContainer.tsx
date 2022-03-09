import AudioRow from "./AudioRow";
import { retrieveAudioFiles } from "../../utils/audioFiles";
import { apiBaseUrl } from "../../constants/api";
import { useEffect, useState } from "react";
import { IAudioElementObj } from "../../types/audioTypes";
import { audioRowColors } from "../../constants/audio";
import TimeCursor from "./TimeCursor";

const AudioContainer = () => {
  const [audioFiles, setAudioFiles] = useState<IAudioElementObj[]>([]);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [startingTime, setStartingTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playingAllTracks, setPlayAllTracks] = useState<boolean>(false);
  const [loop, setLoop] = useState<boolean>(false);

  useEffect(() => {
    const createAudioElements = async () => {
      const audioFiles = await retrieveAudioFiles(apiBaseUrl);
      if (typeof audioFiles === "string") {
        return setAudioFiles([]);
      }
      setAudioFiles(audioFiles);
    };
    createAudioElements();
  }, []);

  useEffect(() => {
    console.log(currentTime, duration);
    if (currentTime >= duration && playingAllTracks) {
      setPlayAllTracks(false);
    }
  }, [currentTime, duration, playingAllTracks]);

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
        />
      ))}
      <button onClick={() => setPlayAllTracks(!playingAllTracks)}>
        {playingAllTracks ? "stop" : "play"}
      </button>
      <button onClick={() => setLoop(!loop)}>{loop ? "unloop" : "loop"}</button>
    </div>
  );
};

export default AudioContainer;
