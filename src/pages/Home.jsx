import Header from "../components/Header";
import Button from "../components/Button";

const Home = () => {
  return (
    <div>
      <Header
        leftChild={<Button text="<" />}
        title={`${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월`}
        rightChild={<Button text=">" />}
      />
    </div>
  );
};

export default Home;