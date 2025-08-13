import { FunctionComponent } from "react";
import '@google/model-viewer'
interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
    return (
        <>
            <div className="home" data-aos="fade-in"
                data-aos-offset="0">
                <div className="card homecard">
                    <model-viewer src="/protein3d.glb" ar ar-modes="webxr scene-viewer quick-look" camera-controls poster="\proteinnobgc.webp"></model-viewer>
                    {/* <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default Home;