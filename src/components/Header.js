import React, { useState, useEffect } from 'react';
import { BellFilled, MailOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Typography, Menu, Dropdown } from "antd";
import { getComments, getOrders } from "./API";

function HeaderComponent() {
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

    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<SettingOutlined />}>
                Setting
            </Menu.Item>
            <Menu.Item key="2" icon={<LogoutOutlined />}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="HeaderComponent" style={{ display: 'flex', alignItems: 'center' }}>
            {/* Image Linux di sisi kiri */}
            <div className="LogoA">
                <Image
                    src="./linux2.png"
                    alt=""
                />
            </div>

            {/* Tombol notifikasi untuk komentar */}
            <Badge count={comments.length} dot className="badge-icon-notif">
                <MailOutlined onClick={() => { setCommentsOpen(true); }} />
            </Badge>

            {/* Tombol notifikasi untuk pesanan */}
            <Badge count={orders.length} className="badge-icon-comment">
                <BellFilled onClick={() => { setNotificationsOpen(true); }} />
            </Badge>

            {/* Drawer untuk notifikasi pesanan */}
            <Drawer
                title="Notifications"
                placement="right"
                visible={notificationsOpen}
                onClose={() => {
                    setNotificationsOpen(false);
                }}
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
                }}
                maskClosable
            >
                <List
                    dataSource={comments}
                    renderItem={(item) => {
                        return <List.Item>{item.body}</List.Item>;
                    }}
                />
            </Drawer>

            {/* Dropdown untuk menu Setting dan Logout */}
            <Dropdown overlay={menu} placement="bottomRight">
                <a href="#" role="button" className="ant-dropdown-link dropdown-link" onClick={(e) => e.preventDefault()}>
                    <div className="dropdown-container">
                        <div className="LogoB">
                            <Image
                                src="./linux.png"
                                alt=""
                                preview={false} // Menonaktifkan mode preview
                            />
                        </div>
                        <h5 className="app-title">Admin</h5>
                    </div>
                </a>
            </Dropdown>
        </div>
    );
}

export default HeaderComponent;
