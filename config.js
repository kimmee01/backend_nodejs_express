export default {
  server: {
    port: process.env.SERVER_PORT || 7007,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'kimmeeza',
    algorithm: process.env.JWT_ALGORITHM || 'HS512',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h', // 60min
  },
  db: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_MYSQL_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_MYSQL_PORT ?? '3306'),
      user: process.env.DB_MYSQL_USER || 'root',
      password: process.env.DB_MYSQL_PASSWORD || 'admin!@1234',
      database: process.env.DB_MYSQL_DATABASE || 'kim',
      timezone: '+07:00',
      dateStrings: true,
      charset: 'utf8mb4_unicode_ci',
    },
    pool: {
      min: parseInt(process.env.DB_MYSQL_POOL_MIN ?? 10) ?? 10,
      max: parseInt(process.env.DB_MYSQL_POOL_MAX ?? 100) ?? 100,
    },
    debug: !!(process.env.DEBUG),
  },
  wsMqtt: {
    url: process.env.WS_MQTT_URL ,
    options: {
      username: process.env.WS_MQTT_USERNAME ,
      password: process.env.WS_MQTT_PASSWORD,
      keepAlive: 15_000,
    },
  },
 
}
