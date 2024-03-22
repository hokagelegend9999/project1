import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie, VictoryLine, VictoryTooltip } from 'victory';
import { Breadcrumb, Layout } from 'antd'; // Tambahkan import Layout
const { Content } = Layout; // Deklarasikan Content dari Layout

const barChartData = [
    { x: 'Group A', y: 400 },
    { x: 'Group B', y: 300 },
    { x: 'Group C', y: 300 },
    { x: 'Group D', y: 200 },
];

const pieChartData = [
    { x: 'Group A', y: 400 },
    { x: 'Group B', y: 300 },
    { x: 'Group C', y: 300 },
    { x: 'Group D', y: 200 },
];

const lineChartData = [
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
    { x: 4, y: 7 },
    { x: 5, y: 11 },
];

const trafficData = [
    { x: 1, y: 200 },
    { x: 2, y: 300 },
    { x: 3, y: 400 },
    { x: 4, y: 350 },
    { x: 5, y: 500 },
    { x: 6, y: 450 },
    { x: 7, y: 550 },
  ];

const Welcome = () => {

  return (
    <Content
        style={{
            padding: '0 48px',
        }}
    >
        <Breadcrumb
            style={{
                margin: '16px 0',
            }}
        >
            <Breadcrumb.Item>Home</Breadcrumb.Item>

        </Breadcrumb>
        <b>PIE CHART DIAGRAM</b>
        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 1500 }}>
            <div style={{ padding: 20, borderRadius: 10, background: '#f0f0f0' }}>
                <VictoryChart
                    domainPadding={20}
                    theme={VictoryTheme.material}
                >
                    <VictoryAxis
                        tickValues={barChartData.map((item) => item.x)}
                        style={{
                            tickLabels: { fontSize: 10, padding: 5, angle: -45 }
                        }}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(x) => (`$${x / 1000}k`)}
                        style={{
                            tickLabels: { fontSize: 10, padding: 5 }
                        }}
                    />
                    <VictoryBar
                        data={barChartData}
                        x="x"
                        y="y"
                        style={{
                            data: {
                                fill: ({ datum }) => {
                                    const colors = ['#FF5733', '#FFC300', '#36A2EB', '#4BC0C0'];
                                    return colors[barChartData.indexOf(datum) % colors.length];
                                },
                            },
                        }}
                    />
                </VictoryChart>
            </div>
            <div style={{ padding: 20, borderRadius: 10, background: '#f0f0f0' }}>
                <VictoryPie
                    width={300}
                    height={300}
                    colorScale={['#FF5733', '#FFC300', '#36A2EB', '#4BC0C0']}
                    data={pieChartData}
                    padAngle={3} // Tambahkan padAngle di sini
                />
            </div>
            <div style={{ padding: 20, borderRadius: 10, background: '#f0f0f0' }}>
                <VictoryChart>
                    <VictoryLine
                        style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid #ccc" }
                        }}
                        data={lineChartData}
                    />

<VictoryLine
            data={trafficData} // Data untuk chart
            x="x" // Kolom yang berisi nilai sumbu x
            y="y" // Kolom yang berisi nilai sumbu y
            labelComponent={<VictoryTooltip />} // Komponen untuk tooltip
          />
                </VictoryChart>
            </div>
        </div>
    </Content>
  );
};

export default Welcome;
