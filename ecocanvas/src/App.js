import Topbar from './components/topbar/Topbar'
import Sidebar from './components/sidebar/Sidebar';
import './css/App.css'
import { Home } from './pages/Home';
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Campaign } from "./pages/Campaign";
import { Shop } from "./pages/Shop";
import { ShopDetail } from "./pages/ShopDetail";
import { AdminHome } from "./admin_pages/admin_home/admin_Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Topbar />
      <div className='container'>
        <Sidebar />
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/campaign" element={<Campaign />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/product" element={<ShopDetail />}></Route>
        <Route path="/admin_home" element={<AdminHome />}></Route>
      </Routes>
    </div >
  );
}

export default App;
