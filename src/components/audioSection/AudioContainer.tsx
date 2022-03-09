import AudioRow from "./AudioRow";
import { retrieveAudioFiles } from "../../utils/audioFiles";
import { apiBaseUrl } from "../../constants/api";
import { useEffect, useState } from "react";
import { IAudioElementObj } from "../../types/audioTypes";
import { audioRowColors } from "../../constants/audio";

const AudioContainer = () => {
  const [audioFiles, setAudioFiles] = useState<IAudioElementObj[]>([]);
  const [playAllTracks, setPlayAllTracks] = useState<boolean>(false);
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

  return (
    <div className="audio-container">
      {audioFiles.map((audioObj, i) => (
        <AudioRow
          color={audioRowColors[i] || "red"}
          name={audioObj.name}
          audioElement={audioObj.element}
          play={playAllTracks}
          loop={loop}
        />
      ))}
      <button onClick={() => setPlayAllTracks(!playAllTracks)}>
        {playAllTracks ? "stop" : "play"}
      </button>
      <button onClick={() => setLoop(!loop)}>{loop ? "unloop" : "loop"}</button>
    </div>
  );
};

export default AudioContainer;
