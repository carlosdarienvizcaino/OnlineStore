

___
## Configuration:

#### Install dependencies:

**npm install**

#### Modify *example-app-config.json*

  Write *customer* mongodb url.
  
  Write *orders* mongodb url.
  
  Write *RabbitMQ* amqp url.
  
  Finally, rename example-app-config.json to **app-config.json**
  
___
## Run project

You need 3 command line shells. One for Gateway, one for Customers, and one for Orders.

**Gateway Shell:**

npm start

**Customers Shell:**

node server/customers/app.js

**Orders Shell:**

node server/orders/app.js

___ 
## Documentation

[Microservices Design](../blob/master/documentation/MicroservicesDesign.pdf)

[API](../blob/master/documentation/APIDocumentation.pdf)

[System Events](../blob/master/documentation/EventDocs.pdf)


___
## Resources

[**MongoDB mLab as a Service**](https://mlab.com/home)

[**RabbitMQ as a Service**](https://www.cloudamqp.com/)

[**RabbitMQ JavaScript Client**](https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html)


