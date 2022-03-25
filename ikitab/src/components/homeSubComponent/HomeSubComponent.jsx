import "./homeSubComponent.css";
import { Link } from "react-router-dom";
import book from "../../assets/images/book.jpg";

export default function HomeSubComponent(){
    return(
        <div className="row row-content align-items-center sub">
          <div className="col-12 col-sm-3 image">
            <img className="d-flex mr-3 img-thumbnail align-self-center image"
            src={book} alt="discuss"/>
          </div>
            <div className="col-12 order-first col-sm-6 order-sm-last">
              <div className="media-body">
                  <h2 className="mt-0 heading">Textbook Collection</h2>
                  <p  className="d-none d-sm-block text">An interactive textbook is an ebook version of a textbook that holds elements of interactivity. Here is the collection of interactive textbooks on various topics created by our users all around the world. </p>
              </div>
            </div>
            <div className="col-12 col-sm-3 order-last">
                
                <Link  to="/userTextbooks" className="btn btn-warning btn-block browse-button">Browse</Link>
            </div>
        </div>
    );
}