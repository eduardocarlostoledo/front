import "../styles/About.css"
import linkedin_logo from "../images/Linkedin_Logo.png"
import github_logo from "../images/Github_Logo.png"
import portfolio_logo from "../images/Portfolio_Logo.png"

export default function AboutCard ({image,name,linkedin,github,portfolio}) {
    console.log(linkedin)
    return (
        <div className="integrant_card">
            {image}
            <h5 className="integrant_name">{name}</h5>
            <div>
               <a target="_blank" rel="noopener noreferrer" href={linkedin}><img className="link" src={linkedin_logo} /></a>
                {github ? <a  target="_blank" rel="noopener noreferrer" href={github}><img className="link" src={github_logo} href={github}/></a> : null}
                {portfolio ? <a target="_blank" rel="noopener noreferrer" href={portfolio}><img className="link" src={portfolio_logo} href={portfolio} /></a> : null} 
            </div>
        </div>
    )
}