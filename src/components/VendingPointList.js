import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Tooltip, Input, Modal, Form, Breadcrumb, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const VendingPointList = () => {
  const [vendingpoints, setVendingPoints] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [msg, setMsg] = useState(""); 
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedVendingPoint, setSelectedVendingPoint] = useState(null);
  const [userSwitches, setUserSwitches] = useState({}); 
  const [pointname, setPointname] = useState("");
  const [region, setRegion] = useState("");
  const [address, setAddress] = useState("");
  const [contactperson, setContactperson] = useState("");
  const [tlp, setTlp] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const getVendingPoints = async () => {
    try {
      const response = await axios.get("http://localhost:5000/vendingpoints");
      setVendingPoints(response.data);
      
      const switches = {};
      response.data.forEach((vendingpoint) => {
        switches[vendingpoint.uuid] = vendingpoint.status === 'active';
      });
      
      setUserSwitches(switches);
    } catch (error) {
      console.error("Error fetching vending points:", error);
    }
  };

  useEffect(() => {
    getVendingPoints();
  }, []);

  const handleSwitchChange = async (checked, vendingpointId) => {
    try {
      await axios.patch(`http://localhost:5000/vendingpoints/${vendingpointId}`, { status: checked ? 'active' : 'inactive' });
      getVendingPoints();
    } catch (error) {
      console.error('Error updating vending point status:', error);
    }
  };

  const deleteVendingPoint = async (vendingpointId) => {
    await axios.delete(`http://localhost:5000/vendingpoints/${vendingpointId}`);
    getVendingPoints();
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
    try {
      await axios.post("http://localhost:5000/vendingpoints", values);
      setIsModalVisible(false);
      form.resetFields();
      getVendingPoints();
    } catch (error) {
      console.error("Error saving Vending Point:", error);
      setMsg(error.response.data.msg);
    }
  };

  const showEditModal = (vendingpoint) => {
    setSelectedVendingPoint(vendingpoint);
    setIsEditModalVisible(true);
    setPointname(vendingpoint.pointname);
    setRegion(vendingpoint.region);
    setAddress(vendingpoint.address);
    setContactperson(vendingpoint.contactperson);
    setEmail(vendingpoint.email);
    setTlp(vendingpoint.tlp);
    setStatus(vendingpoint.status);
  };

  const handleOkEdit = () => {
    updateVendingPoint();
    setIsEditModalVisible(false);
  };

  const updateVendingPoint = async () => {
    try {
      await axios.patch(`http://localhost:5000/vendingpoints/${selectedVendingPoint.uuid}`, {
        pointname,
        region,
        address,
        contactperson,
        tlp,
        email,
        status,
      });
      getVendingPoints();
      setIsEditModalVisible(false);
    } catch (error) {
      console.error("Error updating Vending Point:", error);
      setMsg(error.response.data.msg);
    }
  };

  return (
    <div style={{ backgroundColor: 'white', marginLeft: '0px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>System</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/vendingpoints">Vending Points</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <p style={{ fontWeight: 'bold', marginBottom: '-25px', textAlign: 'left', marginLeft: '200px', marginTop: '100px' }}>Quick Query :</p>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <Tooltip title="Search">
          <Input
            placeholder="Please enter Vending Point name"
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
      <table      className="table is-striped is-fullwidth"
    >
      <thead style={{ backgroundColor: '#f0f0f0' }}>
        <tr>
         
          <th>No</th>
          <th>Point Name</th>
          <th>Region</th>
          <th>Address</th>
          <th>Contact Person</th>
          <th>Phone Number</th>
          <th>Email</th>
       
          <th>Status</th>
          <th>Actions</th>
          
        </tr>
      </thead>
      <tbody>
        {vendingpoints.map((vendingpoint, index) => (
          <tr key={vendingpoint.uuid}>
            <td>{index + 1}</td>
            <td>{vendingpoint.pointname}</td>
            <td>{vendingpoint.region}</td>
            <td>{vendingpoint.address}</td>
            <td>{vendingpoint.contactperson}</td>
            <td>{vendingpoint.tlp}</td>
            <td>{vendingpoint.email}</td>
            
            <td>
              <Switch
                checked={userSwitches[vendingpoint.uuid]}
                onChange={(checked) => handleSwitchChange(checked, vendingpoint.uuid)}
                checkedChildren="Aktiv"
                unCheckedChildren="Non Aktiv"
              />
            </td>
            <td>
              <Button onClick={() => showEditModal(vendingpoint)} className="button is-small is-info">
                Edit
              </Button>
              <Button onClick={() => deleteVendingPoint(vendingpoint.uuid)} className="button is-small is-danger">
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <Modal title="Create Vending Point" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form form={form} onFinish={onFinish}>
        <p className="has-text-centered">{msg}</p>
        <Form.Item
          label="Point Name"
          name="pointname"
          rules={[{ required: true, message: 'Please input Point Name!' }]}
        >
          <Input placeholder="Point Name" onChange={(e) => setPointname(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="Region"
          name="region"
          rules={[{ required: true, message: 'Please input Region!' }]}
        >
          <Input placeholder="Region" onChange={(e) => setRegion(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input Address!' }]}
        >
          <Input placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Contact Person"
          name="contactperson"
          rules={[{ required: true, message: 'Please input Contact Person!' }]}
        >
          <Input placeholder="Contact Person" onChange={(e) => setContactperson(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="tlp"
          rules={[{ required: true, message: 'Please input Phone Number!' }]}
        >
          <Input placeholder="Phone Number" onChange={(e) => setTlp(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input Email!' }]}
        >
          <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
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
    <Modal title="Edit Vending Point" visible={isEditModalVisible} onOk={handleOkEdit} onCancel={handleCancel}>
      <Form form={form} onFinish={updateVendingPoint}>
        <p className="has-text-centered">{msg}</p>
        <Form.Item
          label="Point Name"
          name="pointname"
          initialValue={selectedVendingPoint ? selectedVendingPoint.pointname : ""}
          rules={[{ required: true, message: 'Please input Point Name!' }]}
        >
          <Input placeholder="Point Name" onChange={(e) => setPointname(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Region"
          name="region"
          initialValue={selectedVendingPoint ? selectedVendingPoint.region : ""}
          rules={[{ required: true, message: 'Please input Region!' }]}
        >
          <Input placeholder="Region" onChange={(e) => setRegion(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          initialValue={selectedVendingPoint ? selectedVendingPoint.address : ""}
          rules={[{ required: true, message: 'Please input Address!' }]}
        >
          <Input placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Contact Person"
          name="contactperson"
          initialValue={selectedVendingPoint ? selectedVendingPoint.contactperson : ""}
          rules={[{ required: true, message: 'Please input Contact Person!' }]}
        >
          <Input placeholder="Contact Person" onChange={(e) => setContactperson(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="tlp"
          initialValue={selectedVendingPoint ? selectedVendingPoint.tlp : ""}
          rules={[{ required: true, message: 'Please input Phone Number!' }]}
        >
          <Input placeholder="Phone Number" onChange={(e) => setTlp(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          initialValue={selectedVendingPoint ? selectedVendingPoint.email : ""}
          rules={[{ required: true, message: 'Please input Email!' }]}
        >
          <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          initialValue={selectedVendingPoint ? selectedVendingPoint.status : ""}
          rules={[{ required: true, message: 'Please input Status' }]}
        >
          <Input placeholder="Status" onChange={(e) => setEmail(e.target.value)} />
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

export default VendingPointList;


