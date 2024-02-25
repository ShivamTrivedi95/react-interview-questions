const TextInput = ({ formLabel, id, name, type, value, placeholder, handleChangeInput }) => {
  return (
    <span className="form-element">
      <label className="form-label">{formLabel}</label>
      <input id={id} name={name} type={type} className="form-input" value={value} placeholder={placeholder} onChange={(e) => handleChangeInput(e)} />
    </span>
  );
};

export default TextInput;
