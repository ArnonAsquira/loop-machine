import { FC } from "react";
import svgDict from "../../constants/svgIcons";

interface IVolumeAdjusterProps {
  volume: number;
  changeVolume: (newVoloume: number) => void;
}

const VolumeAdjuster: FC<IVolumeAdjusterProps> = ({ volume, changeVolume }) => {
  return (
    <div className="volume-adjuster">
      <div
        className="volume-indecator"
        style={{ color: `rgb(${256 - volume * 256}, ${volume * 256}, 0)` }}
      >
        {Math.floor(volume * 100)}
      </div>
      <div className="volume-slider">
        <span>{svgDict["mute"]}</span>
        <input
          type="range"
          min={0}
          max={100}
          onChange={(e) => changeVolume(Number(e.target.value) / 100)}
        />
        <span>{svgDict["unmute"]}</span>
      </div>
    </div>
  );
};

export default VolumeAdjuster;
