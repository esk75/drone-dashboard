import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const data = [
  { date: '2023-08-04', killed: 8, injured: 0, location: 'Finote Selam, West Gojjam', region: 'Amhara', source: 'https://www.amharaamerica.org/_files/ugd/e494ca_6dc816df63bd43c5a98dddf9953819f2.pdf' },
  { date: '2023-08-14', killed: 26, injured: 15, location: 'Finote Selam, West Gojjam', region: 'Amhara', source: 'https://www.lemonde.fr/en/international/article/2023/08/15/air-strike-kills-at-least-26-in-ethiopia-s-amhara_6093248_4.html' },
  { date: '2023-09-17', killed: 30, injured: 0, location: 'Adet, West Gojjam', region: 'Amhara', source: 'https://www.bbc.com/amharic/articles/cv21y38zy71o' },
  { date: '2023-09-17', killed: 18, injured: 0, location: 'Dembecha, West Gojjam', region: 'Amhara', source: 'https://www.bbc.com/amharic/articles/cv21y38zy71o' },
  { date: '2023-10-05', killed: 12, injured: 0, location: 'Debre Markos, East Gojjam', region: 'Amhara', source: 'https://addisstandard.com/news-drone-attacks-coinciding-with-irreechaa-result-in-dozen-of-fatalities-in-west-oromia/' },
  { date: '2023-10-06', killed: 40, injured: 20, location: 'Abe Dongoro, Horro Guduru', region: 'Oromia', source: 'https://www.amharaamerica.org/post/endf-drone-strikes-leave-30-dead-and-multiple-injured-in-abe-dongoro-woreda-on-october-6-2023' },
  { date: '2023-10-10', killed: 12, injured: 0, location: 'Adet, West Gojjam', region: 'Amhara', source: 'https://www.reuters.com/world/africa/conflict-ethiopias-amhara-kills-dozens-rights-body-says-2023-10-30/' },
  { date: '2023-10-16', killed: 35, injured: 27, location: 'Berehet, North Shewa', region: 'Amhara', source: 'https://www.amharaamerica.org/post/abiy-ahmed-ali-regimes-drone-strikes-35-amhara-civilians-killed-27-injured-in-berehet-woreda' },
  { date: '2023-11-04', killed: 11, injured: 0, location: 'Debre Tabor, South Gondar', region: 'Amhara', source: 'https://www.amharaamerica.org/_files/ugd/e494ca_6dc816df63bd43c5a98dddf9953819f2.pdf' },
  { date: '2023-11-09', killed: 12, injured: 0, location: 'Nefas Mewcha, South Gondar', region: 'Amhara', source: 'https://www.amharaamerica.org/_files/ugd/e494ca_6dc816df63bd43c5a98dddf9953819f2.pdf' },
  { date: '2023-12-10', killed: 80, injured: 0, location: 'Merawi, West Gojjam', region: 'Amhara', source: 'https://www.amharaamerica.org/_files/ugd/e494ca_6dc816df63bd43c5a98dddf9953819f2.pdf' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

const DroneDashboard = () => {
  const [filter, setFilter] = useState('All');
  const [selectedPoint, setSelectedPoint] = useState(null);

  const filteredData = useMemo(() => 
    filter === 'All' ? data : data.filter(item => item.region === filter),
    [filter]
  );

  const totalKilled = filteredData.reduce((sum, item) => sum + item.killed, 0);
  const totalInjured = filteredData.reduce((sum, item) => sum + item.injured, 0);
  const averageKilled = (totalKilled / filteredData.length).toFixed(2);

  const regionData = useMemo(() => {
    const regionCounts = data.reduce((acc, item) => {
      acc[item.region] = (acc[item.region] || 0) + item.killed;
      return acc;
    }, {});
    return Object.entries(regionCounts).map(([name, value]) => ({ name, value }));
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Dashboard of Drone Attacks in Ethiopia</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="regionFilter">Filter by region: </label>
        <select id="regionFilter" value={filter} onChange={(e) => setFilter(e.target.value)} style={{ marginRight: '10px' }}>
          <option value="All">All regions</option>
          <option value="Amhara">Amhara</option>
          <option value="Oromia">Oromia</option>
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <div style={{ textAlign: 'center', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <h3>Total casualties</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalKilled}</p>
        </div>
        <div style={{ textAlign: 'center', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <h3>Total injured</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalInjured}</p>
        </div>
        <div style={{ textAlign: 'center', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <h3>Average casualties per incident</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{averageKilled}</p>
        </div>
        <div style={{ textAlign: 'center', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <h3>Number of incidents</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{filteredData.length}</p>
        </div>
      </div>

      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <div style={{ flex: 2, border: '1px solid #ddd', borderRadius: '5px', padding: '10px', marginRight: '10px' }}>
          <h2 style={{ textAlign: 'center' }}>Casualties over time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="killed" stroke="#8884d8" name="Killed" activeDot={{ onClick: (_, index) => setSelectedPoint(filteredData[index]) }} />
              <Line type="monotone" dataKey="injured" stroke="#82ca9d" name="Injured" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: 1, border: '1px solid #ddd', borderRadius: '5px', padding: '10px' }}>
          <h2 style={{ textAlign: 'center' }}>Distribution by region</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={regionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                {regionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ marginBottom: '20px', border: '1px solid #ddd', borderRadius: '5px', padding: '10px' }}>
        <h2 style={{ textAlign: 'center' }}>Casualties per incident</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="killed" fill="#8884d8" name="Killed" />
            <Bar dataKey="injured" fill="#82ca9d" name="Injured" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {selectedPoint && (
        <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
          <h3>Selected Incident Details</h3>
          <p>Date: {selectedPoint.date}</p>
          <p>Location: {selectedPoint.location}</p>
          <p>Region: {selectedPoint.region}</p>
          <p>Number of killed: {selectedPoint.killed}</p>
          <p>Number of injured: {selectedPoint.injured}</p>
          <p>Source: <a href={selectedPoint.source} target="_blank" rel="noopener noreferrer">Link to article</a></p>
        </div>
      )}

      <div style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '10px', overflowX: 'auto' }}>
        <h2 style={{ textAlign: 'center' }}>Incident details</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Date</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Location</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Region</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Killed</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Injured</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Source</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.date}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.location}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.region}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.killed}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.injured}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <a href={item.source} target="_blank" rel="noopener noreferrer">Link to article</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DroneDashboard;
