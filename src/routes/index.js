import settings from '../frameworks/config/settings.js';
import { Router } from 'express';
// App routes
import productRoutes from './products.routes.js';
import categoryRoutes from './categories.routes.js';

const prefix = settings.API_PREFIX;

const routes = {
  v1: [
    {
      path: '/products',
      routes: productRoutes,
    },
    {
      path: '/categories',
      routes: categoryRoutes,
    }

  ],
}

function setRoutes() {

  Object.entries(routes).forEach(([version, routes]) => {
    const router = Router();
    // Set routes
    this.use(`/${prefix}/${version}`, router);
    for (const route of routes) {
      router.use(route.path, route.routes);
    }
  });

}

export default setRoutes;
