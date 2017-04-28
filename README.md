
___
## Project Description

Online Store is a web based full stack application. Online Store is implemented using AngularJS on the client side and NodeJS on the server side. The purpose of this project is to implement an event-driven microservices architecture. The architecture consist of a Gateway, Cusctomers and Orders services. Gateway is responsible for offering an API to the outside world and hide the application sub components. Customers and Orders are responsible for offering and API to customers and orders data, respectively. They both consume and publish messages to messaging queues. RabbitMQ was used as a messaging queue service and MongoDB was use as the database. The application subcomponents work independently but all together implement the application business roles. For example, when a costumer creates an order the gateway sends a "PLACE_ORDER" message to a queue, which Orders serivce consumes. Then Orders publishes "CREATE_ORDER" message requesting if a customer has enough credit for that order. The  Costumer services consumes that message and checks for costumer credit. If the coustmer has enough credit then Costumer publishes "CREDIT_APPROVED" message or "CREDIT_LIMIT_EXCEEDED" otherwise. Finally, the Orders service consumes either message and updates the status of the order. Event-drive architectures are very favorable to scale your application subcomponents. Nowadays most web base application need to be scaled. 
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

[Video Tutorial ](https://www.youtube.com/watch?v=ChjpkD0sbVk&feature=youtu.be)

[Microservices Design](https://github.com/carlosdarienvizcaino/OnlineStore/blob/master/documentation/MicroserviceDesign.pdf)

[API Docs](https://github.com/carlosdarienvizcaino/OnlineStore/blob/master/documentation/APIDocumentation.pdf)

[System Events](https://github.com/carlosdarienvizcaino/OnlineStore/blob/master/documentation/EventsDoc.pdf)


___
## Resources


[**MongoDB mLab as a Service**](https://mlab.com/home)

[**RabbitMQ as a Service**](https://www.cloudamqp.com/)

[**RabbitMQ JavaScript Client**](https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html)


