import { useEffect, useState } from "react";
import Header from '../../components/header/Header'
import Books from "../../components/books/Books";
import './userTextbook.css'
import axios from "axios";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function UserTextbook() {
  const [books, setBooks] = useState([]);
  const {search} = useLocation();

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get("/books"+search);
      setBooks(res.data);
    };
    fetchBooks();
  }, [search]);

  return (
      <div className="main">
        <div className="title">
            <h1>Textbooks by users</h1>
            <button className="button">
                <Link className="link" to="/newBook">
                    <i class="fa fa-plus-circle" aria-hidden="true"></i> 
                    Add new textbook
                </Link>
            </button>
        </div>
        <div className='userTexbooks'>
          <Books books={books}/>
        </div>
      </div>
    
  )
}
