// // src/Pages/FarmerManagement.js

// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../axiosInstance';
// import './FarmerManagement.css';

// const FarmerManagement = () => {
//   const [farmers, setFarmers] = useState([]);
//   const [newFarmer, setNewFarmer] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//   });
//   const [editFarmer, setEditFarmer] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch all farmers from the backend
//    https://backend-11-1.onrender.com/api/farmers/
//       .get('/farmers/')
//       .then((response) => {
//         setFarmers(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching farmers:', error);
//         setLoading(false);
//       });
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewFarmer((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditFarmer((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddFarmer = () => {
//     axiosInstance
//       .post('/farmers/', newFarmer)
//       .then((response) => {
//         setFarmers([...farmers, response.data]);
//         setNewFarmer({ name: '', email: '', phone: '', address: '' });
//       })
//       .catch((error) => console.error('Error adding farmer:', error));
//   };

//   const handleSaveEdit = (id) => {
//     axiosInstance
//       .put(`/farmers/${id}/`, editFarmer)
//       .then((response) => {
//         setFarmers((prev) =>
//           prev.map((farmer) => (farmer.id === id ? response.data : farmer))
//         );
//         setEditFarmer(null);
//       })
//       .catch((error) => console.error('Error updating farmer:', error));
//   };

//   const handleDeleteFarmer = (id) => {
//    https://backend-11-1.onrender.com/api/farmers/
//       .delete(`/farmers/${id}/`)
//       .then(() => {
//         setFarmers((prev) => prev.filter((farmer) => farmer.id !== id));
//       })
//       .catch((error) => console.error('Error deleting farmer:', error));
//   };

//   if (loading) {
//     return <div>Loading farmers...</div>;
//   }

//   return (
//     <div className="farmer-management">
//       <h1>Farmer Management</h1>
//       <div className="add-farmer">
//         <h2>Add New Farmer</h2>
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={newFarmer.name}
//           onChange={handleInputChange}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={newFarmer.email}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone"
//           value={newFarmer.phone}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           name="address"
//           placeholder="Address"
//           value={newFarmer.address}
//           onChange={handleInputChange}
//         />
//         <button onClick={handleAddFarmer}>Add Farmer</button>
//       </div>

//       <div className="farmer-list">
//         <h2>All Farmers</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Address</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {farmers.map((farmer) => (
//               <tr key={farmer.id}>
//                 <td>{farmer.id}</td>
//                 <td>
//                   {editFarmer?.id === farmer.id ? (
//                     <input
//                       type="text"
//                       name="name"
//                       value={editFarmer.name}
//                       onChange={handleEditChange}
//                     />
//                   ) : (
//                     farmer.name
//                   )}
//                 </td>
//                 <td>
//                   {editFarmer?.id === farmer.id ? (
//                     <input
//                       type="email"
//                       name="email"
//                       value={editFarmer.email}
//                       onChange={handleEditChange}
//                     />
//                   ) : (
//                     farmer.email
//                   )}
//                 </td>
//                 <td>
//                   {editFarmer?.id === farmer.id ? (
//                     <input
//                       type="text"
//                       name="phone"
//                       value={editFarmer.phone}
//                       onChange={handleEditChange}
//                     />
//                   ) : (
//                     farmer.phone
//                   )}
//                 </td>
//                 <td>
//                   {editFarmer?.id === farmer.id ? (
//                     <input
//                       type="text"
//                       name="address"
//                       value={editFarmer.address}
//                       onChange={handleEditChange}
//                     />
//                   ) : (
//                     farmer.address
//                   )}
//                 </td>
//                 <td>
//                   {editFarmer?.id === farmer.id ? (
//                     <>
//                       <button onClick={() => handleSaveEdit(farmer.id)}>
//                         Save
//                       </button>
//                       <button onClick={() => setEditFarmer(null)}>Cancel</button>
//                     </>
//                   ) : (
//                     <>
//                       <button onClick={() => setEditFarmer(farmer)}>Edit</button>
//                       <button onClick={() => handleDeleteFarmer(farmer.id)}>
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default FarmerManagement;

import React, { useState, useEffect } from 'react';
import axiosInstance from '../https://backend-11-1.onrender.com/api/farmers/';
import './FarmerManagement.css';

const FarmerManagement = () => {
  const [farmers, setFarmers] = useState([]);
  const [newFarmer, setNewFarmer] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    address: '',
    role: 'owner', // Default role
    password: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all farmers from the backend
    https://backend-11-1.onrender.com/api/farmers/
      .get('/farmers/')
      .then((response) => {
        setFarmers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching farmers:', error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFarmer((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFarmer = () => {
    https://backend-11-1.onrender.com/api/farmers/
      .post('/farmers/', newFarmer)
      .then((response) => {
        setFarmers([...farmers, response.data]);
        setNewFarmer({
          first_name: '',
          last_name: '',
          email: '',
          phone_number: '',
          address: '',
          role: 'owner',
          password: '',
        });
      })
      .catch((error) => console.error('Error adding farmer:', error));
  };

  if (loading) {
    return <div>Loading farmers...</div>;
  }

  return (
    <div className="farmer-management">
      <h1>Farmer Management</h1>
      <div className="add-farmer">
        <h2>Add New Farmer</h2>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={newFarmer.first_name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={newFarmer.last_name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newFarmer.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={newFarmer.phone_number}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newFarmer.address}
          onChange={handleInputChange}
        />
        <select
          name="role"
          value={newFarmer.role}
          onChange={handleInputChange}
        >
          <option value="owner">Owner</option>
          <option value="worker">Worker</option>
        </select>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newFarmer.password}
          onChange={handleInputChange}
        />
        <button onClick={handleAddFarmer}>Add Farmer</button>
      </div>

      <div className="farmer-list">
        <h2>All Farmers</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {farmers.map((farmer) => (
              <tr key={farmer.id}>
                <td>{farmer.id}</td>
                <td>{farmer.first_name}</td>
                <td>{farmer.last_name}</td>
                <td>{farmer.email}</td>
                <td>{farmer.phone_number}</td>
                <td>{farmer.address}</td>
                <td>{farmer.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FarmerManagement;
