import { FC } from "react";

interface IVolumeAdjusterProps {
  volume: number;
  changeVolume: (newVoloume: number) => void;
}

const VolumeAdjuster: FC<IVolumeAdjusterProps> = ({ volume, changeVolume }) => {
  return (
    <div className="volume-adjuster">
      <span>volume-{Math.floor(volume * 100)}</span>
      <div>
        <span>0</span>
        <input
          type="range"
          min={0}
          max={100}
          onChange={(e) => changeVolume(Number(e.target.value) / 100)}
        />
        <span>100</span>
      </div>
    </div>
  );
};

export default VolumeAdjuster;
