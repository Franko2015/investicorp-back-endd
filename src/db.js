import MariaDBClient from './dbconnector.js';

// Configuración de la base de datos
export const dbconfig = {
  host: 'junction.proxy.rlwy.net',
  user: 'vestiUsuario',
  password: '3822',
  database: 'vesticorp',
  port: 52289,
  connectionLimit: 21 // Máximo de conexiones simultáneas
};

// Instancia del cliente
const dbclient = new MariaDBClient(dbconfig);
export { dbclient, MariaDBClient };

