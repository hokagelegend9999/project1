import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link } from 'react-router-dom'; // Import Link dari react-router-dom
import {
    AccountBookOutlined,
    BarChartOutlined,
    ClusterOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MoneyCollectOutlined,
    BankOutlined,
    UserOutlined,
    DeploymentUnitOutlined,
    DashboardOutlined,
    AppstoreOutlined,
    HomeOutlined,
    EnvironmentOutlined,
    SolutionOutlined,
    TeamOutlined,
    TagsOutlined,
    ToolOutlined,
    PercentageOutlined,
    PieChartOutlined,
    SafetyOutlined,
    SettingOutlined,
    ProfileOutlined,
} from '@ant-design/icons';

const { Header, Sider } = Layout;

const SiderComponent = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [setColorBgContainer] = useState('#fff'); // State untuk warna latar belakang

    // Fungsi untuk menavigasi ke halaman tertentu
    const navigateTo = (path) => {
        window.location.href = path; // Menggunakan window.location.href untuk menavigasi ke path tertentu
    };

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                >
                    <Menu.Item key="1" icon={<BankOutlined />} onClick={() => navigateTo('/')}>
                        Dashboard
                    </Menu.Item>
                    <Menu.SubMenu key="sub1" icon={<HomeOutlined />} title="System">
                        <Menu.Item key="3" icon={<DeploymentUnitOutlined />} onClick={() => navigateTo('/Region')}>
                            Region
                        </Menu.Item>
                        {/* Tambahkan link menuju halaman Region.js */}
                        <Menu.Item key="4" icon={<AppstoreOutlined />} onClick={() => navigateTo('/product')}>
                            Product
                        </Menu.Item>
                        <Menu.Item key="5" icon={<EnvironmentOutlined />} onClick={() => navigateTo('/vending-point')}>
                            Vending Point
                        </Menu.Item>
                        <Menu.Item key="6" icon={<SolutionOutlined />} onClick={() => navigateTo('/user-group')}>
                            User Group
                        </Menu.Item>
                        <Menu.Item key="7" icon={<TeamOutlined />} onClick={() => navigateTo('/user')}>
                            User
                        </Menu.Item>
                        <Menu.Item key="8" icon={<PercentageOutlined />} onClick={() => navigateTo('/tarif')}>
                            Tarif
                        </Menu.Item>
                        <Menu.Item key="9" icon={<SafetyOutlined />} onClick={() => navigateTo('/securitymodule')}>
                            Security Module
                        </Menu.Item>
                        <Menu.Item key="10" icon={<SettingOutlined />} onClick={() => navigateTo('/setup')}>
                            Setup
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="sub2" icon={<ProfileOutlined />} title="Registration">
                        <Menu.Item key="11" icon={<UserOutlined />} onClick={() => navigateTo('/consumer')}>
                            Consumer
                        </Menu.Item>
                        <Menu.Item key="12" icon={<DashboardOutlined />} onClick={() => navigateTo('/meters')}>
                            Meters
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item key="13" icon={<TagsOutlined />} onClick={() => navigateTo('/vending')}>
                        Vending
                    </Menu.Item>
                    <Menu.SubMenu key="sub3" icon={<ToolOutlined />} title="Engineering">
                        <Menu.Item key="14" icon={<ClusterOutlined />} onClick={() => navigateTo('/meter-specific')}>
                            Meter-specific
                        </Menu.Item>
                        <Menu.Item key="15" icon={<BankOutlined />} onClick={() => navigateTo('/non-meter-specific')}>
                            Non-meter-specific
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="sub4" icon={<PieChartOutlined />} title="Report">
                        <Menu.Item key="16" icon={<BarChartOutlined />} onClick={() => navigateTo('/sales')}>
                            Sales
                        </Menu.Item>
                        <Menu.Item key="17" icon={<MoneyCollectOutlined />} onClick={() => navigateTo('/token-record')}>
                            Token Record
                        </Menu.Item>
                        <Menu.Item key="18" icon={<AccountBookOutlined />} onClick={() => navigateTo('/consumer')}>
                            Consumer
                        </Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: setColorBgContainer, // Menggunakan state untuk warna latar belakang
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        className="button-custom" // Menambahkan kelas CSS
                    />
                </Header>
            </Layout>
        </Layout>
    );
};

export default SiderComponent;
