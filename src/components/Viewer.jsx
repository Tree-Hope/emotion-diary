import "./Viewer.css";
import { getEmotionImage } from "../util/get-emotion-image";
import { emotionList } from "../util/get-emotion-list";

const Viewer = ({ emotionId, content }) => {
  const getEmotionName = emotionList.find((item) => item.emotionId === emotionId);

  return (
    <div className="viewer">
      <section className="img_section">
        <h4>오늘의 감정</h4>
        <div className={`img_wrapper img_wrapper_${emotionId}`}>
          <img src={getEmotionImage(emotionId)} />
          <div>
            {getEmotionName.emotionName}
          </div>
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;