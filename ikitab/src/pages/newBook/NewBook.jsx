import "./newBook.css";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";

export default function NewBook() {
    const [book_title, setBook_title] = useState("");
    const [book_desc, setBook_desc] = useState("");
    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBook = {
            username: user.username,
            book_title,
            book_desc
        };
        try{
            const res = await axios.post("/books", newBook);
            window.location.replace("/userTextbooks");
        } catch(err) {}
    };

    return (
        <div className="newBook">
          <span className="newBookTitle">New Book Details</span>
          <form className="newBookForm" onSubmit={handleSubmit}>
            <div>
              <label>Book Title</label><br />
              <input
                type="text"
                className="newBookInput"
                placeholder="Title"
                autoFocus={true}
                onChange={e=>setBook_title(e.target.value)}
              />
            </div>
            <div>
                <label>Book Description</label><br />
                <textarea
                    type="text"
                    className="newBookInput"
                    onChange={e=>setBook_desc(e.target.value)}
                    rows="25"
                >
                </textarea>
            </div>
            <button className="newBookButton" type="submit">
              Add Book
            </button>
          </form>
        </div>
      );    
}