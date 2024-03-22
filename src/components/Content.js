import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie, VictoryLine } from 'victory';
import { Card, CardDeck, Form } from 'react-bootstrap';

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

const [filter, setFilter] = useState('');

const cards = [
  { title: 'Card 1', category: 'Category A' },
  { title: 'Card 2', category: 'Category B' },
  { title: 'Card 3', category: 'Category A' },
];

const filteredCards = cards.filter(card =>
  card.category.toLowerCase().includes(filter.toLowerCase())
);
const ChartComponent = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 800 }}>
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
                </VictoryChart>
                <div>
      <Form.Control
        type="text"
        placeholder="Filter by category..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <CardDeck>
        {filteredCards.map((card, index) => (
          <Card key={index}>
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
              <Card.Text>{card.category}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </CardDeck>
    </div>
            </div>
        </div>
    );
};

export default ChartComponent;
