import React, { useEffect, useState } from "react"
import "../styles/Profile.css"
import { BiLogOutCircle } from "react-icons/bi"
import { FaPhone, FaCity } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import { IoSettingsOutline } from "react-icons/io5"
import Form from 'react-bootstrap/Form';
import { PutUserProfile, deleteUserLocalStorage, getAllUsers, UserActive } from '../redux/actions/UsersActions';
import { getUpdate, update  } from '../redux/actions/CartActions';
import swal from 'sweetalert';
import { useNavigate, Link  } from "react-router-dom"
import { BsSendDash } from "react-icons/bs"

export default function Profile() {
  const dispatch = useDispatch()
  const up = useSelector(state => state.update)
  const userActive = JSON.parse(localStorage.getItem("USUARIO")) || []
  useEffect(() => {
    dispatch(getUpdate());    
    dispatch(getAllUsers());
    dispatch(update(false));
  }, [up])
  const [country, setCountrie] = useState({})

  useEffect(() => {
    fetch(`https://back-production-148d.up.railway.app/order`)
      .then((res) => res.json())
      .then((data) => {
        setCountrie(data);
      })
      .catch((error) => console.log(error));
    return () => setCountrie({});
  }
    , []);
  
console.log(country, "count");
  // const history = useHistory();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const isAuthenticated = localStorage.getItem('isAuthenticated');
  //   if (isAuthenticated === "afuera") {
  //     navigate('/login');
  //   }
  // }, [navigate]);


  // const userActive = useSelector((state) => state.userActive)
  const [Panel, setPanel] = useState(true);

  
  const [input, setInput] = useState({
    image: userActive.image ? userActive.image.secure_url : "",
    city: userActive.city ? userActive.city : "",
    id: userActive.id ,
    phonenumber: userActive.phonenumber ? userActive.phonenumber : "",
    address: userActive.address ? userActive.address : "",
    country: userActive.country ? userActive.country : "",
    email: userActive.email,
  });


  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };
  const handleChangeImage =(e) => {
    setInput({ ...input, image: e.target.files[0]})
  }

  function CerrarSes(e) {
    e.preventDefault();
    setTimeout(() => {
      dispatch(deleteUserLocalStorage())
      window.localStorage.removeItem("USUARIO")
      localStorage.setItem('isAuthenticated', "afuera");
      navigate("/Login")
    }, 1300)
  }

  function Cancel(e) {
    e.preventDefault();
    setPanel(true)
    setInput({

      image: userActive.image ? userActive.image : "",
      city: userActive.city ? userActive.city : "",
      id: userActive.id,
      phonenumber: userActive.phonenumber ? userActive.phonenumber : "",
      address: userActive.address ? userActive.address : "",
      country: userActive.country ? userActive.country : "",
      email: userActive.email,
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    // if (input.email === "") input.email = userActive.email
    // if (input.password === "") input.password = userActive.password
    // if (input.passwordConfirm === "") input.passwordConfirm = userActive.passwordConfirm
    // if (input.phonenumber === "") input.phonenumber = userActive.phonenumber
    // if (input.country === "") input.country = userActive.country
    // if (input.image === "") input.image = userActive.image
    // if (input.city === "") input.city = userActive.city
    const data = new FormData();
    Object.keys(input).forEach((key) => data.append(key, input[key]));
    dispatch(PutUserProfile(data, input.id))
    dispatch(update(true));
    // dispatch(PutUser({
    //   ...input, name: userActive.name,
    //   lastname: userActive.lastname,
    //   status: userActive.status, 
    //   admin: userActive.admin
    // }));
    swal("success", 'User modified successfully', "success")
    setInput({
      ...input
    });
    setPanel(true)
    
  }


  return (
    <div className="contenedor_profile">
     {!JSON.parse(localStorage.getItem("Navbar")) ? <div className="Container">
        <div className="izquierda">
          <div className="containerImg">
            <Card.Img className="ImagenProfile" variant="top" src={userActive.image ? userActive.image.secure_url : "https://cdn-icons-png.flaticon.com/512/3135/3135768.png"} />
          </div>
          <div className="InfoUser">
            <div className="InfoUser-Name">
              <h3>{userActive.name} {userActive.admin ? <span style={{ color: "green", fontSize: "11px", border: "0.01rem solid green", padding: "2px", borderRadius: "6px"}}>admin</span> : ""}</h3>
            </div>
            <div>
              <FaCity className="icono"></FaCity><span>{userActive.city ? userActive.city : "Ciudad"}, Argentina</ span>
            </div>
            <div>
              <FaPhone className="icono"></FaPhone><span>{userActive.phonenumber ? userActive.phonenumber : "+54 9 11 2222 5555"}</span>
            </div>
            <div>
              <button className="logout" onClick={(e) => CerrarSes(e)}>
                <BiLogOutCircle></BiLogOutCircle > Log out
              </button>
            </div>
          </div>
        </div>
        {Panel ? <div className="derecha">
          <div className="hogar">
            <h1>{userActive.name} {userActive.lastname}</h1>
            <button onClick={() => setPanel(false)} className="hola"><IoSettingsOutline className="setting"></IoSettingsOutline></button>
          </div>
          <h3><a href="https://login.live.com/" target="_blank" rel="noopener noreferrer">{userActive.email}</a></h3>
          <h4>Address: {userActive.address ? userActive.address : "Street 151515"}</h4>
        { 
       userActive.admin ? <div style={{marginTop: "15px"}}>
              <div>
              <Link to="/admin/users"><button className="dashboard"><span><BsSendDash /> Dashboard Admin</span></button></Link>
              </div>
          </div>
        :
          <div style={{marginTop: "15px"}}>
             <h3><strong>My orders</strong></h3>
             {country.length > 0 && country?.map((e, index) => {
                    if(e.buyer_email === userActive.email ) {
                       return (<h6 key={index}>Products: {e.product_description} <br/> Total price {e.total_order_price} $ <span style={{color: "green", fontSize: "11px", border: "0.01rem solid green", padding: "2px", borderRadius: "6px"}}>{e.statusId}</span><hr/></h6>)
                    }
                  })
              }
          </div>
        }

        </div>
          :
          <div className="modificar">
            <Form>
              <div className="prueba">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control name='email' value={input.email} onChange={e => handleChange(e)} className="inputs" type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Phonenumber">
                  <Form.Label>Phonenumber</Form.Label>
                  <Form.Control name='phonenumber' value={input.phonenumber} onChange={e => handleChange(e)} className="inputs" type="text" placeholder="Enter phonenumber" />
                </Form.Group>
              </div>

              <div className="prueba">
                <Form.Group className="mb-3" controlId="Country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control style={{ userSelect: "none", border: "0.01rem solid grey", backgroundColor: "white" }} name='country' value={input.country} onChange={e => handleChange(e)} className="inputs" disabled={true} type="text" placeholder="Enter country" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="City">
                  <Form.Label>City</Form.Label>
                  <Form.Select style={{ border: "0.01rem solid grey", width: "203px" }} name="city" onChange={e => handleChange(e)} aria-label="Default select example">
                    <option> {userActive.city ? userActive.city : "Select City"}</option>
                    <option value="Buenos Aires">Buenos Aires</option>
                    <option value="Catamarca">Catamarca</option>
                    <option value="Chaco">Chaco</option>
                    <option value="Chubut">Chubut</option>
                    <option value="CABA">Ciudad Autónoma de Buenos Aires</option>
                    <option value="Córdoba">Córdoba</option>
                    <option value="Corrientes">Corrientes</option>
                    <option value="Entre Ríos">Entre Ríos</option>
                    <option value="Formosa">Formosa</option>
                    <option value="Jujuy">Jujuy</option>
                    <option value="La Pampa">La Pampa</option>
                    <option value="La Rioja">La Rioja</option>
                    <option value="Mendoza">Mendoza</option>
                    <option value="Misiones">Misiones</option>
                    <option value="Neuquén">Neuquén</option>
                    <option value="Río Negro">Río Negro</option>
                    <option value="Salta">Salta</option>
                    <option value="San Juan">San Juan</option>
                    <option value="San Luis">San Luis</option>
                    <option value="Santa Cruz">Santa Cruz</option>
                    <option value="Santa Fe">Santa Fe</option>
                    <option value="Santiago del Estero">Santiago del Estero</option>
                    <option value="Tierra del Fuego">Tierra del Fuego</option>
                    <option value="Tucumán">Tucumán</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="prueba">
                <Form.Group className="mb-3" controlId="Address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control name='address' value={input.address} onChange={e => handleChange(e)} className="inputs" type="text" placeholder="Enter address" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Imagen">
                  <Form.Label>Imagen URL</Form.Label>
                  <Form.Control name='image' onChange={e => handleChangeImage(e)} className="inputs" type="file" placeholder="Enter URL image" />
                </Form.Group>
              </div>
              <div className="sopapa">
                <div>
                  <button className="cancel" onClick={(e) => Cancel(e)}>
                    Cancel
                  </button>
                </div>
                <div>
                  <button className="modifi" onClick={(e) => handleSubmit(e)} >
                    Modify
                  </button>
                </div>
              </div>
            </Form>
          </div>
        }
      </div>
:  <div className="Container"> 
    
</div>
}

    </div>
  )
}

