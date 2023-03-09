import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export const Footer = () => {
    return (
        <footer className='ContainerFooter'>
            <div className='ContainerLogo'>
                <div className='Logo'>
                    <h3 className='Computer'>Computer Store</h3>
                    <img width="60px" src="https://static.vecteezy.com/system/resources/thumbnails/009/096/946/small/monitor-screen-computer-with-colorful-rainbow-bubble-illustration-logo-design-vector.jpg" alt="" />
                    {/* logos */}
                </div>
                <Link className='LinkMembers' to="/about">
              <h3><strong> Members </strong></h3>    
                </Link>
            </div>
                        <p className='Copyright' >Copyright ©. Computer store.</p> 
        </footer>
    
    )
}