import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DiaryList = ({ monthData }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState("latest");

  const changeSortType = (e) => {
    setSortType(e.target.value);
  }

  const getSortedData = () => {
    return monthData.toSorted((a, b) => {
      if (sortType === "oldest") {
        return a.createdDate - b.createdDate;
      } else {
        return b.createdDate - a.createdDate;
      }
    });
  };

  const sortedData = getSortedData();

  return (
    <div className="diarylist">
      <div className="diarylist_header">
        <select onChange={changeSortType}>
          <option value="latest">최신순</option>
          <option value="oldest">오래된 순</option>
        </select>
        <Button text="새 일기 쓰기" type="POSITIVE" onClick={() => nav("/new")} />
      </div>
      <div>
        {sortedData.map((item) => <DiaryItem key={item.id} {...item} />)}
      </div>
    </div>
  );
};

export default DiaryList;