import {BsFillPeopleFill} from "react-icons/bs"
import {MdProductionQuantityLimits, MdPowerSettingsNew }from "react-icons/md"
import {AiFillSetting} from "react-icons/ai"
import {TfiReload} from "react-icons/tfi";
import { useDispatch } from "react-redux";
import { IoIosCreate} from "react-icons/io"
import { BsBorderStyle} from "react-icons/bs" 
import { Link } from "react-router-dom"; 
import ".././styles/NavAdmin.css";
import { useLocation, useNavigate } from "react-router-dom";
import styles from ".././styles/NavAdmin.css"
import {  deleteUserLocalStorage } from '../redux/actions/UsersActions';
import { GiHamburgerMenu } from "react-icons/gi"

export function NavAdmin({handleClick, handleSubmit, handleInputChange, name}) {
  // const UserAdmin = useSelector((state) => state.UserActive);
  const UserAdmin = JSON.parse(localStorage.getItem("USUARIO")) || [];
  const Location = useLocation()
  const navigate = useNavigate();
  const dispatch = useDispatch()

  function CerrarSes(e) {
    e.preventDefault();
    setTimeout(() => {
      dispatch(deleteUserLocalStorage())
      localStorage.setItem('isAuthenticated', "afuera");
      window.localStorage.removeItem("USUARIO")
      navigate("/Login")
    }, 1300)
  }

  return (
    <nav className="navbar bg-body-tertiary fixed-top ">
      <div className="container-fluid">
        <h2 className="navbar-brand" >
          Computer store
        </h2>

     { Location.pathname === "/admin/Orders" || Location.pathname === "/admin/CreateProduct" ? null :  <form className="d-flex mt-3" role="search">
              <input
                className="inputt"
                value={name}
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => handleInputChange(e)}
              />
              <button onClick={(e) => handleSubmit(e)}  className="bbb" type="submit">
                Search
              </button>
              <button onClick={(e) => handleClick(e)} className="bbb" type="submit">
                <TfiReload />
              </button>
            </form>}
   {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}
           <button
          className="navbar-toggler"
          style={{border: "0.01rem solid white", boxShadow: "none"}}
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
         <GiHamburgerMenu  style={{color: "white"}}/>
        </button>
      
        
      
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >



          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Admin dashboard 
            </h5>
            <button
              type="button"
              className="AVER"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >X</button>
          </div>




          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
              <Link style={{textDecoration: "none"}} to="/admin/users">   <a className="nav-link " aria-current="page" href="#">
                 <BsFillPeopleFill />  Users
                </a></Link> 
              </li>
              <li className="nav-item">
              <Link style={{textDecoration: "none"}} to="/admin/Products">   <a className="nav-link" href="#">
                 <MdProductionQuantityLimits  /> Products
                </a></Link>
              </li>

              <li className="nav-item">
              <Link style={{textDecoration: "none"}} to="/admin/Orders">  <a className="nav-link" href="#">
                 <BsBorderStyle  /> Orders
                </a> </Link>
              </li>

              <li className="nav-item">
              <Link style={{textDecoration: "none"}} to="/admin/CreateProduct">  <a className="nav-link" href="#">
                 <IoIosCreate  /> Create Product
                </a> </Link>
              </li>

              <li className="nav-item">
              <Link style={{textDecoration: "none"}} to="/Profile">  <a className="nav-link " aria-current="page" href="#">
                 <AiFillSetting /> Settings 
                </a>  </Link>
              </li>
              <li className="nav-item">
              <Link style={{textDecoration: "none"}}  onClick={(e)=> CerrarSes(e)}> <a className="nav-link" href="#">
                 < MdPowerSettingsNew />  LogOut 
                </a> </Link> 
              </li>
            </ul>
   
      <div className="footerContainer" >
        <div className="ContImage" >
         <img src={UserAdmin.image ? UserAdmin.image : "https://cdn-icons-png.flaticon.com/512/3135/3135768.png"} alt="admin" />
        </div>
        <div className="Contname" >
            <span>Computer store</span>
        </div>
      </div>

          </div>
        </div>
      </div>
    </nav>

  );
}

