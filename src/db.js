import MariaDBClient from './dbconnector.js';

export const dbconfig = {
  host: 'localhost',
  user: 'vestiUsuario',
  password: '3822',
  database: 'vesticorp',
  connectionLimit: 21
};

const dbclient = new MariaDBClient(dbconfig);
export {dbclient, MariaDBClient}
