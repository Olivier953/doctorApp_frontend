import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import {Badge} from "antd"
import { ImCross } from 'react-icons/im';
import { AiOutlineBell } from 'react-icons/ai';
import { UserLink } from '../style/styledComponents/styledComponents';

const Layout = ({children}) => {
    const navigate = useNavigate()
  const {user} = useSelector((state) => state.user)
  
    const userMenu = [
    {
      name:"Home",
      path: "/",
    }, 
    {
      name:"Appointment",
      path: "/appointments",
    },
    {
      name:"Apply Doctor",
      path: "/apply-doctor",
    },
    {
      name:"Profile",
      path: "/user-profile",
    },
  ]

  const adminMenu = [
    {
      name:"Home",
      path: "/",
    },
    {
      name: "Users",
      path: "/admin/userslist",
    },
    {
      name: "Doctors",
      path: "/admin/doctorslist",
    },

  ]

  const doctorMenu = [
    {
      name:"Home",
      path: "/",
    },
    {
      name:"Appointment",
      path: "/doctor/appointments",
    },
    {
      name:"Update Doctor Profile",
      path: `/doctor/profile/${user?._id}`,
    },
  ]

   const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu
  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "doctor" : "user"

  const Logout = () => {
    localStorage.clear();
    navigate("/login")
  }

  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? `rgb(227, 243, 236)` : 'rgb(12, 10, 10)',
      textDecoration: 'none',
      fontSize: '26px',
    };
  }

  return (
  
    <div className='mainContent'>
       <div className="mainContent_sidebar">
        <h3>{role}</h3>
        {
          menuToBeRendered.map((menu) => {
            return (
              <div key={menu.name} className='mainContent_sidebar_menu'>
                <NavLink style={navLinkStyles} to={menu.path}>{menu.name}</NavLink>
              </div>
            )
          })
        }
        <button className="mainContent_sidebar_btn" onClick={Logout}>Log out</button>
        </div> 

        <div className="mainContent_content">
            <div className="mainContent_content_header">
                
                 <span className='mainContent_content_header_cross'><ImCross/></span>
               
               <div className="mainContent_content_header_right">
                <Badge 
                  count={user?.unseenNotifications.length} 
                  offset={[1, 10]} 
                  size="large"
                  onClick={() => navigate("/notifications")}>
                <span className='mainContent_content_header_bell'><AiOutlineBell/></span>
                 </Badge>
                <p>Welcome<UserLink to="/user-profile">{user?.firstName}</UserLink></p>
                </div>
            </div>

            <div className="mainContent_content_body">
                {children}
            </div>
        </div>
    </div>
  )
}

export default Layout