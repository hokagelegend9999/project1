import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Tooltip, Input, Modal, Form, Breadcrumb, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [msg, setMsg] = useState(""); 
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userSwitches, setUserSwitches] = useState({}); 
  const [regions, setRegions] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
      const switches = {};
      response.data.forEach((user) => {
        switches[user.uuid] = user.status === 'active';
      });
      setUserSwitches(switches);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };

  const handleSwitchChange = async (checked, uuid) => {
    try {
      await axios.patch(`http://localhost:5000/users/${uuid}`, { status: checked ? 'active' : 'inactive'  });
      getUsers();
    } catch (error) {
      console.error('Error updating Users status:', error);
    }
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    const { password, confPassword } = values;
    if (password !== confPassword) {
      setMsg("Password and confirmation password do not match");
      return;
    }

    try {
      await axios.post("http://localhost:5000/users", values);
      setIsModalVisible(false);
      form.resetFields();
      getUsers();
    } catch (error) {
      console.error("Error saving Users:", error);
      setMsg(error.response.data.msg);
    }
  };

  const showEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalVisible(true);
  };

  const handleOkEdit = () => {
    updateUser();
    setIsEditModalVisible(false);
  };

  const updateUser = async () => {
    try {
      await axios.patch(`http://localhost:5000/users/${selectedUser.uuid}`, selectedUser);
      getUsers();
      setIsEditModalVisible(false);
    } catch (error) {
      console.error("Error updating Users:", error);
      setMsg(error.response.data.msg);
    }
  };

  const getRegions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/region");
      setRegions(response.data);
    } catch (error) {
      console.error("Error fetching Regions:", error);
    }
  };

  useEffect(() => {
    getUsers();
    getRegions(); // Panggil fungsi getRegions di sini
  }, []);

  const getRegionName = (uuid) => {
    const region = regions.find(region => region.uuid === uuid);
    return region ? `${region.country}` : 'Region Not Found';
  };
  

  return (
    <div style={{ backgroundColor: 'white', marginLeft: '0px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>System</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/users">User List</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <p style={{ fontWeight: 'bold', marginBottom: '-25px', textAlign: 'left', marginLeft: '200px', marginTop: '100px' }}>Quick Query :</p>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <Tooltip title="Search">
          <Input
            placeholder="Please enter  User Name"
            style={{ width: '300px', marginRight: '8px' }}
          />
          <Button type="primary" style={{ marginRight: "8px" }}>
            Search
          </Button>
          <Button ghost style={{ backgroundColor: '#f0f0f0' }}>
            Reset
          </Button>
        </Tooltip>
      </div>
      <Button type="primary" className="mb-2" onClick={showModal} style={{ marginRight: '8px' }}>
        <span className="icon" style={{ marginRight: '4px' }}>
          <PlusOutlined />
        </span>
        Create
      </Button>
      <table className="table is-striped is-fullwidth">
        <thead style={{ backgroundColor: '#f0f0f0' }}>
          <tr>
            <th>No</th>
            <th>User Name</th>
            <th>Region</th>
            <th>Address</th>
            <th>Contact Person</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{getRegionName(user.regionId)}</td>

              <td>{user.address}</td>
              <td>{user.contactPerson}</td>
              <td>{user.tlp}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Switch
                  checked={userSwitches[user.uuid]}
                  onChange={(checked) => handleSwitchChange(checked, user.uuid)}
                  checkedChildren="Aktif"
                  unCheckedChildren="Non Aktif"
                />
              </td>
              <td>
                <Button onClick={() => showEditModal(user)} className="button is-small is-info">
                  Edit
                </Button>
                <Button onClick={() => deleteUser(user.uuid)} className="button is-small is-danger">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal title="Create User Name" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} onFinish={onFinish}>
          <p className="has-text-centered">{msg}</p>
          <Form.Item
            label="User Name"
            name="name"
            rules={[{ required: true, message: 'Please input User Name!' }]}
          >
            <Input placeholder="User Name" />
          </Form.Item>
          <Form.Item
            label="Region"
            name="region"
            rules={[{ required: true, message: 'Please input Region!' }]}
          >
            <Input placeholder="Region" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input Address!' }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
          <Form.Item
            label="Contact Person"
            name="contactPerson"
            rules={[{ required: true, message: 'Please input Contact Person!' }]}
          >
            <Input placeholder="Contact Person" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="tlp"
            rules={[{ required: true, message: 'Please input Phone Number!' }]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input Email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input Password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            label="Confirmasi Password"
            name="confPassword"
            rules={[{ required: true, message: 'Please Confirmasi pasword!' }]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please Input Role!' }]}
          >
            <Input placeholder="Role" />
          </Form.Item>
          <Form.Item>
            <div style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="Edit Users" visible={isEditModalVisible} onOk={handleOkEdit} onCancel={handleCancel}>
        <Form form={form} onFinish={updateUser}>
          <p className="has-text-centered">{msg}</p>
          <Form.Item
            label="UserName"
            name="name"
            rules={[{ required: true, message: 'Please input User Name!' }]}
          >
            <Input placeholder="User Name" />
          </Form.Item>
          <Form.Item
            label="Region"
            name="region"
            rules={[{ required: true, message: 'Please input Region!' }]}
          >
            <Input placeholder="Region" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input Address!' }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
          <Form.Item
            label="Contact Person"
            name="contactPerson"
            rules={[{ required: true, message: 'Please input Contact Person!' }]}
          >
            <Input placeholder="Contact Person" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="tlp"
            rules={[{ required: true, message: 'Please input Phone Number!' }]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input Email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input Password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confPassword"
            rules={[{ required: true, message: 'Please input Confirmasi Password!' }]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please input Role!' }]}
          >
            <Input placeholder="Role" />
          </Form.Item>
          <Form.Item>
            <div style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserList;
