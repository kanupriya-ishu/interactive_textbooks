import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./lessonDetail.css"
import Parser from 'html-react-parser';
import Editor from "../../components/editor/Editor"

export default function LessonDetail() {
    const location = useLocation();
    const book_path = location.pathname.split("/")[2];
    const lesson_path = location.pathname.split("/")[4];
    const { user } = useContext(Context);
    const [book, setBook] = useState({});
    const [lesson, setLesson] = useState({});
    const [lesson_title, setLesson_title] = useState("");
    const [lesson_body, setLesson_Body] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getLesson = async () => {
          const res = await axios.get("/books/" + book_path + "/lessons/" + lesson_path);
          setLesson(res.data);
          setLesson_title(res.data.lesson_title);
          setLesson_Body(res.data.lesson_body);
        };
        getLesson();

        const getBook = async() => {
          const res = await axios.get("/books/" + book_path);
          setBook(res.data);
        };
        getBook();
      }, [book_path,lesson_path]);

      const handleUpdate = async () => {
        try {
          await axios.put(`/books/${book_path}/lessons/${lesson_path}`, {
            username: user.username,
            lesson_title,
            lesson_body,
          });
          setUpdateMode(false)
        } catch (err) {}
      };

      const handleDelete = async () => {
        try {
          await axios.delete(`/books/${book_path}/lessons/${lesson_path}`, {
            data: { username: user.username },
          });
          window.location.replace("/");
        } catch (err) {}
      };

      const onEditorChange = (value) => {
        setLesson_Body(value)
      }

    return(
        <div class="container">
            <div>
                {updateMode ? (
                  <input
                  type="text"
                  value={lesson_title}
                  className="lessonTitleInput swc"
                  autoFocus
                  onChange={(e) => setLesson_title(e.target.value)}
                    />
                  ) : (
                      <h1 className="lessonTitle swc">{lesson_title}</h1>
                )}
                {book.username === user?.username && (
                    <span className="middle">
                        <i class="fa-solid fa-pen-to-square edit" onClick={() => setUpdateMode(true)}></i>  
                        <i class="fa-solid fa-trash delete" onClick={handleDelete}></i>
                    </span>
                )}
            </div>
            <div>
            {updateMode ? (
                    <Editor 
                      onEditorChange={onEditorChange}
                      defaultContent= {lesson_body} />
                ): 
                <p className="lesson_body">{Parser(lesson_body)}</p>
            }
                {updateMode && (
                    <button className="singlePostButton" onClick={handleUpdate}>
                        Update
                    </button>
                )}
            </div>
        </div>
    );
}