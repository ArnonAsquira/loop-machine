import axios from "axios";
import { IAudioElementObj, IAudioFileObj } from "../types/audioTypes";

const retrieveAudioFiles = async (
  url: string
): Promise<IAudioElementObj[] | string> => {
  try {
    const { data }: { data: IAudioFileObj[] } = await axios.get(`${url}/audio`);
    const decodedAudioFiles = data.map((audioFileObj) => ({
      name: audioFileObj.fileName.split(".mp3")[0],
      element: parseAudioFile(audioFileObj.content),
    }));
    return decodedAudioFiles;
  } catch (err) {
    return "could not retrieve audio files";
  }
};

const parseAudioFile = (encodedAudioFile: string) => {
  const audioElement = new Audio(`data:audio/mpeg;base64,${encodedAudioFile}`);
  return audioElement;
};

export { parseAudioFile, retrieveAudioFiles };
