import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Home } from "./components/Home";
import { Products } from "./components/Products";
import { Detail } from "./components/Detail";
import { BuildPc } from "./components/BuildPc";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { Register } from "./components/Register";
import Profile from "./components/Profile";
import { Login } from "./components/Login";
import { CreateProducts } from "./components/CreateProduct";
import { GetFiltersForEmail, UserActive } from "./redux/actions/UsersActions";
import { useEffect } from "react";
import Cart from "./components/Cart";
import { AdminProducts } from "./components/AdminProducts";
import { AdminUsers } from "./components/AdminUsers";
import { AdminOrder } from "./components/AdminOrder";
import { useNavigate } from "react-router-dom";
import About from "./components/About";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ChangePass from "./components/Changepass";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userActive = JSON.parse(localStorage.getItem("USUARIO")) || {};

  // useEffect(()=>{
  //   const isAuthenticated = localStorage.getItem('isAuthenticated');
  //   dispatch(GetFiltersForEmail())

  //   if (isAuthenticated === "afuera" && location.pathname.substring(0, 6) === "/admin") {
  //     navigate('/login');
  //   }
  //   if (isAuthenticated === "On" && location.pathname.substring(0, 6) === "/admin" && !userActive.admin) {
  //     navigate('/Profile');
  //   }
  // },[dispatch])

  useEffect(() => {
    dispatch(GetFiltersForEmail());
  }, [dispatch]);

  return (
    <div className="App">
      {location.pathname === "/admin/Orders" ||
      location.pathname === "/admin/CreateProduct" ||
      location.pathname === "/admin/settings" ||
      location.pathname === "/admin/users" ||
      location.pathname === "/admin/Products" ||
      location.pathname.startsWith("/detail/") ? null : (
        <NavBar />
      )}
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route path="/Products" element={<Products />} />

        <Route path="/about" element={<About />} />

        <Route path="/detail/:Name" element={<Detail />} />

        <Route path="/BuildPc" element={<BuildPc />} />

        <Route
          element={
            <ProtectedRoute
              redirecTo={"/Profile"}
              isAllowed={!userActive.status}
            />
          }
        >
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/changePass" element={<ChangePass />} />
        </Route>

        <Route path="/about" element={<About />} />

        <Route
          path="/Profile"
          element={
            <ProtectedRoute isAllowed={userActive.status} redirecTo={"/Login"}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/Cart" element={<Cart />} />

        <Route
          element={
            <ProtectedRoute
              redirecTo={"/Profile"}
              isAllowed={userActive.admin}
            />
          }
        >
          <Route path="admin/Products" element={<AdminProducts />} />
          <Route path="admin/CreateProduct" element={<CreateProducts />} />
          <Route path="/admin/Orders" element={<AdminOrder />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Route>
      </Routes>
      {location.pathname === "/admin/Orders" ||
      location.pathname === "/admin/CreateProduct" ||
      location.pathname === "/admin/settings" ||
      location.pathname === "/admin/users" ||
      location.pathname === "/admin/Products" ? null : (
        <Footer />
      )}
    </div>
  );
}

export default App;
