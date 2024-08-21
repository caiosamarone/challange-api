import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { FastifyInstance } from 'fastify'
import { withRefResolver } from 'fastify-zod'
import fastifyPlugin from 'fastify-plugin'


export async function buildSwaggerOpenApi(app: FastifyInstance) {
  await app.register(
    fastifySwagger,
    withRefResolver({
      openapi: {
        openapi: '3.0.0',
        info: {
          title: 'Boticario Code Challange',
          version: '1',
          description: 'Checkfy ',
        },
        servers: [{ url: 'http://localhost:3333' }],
        paths: {},
        tags: [{ name: 'Users' }, { name: 'Gyms' }, { name: 'Check-Ins' }],
        components: {
          securitySchemes: {
            apiKey: {
              type: 'apiKey',
              name: 'apiKey',
              in: 'header',
            },
          },
        },
      },
    }),
  )

  await app.register(fastifySwaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header: any) => header,
    transformSpecification: (swaggerObject: Readonly<Record<string, any>>) => {
      return swaggerObject
    },
    transformSpecificationClone: true,
  })
  
}

export default fastifyPlugin(buildSwaggerOpenApi)