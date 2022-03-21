import { Link } from 'react-router-dom';
import './lessons.css'

export default function Lessons({lessons, book_id}) {
    return(
        <div className='lessons'>
            <h2 className='lessonsHeader'>Lessons</h2>
            <table>
                <thead>
                    <tr>
                        <th>Lesson no.</th>
                        <th>Lesson Title</th>
                        <th>Read</th>
                    </tr>
                </thead>
                <tbody>
                    {lessons.map((lesson) => (
                        <tr>
                            <td data-column="Lesson Number">{lesson.lesson_number}</td>
                            <td data-column="Lesson Title">{lesson.lesson_title}</td>
                            <td data-column="Read">
                                <Link to={`/books/${book_id}/lessons/${lesson._id}`}>
                                    <i class="fa fa-book" aria-hidden="true"></i> Read
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}