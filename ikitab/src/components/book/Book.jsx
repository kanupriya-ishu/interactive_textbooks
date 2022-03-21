import "./book.css"
import { Link } from "react-router-dom";

export default function Book({ book }) {
    return (
        <div className="book">
            <div className="bookInfo">
                <Link to={`/book/${book._id}`} className="link">
                    <span className="bookTitle">{book.book_title}</span>
                </Link>
                <p className="bookDesc">{book.book_desc}</p>
            </div>
        </div>
    )
}
