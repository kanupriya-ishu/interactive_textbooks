import "./header.css"
import headerimg from "../../assets/images/headerimg.gif"

export default function Header() {
  return (
    // <div className='header'>
    //     <img className="headerImg" src="https://csc4girlblog.files.wordpress.com/2017/11/laptop-book-animation.gif" alt=""></img>
    //     <div className="headerTitles">
    //         <span className="headerTitleLg">iKitab</span>
    //         <span className="headerTitleSm">Where every reading experience turns into an interactive journey!</span>
    //     </div>
        
    // </div>

    <div className='header'>
      <img className="headerimg" src={headerimg} alt="header image" />
      <p className="tagline">Where every reading experience turns into an interactive journey!</p>
    </div>
  )
}
