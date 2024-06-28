// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useHostels } from '../../contexts/HostelContext';
// import './filter.scss';

// const Filter = () => {
//   const { hostels, setFilteredHostels } = useHostels();
//   const [propertyType, setPropertyType] = useState([]);
//   const [roomType, setRoomType] = useState([]);
//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');
//   const navigate = useNavigate();

//   const toggleSelection = (state, setState, value) => {
//     setState(prevState =>
//       prevState.includes(value)
//         ? prevState.filter(item => item !== value)
//         : [...prevState, value]
//     );
//   };

//   const setFilter = (filters) => {
//     const { propertyType, roomType, minPrice, maxPrice } = filters;
//     const filteredData = hostels.filter((hostel) => {
//       const matchesPropertyType = propertyType.length === 0 || propertyType.includes(hostel.propertyType);
//       const matchesRoomType = roomType.length === 0 || roomType.includes(hostel.roomType);
//       const matchesMinPrice = minPrice === '' || hostel.price >= parseFloat(minPrice);
//       const matchesMaxPrice = maxPrice === '' || hostel.price <= parseFloat(maxPrice);
//       return matchesPropertyType && matchesRoomType && matchesMinPrice && matchesMaxPrice;
//     });
//     setFilteredHostels(filteredData);
//     localStorage.setItem('filteredHostels', JSON.stringify(filteredData)); // Save filtered data to local storage
//     navigate('/home'); // Navigate back to home page after applying filter
//   };

//   const handleApplyFilter = () => {
//     const filters = { propertyType, roomType, minPrice, maxPrice };
//     setFilter(filters);
//   };

//   return (
//     <div className="filter-page">
//       <h2>Filter Hostels</h2>
//       <div className="filter-container">
//         <div className="filter-row">
//           <div className="filter-item">
//             <label>Property Type</label>
//             <div className="button-group">
//               {['House', 'Hall', 'Residence', 'Residential College'].map(type => (
//                 <button
//                   key={type}
//                   className={`filter-button ${propertyType.includes(type) ? 'selected' : ''}`}
//                   onClick={() => toggleSelection(propertyType, setPropertyType, type)}
//                 >
//                   {type}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div className="filter-item">
//             <label>Room Type</label>
//             <div className="button-group">
//               {['Single', 'Shared', 'Apartment'].map(type => (
//                 <button
//                   key={type}
//                   className={`filter-button ${roomType.includes(type) ? 'selected' : ''}`}
//                   onClick={() => toggleSelection(roomType, setRoomType, type)}
//                 >
//                   {type}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="price-row">
//           <div className="filter-item">
//             <label>Min Price</label>
//             <input
//               type="number"
//               value={minPrice}
//               onChange={(e) => setMinPrice(e.target.value)}
//               placeholder="Enter min price"
//             />
//           </div>
//           <div className="filter-item">
//             <label>Max Price</label>
//             <input
//               type="number"
//               value={maxPrice}
//               onChange={(e) => setMaxPrice(e.target.value)}
//               placeholder="Enter max price"
//             />
//           </div>
//         </div>
//         <button className="apply-filter-button" onClick={handleApplyFilter}>
//           Apply Filter
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Filter;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHostels } from '../../contexts/HostelContext';
import './filter.scss';

const Filter = () => {
  const { hostels, setFilteredHostels } = useHostels();
  const [propertyType, setPropertyType] = useState([]);
  const [roomType, setRoomType] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  const toggleSelection = (state, setState, value) => {
    setState(prevState =>
      prevState.includes(value)
        ? prevState.filter(item => item !== value)
        : [...prevState, value]
    );
  };

  const setFilter = (filters) => {
    const { propertyType, roomType, minPrice, maxPrice } = filters;
    const filteredData = hostels.filter((hostel) => {
      const matchesPropertyType = propertyType.length === 0 || propertyType.every(mainType => hostel.type.includes(mainType));
      const matchesRoomType = roomType.length === 0 || roomType.every(subType => hostel.type.includes(subType)); // Assuming hostel.propertyType includes both propertyType and roomType
      const matchesMinPrice = minPrice === '' || hostel.price >= parseFloat(minPrice);
      const matchesMaxPrice = maxPrice === '' || hostel.price <= parseFloat(maxPrice);
      return matchesPropertyType && matchesRoomType && matchesMinPrice && matchesMaxPrice;
    });
    setFilteredHostels(filteredData);
    localStorage.setItem('filteredHostels', JSON.stringify(filteredData)); // Save filtered data to local storage
    navigate('/home'); // Navigate back to home page after applying filter
  };

  const handleApplyFilter = () => {
    const filters = { propertyType, roomType, minPrice, maxPrice };
    setFilter(filters);
  };

  return (
    <div className="filter-page">
      <h2>Filter Hostels</h2>
      <div className="filter-container">
        <div className="filter-row">
          <div className="filter-item">
            <label>Property Type</label>
            <div className="button-group">
              {['House', 'Hall', 'Residence', 'Residential College'].map(type => (
                <button
                  key={type}
                  className={`filter-button ${propertyType.includes(type) ? 'selected' : ''}`}
                  onClick={() => toggleSelection(propertyType, setPropertyType, type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-item">
            <label>Room Type</label>
            <div className="button-group">
              {['Single', 'Shared', 'Apartment'].map(type => (
                <button
                  key={type}
                  className={`filter-button ${roomType.includes(type) ? 'selected' : ''}`}
                  onClick={() => toggleSelection(roomType, setRoomType, type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="price-row">
          <div className="filter-item">
            <label>Min Price</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Enter min price"
            />
          </div>
          <div className="filter-item">
            <label>Max Price</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Enter max price"
            />
          </div>
        </div>
        <button className="apply-filter-button" onClick={handleApplyFilter}>
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default Filter;
