import "../styles/About.css"
import AboutCard from "./AboutCard"
import Liam from "../images/Liam.png"
import Laia from "../images/Laia.png"
import Lean from "../images/Lean.png"
import Luci from "../images/Luci.png"
import Edu from "../images/Edu.png"
import Clau from "../images/Clau.png"
import Fran from "../images/Fran.png"

export default function About () {
    const integrantes = [{
            name:"Liam Marlon Pérez Lupia",
            image:<img src={Liam} className='profile_image'/>,
            linkedin:"https://www.linkedin.com/in/liam-perez-lupia-33a189257/" ,
            github:"https://github.com/L03A95",
            portfolio:"",
            instagram:""},
            {
            name:"Leandro Kronsteiner",
            image:<img src={Lean} className='profile_image'/>,
            linkedin:"https://www.linkedin.com/in/leankrn/" ,
            github:"https://github.com/leankrn",
            portfolio:"",
            instagram:""},
            {
            name:"Lucia Radwanski",
            image:<img src={Luci} className='profile_image'/>,
            linkedin:"https://www.linkedin.com/in/lradw/" ,
            github:"https://github.com/luciaradwanski",
            portfolio:"",
            instagram:""},
            {
            name:"Eduardo Carlos Toledo",
            image:<img src={Edu} className='profile_image'/>,
            linkedin:"https://www.linkedin.com/in/eduardo-toledo-639ab198/" ,
            github:"https://github.com/eduardocarlostoledo",
            portfolio:"",
            instagram:""},
            {
            name:"Laia Mia Pérez Lupia",
            image:<img src={Laia} className='profile_image'/>,
            linkedin:"https://www.linkedin.com/in/laia-m%C3%ADa-perez-029531245/" ,
            github:"https://github.com/laiamia5",
            portfolio:"https://portfolio-laia-perez.vercel.app/#curriculum",
            instagram:""},
            {
            name:"Franco Chaparro",
            image:<img src={Fran} className='profile_image'/>,
            linkedin:"https://www.linkedin.com/in/franco-chaparro-134743252/" ,
            github:"https://github.com/FrancooChaparro",
            portfolio:"",
            instagram:""},
            {
            name:"Claudio Bernal",
            image:<img src={Clau} className='profile_image'/>,
            linkedin:"https://www.linkedin.com/in/claudio-andres-bernal-denis-148283234/" ,
            github:"https://github.com/ClaudioBe",
            portfolio:"",
            instagram:""},
        ]

    return (
        <div className="about_container">
            {integrantes.map((i) => {
                return (
                    <AboutCard 
                    name={i.name}
                    image={i.image}
                    linkedin={i.linkedin}
                    github={i.github}
                    portfolio={i.portfolio}
                    />
                )
            })}
        </div>
    )
}