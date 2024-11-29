import mariadb from 'mariadb';

class MariaDBClient {
  constructor(config) {
    this.pool = mariadb.createPool(config); // Crea un pool de conexiones
  }

  async getConnection() {
    return await this.pool.getConnection(); // Obtiene una conexión del pool
  }

  async end() {
    await this.pool.end(); // Cierra el pool de conexiones
  }
}

export default MariaDBClient;
