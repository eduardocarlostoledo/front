import { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from "../styles/Login.module.css";
import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { userLogin, UserActive, ChangeNav, postUsersGoogle, loginGoogle } from '../redux/actions/UsersActions';
import swal from 'sweetalert';
import jwt_decode from "jwt-decode";

function validate(input) {

    let errors = {};
    const regexEmail = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g

    if (!input.password) {
        errors.password = "password is required";
    }

    if (input.password.length > 12) {
        errors.password = "Max 12 caracteres";
    }

    if (input.password.length < 5) {
        errors.password = "Min 5 caracteres";
    }
    if (input.email && !regexEmail.test(input.email)) {
        errors.email = "insert email valid";
    }
    if (!input.email) {
        errors.email = "email is required";
    }
    return errors;
};


export const Login = () => {
    const [example, setExample] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [errormsg, setErrormsg] = useState(false)
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const [infoGoogle, SetInfoGoogle] = useState({
        email: "",
        lastname: "",
        name: "",
        image: "",
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    };



    
//   useEffect(() => {
//     const isAuthenticated = localStorage.getItem('isAuthenticated');
//     if (isAuthenticated === "On") {
//       navigate('/Profile');
//     }
//   }, [navigate]);


    const viewAlert = async  () => {

          let hola = await dispatch(postUsersGoogle(infoGoogle));
          console.log(hola, "post");
           const email = {
            email : infoGoogle.email
           }
           console.log(email, "mail");
           const usuario = await dispatch(loginGoogle(email))
           console.log(usuario,  "usuario");

           if (usuario.success) {
            console.log(usuario.data.status, "status");  // ACA TENGO
           
            if (usuario.data.status) {

                if (usuario.data.admin) {

                    dispatch(UserActive(usuario))
                    dispatch(ChangeNav())
                    localStorage.setItem('isAuthenticated', "On");
                    setTimeout( ()=> {
                        navigate("/admin/users")
                }, 800)

                } else { 
                    dispatch(UserActive(usuario))
                    dispatch(ChangeNav())
                    localStorage.setItem('isAuthenticated', "On");
                    setTimeout( ()=> {
                        navigate("/Profile")
        
                }, 800)
                }
            


            } else { 
                return swal("User Banned", "your account has been suspended", "error");
            }
    }

  }

     function HandleCallbackResponse(response) {
        var userObject = jwt_decode(response.credential);  
        SetInfoGoogle({ email: userObject.email,
        lastname: userObject.family_name,
        name: userObject.given_name,
        image: userObject.picture
        }
        )     
        swal({
            title: "Iniciar sesion con mi cuenta de Google",
            text: "Al iniciar sesion das permiso a de acceder a tus datos como nombre, correo e imagen de perfil",
            icon: "warning",
            buttons: ["No", "Si"]
          }).then( (respuesta) => {
          if(respuesta){
            setExample(true)
          }
        })
       
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "816022596259-o6ktnr2grp3kpla75vn0f7n12o8nmej7.apps.googleusercontent.com",
            callback: HandleCallbackResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" },
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
    async function handleSubmit(e) {
        e.preventDefault();
        if (!input.password || !input.email) {
            return swal("Invalid", "Missing required fields!", "error");
        }
        else {
            const response = await dispatch(userLogin(input));
            if (response.data.success) {
                   
                    if (response.data.data.status) {

                        if (response.data.data.admin) { 
                            dispatch(UserActive(response.data))
                            dispatch(ChangeNav())
                            localStorage.setItem('isAuthenticated', "On");
                            setErrormsg(false)
                            setTimeout(() => {
                                setInput({
                                    email: "",
                                    password: ""
                                });
                                navigate("/admin/users")
                            }, 1300)

                        } else { 
                            dispatch(UserActive(response.data))
                            dispatch(ChangeNav())
                            localStorage.setItem('isAuthenticated', "On");
                            setErrormsg(false)
                            setTimeout(() => {
                                setInput({
                                    email: "",
                                    password: ""
                                });
                                navigate("/Profile")
                            }, 1300)
                        }

                
        

                    } else { 
                        return swal("User Banned", "your account has been suspended", "error");
                    }
               
            } else {
                setErrormsg(true)
                setTimeout(() => {
                    setErrormsg(false)
                }, 5000)
                return
          }

        }
    }


    return (
        <div className={styles.ContainerAllForm}>
            <Form className={styles.ContainerAll} onSubmit={e => handleSubmit(e)}>
                <div className={styles.register}>
                    <h2>Login</h2>
                </div>
                <Form.Group className={styles.pack} controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='email' onChange={e => handleChange(e)} value={input.email} className={styles.inputs} type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className={styles.pack} controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className={styles.inputs} name='password' value={input.password} onChange={e => handleChange(e)} type="password" placeholder="Password" />      
                </Form.Group>
                {errormsg && <small className={styles.msgerr}>Password or email invalid</small>}
                <div className={styles.containerBtn}>
                    <Button className={styles.btnR} type="submit">
                        Login
                    </Button>
                </div>
                <div style={{marginLeft: "150px", color: "rgb(0, 96, 151)", cursor: "pointer"}}>
                   <Link to="/changePass">I forgot my password</Link> 
                </div>
                <div className={styles.down}>
                    <h5>Dont have an account? <Link to="/Register"><button className={styles.here}>Register</button></Link> </h5>
                </div>
                    <div className={styles.containerBtn}>
                     {  !infoGoogle.name && !infoGoogle.email && !infoGoogle.lastname && <div id="signInDiv"></div>}
                    {
                   example && infoGoogle.name && infoGoogle.email && infoGoogle.lastname && <div onClick={viewAlert()}><strong>Ingresando...</strong></div>
                 }
                  </div>
            </Form>
        </div>
    )

}


// async function handleSubmit(e) {
//     e.preventDefault();
//     if (!input.password || !input.email) {
//         return swal("Invalid", "Missing required fields!", "error");
//     }
//     else {
//         const response = await dispatch(userLogin(input));
//         if (response.data.success) {
//             dispatch(UserActive(response.data))
//             dispatch(ChangeNav())
//             localStorage.setItem('isAuthenticated', "On");
//             setErrormsg(false)
//             setTimeout(() => {
//                 setInput({
//                     email: "",
//                     password: ""
//                 });
//                 navigate("/Profile")
//             }, 1300)

//         } else {
//             setErrormsg(true)
//             setTimeout(() => {
//                 setErrormsg(false)
//             }, 5000)
//             return
//       }

//     }
//  }