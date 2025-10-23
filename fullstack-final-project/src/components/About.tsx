import { FunctionComponent } from "react";
import { Link } from "react-router-dom";


interface AboutProps {

}

const About: FunctionComponent<AboutProps> = () => {

    return (
        <>
            <h1 className="section-title">
                About us <i className="fa-solid fa-circle-info"></i>
            </h1>
            <div className="about" data-aos="fade-in" data-aos-offset="0" >
                <div className="profile-card">
                    <div className="profile-info">
                        <h1 className="aboutsecondheader"><strong>More Than Just a Gym</strong></h1>
                        <p>
                            Step inside <strong>GYMboxIL</strong> and experience a fitness journey led by John Doe — a renowned
                            physique champion and gym owner. His style blends strength, aesthetics and energy.
                        </p>
                        <div className="aboutbtnsdiv">
                            <button>
                                <Link className="link fs-5" to="/register">
                                    Join us <i className="fa-solid fa-user-plus"></i>
                                </Link>
                            </button>
                            <button >
                                <Link className="link fs-5" to="/titles">
                                    Titles <i className="fa-solid fa-trophy"></i>
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="aboutsectioncontainer">
                    <div className="about-section achievements">
                        <h3><strong>🏆 Achievements:</strong></h3>
                        <p>🥇 1st Place – <strong>MBC Mr. Israel</strong></p>
                        <p>🏅 4× Overall <strong>Men’s Physique Champion</strong> – IBFF & NABBA</p>
                    </div>

                    <div className="about-section owner">
                        <p><strong>💼 GYMboxIL Owner:</strong> John founded and operates this premium gym in Israel, offering
                            elite-level guidance to athletes and clients.</p>
                    </div>
                    <div className="about-text content">
                        <p><strong>📸 Content:</strong> His Instagram shares elite training videos, competition highlights, and
                            client transformations.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;