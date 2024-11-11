import { useEffect } from "react";
import "../styles/About.css";
import AboutCard from "./AboutCard";
import Liam from "../images/Liam.png";
import Laia from "../images/Laia.png";
import Lean from "../images/Lean.png";
import Luci from "../images/Luci.png";
import Edu from "../images/Edu.png";
import Clau from "../images/Clau.png";
import Fran from "../images/Fran.png";

export default function About() {
    useEffect(() => {
        window.scrollTo(0, 0); // Mueve la ventana al inicio al cargar la página
    }, []);

    const integrantes = [
        {
            name: "Claudio Bernal",
            image: Clau,
            linkedin: "https://www.linkedin.com/in/claudio-andres-bernal-denis-148283234/",
            github: "https://github.com/ClaudioBe",
            portfolio: "",
            instagram: ""
        },
        {
            name: "Eduardo Carlos Toledo",
            image: Edu,
            linkedin: "https://www.linkedin.com/in/eduardo-toledo-639ab198/",
            github: "https://github.com/eduardocarlostoledo",
            portfolio: "",
            instagram: ""
        },
        {
            name: "Franco Chaparro",
            image: Fran,
            linkedin: "https://www.linkedin.com/in/franco-chaparro-134743252/",
            github: "https://github.com/FrancooChaparro",
            portfolio: "",
            instagram: ""
        },
        {
            name: "Laia Mia Pérez Lupia",
            image: Laia,
            linkedin: "https://www.linkedin.com/in/laia-m%C3%ADa-perez-029531245/",
            github: "https://github.com/laiamia5",
            portfolio: "https://portfolio-laia-perez.vercel.app/#curriculum",
            instagram: ""
        },
        {
            name: "Leandro Kronsteiner",
            image: Lean,
            linkedin: "https://www.linkedin.com/in/leankrn/",
            github: "https://github.com/leankrn",
            portfolio: "",
            instagram: ""
        },
        {
            name: "Liam Marlon Pérez Lupia",
            image: Liam,
            linkedin: "https://www.linkedin.com/in/liam-perez-lupia-33a189257/",
            github: "https://github.com/L03A95",
            portfolio: "",
            instagram: ""
        },
        {
            name: "Lucia Radwanski",
            image: Luci,
            linkedin: "https://www.linkedin.com/in/lradw/",
            github: "https://github.com/luciaradwanski",
            portfolio: "",
            instagram: ""
        }
    ].sort((a, b) => a.name.localeCompare(b.name)); // Ordena alfabéticamente por nombre

    return (
        <div className="about_container">
            {integrantes.map(({ name, image, linkedin, github, portfolio }, index) => (
                <AboutCard 
                    key={index}
                    name={name}
                    image={<img src={image} alt={name} className='profile_image' />}
                    linkedin={linkedin}
                    github={github}
                    portfolio={portfolio}
                />
            ))}
        </div>
    );
}
