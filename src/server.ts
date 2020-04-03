import app from "./app";
import { PORT } from "./constants/config";

export const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

export const stopServer = () => {
  server.close();
};

// listen for TERM signal .e.g. kill
process.on('SIGTERM', function () {
  stopServer();
});

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', function () {
  stopServer();
});
