import "./Header.css";

const Header = ({ title, leftChild, rightChild }) => {
  return (
    <div>
      <div>{leftChild}</div>
      <div>{title}</div>
      <div>{rightChild}</div>
    </div>
  );
};

export default Header;