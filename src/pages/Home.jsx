import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";

const getMonthData = (pivotDate, data) => {
  let startTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1, 0, 0, 0
  ).getTime();
  let endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23, 59, 59, 999
  ).getTime();

  return data.filter((item) => startTime <= item.createdDate && endTime >= item.createdDate);
};

const Home = () => {
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());

  const monthData = getMonthData(pivotDate, data);

  const onClickDecreaseButton = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  const onClickIncreaseButton = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  return (
    <div>
      <Header
        leftChild={<Button text="<" onClick={onClickDecreaseButton} />}
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        rightChild={<Button text=">" onClick={onClickIncreaseButton} />}
      />
      <DiaryList monthData={monthData} />
    </div>
  );
};

export default Home;