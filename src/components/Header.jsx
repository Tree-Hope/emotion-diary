import "./Header.css";

const Header = ({ title, leftChild, rightChild }) => {
  return (
    <div className="header">
      <div className="leftchild">{leftChild}</div>
      <div className="title">{title}</div>
      <div className="rightchild">{rightChild}</div>
    </div>
  );
};

export default Header;