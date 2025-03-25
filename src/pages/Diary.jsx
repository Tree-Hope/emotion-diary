import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import { changeCreatedDate } from "../util/change-date";
import useDiary from "../hooks/useDiary";

const Diary = () => {
  const params = useParams();
  const nav = useNavigate();
  const currentData = useDiary(params.id);

  const { createdDate, emotionId, content } = currentData;

  const getCreatedDate = changeCreatedDate(new Date(createdDate));

  return (
    <div>
      <Header
        title={`${getCreatedDate} 기록`}
        leftChild={<Button text="< 뒤로 가기" onClick={() => nav(-1)} />}
        rightChild={<Button text="수정하기" onClick={() => nav(`/edit/${params.id}`)} />}
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
};

export default Diary;