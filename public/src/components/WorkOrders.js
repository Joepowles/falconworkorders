import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { fetchWorkOrders, createWorkOrder, updateWorkOrder, deleteWorkOrder } from '../services/apiService';

function WorkOrders() {
  const [state, setState] = useContext(AppContext);
  const [workOrders, setWorkOrders] = useState([]);
  const [newWorkOrder, setNewWorkOrder] = useState({ description: '', equipmentId: '' });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWorkOrders();
      setWorkOrders(data);
    };

    fetchData();
  }, []);

  const handleCreate = async () => {
    const createdWorkOrder = await createWorkOrder(newWorkOrder);
    setWorkOrders([...workOrders, createdWorkOrder]);
  };

  const handleUpdate = async (id, updates) => {
    const updatedWorkOrder = await updateWorkOrder(id, updates);
    setWorkOrders(workOrders.map(order => (order.id === id ? updatedWorkOrder : order)));
  };

  const handleDelete = async (id) => {
    await deleteWorkOrder(id);
    setWorkOrders(workOrders.filter(order => order.id !== id));
  };

  return (
    <div>
      <h1>Work Orders</h1>
      {workOrders.map(order => (
        <div key={order.id}>
          <p>{order.description}</p>
          <p>{order.equipmentId}</p>
          {/* Add buttons to update and delete */}
        </div>
      ))}
      <div>
        <input
          type="text"
          value={newWorkOrder.description}
          onChange={(e) => setNewWorkOrder({ ...newWorkOrder, description: e.target.value })}
          placeholder="Description"
        />
        <input
          type="text"
          value={newWorkOrder.equipmentId}
          onChange={(e) => setNewWorkOrder({ ...newWorkOrder, equipmentId: e.target.value })}
          placeholder="Equipment ID"
        />
        <button onClick={handleCreate}>Create Work Order</button>
      </div>
    </div>
  );
}

export default WorkOrders;
