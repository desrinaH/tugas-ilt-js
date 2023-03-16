const Hapi = require('hapi');

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

let contacts = [
  {
    "id": "1",
    "name" : "John Doe",
    "email" : "john@example.com",
    "phone" : "1234567890"
  }
];

server.route({
    method: "GET",
    path: "/contacts",
    handler: (request, h) => {
        return h.response(contacts).code(200);
    }
});
     
server.route({
  method: 'POST',
  path: '/contacts',
  handler: (request, h) => {
    const newContact = request.payload;
    contacts.push(newContact);
    return h.response().code(201);
  }
});

server.route({
  method: 'DELETE',
  path: '/contacts/{id}',
  handler: (request, h) => {
    const id = request.params.id;
    contacts = contacts.filter(contact => contact.id !== id);
    return h.response().code(200);
  }
});

async function start() {
    try {
      await server.start();
      console.log(`Server running at: ${server.info.uri}`);
    } catch (err) {
      console.log(err);
    }
  }
  
  start();