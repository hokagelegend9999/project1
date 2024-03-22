import React, { useState, useEffect } from 'react';
import { Breadcrumb, Input, Button, message, Layout, AutoComplete, Empty, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { getMe } from '../../../features/authSlice';
import LayoutUtama from '../../../pages/LayoutUtama';

const { Content } = Layout;

const Region = () => {
    const [country, setCountry] = useState('');
    const [isModalCountryVisible, setIsModalCountryVisible] = useState(false); // Variabel state untuk modal negara
    const [province, setProvince] = useState('');
    const [isModalProvinceVisible, setIsModalProvinceVisible] = useState(false); // Variabel state untuk modal provinsi
    const [city, setCity] = useState('');
    const [isModalCityVisible, setIsModalCityVisible] = useState(false); // Variabel state untuk modal kota
    const [regions, setRegions] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
        fetchRegions();
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/");
        }
    }, [isError, navigate]);

    const fetchRegions = async () => {
        try {
            const response = await axios.get("http://localhost:5000/region");
            setRegions(response.data);
        } catch (error) {
            console.error('Error fetching regions:', error);
        }
    };

    const saveRegion = async (type) => {
        if (type === 'country' && !country.trim()) {
            message.error('Please enter a country');
            return;
        }
        if (type === 'province' && !province.trim()) {
            message.error('Please enter a province');
            return;
        }
        if (type === 'city' && !city.trim()) {
            message.error('Please enter a city');
            return;
        }

        try {
            await axios.post("http://localhost:5000/region", {
                country: country,
                province: province,
                city: city,
            });
            message.success(`Successfully added ${type}`);
            navigate("/region");
        } catch (error) {
            if (error.response) {
                message.error(error.response.data.msg);
            } else {
                message.error('An error occurred while saving the region');
            }
        }
    };

    const handleEditCountry = (selectedCountry) => {
        setCountry(selectedCountry);
        setIsModalCountryVisible(true);
    };

    const handleEditProvince = (selectedProvince) => {
        setProvince(selectedProvince);
        setIsModalProvinceVisible(true);
    };

    const handleEditCity = (selectedCity) => {
        setCity(selectedCity);
        setIsModalCityVisible(true);
    };

    const handleOk = (type) => {
        if (type === 'country') {
            setIsModalCountryVisible(false);
        } else if (type === 'province') {
            setIsModalProvinceVisible(false);
        } else if (type === 'city') {
            setIsModalCityVisible(false);
        }
    };

    const handleCancel = () => {
        setIsModalCountryVisible(false);
        setIsModalProvinceVisible(false);
        setIsModalCityVisible(false);
    };

    return (
        <LayoutUtama>
            <Layout style={{ backgroundColor: 'white', marginLeft: '0px' }}>
                <Content
                    style={{
                        padding: '0 48px',
                    }}
                >
                    <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
                <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>System</Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link to="/Region">Region</Link>
            </Breadcrumb.Item>
        </Breadcrumb>
                    <b>REGION</b>
                    <div
                        style={{
                            minHeight: 400,
                            minWidth: 1100,
                            padding: 10,
                            display: 'flex',
                            flexWrap: 'nowrap',
                            overflowX: 'auto',
                        }}
                    >
                        {/* Konten Country */}
                        <div
                            style={{
                                background: '#fff',
                                padding: 10,
                                borderRadius: 8,
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                width: '30%',
                                marginRight: '10px',
                            }}
                        >
                            {/* Konten AutoComplete */}
                            <h3>Country</h3>
                            <AutoComplete
                                style={{ marginBottom: '10px', width: '100%' }}
                                options={regions.map(region => ({ value: region.country }))}
                                placeholder="Enter country"
                                value={country}
                                onChange={(value) => setCountry(value)}
                                filterOption={(inputValue, option) =>
                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                            >
                                <Input
                                    suffix={
                                        <div>
                                            <Button
                                                type="primary"
                                                icon={<PlusOutlined />}
                                                onClick={() => saveRegion('country')}
                                            />
                                        </div>
                                    }
                                />
                            </AutoComplete>

                            {/* Tombol Edit, Modal, dan Tombol Hapus */}
                            <div
                                style={{
                                    marginTop: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '8px',
                                    border: '1px solid #d9d9d9',
                                    borderRadius: '4px',
                                }}
                            >
                                {country ? (
                                    country
                                ) : (
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                )}
                                {country && (
                                    <div>
                                        <>
                                            <Button
                                                type="primary"
                                                icon={<EditOutlined />}
                                                onClick={() => handleEditCountry(country)}
                                                style={{ marginRight: '8px' }}
                                            />
                                            <Modal
                                                title="Edit Country"
                                                visible={isModalCountryVisible}
                                                onOk={() => handleOk('country')}
                                                onCancel={handleCancel}
                                                okText="Save"
                                                cancelText="Cancel"
                                            >
                                                <Input
                                                    value={country}
                                                    onChange={(e) => setCountry(e.target.value)}
                                                    placeholder="Enter edited country"
                                                />
                                            </Modal>
                                        </>
                                        <Button
                                            type="danger"
                                            icon={<DeleteOutlined />}
                                            onClick={() => setCountry('')}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Konten Province */}
                        <div
                            style={{
                                background: '#fff',
                                padding: 16,
                                borderRadius: 8,
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                width: '30%',
                                marginRight: '5px',
                            }}
                        >
                            {/* Konten AutoComplete */}
                            <h3>Province</h3>
                            <AutoComplete
                                style={{ marginBottom: '10px', width: '100%' }}
                                options={regions.map(region => ({ value: region.province }))}
                                placeholder="Enter province"
                                value={province}
                                onChange={(value) => setProvince(value)}
                                filterOption={(inputValue, option) =>
                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                            >
                                <Input
                                    suffix={
                                        <Button
                                            type="primary"
                                            icon={<PlusOutlined />}
                                            onClick={() => saveRegion('province')}
                                        />
                                    }
                                />
                            </AutoComplete>
                            {/* Tombol Edit, Modal, dan Tombol Hapus */}
                            <div
                                style={{
                                    marginTop: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '8px',
                                    border: '1px solid #d9d9d9',
                                    borderRadius: '4px',
                                }}
                            >
                                {province ? (
                                    province
                                ) : (
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                )}
                                {province && (
                                    <div>
                                        <>
                                            <Button
                                                type="primary"
                                                icon={<EditOutlined />}
                                                onClick={() => handleEditProvince(province)}
                                                style={{ marginRight: '8px' }}
                                            />
                                            <Modal
                                                title="Edit Province"
                                                visible={isModalProvinceVisible}
                                                onOk={() => handleOk('province')}
                                                onCancel={handleCancel}
                                                okText="Save"
                                                cancelText="Cancel"
                                            >
                                                <Input
                                                    value={province}
                                                    onChange={(e) => setProvince(e.target.value)}
                                                    placeholder="Enter edited province"
                                                />
                                            </Modal>
                                        </>
                                        <Button
                                            type="danger"
                                            icon={<DeleteOutlined />}
                                            onClick={() => setProvince('')}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Konten City */}
                        <div
                            style={{
                                background: '#fff',
                                padding: 16,
                                borderRadius: 8,
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                width: '30%',
                                marginLeft: '5px',
                            }}
                        >
                            {/* Konten AutoComplete */}
                            <h3>City</h3>
                            <AutoComplete
                                style={{ marginBottom: '10px', width: '100%' }}
                                options={regions.map(region => ({ value: region.city }))}
                                placeholder="Enter city"
                                value={city}
                                onChange={(value) => setCity(value)}
                                filterOption={(inputValue, option) =>
                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                            >
                                <Input
                                    suffix={
                                        <Button
                                            type="primary"
                                            icon={<PlusOutlined />}
                                            onClick={() => saveRegion('city')}
                                        />
                                    }
                                />
                            </AutoComplete>
                            <div
                                style={{
                                    marginTop: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '8px',
                                    border: '1px solid #d9d9d9',
                                    borderRadius: '4px',
                                }}
                            >
                                {city ? (
                                    city
                                ) : (
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                )}
                                {city && (
                                    <div>
                                        <>
                                            <Button
                                                type="primary"
                                                icon={<EditOutlined />}
                                                onClick={() => handleEditCity(city)}
                                                style={{ marginRight: '8px' }}
                                            />
                                            <Modal
                                                title="Edit City"
                                                visible={isModalCityVisible}
                                                onOk={() => handleOk('city')}
                                                onCancel={handleCancel}
                                                okText="Save"
                                                cancelText="Cancel"
                                            >
                                                <Input
                                                    value={city}
                                                    onChange={(e) => setCity(e.target.value)}
                                                    placeholder="Enter edited city"
                                                />
                                            </Modal>
                                        </>
                                        <Button
                                            type="danger"
                                            icon={<DeleteOutlined />}
                                            onClick={() => setCity('')}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </LayoutUtama>
    );
};

export default Region;
