import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const DashboardComponent = () => {
    // Data untuk Pie Chart
    const pieChartData = [
        { name: 'Category A', value: 400 },
        { name: 'Category B', value: 300 },
        { name: 'Category C', value: 200 },
        { name: 'Category D', value: 100 },
    ];

    // Data untuk Line Chart
    const lineChartData = [
        { name: 'Jan', uv: 400, pv: 2400, amt: 2400 },
        { name: 'Feb', uv: 300, pv: 1398, amt: 2210 },
        { name: 'Mar', uv: 200, pv: 9800, amt: 2290 },
        { name: 'Apr', uv: 278, pv: 3908, amt: 2000 },
        { name: 'May', uv: 189, pv: 4800, amt: 2181 },
        { name: 'Jun', uv: 239, pv: 3800, amt: 2500 },
    ];

    return (
        <div>
            <h2>Pie Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie dataKey="value" data={pieChartData} nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>

            <h2>Line Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DashboardComponent;
