import "./Button.css";

const Button = ({ text, onClick }) => {
  return (
    <button className="button">{text}</button>
  );
};

export default Button;