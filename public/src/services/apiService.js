export const login = async (username, password) => {
    try {
      const response = await fetch('https://api.falconworkorders.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  
  export const register = async (userData) => {
    try {
      const response = await fetch('https://api.falconworkorders.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Registration failed');
      }
  
      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Error registering:', error);
    }
  };
  
  export const fetchWorkOrders = async () => {
    try {
      const response = await fetch('https://api.falconworkorders.com/workorders');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching work orders:', error);
    }
  };
  
  export const createWorkOrder = async (workOrder) => {
    try {
      const response = await fetch('https://api.falconworkorders.com/workorders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workOrder),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating work order:', error);
    }
  };
  
  export const updateWorkOrder = async (id, updates) => {
    try {
      const response = await fetch(`https://api.falconworkorders.com/workorders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating work order:', error);
    }
};
  