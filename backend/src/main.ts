import 'module-alias/register';
import 'reflect-metadata';

import bodyParser from 'body-parser';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import {
  registerController as registerCronJobs,
  useContainer as cronUseContainer,
} from 'cron-decorators';
import express from 'express';
import {
  getMetadataArgsStorage,
  useContainer as routingControllersUseContainer,
  useExpressServer,
} from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUiExpress from 'swagger-ui-express';
// import { useSocketServer, useContainer as socketUseContainer } from 'socket-controllers';
import Container from 'typedi';

import { UserRepository } from './api/repositories/Users/UserRepository';
import { appConfig } from './config/app';
import { AppDataSource } from './config/db';
import {
  CustomErrorHandler,
} from './infrastructure/middlewares/Application/CustomErrorHandler';
import { AuthCheck } from './infrastructure/middlewares/Auth/AuthCheck';
import { loadEventDispatcher } from './utils/load-event-dispatcher';
import { loadHelmet } from './utils/load-helmet';
import { MexLogger } from './utils/logger';

class App {
  private app: express.Application = express();
  private port: Number = appConfig.port;

  constructor() {

    this.bootstrap();
  }
  async bootstrap() {
    this.useContainers();
    await this.typeOrmCreateConnection();
    await this.registerEvents();
    this.registerCronJobs();
    this.setupMiddlewares();
    this.registerSocketControllers();
    this.registerRoutingControllers();
    this.registerDefaultHomePage();
    this.setupSwagger();

  }
  registerCronJobs() {
    if (!appConfig.cronJobsEnabled) {
      console.warn("CronJob NOT enabled");
      return false;
    }

    registerCronJobs([__dirname + appConfig.cronJobsDir])
  }
  private registerEvents() {
    return loadEventDispatcher();
  }

  private setupMiddlewares() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    loadHelmet(this.app);
  }
  private async typeOrmCreateConnection() {
    try {
      await AppDataSource.initialize();
    } catch (error) {
      MexLogger.error('Caught! Cannot connect to database: ', error);
    }
  }
  private registerSocketControllers() {
    const server = require('http').Server(this.app);
    const io = require('socket.io')(server);

    this.app.use(function (req: any, res: any, next) {
      req.io = io;
      next();
    });

    server.listen(this.port,
      () => console.info(`🚀 Server started at http://localhost:${this.port}\n🚨️ Environment: ${process.env.NODE_ENV}`)
    );

    // useSocketServer(io, {
    //   controllers: [__dirname + appConfig.controllersDir],
    // });
  }
  private registerRoutingControllers() {
    useExpressServer(this.app, {
      validation: { stopAtFirstError: true },
      cors: true,
      classTransformer: true,
      defaultErrorHandler: false,
      routePrefix: appConfig.routePrefix,
      controllers: [__dirname + appConfig.controllersDir],
      middlewares: [CustomErrorHandler, AuthCheck],

    });
  }
  private useContainers() {
    routingControllersUseContainer(Container);
    Container.set('UserRepository', UserRepository);
    cronUseContainer(Container);

  }
  private registerDefaultHomePage() {
    this.app.get('/', (req, res) => {
      res.json({
        title: appConfig.name,
        mode: appConfig.node,
        date: new Date(),
      });
    });
  }

  private setupSwagger() {
    // Parse class-validator classes into JSON Schema
    const schemas = validationMetadatasToSchemas({
      refPointerPrefix: '#/components/schemas/',
    });

    // Parse routing-controllers classes into OpenAPI spec:
    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(
      storage,
      { routePrefix: appConfig.routePrefix },
      {
        components: {
          schemas,
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
        info: {
          description: 'Bacarotruck',
          title: 'API Bacarotruck Documentation',
          version: '0.0.1',
          contact: {
            name: 'Bacarotruck',
            url: 'https://bacarotruck.it',
            email: 'support@bacarotruck.it',
          },
        },
      },
    );

    // Use Swagger
    this.app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
  }
}

new App();