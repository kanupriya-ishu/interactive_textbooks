import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singleBook.css";
import Lessons from "../lessons/Lessons";

export default function SingleBook() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [book, setBook] = useState({});
    const { user } = useContext(Context);
    const [book_title, setBook_title] = useState("");
    const [book_desc, setBook_desc] = useState("");
    const [lessons, setLessons] = useState([]);
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getBook = async () => {
          const res = await axios.get("/books/" + path);
          setBook(res.data);
          setBook_title(res.data.book_title);
          setBook_desc(res.data.book_desc);
          setLessons(res.data.lessons);
        };
        getBook();
      }, [path]);

      const handleUpdate = async () => {
        try {
          await axios.put(`/books/${book._id}`, {
            username: user.username,
            book_title,
            book_desc,
          });
          setUpdateMode(false)
        } catch (err) {}
      };

      const handleDelete = async () => {
        try {
          await axios.delete(`/books/${book._id}`, {
            data: { username: user.username },
          });
          window.location.replace("/");
        } catch (err) {}
      };

    return(
        <div className="singleBook">
            <div >
                <div>
                    {updateMode ? (
                        <input
                        type="text"
                        value={book_title}
                        className="singlePostTitleInput"
                        autoFocus
                        onChange={(e) => setBook_title(e.target.value)}
                      />
                    ) : (
                        <h1 className="title">
                            {book_title}
                        </h1>
                    )}
                </div>
                <div>
                    {book.username === user?.username && (
                        <span className="middle">
                            <Link to={`/books/${book._id}/newLesson`} className="link"> <i class="fa-solid fa-circle-plus add"></i> </Link>
                            <i class="fa-solid fa-pen-to-square edit" onClick={() => setUpdateMode(true)}></i>  
                            <i class="fa-solid fa-trash delete" onClick={handleDelete}></i>
                        </span>
                    )}
                    <span className="user">
                        <i class="fa fa-user" aria-hidden="true"></i> {book.username}
                    </span>
                </div>
                <br/> <br /> <br />
                {updateMode ? (
                    <textarea cols="30" rows="10" value={book_desc} onChange={(e) => setBook_desc(e.target.value)}></textarea>
                ): 
                <p className="para">
                    {book_desc}
                </p>}
                {updateMode && (
                    <button className="singlePostButton" onClick={handleUpdate}>
                        Update
                    </button>
                )}
            </div>
            <div>
                <Lessons lessons={lessons} book_id={book._id} />
            </div>
        </div>
    );
}