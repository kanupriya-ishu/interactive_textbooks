import { Link } from 'react-router-dom';
import './lessons.css'

export default function Lessons({lessons, book_id}) {
    return(
        <div className='lessons'>
            <h2 className='lessonsHeader'>Lessons</h2>
            <table>
                <thead>
                    <tr>
                        <th className='tbt'>Lesson no.</th>
                        <th className='tbt'>Lesson Title</th>
                        <th className='tbt'>Read</th>
                    </tr>
                </thead>
                <tbody>
                    {lessons.map((lesson) => (
                        <tr>
                            <td className='tbt' data-column="Lesson Number">{lesson.lesson_number}</td>
                            <td className='tbt' data-column="Lesson Title">{lesson.lesson_title}</td>
                            <td className='tbt' data-column="Read">
                                <Link className='link read' to={`/books/${book_id}/lessons/${lesson._id}`}>
                                    <i className="fa fa-book " aria-hidden="true"></i> Read
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}