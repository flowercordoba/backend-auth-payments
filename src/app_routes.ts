/* eslint-disable @typescript-eslint/no-unused-vars */

import { Application } from 'express';
import { authRoutes } from './features/auth';


const BASE_PATH = '/api/v1';
const AUTH_PATH = '/auth';
const USER_PATH = '/user';
const PAYMENT_PATH = '/paytment';

export default (app: Application) => {
  const routes = () => {


    app.use(`${BASE_PATH}${AUTH_PATH}`, authRoutes);
    // app.use(BASE_PATH, authRoutes.signoutRoute());
    // app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRoutes.routes());
  };
  routes();
};