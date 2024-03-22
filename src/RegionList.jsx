// RegionList.jsx

import React, { useState, useEffect } from 'react';

const RegionList = () => {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = async () => {
    try {
      const response = await fetch('http://localhost:5000/region');
      const data = await response.json();
      setRegions(data);
    } catch (error) {
      console.error('Error fetching regions:', error);
    }
  };

  return (
    <div>
      <h2>List of Regions</h2>
      <ul>
        {regions.map(region => (
          <li key={region.uuid}>
            <strong>Country:</strong> {region.country}<br />
            <strong>Province:</strong> {region.province}<br />
            <strong>City:</strong> {region.city}<br />
            <strong>User:</strong> {region.user.name} ({region.user.email})<br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegionList;
