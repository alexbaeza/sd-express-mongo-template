import { MongoMemoryServer } from "mongodb-memory-server"
import * as dbHelper from "../src/helpers/db-helper";

export default class TestDbHelper {
  private server: MongoMemoryServer;
  private connection;

  /**
   * Start the server and establish a connection
   */
  async start() {
    this.server = new MongoMemoryServer();
    const uri = await this.server.getUri();
    this.connection = dbHelper.connect(uri);
  }

  /**
   * Close the connection and destroy
   */
  async stop() {
    await dbHelper.disconnect();
  }

}
