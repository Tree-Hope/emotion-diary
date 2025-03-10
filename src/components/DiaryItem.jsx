import "./DiaryItem.css";
import Button from "./Button";
import { getEmotionImage } from "../util/get-emotion-image";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({ id, createdDate, emotionId, content }) => {
  const nav = useNavigate();

  return (
    <div className="diaryitem">
      <div className={`img_section img_section_${emotionId}`}>
        <img src={getEmotionImage(emotionId)} onClick={() => nav(`/diary/${id}`)} />
      </div>
      <div className="info_section" onClick={() => nav(`/diary/${id}`)}>
        <div className="created_date">{new Date(createdDate).toLocaleDateString()}</div>
        <div className="content">{content}</div>
      </div>
      <div className="button_section">
        <Button text="수정하기" onClick={() => nav(`/edit/${id}`)} />
      </div>
    </div>
  );
};

export default DiaryItem;