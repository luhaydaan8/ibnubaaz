// // src/Pages/MaintenanceManagement.js

// import React, { useEffect, useState } from 'react';
// import './MaintenanceManagement.css';
// import axiosInstance from '../axiosInstance';
// // import axios from 'axios';

// const MaintenanceManagement = () => {
//   const [maintenanceTasks, setMaintenanceTasks] = useState([]);
//   useEffect(() =>{

//     axiosInstance.get('/maintenance')
//     .then(response => {
//       setMaintenanceTasks(response.data);

//     })
//     .catch(error =>{
//       console.error("There was an error fetching MaintenanceTask:", error);

//     });
// }, []);


//   const updateTaskStatus = (id, newStatus) => {
//     setMaintenanceTasks((prevTasks) =>
//       prevTasks.map((task) =>
//         task.id === id ? { ...task, status: newStatus } : task
//       )
//     );
//   };

//   return (
//     <div className="maintenance-container">
//       <h1>Maintenance Management</h1>
//       <table className="maintenance-table">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Tool Name</th>
//             <th>Scheduled Date</th>
//             <th>Cost</th>
//             <th>Customer Performed</th>
//             <th>Status</th>
//             <th>Actions</th>

//           </tr>
//         </thead>
//         <tbody>
//           {maintenanceTasks.map((maintenance) => (
//             <tr key={maintenance.id}>
//               <td>{maintenance.id}</td>
//               <td>{maintenance.toolName}</td>
//               <td>{maintenance.scheduledDate}</td>
//               <td>{maintenance.cost}</td>
//               <td>{maintenance.performed_by}</td>
//               <td className={`status ${maintenance.status.replace(/\s+/g, '').toLowerCase()}`}>
//                 {maintenance.status}
//               </td>
//               <td>
//                 {maintenance.status === 'Scheduled' && (
//                   <button
//                     className="action-btn progress-btn"
//                     onClick={() => updateTaskStatus(maintenance.id, 'In Progress')}
//                   >
//                     Start
//                   </button>
//                 )}
//                 {maintenance.status === 'In Progress' && (
//                   <button
//                     className="action-btn complete-btn"
//                     onClick={() => updateTaskStatus(maintenance.id, 'Completed')}
//                   >
//                     Complete
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MaintenanceManagement;


import React, { useEffect, useState } from 'react';
import './MaintenanceManagement.css';
import axiosInstance from '../axiosInstance';

const MaintenanceManagement = () => {
  const [maintenanceTasks, setMaintenanceTasks] = useState([]);
  const [newMaintenance, setNewMaintenance] = useState({
    tool: '',
    maintenance_date: '',
    description: '',
    cost: '',
    performed_by: '',
  });
  const [tools, setTools] = useState([]); // For tool dropdown
  const [farmers, setFarmers] = useState([]); // For farmer dropdown
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch maintenance tasks
    axiosInstance
      .get('/maintenance/')
      .then((response) => {
        setMaintenanceTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching maintenance tasks:', error);
        setLoading(false);
      });

    // Fetch tools
    axiosInstance
      .get('/tools/')
      .then((response) => setTools(response.data))
      .catch((error) => console.error('Error fetching tools:', error));

    // Fetch farmers
    axiosInstance
      .get('/farmers/')
      .then((response) => setFarmers(response.data))
      .catch((error) => console.error('Error fetching farmers:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMaintenance((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMaintenance = () => {
    axiosInstance
      .post('/maintenance/', newMaintenance)
      .then((response) => {
        setMaintenanceTasks([...maintenanceTasks, response.data]);
        setNewMaintenance({
          tool: '',
          maintenance_date: '',
          description: '',
          cost: '',
          performed_by: '',
        });
      })
      .catch((error) => console.error('Error adding maintenance task:', error));
  };

  const handleDeleteMaintenance = (id) => {
    axiosInstance
      .delete(`/maintenance/${id}/`)
      .then(() => {
        setMaintenanceTasks((prev) => prev.filter((task) => task.id !== id));
      })
      .catch((error) => console.error('Error deleting maintenance task:', error));
  };

  if (loading) {
    return <div>Loading maintenance tasks...</div>;
  }

  return (
    <div className="maintenance-container">
      <h1>Maintenance Management</h1>

      {/* Add New Maintenance Task */}
      <div className="add-maintenance">
        <h2>Add Maintenance Task</h2>
        <select
          name="tool"
          value={newMaintenance.tool}
          onChange={handleInputChange}
        >
          <option value="">Select Tool</option>
          {tools.map((tool) => (
            <option key={tool.id} value={tool.id}>
              {tool.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="maintenance_date"
          value={newMaintenance.maintenance_date}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newMaintenance.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          step="0.01"
          name="cost"
          placeholder="Cost"
          value={newMaintenance.cost}
          onChange={handleInputChange}
        />
        <select
          name="performed_by"
          value={newMaintenance.performed_by}
          onChange={handleInputChange}
        >
          <option value="">Select Farmer</option>
          {farmers.map((farmer) => (
            <option key={farmer.id} value={farmer.id}>
              {farmer.first_name} {farmer.last_name}
            </option>
          ))}
        </select>
        <button onClick={handleAddMaintenance}>Add Task</button>
      </div>

      {/* Display Maintenance Tasks */}
      <div className="maintenance-list">
        <h2>Maintenance Tasks</h2>
        <table className="maintenance-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Tool Name</th>
              <th>Date</th>
              <th>Description</th>
              <th>Cost</th>
              <th>Performed By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {maintenanceTasks.map((maintenance) => (
              <tr key={maintenance.id}>
                <td>{maintenance.id}</td>
                <td>{maintenance.tool}</td>
                <td>{maintenance.maintenance_date}</td>
                <td>{maintenance.description}</td>
                <td>{maintenance.cost}</td>
                <td>{maintenance.performed_by}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteMaintenance(maintenance.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaintenanceManagement;
