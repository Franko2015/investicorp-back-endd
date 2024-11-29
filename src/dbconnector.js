import mariadb from 'mariadb';



class MariaDBClient {
  constructor(config) {
    this.pool = mariadb.createPool(config);
  }

  async connect() {
    try {
      const connection = await this.pool.getConnection();
      console.log('Conexión exitosa a MariaDB');
      return connection;
    } catch (error) {
      console.error('Error al conectar a MariaDB:', error);
      throw error;
    }
  }

  async query(sql, params) {
    let conn;
    try {
      conn = await this.connect();
      const result = await conn.query(sql, params);
      return result;
    } catch (error) {
      console.error('Error al ejecutar la consulta:', error);
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }

  async close() {
    try {
      await this.pool.end();
      console.log('Conexión cerrada');
    } catch (error) {
      console.error('Error al cerrar la conexión:', error);
      throw error;
    }
  }
}

export default MariaDBClient;