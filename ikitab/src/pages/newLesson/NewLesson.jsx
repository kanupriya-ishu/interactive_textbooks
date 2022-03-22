import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
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
    const [text,setText] = useState('');

    const MyComponent = () => {
      const [text,setText] = useState('');

      const handleChange= (html)=> {
        setText(html);
        console.log(html);
        setLesson_Body(html);
      }

        const imageHandler = () =>{
        const tooltip = this.quill.theme.tooltip;
        const originalSave = tooltip.save;
        const originalHide = tooltip.hide;

        tooltip.save = function () {
          const range = this.quill.getSelection(true);
          const value = this.textbox.value;
          if (value) {
            this.quill.insertEmbed(range.index, 'image', value, 'user');
          }
        };
        // Called on hide and save.
        tooltip.hide = function () {
          tooltip.save = originalSave;
          tooltip.hide = originalHide;
          tooltip.hide();
        };
        tooltip.edit('image');
        tooltip.textbox.placeholder = 'Embed URL';
      }
      const modules = {
        toolbar: {
            container: [
                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                [{size: []}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, 
                {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image', 'video'],
                [{ 'color': [] }, { 'background': [] }], 
                ['clean'],
                [{ 'align': [] }]
            ],
            handlers: {
                image: imageHandler
            }
        }
      };
      const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'align',
        'list', 'bullet', 'indent',
        'link', 'image', 'video', 'color'
      ]

      return(
        <ReactQuill
                  value={text}
                  onChange={handleChange}
                  modules={modules}
                  formats={formats}
                />
      );
    }
    

  
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
                {/* <ReactQuill
                  value={text}
                  onChange={handleChange}
                  modules={modules}
                  formats={formats}
                /> */}
                <MyComponent />
            </div>
            <button className="newLessonButton" type="submit">
              Add Lesson
            </button>
          </form>
        </div>
    );
}

