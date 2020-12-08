import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from 'graphql-tools';
import { 
  ApolloServerPluginInlineTrace, 
  ApolloServerPluginUsageReporting,
  ApolloServerPluginSchemaReporting 
} from "apollo-server-core";

import OpenTracingPlugin from 'apollo-opentracing';
import tracer from './tracer';
import AxiosTracer from 'axios-opentracing';
import mjml from './clients/mjml';

import { resolvers, typeDefs, dataSources } from '.';
import { authz } from './middlewares';


// make sure to add an Upload Scalar if needing Upload functionality
const baseSchema = makeExecutableSchema({ typeDefs, resolvers }); 
const schema = applyMiddleware(baseSchema, authz);


export default {
	playground: true,
	introspection: true,
	dataSources,
	context: async ({ req, connection }: any) => {
		if (connection) return connection.context;
		
		return {
			tracer,
			auth: req.auth //this is populated by the authn middleware
		};
	},
	schema,
	plugins:[
		// If enabling these plugins, make sure to have an APOLLO_KEY in your environement variables
		ApolloServerPluginSchemaReporting(),
		ApolloServerPluginUsageReporting(),
		ApolloServerPluginInlineTrace(),
		OpenTracingPlugin({
			server: tracer,
			local: tracer,
			onFieldResolve(_src, _args, _ctx, info: any) {
					const axiosInterceptor = AxiosTracer(tracer);
					axiosInterceptor(mjml, { span: info.span });
			}
		})
	]
}