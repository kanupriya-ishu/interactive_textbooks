import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import Editor from "../../components/editor/Editor"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./newLesson.css"

export default function NewLesson() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const { user } = useContext(Context);
    const [book, setBook] = useState({});
    const [lesson, setLesson] = useState({});
    const [lesson_number, setLesson_number] = useState("");
    const [lesson_title, setLesson_title] = useState("");
    const [lesson_body, setLesson_Body] = useState("");  
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newLesson = {
            lesson_number,
            lesson_title,
            lesson_body
        };
        try{
            const res = await axios.post(`/books/${path}/lessons`, newLesson);
            window.location.replace(`/book/${path}`);
        } catch(err) {}
    };

    const onEditorChange = (value) => {
      setLesson_Body(value)
    }
    

    return(
        <div className="newLesson">
          <h2 className="newLessonTitle">New Lesson Details</h2>
          <form className="newLessonForm" onSubmit={handleSubmit}>
          <div>
              <label>Lesson Number</label><br />
              <input
                type="text"
                className="newLessonInput"
                placeholder="Number"
                autoFocus={true}
                onChange={e=>setLesson_number(e.target.value)}
              />
            </div>
            <div>
              <label>Lesson Title</label><br />
              <input
                type="text"
                className="newLessonInput"
                placeholder="Title"
                autoFocus={true}
                onChange={e=>setLesson_title(e.target.value)}
              />
            </div>
            <div>
                <label>Lesson Description</label><br />
                <Editor
                  onEditorChange={onEditorChange}
                  defaultContent=""
                />
            </div>
            <button className="newLessonButton" type="submit">
              Add Lesson
            </button>
          </form>
        </div>
    );
}

