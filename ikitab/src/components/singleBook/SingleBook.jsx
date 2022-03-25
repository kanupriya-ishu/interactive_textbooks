import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singleBook.css";
import Lessons from "../lessons/Lessons";
import {Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from "reactstrap"

export default function SingleBook() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [book, setBook] = useState({});
    const { user } = useContext(Context);
    const [book_title, setBook_title] = useState("");
    const [book_desc, setBook_desc] = useState("");
    const [lessons, setLessons] = useState([]);
    const [updateMode, setUpdateMode] = useState(false);
    const [modal, setModal] = React.useState(false);
  
    // Toggle for Modal
    const toggle = () => setModal(!modal);

    const uff = () => {
      setUpdateMode(true);
      setModal(!modal);
    }
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
                    {/* {updateMode ? (
                        <input
                        type="text"
                        value={book_title}
                        className="singlePostTitleInput"
                        autoFocus
                        onChange={(e) => setBook_title(e.target.value)}
                      />
                    ) : ( */}
                        <h1 className="title">
                            {book_title}
                        </h1>
                    {/* )} */}
                </div>
                <div>
                    {book.username === user?.username && (
                        <span className="middle">
                            <Link to={`/books/${book._id}/newLesson`} className="link"> <button className="add" title='Add New Lesson'><i class="fa-solid fa-circle-plus"></i></button> </Link>
                            <button className="edit" title='Edit book'><i class="fa-solid fa-pen-to-square" onClick={uff}></i></button>  
                            <button className="delete" title='Delete book'><i class="fa-solid fa-trash" onClick={handleDelete}></i></button>
                        </span>
                    )}
                    <span className="user">
                        <i class="fa fa-user" aria-hidden="true"></i> {book.username}
                    </span>
                </div>
                <br/> <br /> <br />
                {/* {updateMode ? (
                    <textarea cols="30" rows="10" value={book_desc} onChange={(e) => setBook_desc(e.target.value)}></textarea>
                ):  */}
                <p className="para">
                    {book_desc}
                </p>
                {/* } */}
                {/* {updateMode && (
                    <button className="singlePostButton" onClick={handleUpdate}>
                        Update
                    </button>
                )} */}
            </div>
            <div>
            {updateMode && (
              <div style={{
                display: 'block', width: 700, padding: 30
            }}>
                <Modal isOpen={modal}
                    toggle={toggle}
                    modalTransition={{ timeout: 2000 }}>
                    <ModalHeader>
                      <h3>Update Book</h3>
                    </ModalHeader>
                    <ModalBody>
                      <Form >
                              <FormGroup>
                                  <Label htmlFor="username">Book Title</Label>
                                  <Input type="text"
                                    value={book_title}
                                    className="singlePostTitleInput"
                                    autoFocus
                                    onChange={(e) => setBook_title(e.target.value)} />
                              </FormGroup>
                              <FormGroup>
                                  <Label htmlFor="username">Book Title</Label>
                                  <Input type="textarea" cols="30" rows="10" value={book_desc} onChange={(e) => setBook_desc(e.target.value)}/>
                              </FormGroup>
                              <button className="singlePostButton" onClick={handleUpdate}>
                                  Update
                              </button>
                      </Form>
                    {/* <input
                        type="text"
                        value={book_title}
                        className="singlePostTitleInput"
                        autoFocus
                        onChange={(e) => setBook_title(e.target.value)}
                      /> */}
                      {/* <textarea cols="30" rows="10" value={book_desc} onChange={(e) => setBook_desc(e.target.value)}></textarea> */}
                      
                    </ModalBody>
                </Modal>
            </div >
            )}
            </div>
            

            <div>
                <Lessons lessons={lessons} book_id={book._id} />
            </div>
        </div>
    );
}