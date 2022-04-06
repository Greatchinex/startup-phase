import 'reflect-metadata'
import { GraphQLError } from 'graphql'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import depthLimit from 'graphql-depth-limit'
import { buildSchema } from 'type-graphql'
import http from 'http'
import { config } from 'dotenv'

import resolvers from './graphql/resolvers'

config()

const env = process.env.NODE_ENV

const graphQlServer = async (app: any, PORT: string | number) => {
  // Graphl Server
  const schema = await buildSchema({
    resolvers,
    emitSchemaFile: false,
    validate: false,
    dateScalarMode: 'isoDate'
  })
  const httpServer = http.createServer(app)

  const apolloServer = new ApolloServer({
    schema,
    introspection: env === 'production' ? false : true,
    context: ({ req, res }) => ({ req, res }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    validationRules: [depthLimit(10)],
    formatError: (error: GraphQLError): any => {
      if (error.extensions && error.extensions.code === 'INTERNAL_SERVER_ERROR') {
        error.message = 'Something went wrong'
      }
      return env === 'production' ? error.message : error
    }
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({ app, path: '/graphql' })

  httpServer.listen(PORT, () => {
    console.log(`Server is Listening on Port ${PORT}`)
  })
}

export default graphQlServer
