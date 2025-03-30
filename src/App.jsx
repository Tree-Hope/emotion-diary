import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import { useReducer, createContext, useEffect } from 'react';
import { supabase } from "./supabaseClient";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return [...action.data];
    case "CREATE":
      return [{ ...action.data }, ...state];
    case "UPDATE":
      return state.map((item) => String(item.id) === action.data.id ?
        { ...action.data } : item
      );
    case "DELETE":
      return state.filter((item) => String(item.id) !== action.id);
    default:
      return state;
  }
};

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("diary").select("*");

      if (error) {
        console.error("불러오기 실패: ", error.message);
        return;
      }

      const changedDiaryName = data.map((item) => ({
        ...item,
        createdDate: new Date(item.created_date).getTime(),
        emotionId: item.emotion_id,
      }));

      dispatch({
        type: "INIT",
        data: changedDiaryName,
      });
    };

    fetchData();
  }, []);

  const onCreate = async (createdDate, emotionId, content) => {
    const { data, error } = await supabase.from("diary").insert([
      {
        created_date: new Date(createdDate).toISOString(),
        emotion_id: emotionId,
        content: content,
      },
    ]).select();

    if (error) {
      console.error("Supabase 삽입 실패: ", error.message);
      return;
    }

    const newDiary = data[0];

    const changedDiaryName = {
      ...newDiary,
      createdDate: new Date(newDiary.created_date).getTime(),
      emotionId: newDiary.emotion_id,
    };

    dispatch({
      type: "CREATE",
      data: changedDiaryName,
    });
  };

  const onUpdate = async (id, createdDate, emotionId, content) => {
    const { data, error } = await supabase.from("diary").update({
      created_date: new Date(createdDate).toISOString(),
      emotion_id: emotionId,
      content: content,
    }).eq("id", id).select();

    if (error) {
      console.error("수정 실패: ", error.message);
      return;
    }

    const updatedDiary = data[0];

    const changedDiaryName = {
      ...updatedDiary,
      createdDate: new Date(updatedDiary.created_date).getTime(),
      emotionId: updatedDiary.emotion_id,
    };

    dispatch({
      type: "UPDATE",
      data: changedDiaryName,
    });
  };

  const onDelete = async (id) => {
    const { error } = await supabase.from("diary").delete().eq("id", id);

    if (error) {
      console.error("삭제 실패: ", error.message);
      return;
    }

    dispatch({
      type: "DELETE",
      id: id,
    });
  };

  return (
    <div>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={
          { onCreate, onUpdate, onDelete }
        }>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/new" element={<New />}></Route>
            <Route path="/edit/:id" element={<Edit />}></Route>
            <Route path="/diary/:id" element={<Diary />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </div>
  );
}

export default App;
