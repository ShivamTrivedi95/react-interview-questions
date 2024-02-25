const Button = ({ onClick, title, customClassName }) => {
  return (
    <button className={customClassName} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
