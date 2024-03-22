import React, { useState } from 'react';
import {
  
  AccountBookOutlined,
  BarChartOutlined,
  ClusterOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoneyCollectOutlined,
  BankOutlined,
  
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
  ProfileOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Image, Dropdown, Avatar } from 'antd';

const { Header, Sider, Footer, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Fungsi logout
  const handleLogout = () => {
    // Lakukan logika logout di sini
    console.log('Logged out');
  };

  // Fungsi menu pengaturan
  const handleSettings = () => {
    // Lakukan logika menu pengaturan di sini
    console.log('Settings clicked');
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />} onClick={handleSettings}>
        Settings
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: 'white' }}
      >
        <div>
          <Image
            src="./linuxw.jpg"
            alt=""
            style={{
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
            }}
          />
        </div>
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            <a href="/">Dashboard</a>
          </Menu.Item>
          <Menu.SubMenu key="sub1" icon={<HomeOutlined />} title="System">
            <Menu.Item key="3" icon={<DeploymentUnitOutlined />}>
              <a href="/Region">Region</a>
            </Menu.Item>
            <Menu.Item key="4" icon={<AppstoreOutlined />}>
              <a href="/products">Product</a>
            </Menu.Item>
            <Menu.Item key="5" icon={<EnvironmentOutlined />}>
              <a href="/vendingpoints">Vending Point</a>
            </Menu.Item>
            <Menu.Item key="6" icon={<SolutionOutlined />}>
              <a href="/user-group">User Group</a>
            </Menu.Item>
            <Menu.Item key="7" icon={<TeamOutlined />}>
              <a href="/users">User</a>
            </Menu.Item>
            <Menu.Item key="8" icon={<PercentageOutlined />}>
              <a href="/tarif">Tarif</a>
            </Menu.Item>
            <Menu.Item key="9" icon={<SafetyOutlined />}>
              <a href="/securitymodule">Security Module</a>
            </Menu.Item>
            <Menu.Item key="10" icon={<SettingOutlined />}>
              <a href="/setup">Setup</a>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="sub2" icon={<ProfileOutlined />} title="Registration">
            <Menu.Item key="11" icon={<UserOutlined />}>
              <a href="/consumer">Consumer</a>
            </Menu.Item>
            <Menu.Item key="12" icon={<DashboardOutlined />}>
              <a href="/meters">Meters</a>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="13" icon={<TagsOutlined />}>
            <a href="/vending">Vending</a>
          </Menu.Item>
          <Menu.SubMenu key="sub3" icon={<ToolOutlined />} title="Engineering">
            <Menu.Item key="14" icon={<ClusterOutlined />}>
              <a href="/meter-specific">Meter-specific</a>
            </Menu.Item>
            <Menu.Item key="15" icon={<BankOutlined />}>
              <a href="/non-meter-specific">Non-meter-specific</a>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="sub4" icon={<PieChartOutlined />} title="Report">
            <Menu.Item key="16" icon={<BarChartOutlined />}>
              <a href="/sales">Sales</a>
            </Menu.Item>
            <Menu.Item key="17" icon={<MoneyCollectOutlined />}>
              <a href="/token-record">Token Record</a>
            </Menu.Item>
            <Menu.Item key="18" icon={<AccountBookOutlined />}>
              <a href="/consumer">Consumer</a>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 24px',
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Dropdown overlay={menu} placement="topRight">
              <Avatar size={40} src="./linuxw.jpg" />
            </Dropdown>
            <span style={{ marginRight: '8px' }}>Username</span>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Hokage Legend
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
