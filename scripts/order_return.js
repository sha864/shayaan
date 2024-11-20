// Base class
class OrderLoader {
    async loadOrderData(range) {
        try {
            const response = await fetch(`https://amazon-server-1-27sp.onrender.com/user/getOrders/${range}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie('jwtToken')}`
                }
            });
            if (response.status != 200) {
                console.log("Orders not available");
                return;
            }
            const data = await response.json();
            loadOrderDiv(data, range);
        } catch (e) {
            console.log(e);
        }
    }
}

// Derived class with overridden method
class CustomOrderLoader extends OrderLoader {
    async loadOrderData(range) {
        console.log("Loading customized order data...");

        // Call the base class method
        await super.loadOrderData(range);

        // Additional custom logic (e.g., logging, custom UI updates)
        console.log(`Loaded orders for range: ${range}`);
    }
}

// Usage
const orderLoader = new CustomOrderLoader();
orderLoader.loadOrderData("All");
