const socketUrl = "wss://hometask-pipes.azurewebsites.net/";

export const socket = new WebSocket(socketUrl);

export const webSocketCommands = (socket: WebSocket) => ({
  getMap: () => {
    socket.send("map");
  },
  startNewLevel: (level: number) => {
    socket.send(`new ${level}`);
  },
  requestHelp: () => {
    socket.send("help");
  },
  sendMap: () => {
    socket.send("map");
  },
  sendRotate: (x: number, y: number) => {
    socket.send(`rotate ${x} ${y}`);
  },
  sendVerify: () => {
    socket.send("verify");
  },
});
