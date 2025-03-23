import "./EmotionItem.css";
import { getEmotionImage } from "../util/get-emotion-image";

const EmotionItem = ({ emotionId, emotionName, isSelected, onClick }) => {
  return (
    <div onClick={onClick} className={`emotionitem ${isSelected ? `emotionitem_on_${emotionId}` : ""}`}>
      <img className="emotionitem_img" src={getEmotionImage(emotionId)} />
      <div>{emotionName}</div>
    </div>
  );
};

export default EmotionItem;