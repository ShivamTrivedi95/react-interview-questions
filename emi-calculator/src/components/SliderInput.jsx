import { numberWithCommas } from "../utils/config";

const SliderInput = ({ label, id, name, min, max, labelMin, labelMax, value, handleSliderChange, labelInformation }) => {
  return (
    <span className="form-element">
      <label className="form-label">{label}</label>
      <span className="form-label-information">{labelInformation}</span>
      <input id={id} name={name} type="range" min={min} max={max} className="slider" value={value} onChange={(e) => handleSliderChange(e)} />
      <div className="slider__label">
        <span>{labelMin ?? numberWithCommas(min)}</span>
        <span>{numberWithCommas(value)}</span>
        <span>{labelMax ?? numberWithCommas(max)}</span>
      </div>
    </span>
  );
};

export default SliderInput;
