import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../logo.png"; // Ubah nama import dan path logo pertama
import logo2 from "../logo2.png"; // Ubah nama import dan path logo kedua
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import { Dropdown, Menu, Image, Badge, Drawer, List, Typography } from 'antd';
import { SettingOutlined, LogoutOutlined,BellFilled, MailOutlined } from '@ant-design/icons'; // Tambahkan import untuk icon ant design
import { getComments, getOrders } from './API';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);


  useEffect(() => {
    // Mengambil komentar dan pesanan saat komponen dimuat
    getComments().then((res) => {
        setComments(res.comments);
    });
    getOrders().then((res) => {
        setOrders(res.products);
    });
}, []);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<SettingOutlined />}>
        Setting
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <nav
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <NavLink to="/dashboard" className="navbar-item">
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={logo} width="150" height="50" alt="logo" /> {/* Gunakan logo pertama */}
            
                 
                  
             
            </div>
          </NavLink>

          <a
            href="!"
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              {/* Tombol notifikasi untuk komentar */}
            <Badge count={comments.length} dot className="badge-icon-notif">
                <MailOutlined onClick={() => { setCommentsOpen(true); }} 
                style={{ margin: '0px', padding: '10px', fontSize: '24px' }}
                />
            </Badge>

            {/* Tombol notifikasi untuk pesanan */}
            <Badge count={orders.length} className="badge-icon-comment">
                <BellFilled onClick={() => { setNotificationsOpen(true); }}  style={{ margin: '0px', padding: '5px', fontSize: '24px' }}/>
            </Badge>

            {/* Drawer untuk notifikasi pesanan */}
            <Drawer
                title="Notifications"
                placement="right"
                visible={notificationsOpen}
                onClose={() => {
                    setNotificationsOpen(false);
                }} style={{ margin: '0 20px', padding: '5px', fontSize: '24px' }}
                maskClosable
            >
                <List
                    dataSource={orders}
                    renderItem={(item) => {
                        return (
                            <List.Item>
                                <Typography.Text strong>{item.title}</Typography.Text> has been
                                ordered!
                            </List.Item>
                        );
                    }}
                />
            </Drawer>

            {/* Drawer untuk komentar */}
            <Drawer
                title="Comments"
                placement="right"
                visible={commentsOpen}
                onClose={() => {
                    setCommentsOpen(false);
                }} style={{ margin: '0 10px', padding: '5px', fontSize: '24px' }}
                maskClosable
            >
                <List
                    dataSource={comments}
                    renderItem={(item) => {
                        return <List.Item>{item.body}</List.Item>;
                    }}
                />
            </Drawer>
              <div className="buttons">
                <Dropdown overlay={menu} placement="bottomRight">
                  <a href="!" role="button" className="ant-dropdown-link dropdown-link" onClick={(e) => e.preventDefault()}>
                    {user && ( // Tampilkan logo kedua dan nama pengguna hanya jika pengguna tersedia
                      <div className="dropdown-container">
                  <div style={{ display: "flex", alignItems: "center", marginLeft: "25px" }} marginLeft='10px'  marginRight= '40px' padding="10px">
                  <Image src={logo2} width="28" height="28" alt="logo2" preview={false}  /> {/* Gunakan logo kedua */}
                 <b><h3 style={{ fontFamily: 'Hanzel', fontSize: '16px', marginLeft: '20px', marginRight: '20px' }}>{user.name}</h3></b> 

                </div>
                      </div>
                    )}
                  </a>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
