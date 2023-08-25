export default () => ({
  port: process.env.PORT || '3000',
  nodeEnv: process.env.NODE_ENV || 'dev',
  mongodb: {
    uri:
      process.env.MONGODB_URI ??
      `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}?authSource=admin`,
    user: process.env.MONGODB_USERNAME,
    pass: process.env.MONGODB_PASSWORD,
    retryAttempts: 10,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_DURATION },
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URI ?? {
      protocol: 'amqp',
      hostname: process.env.RABBITMQ_HOST || 'localhost',
      port: process.env.RABBITMQ_PORT || '5672',
      username: process.env.RABBITMQ_USERNAME || 'root',
      password: process.env.RABBITMQ_PASSWORD || 'root',
    },
    managementUri: `http://${process.env.RABBITMQ_HOST || 'localhost'}:${
      process.env.RABBITMQ_MANAGEMENT_PORT || '15672'
    }`,
    username: process.env.RABBITMQ_USERNAME || 'root',
    password: process.env.RABBITMQ_PASSWORD || 'root',
  },
});
