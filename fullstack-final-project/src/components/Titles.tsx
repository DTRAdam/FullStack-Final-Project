import { FunctionComponent, useEffect, useState } from "react";

interface TitlesProps {
}

const Titles: FunctionComponent<TitlesProps> = () => {
    let bgi = [
        {
            image: {
                trophyTitles: "GYM Owner",
                url: "/gym2.webp",
                alt: "",
                titleDesc: "John Doe, widely recognized as @johndoe on Instagram, is a professional bodybuilder, multiple - time national champion, and entrepreneur in the Israeli fitness scene.He is best known for his impressive record in physique competitions and for owning a well - known gym brand in Israel."

            }
        },
        {
            image: {
                trophyTitles: "MBC Mr. Israel",
                url: "/gym1.webp",
                alt: "MBC Mr.Isreal",
                titleDesc: "John Doe is the founder and owner of a fitness gym in Israel.He won 1st Place at MBC Mr.Israel, a bodybuilding competition held in Israel where top male athletes compete for the prestigious national title of “Mr.Israel.” The event showcases physical strength, muscular development, and symmetry.While it occasionally gains media attention from regional networks like MBC, it is primarily a local Israeli competition and is not directly affiliated with the MBC channel.The title “Mr.Israel” is regarded as a significant honor in Israeli bodybuilding"
            }
        },
        {

            image: {
                trophyTitles: "Men’s Physique champion",
                url: "/Gym.webp",
                alt: "Men’s Physique champion",
                titleDesc: "Overall Men’s Physique Champion in Israel means the athlete was the best among all height class winners in a bodybuilding competition. After each class has a winner, the judges compare them one last time — and the top overall performer earns the title. It’s one of the highest honors, showing the athlete had the best physique, symmetry, and stage presence of the entire division."
            },
        }
    ]
    const [index, setIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);


    useEffect(() => {
        if (isHovered) return;
        const intervalId = setInterval(() => {
            setIndex((index) => (index + 1) % bgi.length);
        }, 4000);
        return () => clearInterval(intervalId);
    }, [isHovered, bgi.length]);
    return (
        <div className="titlesmaindiv">
            <h1 className="section-title">
                Titles <i className="fa-solid fa-trophy"></i>
            </h1>
            <div
                className="bgidiv"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    backgroundImage: `url(${bgi[index].image.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "65vh",
                    width: "65vw",
                    position: "relative",
                    transition: "background-image 0.9s ease-in-out",
                }}
            >
                <div data-aos="fade-in"
                    data-aos-offset="0" >
                    <div className="titletext">
                        <h2 className="section-title">
                            {bgi[index].image.trophyTitles === "GYM Owner" ? (
                                <>
                                    {bgi[index].image.trophyTitles} <i className="fa-solid fa-dumbbell"></i>
                                </>
                            ) : (
                                <>
                                    {bgi[index].image.trophyTitles} <i className="fa-solid fa-ranking-star"></i>
                                </>
                            )}
                        </h2>
                        <p className="title-desc">
                            {bgi[index].image.titleDesc}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Titles;