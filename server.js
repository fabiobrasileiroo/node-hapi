'use strict'
const Hapi = require('@hapi/hapi')


const init = async () => {
  const server = Hapi.Server({
    host: 'localhost',
    port: 1234
  })
  await server.register({
    plugin: require('hapi-geo-locate'),
    options: {
      enabledByDefault: true
    }
  })

  server.route([{
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return "<h1>Hello world</h1>"
    }
  },
  {
    method: 'GET',
    path: '/location',
    handler: (request, h) => {
      if (request.location){
        return request.location;
      } else {
        return "<h1>Your location is not by default</h1>"
      }
    }
  },
  {
    method: 'GET',
    // passo os router params
    // não é obrigatorio essa rota
    path: '/users/{user?}',
    handler: (request, h) => {
      // return `<h1>${request.query.name} ${request.query.lastname}</h1>`
      return h.redirect("/")
    }
  },
  {
    method: 'GET',
    path: '/{any*}',
    handler: (request, h) => {
      return "<h1>Oh not! not found</h1>"
    }
  }
  ])

  await server.start();
  console.log(`Server started on: ${server.info.uri}`)
}

process.on("unhadledRejection", (err) => {
  console.log(err)
  process.exit(1)
})
init()