import { useContext } from "react";
import { DiaryStateContext } from "../App";

const useDiary = (id) => {
  const data = useContext(DiaryStateContext);
  const currentData = data.find((item) => String(item.id) === id);

  return currentData;
};

export default useDiary;