import React, { useState } from 'react';
import { Button, Input, Layout, Breadcrumb, Table, Checkbox } from 'antd'; // Menambahkan impor Checkbox dari antd

const navigateTo = (path) => {
    window.location.href = path;
};

const { Content } = Layout;

const SecurityModule = () => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);

    const handleSearch = () => {
        console.log('Searching for:', searchValue);
    };

    const handleReset = () => {
        setSearchValue('');
    };

    const handleCheckboxChange = (selectedRowKeys) => {
        setSelectedRows(selectedRowKeys);
    };

    const columns = [
        {
            title: 'Secure Module',
            dataIndex: 'secureModule',
            key: 'secureModule',
            render: (_, record) => (
                <Checkbox checked={selectedRows.includes(record.key)} onChange={() => handleCheckboxChange(record.key)} />
            ),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Port',
            dataIndex: 'port',
            key: 'port',
        },
        {
            title: 'Add Time',
            dataIndex: 'addTime',
            key: 'addTime',
        },
        {
            title: 'legacy/sts-6',
            dataIndex: 'legacy',
            key: 'legacy',
            render: (_, record) => (
                <Checkbox checked={selectedRows.includes(record.key)} onChange={() => handleCheckboxChange(record.key)} />
            ),
        },
        {
            title: 'sts-6',
            dataIndex: 'sts-6',
            key: 'sts-6',
            render: (_, record) => (
                <Checkbox checked={selectedRows.includes(record.key)} onChange={() => handleCheckboxChange(record.key)} />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <>
                    <a href="#">Detail</a> | <a href="#">Edit</a> | <a href="#">Delete</a>
                </>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            secureModule: <Checkbox checked={selectedRows.includes('1')} onChange={() => handleCheckboxChange('1')} />,
            address: 'Data 2',
            port: 'Data 3',
            addTime: 'Data 4',
            legacy: 'Data 5',
            'sts-6': 'Data 6',
        },
        {
            key: '2',
            secureModule: <Checkbox checked={selectedRows.includes('2')} onChange={() => handleCheckboxChange('2')} />,
            address: 'Data 2',
            port: 'Data 3',
            addTime: 'Data 4',
            legacy: 'Data 5',
            'sts-6': 'Data 6',
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item onClick={() => navigateTo('/')}>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>System</Breadcrumb.Item>
                    <Breadcrumb.Item>Region</Breadcrumb.Item>
                </Breadcrumb>
                <h3>Security Module</h3>
                 <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                 <p style={{ marginTop: 5, marginBottom: 30 }}>Quick Search : </p>
<div style={{ marginLeft: 20 }}>
    <Input.Search
        placeholder="Search"
        enterButton="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onSearch={handleSearch}
        style={{ width: 500, marginRight: 30 }}
    />


        <Button onClick={handleReset} style={{ marginTop: 2, marginBottom: 30 }}>Reset</Button>
    </div>
</div>

                <div style={{ marginTop: 50 }}>
                   <Button type="primary" style={{ marginRight: 200, marginTop: 50, marginBottom: 10 }}>+ Create</Button>
             
                   
                </div>
                <Table columns={columns} dataSource={data} style={{ marginTop: 24 }} />
            </Content>
        </Layout>
    );
};

export default SecurityModule;
