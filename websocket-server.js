import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 8080 });

console.log("Servidor WebSocket ejecutándose en ws://localhost:8080");

let clientIdCounter = 1;

// Manejar nuevas conexiones
server.on("connection", (socket) => {
  const clientId = clientIdCounter++;
  console.log(`Cliente ${clientId} conectado.`);
  // socket.send(`Conectado como Cliente ${clientId}`);

  // Escuchar mensajes del cliente
  socket.on("message", (message) => {
    const data = `Cliente ${clientId}: ${message}`;
    console.log(`Mensaje recibido: ${data}`);

    // Reenviar el mensaje a todos los demás clientes
    server.clients.forEach((client) => {
      if (client !== socket && client.readyState === client.OPEN) {
        client.send(data);
      }
      else {
        client.send("continuar")
      }
    });
  });

  // Manejar cierre de conexión
  socket.on("close", () => {
    console.log(`Cliente ${clientId} desconectado.`);
  });
});
