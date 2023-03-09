import { NavAdmin } from "./navAdmin";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useNavigate } from "react-redux";
import { Table, Tag } from "antd";
import { getAllUsers, PutUser, getAllUsersName} from "../redux/actions/UsersActions";
import { AiFillSetting } from "react-icons/ai";
import { FaBan } from "react-icons/fa"
import { GrUserAdmin } from "react-icons/gr"
import swal from "sweetalert"
import { FaUserCheck } from "react-icons/fa"
import { MdOutlineVerifiedUser } from "react-icons/md"
import styles from "../styles/AdminUsers.module.css";
import axios from "axios"

const InfoUser = ({email, name, image, lastname, status, country}) => {
// const replica = country.buyer_email

// console.log(country, "me llega");
// console.log(email, "mail");

  return (
    <div className={styles.Contenedor}>
        <div className={styles.ContenedorImg}>
            <img src={image ? image : "https://cdn-icons-png.flaticon.com/512/3135/3135768.png"} alt={name} />
        </div>
        <div className={styles.ContenedorData}>
              <h4>{name} {lastname} {status ? <span className={styles.verde}>User Active</span> : <span className={styles.rojo}>User Banned</span> }</h4>
              <div className={styles.centrado}><h5>Ordenes</h5>
                {
                  country?.map((e, index) => {
                    if(e.buyer_email === email ) {
                       return (<h6 key={index}>{e.product_name} {e.product_unit_price} $ <span style={{color: "green", fontSize: "11px", border: "0.01rem solid green", padding: "2px", borderRadius: "6px"}}>{e.statusId}</span></h6>)
                    }
                  })
                }
              
              </div>
        </div>
    </div>
  )
}



export const AdminUsers = () => {

  const [country, setCountrie] = useState({})


  useEffect(() => {
    fetch(`http://localhost:3001/order`)
      .then((res) => res.json())
      .then((data) => {
        setCountrie(data);
      })
      .catch((error) => console.log(error));
    return () => setCountrie({});
  }
    , []);
  
    console.log(country, "hola");

 
  const [reload, setReload] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getAllUsers());
  };

  let users = useSelector((state) => state.users || []);

  const newUsers = users.map((user) => ({
    ...user,
    key: user.id,
  }));



  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAllUsersName(name));
    setName("");
  };


 
  
  const setAdmin = (value) => {

    const { password, ...values } = value;
   
    console.log({...values, admin: value.admin});
     
    if (value.admin) { 
      swal({
        title: `Estas seguro que deseas quitar admin a ${value.name}`,
        text: "Quitar ADMIN",
        icon: "warning",
        buttons: ["No", "Si"]
      }).then( (respuesta) => {
      if(respuesta){
        dispatch(PutUser({
          ...values, admin: !value.admin
       }));
       setReload(!reload)
      }
    })
    } else { 
      swal({
        title: `Estas seguro que deseas hacer admin a ${value.name}`,
        text: "Sera ADMIN",
        icon: "warning",
        buttons: ["No", "Si"]
      }).then( (respuesta) => {
      if(respuesta){
        dispatch(PutUser({
          ...values, admin: !value.admin
       }));
       setReload(!reload)
      }
    })

    }


   

  }

  const setStatus = (value) => { 
    if(value.status) { 
      swal({
        title: `Estas seguro que deseas bannear a ${value.name}`,
        text: "Bann",
        icon: "warning",
        buttons: ["No", "Si"]
      }).then( (respuesta) => {
      if(respuesta){
        dispatch(PutUser({
          ...value, status: !value.status
       }));
      }
    })
    } else { 
      swal({
        title: `Estas seguro que deseas hacer quitar el bann a ${value.name}`,
        text: "Desbanear",
        icon: "warning",
        buttons: ["No", "Si"]
      }).then( (respuesta) => {
      if(respuesta){
        dispatch(PutUser({
          ...value, status: !value.status
       }));
      }
    })
    }

    
 
  }


  const column = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "ascend",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Nombre",
      dataIndex: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Admin",
      dataIndex: "admin",
      render: (value) => (
        <Tag color={value === true ? "green" : "red"}>
          {value === true ? "admin" : "No Admin"}
        </Tag>
      ),
      filters: [
        {
          text: "admin",
          value: true,
        },
        {
          text: "noAdmin",
          value: false,
        },
      ],
      onFilter: (value, record) => record.admin === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <Tag color={value === true ? "green" : "red"}>
          {value === true ? "Active" : "Banned"}
        </Tag>
      ),
      filters: [
        {
          text: "Active",
          value: true,
        },
        {
          text: "Banned",
          value: false,
        },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      dataIndex: "",
      render: (value) => (
        <div>

        {value.status ? <button className={styles.btnIcons}  onClick={() => setStatus(value)} >
            <FaBan className={styles.banned}/>
          </button>
          : <button  button  className={styles.btnIcons} onClick={() => setStatus(value)} >
          <FaUserCheck className={styles.Desbanned}/>
        </button>
          }
    
          {value.admin ? <button  className={styles.btnIcons} onClick={() => setAdmin(value)}>
            <GrUserAdmin className={styles.DesAdmin}/>
          </button>
        : <button button  className={styles.btnIcons} onClick={() => setAdmin(value)}>
         <MdOutlineVerifiedUser className={styles.Setadmin} /> 
      </button>}
        </div>
      ),
    },
    Table.EXPAND_COLUMN,
  ];


  return (
    <div>
      <NavAdmin name={name} handleInputChange={handleInputChange} handleSubmit={handleSubmit} handleClick={handleClick} />
     <div style={{ marginTop: "80px", padding: "20px" }}>
        <Table style={{backgroundColor: "rgb(245, 245, 235)"}} columns={column} dataSource={newUsers}   expandable={{
            expandedRowRender: (record) => (
              <InfoUser email={record.email} country={country} name={record.name} lastname={record.lastname} image={record.image} status={record.status}/>
            ),
          }}/>
      </div>
    </div>
  );
};