import WebSocket from "ws";
import readline from "readline";

// Crear interfaz para leer desde la consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let username = null;

// Conectar al servidor WebSocket
const client = new WebSocket("ws://localhost:8080");

// Escuchar mensajes del servidor
client.on("message", (mensajeservidor) => {
  if (String(mensajeservidor) === "continuar") {
    rl.question("Cual es tu mensaje: ", (mimensaje) => {
      client.send(mimensaje);
    });
  } else {
    console.log(`Mensaje recibido: ${mensajeservidor}`);
  }
});

// Manejar apertura de conexión
client.on("open", () => {
  console.log("Conectado al servidor WebSocket.");
  rl.question("Ingresa tu nombre de usuario: ", (name) => {
    username = name.trim() || "Anónimo";
    console.log(
      `¡Bienvenido, ${username}! Ahora puedes enviar mensajes. Escribe "salir" para desconectarte.`
    );
    rl.question("Cual es tu mensaje: ", (mensaje) => {
      client.send(mensaje);
    });
  });
});

// Manejar cierre de conexión
client.on("close", () => {
  console.log("Conexión cerrada.");
  rl.close();
});

// Manejar errores
client.on("error", (error) => {
  console.error("Error de conexión:", error);
  rl.close();
});

function main() {
  while (true) {
    rl.question("Cual es tu mensaje: ", (mensaje) => {
      client.send(mensaje);
    });
  }
}
