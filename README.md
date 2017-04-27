

___
Configuration:

Install dependencies:

**npm install**

In *example-app-config.json*

  **Write *customer* mongodb url.**
  
  **Write *orders* mongodb url.**
  
  **Write *RabbitMQ* amqp url.**
  
  Finally, rename example-app-config.json to **app-config.json**
  
___
**Run project**

You need 3 command line shells. One for Gateway, one for Customers, and one for Orders.

**Gateway Shell:**

npm start

**Customers Shell:**

node server/customers/app.js

**Orders Shell:**

node server/orders/shell


