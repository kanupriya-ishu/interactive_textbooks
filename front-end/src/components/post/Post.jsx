import "./post.css"

export default function Post() {
  return (
    <div className="post">
        <img className="postImg" src="https://images.unsplash.com/photo-1612151855475-877969f4a6cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGQlMjBpbWFnZXxlbnwwfHwwfHw%3D&w=1000&q=80" alt=""/>
        <div className="postInfo">
            <div className="postCats">
                <span className="postCat">Music</span>
                <span className="postCat">Life</span>
            </div>
            <span className="postTitle">Lorem ipsum dolor sit amet</span>
            <hr />
            <span className="postDate">1 hour ago</span>
        </div>
        <p className="postDesc"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio ipsum consectetur eos alias similique. Earum ullam corporis suscipit et architecto? Nisi assumenda animi rem! Autem magni ut quo? Tenetur, soluta.</p>
    </div>
  )
}
