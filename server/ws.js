import { WebSocketServer } from "ws";

const SK_PORT = 5001;

let socketServer;

if (!socketServer) {
  socketServer = new WebSocketServer({
    port: SK_PORT,
  });

  socketServer.on("connection", function (clientWs) {
    clientWs.on("message", function incoming(message) {
      console.log(`received:${message}`);
    });
    clientWs.send("data send from ws server");
  });

  console.log(`webSocket Server running at port ${SK_PORT}`);
}
export const broadcastAll = (msg) => {
  for (const c of socketServer.clients) {
    console.log(c.readyState);
    if (c.readyState === WebSocket.OPEN) {
      c.send(msg);
    }
  }
};
export default socketServer;
