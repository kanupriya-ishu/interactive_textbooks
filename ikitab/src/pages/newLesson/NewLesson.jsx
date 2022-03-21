import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
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

    const [editorState, setEditorState] = useState(
      () => EditorState.createEmpty(),
    );
    const  [convertedContent, setConvertedContent] = useState(null);
    const handleEditorChange = (state) => {
      setEditorState(state);
      convertContentToHTML();
    }
    const convertContentToHTML = () => {
      let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
      setConvertedContent(currentContentAsHTML);
      setLesson_Body(currentContentAsHTML);
    }
    const createMarkup = (html) => {
      return  {
        __html: DOMPurify.sanitize(html)
      }
    }

    const getFileBase64 = (file, callback) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      // Since FileReader is asynchronous,
      // we need to pass data back.
      reader.onload = () => callback(reader.result);
      // TODO: catch an error
      reader.onerror = error => {};
    };
    
    const imageUploadCallback = file => new Promise(
      (resolve, reject) => getFileBase64(
        file,
        data => resolve({ data: { link: data } })
      )
    );
    

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
                {/* <textarea
                    type="text"
                    className="newLessonInput"
                    onChange={e=>setLesson_Body(e.target.value)}
                >
                </textarea> */}
                <Editor
                  editorState={editorState}
                  onEditorStateChange={handleEditorChange}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                  toolbar={{
                    image: {
                      uploadCallback: imageUploadCallback,
                      previewImage: true,
                    },
                  }}
                />
            </div>
            <button className="newLessonButton" type="submit">
              Add Lesson
            </button>
          </form>
        </div>
    );
}