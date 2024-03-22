import React, { useState, useEffect } from "react";

import axios from "axios";
import { Button, Tooltip, Input, Modal, Form,Breadcrumb,Checkbox } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm(); // Menggunakan Form dari antd
  const [productmodel, setProductmodel] = useState(""); // Menyimpan nilai-nilai input
  const [productname, setProductname] = useState("");
  const [metertype, setMetertype] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [msg, setMsg] = useState(""); // Menyimpan pesan
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Menyimpan data produk yang dipilih untuk diedit
  const [setChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        setChecked(e.target.checked);
    };
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:5000/products/${productId}`);
    getProducts();
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
      await axios.post("http://localhost:5000/products", values);
      setIsModalVisible(false);
      form.resetFields();
      getProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      setMsg(error.response.data.msg);
    }
  };

  const showEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditModalVisible(true);
    setProductmodel(product.productmodel);
    setProductname(product.productname);
    setMetertype(product.metertype);
    setManufacturer(product.manufacturer);
  };

  const handleOkEdit = () => {
    updateProduct();
    setIsEditModalVisible(false);
  };

  const updateProduct = async () => {
    try {
      await axios.patch(`http://localhost:5000/products/${selectedProduct.uuid}`, {
        productmodel,
        productname,
        metertype,
        manufacturer,
      });
      getProducts();
      setIsEditModalVisible(false);
    } catch (error) {
      console.error("Error updating product:", error);
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
                <Link to="/products">Products</Link>
            </Breadcrumb.Item>
        </Breadcrumb>
               
     
      <p style={{ fontWeight: 'bold', marginBottom: '-25px', textAlign: 'left', marginLeft: '200px',marginTop: '100px' }}>Quick Query :</p>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        
        <Tooltip title="Search">

          <Input
            placeholder="Please enter product name"
            style={{ width: '300px', marginRight: '8px' }}
          />
          <Button type="primary" style={{ marginRight: "8px" }}>
            Search
          </Button>
          <Button ghost style={{ backgroundColor: '#f0f0f0' }}>Reset</Button>
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
                 <th></th>
                <th>No</th>
                <th>Product Model</th>
                <th>Product Name</th>
                <th>Meter Type</th>
                <th>Manufacturer</th>
                <th>Created By</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
          
          {products.map((product, index) => (
            <tr key={product.uuid}>
              <td>
                <Checkbox onChange={(e) => handleCheckboxChange(e, product.uuid)} />
              </td>
              <td>{index + 1}</td>
              <td>{product.productmodel}</td>
              <td>{product.productname}</td>
              <td>{product.metertype}</td>
              <td>{product.manufacturer}</td>
              <td>{product.user.name}</td>
              <td>
                <button
                  onClick={() => showEditModal(product)}
                  className="button is-small is-info"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(product.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal title="Create Product" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} onFinish={onFinish}>
          <p className="has-text-centered">{msg}</p>
           <Form.Item
            label="Product Model"
            name="productmodel"
            rules={[{ required: true, message: 'Please input product model!' }]}
          >
            <Input placeholder="Product Model" onChange={(e) => setProductmodel(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Product Name"
            name="productname"
            rules={[{ required: true, message: 'Please input product name!' }]}
          >
            <Input placeholder="Product Name" onChange={(e) => setProductname(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Meter Type"
            name="metertype"
            rules={[{ required: true, message: 'Please input meter type!' }]}
          >
            <Input placeholder="Meter Type" onChange={(e) => setMetertype(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Manufacturer"
            name="manufacturer"
            rules={[{ required: true, message: 'Please input manufacturer!' }]}
          >
            <Input placeholder="Manufacturer" onChange={(e) => setManufacturer(e.target.value)} />
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

      <Modal title="Edit Product" visible={isEditModalVisible} onOk={handleOkEdit} onCancel={handleCancel}>
        <Form form={form} onFinish={updateProduct}>
          <p className="has-text-centered">{msg}</p>
          <Form.Item
            label="Product Model"
            name="productmodel"
            initialValue={selectedProduct ? selectedProduct.productmodel : ""}
            rules={[{ required: true, message: 'Please input product model!' }]}
          >
            <Input placeholder="Product Model" onChange={(e) => setProductmodel(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Product Name"
            name="productname"
            initialValue={selectedProduct ? selectedProduct.productname : ""}
            rules={[{ required: true, message: 'Please input product name!' }]}
          >
            <Input placeholder="Product Name" onChange={(e) => setProductname(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Meter Type"
            name="metertype"
            initialValue={selectedProduct ? selectedProduct.metertype : ""}
            rules={[{ required: true, message: 'Please input meter type!' }]}
          >
            <Input placeholder="Meter Type" onChange={(e) => setMetertype(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Manufacturer"
            name="manufacturer"
            initialValue={selectedProduct ? selectedProduct.manufacturer : ""}
            rules={[{ required: true, message: 'Please input manufacturer!' }]}
          >
            <Input placeholder="Manufacturer" onChange={(e) => setManufacturer(e.target.value)} />
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

export default ProductList;
