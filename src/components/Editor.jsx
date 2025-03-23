import "./Editor.css";
import Button from "./Button";
import EmotionItem from "./EmotionItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const emotionList = [
  {
    emotionId: 1,
    emotionName: "완전 좋음"
  },
  {
    emotionId: 2,
    emotionName: "좋음"
  },
  {
    emotionId: 3,
    emotionName: "그럭저럭"
  },
  {
    emotionId: 4,
    emotionName: "나쁨"
  },
  {
    emotionId: 5,
    emotionName: "끔찍함"
  },
];

const changeCreatedDate = (createdDate) => {
  let year = createdDate.getFullYear();
  let month = createdDate.getMonth() + 1;
  let date = createdDate.getDate();

  if (month < 10) {
    month = `0${month}`;
  }

  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
};

const Editor = ({ onSubmit }) => {
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: "",
  });
  const nav = useNavigate();

  const onChangeInput = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    if (name === "createdDate") {
      value = new Date(value);
    }

    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onClickSubmitButton = () => {
    onSubmit(input);
  };

  return (
    <div className="editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input name="createdDate" type="date" value={changeCreatedDate(input.createdDate)} onChange={onChangeInput} />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_img_wrapper">
          {emotionList.map((item) => <EmotionItem key={item.emotionId} {...item} isSelected={item.emotionId === input.emotionId} onClick={() => onChangeInput({
            target: {
              name: "emotionId",
              value: item.emotionId,
            },
          })} />)}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea placeholder="오늘은 어땠나요?" value={input.content} onChange={onChangeInput} name="content" />
      </section>
      <section className="button_section">
        <Button text="취소하기" onClick={() => nav(-1, { replace: true })} />
        <Button text="작성완료" type="POSITIVE" onClick={onClickSubmitButton} />
      </section>
    </div>
  );
};

export default Editor;