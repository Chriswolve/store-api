import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
// Servir los staticos de Swagger

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
// Configurar para usar el CDN de Swagger UI
const swaggerOptions = {
  //customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
  customCssUrl: '/swagger-ui.css',

};


// Function to setup swagger docs
const swaggerDocs = (app, path ) => {
  // Swagger page
  app.use(path , swaggerUi.serve, swaggerUi.setup(swaggerSpec,swaggerOptions));
  app.get( path + '.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
