import "./Editor.css";
import Button from "./Button";
import EmotionItem from "./EmotionItem";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { emotionList } from "../util/get-emotion-list";
import { changeCreatedDate } from "../util/change-date";

const Editor = ({ currentData, onSubmit }) => {
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: "",
  });
  const nav = useNavigate();

  useEffect(() => {
    if (currentData) {
      setInput({
        ...currentData,
        createdDate: new Date(currentData.createdDate),
      });
    }
  }, [currentData])

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