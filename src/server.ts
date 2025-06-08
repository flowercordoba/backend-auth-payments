import { Application, json, urlencoded, Response, Request, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import 'express-async-errors';
import Logger from 'bunyan';

import applicationRoutes from './app_routes';
import { config } from './config';

const SERVER_PORT = config.PORT || 8080;
const log: Logger = config.createLogger('server');

export class WsServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }

  private securityMiddleware(app: Application): void {
    app.set('trust proxy', 1);
    // app.use(
    //   cookieSession({
    //     name: 'session',
    //     keys: [config.SECRET_KEY_ONE!, config.SECRET_KEY_TWO!],
    //     maxAge: 24 * 7 * 3600000,
    //     secure: config.NODE_ENV !== 'development', //asi no sale el erorr currente
    //     // sameSite: 'none' // comentar si lo hago en local ojo en dev
    //   })
    // );
    // app.use(hpp());
    // app.use(helmet());
    app.use(
      cors({
        origin: 'http://localhost:3005',
        // origin: 'http://localhost:3000',
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
  }

  private standardMiddleware(app: Application): void {
    // app.use(compression());
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
  }

  private routesMiddleware(app: Application): void {
    applicationRoutes(app);
  }


  private globalErrorHandler(app: Application): void {
    app.all('*', (req: Request, res: Response) => {
      // res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
    });

    // app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
    //   log.error(error);
    //   if (error instanceof CustomError) {
    //     return res.status(error.statusCode).json(error.serializeErrors());
    //   }
    //   next();
    // });
  }

  private async startServer(app: Application): Promise<void> {
    if (!config.JWT_TOKEN) {
      throw new Error('JWT_TOKEN must be provided');
    }
    try {
      const httpServer: http.Server = new http.Server(app);
      this.startHttpServer(httpServer);
    } catch (error) {
      log.error(error);
    }
  }


  private startHttpServer(httpServer: http.Server): void {
    log.info(`Server has started with process ${process.pid}`);
    httpServer.listen(SERVER_PORT, () => {
      log.info(`${config.NODE_ENV}:${SERVER_PORT}`);
    });
  }


}