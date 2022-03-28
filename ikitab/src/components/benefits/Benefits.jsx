import "./benefits.css";

export default function Benefits(){
    return(
        <div className="benefits"> 
            <div className="col-4 benefit">
                <i class="fa fa-check-circle" aria-hidden="true"></i> Improved comprehension skills
            </div>

            <div className="col--4 benefit">
                <i class="fa fa-check-circle" aria-hidden="true"></i> Better retention
            </div>

            <div className="col-4 benefit">
                <i class="fa fa-check-circle" aria-hidden="true"></i> Enhanced reading
            </div>
        </div>
    );
}