import { FunctionComponent } from "react";

interface PageNotFoundProps {

}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
    return (
        <>
            <div className="container notfoundcontainer ">
                <div className="notfoundtext " data-aos="fade-in" data-aos-offset="0">
                    <h1 className="notfoundh">404 PAGE NOT FOUND <i className="fa-solid fa-exclamation fa-bounce"></i><i className="fa-solid fa-question fa-bounce"></i></h1>
                </div>
            </div>
        </>
    );
}

export default PageNotFound;