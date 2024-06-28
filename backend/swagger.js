const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = [
  './routes/projects-route.js',
  './routes/tasks-route.js',
  './routes/users-route.js',
]

swaggerAutogen(outputFile, endpointsFiles)