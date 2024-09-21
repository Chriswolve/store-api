import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for your application',
    },
  },
  apis: [
    'api/src/frameworks/routes/product.routes.js',
    'api/src/frameworks/database/models/ProductModel.js'
  ],
};

const swaggerSpec = swaggerJsdoc(options);

// Function to setup swagger docs
const swaggerDocs = (app, path) => {
  // Swagger page
  app.use(path , swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get( path + '.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
