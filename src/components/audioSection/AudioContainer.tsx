import AudioRow from "./AudioRow";
import DRUMSfile from "../../assets/Loop-files/DRUMS.mp3";
const DRUMS = new Audio(DRUMSfile);

const AudioContainer = () => {
  return (
    <div className="audio-container">
      <AudioRow color="red" audioElement={DRUMS} />
    </div>
  );
};

export default AudioContainer;
