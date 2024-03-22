import React, { useState } from "react";
import { NavLink, } from "react-router-dom";

import { Menu, Button, Layout } from 'antd';
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

const { Sider } = Layout;

const Sidebar = () => {

 
  const [collapsed, setCollapsed] = useState(false);

  // Fungsi untuk menavigasi ke halaman tertentu

  return (
    <div>
      <aside className="menu pl-2 has-shadow">
      
       
       
        
      </aside>
      
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
        >
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Button
    type="text"
    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    onClick={() => setCollapsed(!collapsed)}
    style={{ backgroundColor: '#808080', color: 'white', border: 'none', borderRadius: '10px', padding: '10px 10px' }}
  />
</div>


         <Menu.Item key="1" icon={<BankOutlined />}>
          
  <NavLink to="/">Dashboard</NavLink>
</Menu.Item>
<Menu.SubMenu key="sub1" icon={<HomeOutlined />} title="System">
  <Menu.Item key="3" icon={<DeploymentUnitOutlined />}>
    <NavLink to="/Region">Region</NavLink>
  </Menu.Item>
  <Menu.Item key="4" icon={<AppstoreOutlined />}>
    <NavLink to="/products">Product</NavLink>
  </Menu.Item>
  <Menu.Item key="5" icon={<EnvironmentOutlined />}>
    <NavLink to="/vendingpoints">Vending Point</NavLink>
  </Menu.Item>
  <Menu.Item key="6" icon={<SolutionOutlined />}>
    <NavLink to="/user-group">User Group</NavLink>
  </Menu.Item>
  <Menu.Item key="7" icon={<TeamOutlined />}>
    <NavLink to="/users">User</NavLink>
  </Menu.Item>
  <Menu.Item key="8" icon={<PercentageOutlined />}>
    <NavLink to="/tarif">Tarif</NavLink>
  </Menu.Item>
  <Menu.Item key="9" icon={<SafetyOutlined />}>
    <NavLink to="/securitymodule">Security Module</NavLink>
  </Menu.Item>
  <Menu.Item key="10" icon={<SettingOutlined />}>
    <NavLink to="/setup">Setup</NavLink>
  </Menu.Item>
</Menu.SubMenu>
<Menu.SubMenu key="sub2" icon={<ProfileOutlined />} title="Registration">
  <Menu.Item key="11" icon={<UserOutlined />}>
    <NavLink to="/consumer">Consumer</NavLink>
  </Menu.Item>
  <Menu.Item key="12" icon={<DashboardOutlined />}>
    <NavLink to="/meters">Meters</NavLink>
  </Menu.Item>
</Menu.SubMenu>
<Menu.Item key="13" icon={<TagsOutlined />}>
  <NavLink to="/vending">Vending</NavLink>
</Menu.Item>
<Menu.SubMenu key="sub3" icon={<ToolOutlined />} title="Engineering">
  <Menu.Item key="14" icon={<ClusterOutlined />}>
    <NavLink to="/meter-specific">Meter-specific</NavLink>
  </Menu.Item>
  <Menu.Item key="15" icon={<BankOutlined />}>
    <NavLink to="/non-meter-specific">Non-meter-specific</NavLink>
  </Menu.Item>
</Menu.SubMenu>
<Menu.SubMenu key="sub4" icon={<PieChartOutlined />} title="Report">
  <Menu.Item key="16" icon={<BarChartOutlined />}>
    <NavLink to="/sales">Sales</NavLink>
  </Menu.Item>
  <Menu.Item key="17" icon={<MoneyCollectOutlined />}>
    <NavLink to="/token-record">Token Record</NavLink>
  </Menu.Item>
  <Menu.Item key="18" icon={<AccountBookOutlined />}>
    <NavLink to="/consumer">Consumer</NavLink>
    
  </Menu.Item>
  
</Menu.SubMenu>

        </Menu>
        
      </Sider>
     
      
    </div>
    
  );
};

export default Sidebar;
