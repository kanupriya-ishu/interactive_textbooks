import Book from '../book/Book'
import './books.css'

export default function Books({books}) {
    return (
        <div className='books'>
            {books.map((b) => (
                <Book book={b} />
            ))}
        </div>
    )
}