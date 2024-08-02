new Vue({
    el: '#app',
    data: {
        loggedIn: false,
        user: null,
        registerData: {
            username: '',
            password: '',
            email: ''
        },
        loginData: {
            username: '',
            password: ''
        },
        workOrderData: {
            description: ''
        },
        workOrders: []
    },
    methods: {
        async register() {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.registerData)
            });
            const data = await response.json();
            if (data.success) {
                alert('Registration successful!');
            } else {
                alert('Registration failed: ' + data.message);
            }
        },
        async login() {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.loginData)
            });
            const data = await response.json();
            if (data.success) {
                this.loggedIn = true;
                this.user = data.user;
                this.fetchWorkOrders();
            } else {
                alert('Login failed: ' + data.message);
            }
        },
        logout() {
            this.loggedIn = false;
            this.user = null;
            this.workOrders = [];
        },
        async createWorkOrder() {
            const response = await fetch('/api/workorders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.workOrderData)
            });
            const data = await response.json();
            if (data.success) {
                this.workOrderData.description = '';
                this.fetchWorkOrders();
            } else {
                alert('Failed to create work order: ' + data.message);
            }
        },
        async fetchWorkOrders() {
            const response = await fetch('/api/workorders');
            const data = await response.json();
            if (data.success) {
                this.workOrders = data.workOrders;
            } else {
                alert('Failed to fetch work orders: ' + data.message);
            }
        },
        async updateWorkOrder(id) {
            const response = await fetch(`/api/workorders/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'Updated' }) // Example update
            });
            const data = await response.json();
            if (data.success) {
                this.fetchWorkOrders();
            } else {
                alert('Failed to update work order: ' + data.message);
            }
        },
        async deleteWorkOrder(id) {
            const response = await fetch(`/api/workorders/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (data.success) {
                this.fetchWorkOrders();
            } else {
                alert('Failed to delete work order: ' + data.message);
            }
        }
    }
});
