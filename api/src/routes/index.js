import settings from '../frameworks/config/settings.js';

import { Router } from 'express';
// App routes
import productRoutes from './products.routes.js';
import categoryRoutes from './categories.routes.js';

// Swagger documentation
import swaggerDocs from '../frameworks/services/SwaggerServiceV2.js';

// import {docsUI, docsRoutes} from '../frameworks/services/SwaggerService.js';



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
    },
    {
      path: '/docs',
      routes: swaggerDocs,
    }
  ],
}

function setRoutes() {

  //let docsURI = null;

  Object.entries(routes).forEach(([version, routes]) => {
    const router = Router();
    const basePath = `/${prefix}/${version}`;
    // Set routes
    this.use(basePath, router);
    for (const route of routes) {
      // if(route.ui) {
      //   router.use(route.path, route.ui, route.routes);
      //   docsURI = basePath + route.path;
      //   continue;
      // }
      if(route.path === '/docs') {
        swaggerDocs(this, basePath + route.path);
        continue;
      }

      router.use(route.path, route.routes);
    }
  });



  //Redirect to docs
  // if(docsURI) {
  //   this.get('/', (req, res) => {
  //     res.redirect(docsURI);
  //   });
  // }

}

export default setRoutes;
