const Button = ({ onClick, label, className }) => (
  <button className={className} onClick={onClick}>
    {label}
  </button>
);

export default Button;
