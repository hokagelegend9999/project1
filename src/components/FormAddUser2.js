import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  Modal,
  message,
  Breadcrumb
} from 'antd';
import { useDispatch, useSelector } from "react-redux";

const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const FormAddUser = () => {
  const [name, setName] = useState("");
  const [notlp, setNotlp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const [regions, setRegions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newRegion, setNewRegion] = useState('');
  const [country, setCountry] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [newRole, setNewRole] = useState('');
  const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);

  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/region");
      setRegions(response.data);
    } catch (error) {
      console.error('Error fetching regions:', error);
    }
  };

  const handleRegionChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    setSelectedRegion(selectedOptions.map(option => option.label).join(', '));
  };

  const handleAddRegion = () => {
    setIsModalVisible(true);
  };

  const handleSaveRegion = async () => {
    if (!country || !province || !city) {
      message.error('Please input country, province, and city');
      return;
    }

    try {
      await axios.post("http://localhost:5000/region", {
        country: country,
        province: province,
        city: city
      });
      message.success('Successfully added new region');
      setIsModalVisible(false);
      setCountry('');
      setProvince('');
      setCity('');
      fetchRegions(); // Update the list of regions after adding a new one
    } catch (error) {
      console.error('Error adding new region:', error);
      message.error('Failed to add new region');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCountry('');
    setProvince('');
    setCity('');
  };

  const saveUser = async (values) => {
    try {
      await axios.post("http://localhost:5000/users", {
        name: values.UserName,
        email: values.Email,
        password: values.Password,
        confPassword: values.ConfirmasiPassword,
        role: values.Role,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const handleAddRole = () => {
    setIsRoleModalVisible(true);
  };

  const handleSaveRole = async () => {
    if (!newRole) {
      message.error('Please input role');
      return;
    }

    try {
      // Simpan role baru ke database atau lakukan sesuai kebutuhan aplikasi Anda
      message.success('Successfully added new role');
      setIsRoleModalVisible(false);
      setNewRole('');
      // Anda mungkin juga ingin memuat ulang daftar role setelah menambahkan role baru
    } catch (error) {
      console.error('Error adding new role:', error);
      message.error('Failed to add new role');
    }
  };

  const handleCancelRole = () => {
    setIsRoleModalVisible(false);
    setNewRole('');
  };

  const formatRegionsForCascader = (regions) => {
    return regions.map(region => ({
      value: region.uuid, // Atur nilai yang sesuai dengan kebutuhan Anda
      label: region.country,
      children: [
        {
          value: `${region.uuid}_province`, // Atur nilai yang sesuai dengan kebutuhan Anda
          label: region.province,
          children: [
            {
              value: `${region.uuid}_city`, // Atur nilai yang sesuai dengan kebutuhan Anda
              label: region.city,
            }
          ]
        }
      ]
    }));
  };

  return (
    <div className="card-content" style={{ backgroundColor: 'white' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>System</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/users/add">Users</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <b>REGISTER</b>
      <div className="card is-shadowless">
        <div>
          <div className="content">
            <Form
              {...formItemLayout}
              onFinish={saveUser}
              variant="filled"
              style={{
                maxWidth: 600,
              }}
            >
              <Form.Item
                label="UserName"
                name="UserName"
                rules={[
                  {
                    required: true,
                    message: 'Please input Name',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input Password',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="ConfirmasiPassword"
                name="ConfirmasiPassword"
                rules={[
                  {
                    required: true,
                    message: 'Please input Confirmasi Password',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="PhoneNumber"
                name="PhoneNumber"
                rules={[
                  {
                    required: false,
                    message: 'Please input Phone Number!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="ProfilData"
                name="ProfilData"
                rules={[
                  {
                    required: false,
                    message: 'Please input Bio Data!',
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>

              <Form.Item
                label="Email"
                name="Email"
                rules={[
                  {
                    required: true,
                    message: 'Please input Email!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Gender"
                name="Gender"
                rules={[
                  {
                    required: false,
                    message: 'Please input Gender!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Region"
                name="Region"
                rules={[
                  {
                    required: false, // Mengubah menjadi opsional
                    message: 'Please input Region!',
                  },
                ]}
              >
                <Cascader options={formatRegionsForCascader(regions)} onChange={handleRegionChange} />
                <Input value={selectedRegion} disabled style={{ marginTop: '10px' }} />
              </Form.Item>

              <Button type="primary" onClick={handleAddRegion}>
                Add Region
              </Button>

              <Modal
                title="Add New Region"
                visible={isModalVisible}
                onOk={handleSaveRegion}
                onCancel={handleCancel}
              >
                <Form layout="vertical" initialValues={{ remember: true }}>
                  <Form.Item label="Country" name="Country" rules={[{ required: true, message: 'Please input country!' }]}>
                    <Input value={country} onChange={(e) => setCountry(e.target.value)} />
                  </Form.Item>
                  <Form.Item label="Province" name="Province" rules={[{ required: true, message: 'Please input province!' }]}>
                    <Input value={province} onChange={(e) => setProvince(e.target.value)} />
                  </Form.Item>
                  <Form.Item label="City" name="City" rules={[{ required: true, message: 'Please input city!' }]}>
                    <Input value={city} onChange={(e) => setCity(e.target.value)} />
                  </Form.Item>
                </Form>
              </Modal>

              <Form.Item
                label="Role"
                name="Role"
                rules={[
                  {
                    required: true,
                    message: 'Please input Role!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Button type="primary" onClick={handleAddRole}>
                Add Role
              </Button>

              <Modal
                title="Add New Role"
                visible={isRoleModalVisible}
                onOk={handleSaveRole}
                onCancel={handleCancelRole}
              >
                <Form layout="vertical" initialValues={{ remember: true }}>
                  <Form.Item label="Role" name="Role" rules={[{ required: true, message: 'Please input role!' }]}>
                    <Input value={newRole} onChange={(e) => setNewRole(e.target.value)} />
                  </Form.Item>
                </Form>
              </Modal>

              <Form.Item
                label="DatePicker"
                name="DatePicker"
                rules={[
                  {
                    required: true,
                    message: 'Please input!',
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                label="RangePicker"
                name="RangePicker"
                rules={[
                  {
                    required: true,
                    message: 'Please input!',
                  },
                ]}
              >
                <RangePicker />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 6,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit" className="button is-success">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddUser;
