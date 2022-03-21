import "./singleLesson.css"

export default function SingleLesson({lesson}) {
    return(
        <div>
            <div>
                <h1>{lesson.lesson_title}</h1>
            </div>
            <div>
                <p>{lesson.lesson_body}</p>
            </div>
        </div>
    );
}