import '../styles/Home.css';
import asus from '../images/asusMonitor.jpg'
import Ryzen from '../images/Ryzen7mil.jpg'
import samsung from '../images/samsungMonitores.jpg'
import { Link } from 'react-router-dom';


/** Coloque un diseño de Boostrap para las Imagenes */
export const Home = () => {
    
    return(
        <div className="HomeContainer">
            <div className='ContainerImages'>
                 {/* Acá esta el Boostrap */}
                <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                        <img src={asus} className="d-block w-100" alt="" />
                        </div>
                        <div className="carousel-item">
                        <img src={Ryzen} className="d-block w-100" alt="" />
                        </div>
                        <div className="carousel-item">
                        <img src={samsung} className="d-block w-100" alt="" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div> 
            <div className='ContainerGalery'>
                <div className='Galery'>
                    <div className='Card'>
                        <div className='Image'>
                            <img className='CardImg' src="https://www.venex.com.ar/products_images/1625487702_0413607bi.jpg" alt="Imagen 1" />
                        </div>
                        <div>
                            <p className='CardText'>The highest officially supported memory speed is 3200 MHz, but with overclocking (and the right memory modules) you can go even higher.</p>
                            <button className='CardButton'><Link to='/Products'>View More</Link></button>
                        </div>
                    </div>
                    <div className='Card'>
                        <img className='CardImg' src="https://www.deffo.com.ar/wp-content/uploads/2022/07/GV-N308TVISION-OC-12GD-1.webp" alt="Imagen 1" />
                        <div>
                            <p className='CardText'>Multiprocessors with memory interface, cooling system,  and alternate rotating fans Protective metal back plate.</p>
                            <button className='CardButton'><Link to='/Products'>View More</Link></button>
                        </div>
                    </div>
                    <div className='Card'>
                        <img className='CardImg' src="https://http2.mlstatic.com/D_NQ_NP_662444-MLA41254447964_032020-O.webp" alt="Imagen 1" />
                        <div>
                            <p className='CardText'>Corsair Virtuoso RGB Wireless SE espresso wireless gaming and headset with rgb LED light.</p>
                            <button className='CardButton'><Link to='/Products'>View More</Link></button>
                        </div>
                    </div>
                    <div className='Card'>
                        <img className='CardImg' src="https://gorilagames.com/img/Public/1019-producto-corsari-blanca-8914.jpg" alt="Imagen 1" />
                        <div>
                            <p className='CardText'>Thanks to RGB lighting control Tec. (patent pending), your system can be synchronized with any motherboard platform for beautiful RGB lighting.</p>
                            <button className='CardButton'><Link to='/Products'>View More</Link></button>
                        </div>
                    </div>
                    <div className='Card'>
                        <img className='CardImg' src="https://http2.mlstatic.com/D_NQ_NP_2X_796880-MLA43468491094_092020-F.webp" alt="Imagen 1" />
                        <div>
                            <p className='CardText'>
Master Edition Hyper 212 Black Heatsink, CPU Air Cooler, Silencio FP120 Fan, Anodized Black, Brushed Nickel Fins, 4 Direct Contact Copper.</p>
                            <button className='CardButton'><Link to='/Products'>View More</Link></button>
                        </div>
                    </div>
                    <div className='Card'>
                        <img className='CardImg' src="https://http2.mlstatic.com/D_NQ_NP_2X_825550-MLA51822045233_102022-F.webp" alt="Imagen 1" />
                        <div>
                            <p className='CardText'>Gamer Headphones Redragon H220 Themis Black With Red Led Light</p>
                            <button className='CardButton'><Link to='/Products'>View More</Link></button>
                        </div>
                    </div>
                    <div className='Card'>
                        <img className='CardImg' src="https://computelweb.com/wp-content/uploads/2020/12/G903-FRENTE.png" alt="Imagen 1" />
                        <div>
                            <p className='CardText'>It has an optical movement detection system that will allow you to move the cursor in a more precise and sensitive way than in traditional systems.</p>
                            <button className='CardButton'><Link to='/Products'>View More</Link></button>
                        </div>
                    </div>
                    <div className='Card'>
                        <img className='CardImg' src="https://www.comeros.com.ar/wp-content/uploads/2022/01/Comeros-ASUS-ROG-STRIX-RTX3060TI-O8G-V2-GAMING-fcc87b-1.webp" alt="Imagen 1" />
                        <div className='CardB'>
                            <p className='CardText'>Notebook Asus Rog Strix G17 16gb Ryzen 7 6800h 512gb Pcreg</p>
                            <button className='CardButton'><Link to='/Products'>View More</Link></button>
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>
    )
}