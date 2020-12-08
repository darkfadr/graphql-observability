import { initTracer } from 'jaeger-client';
import * as opentracing from 'opentracing';

// See schema https://github.com/jaegertracing/jaeger-client-node/blob/master/src/configuration.js#L37
const tracer = initTracer(
	{
		serviceName: 'graphql-observability',
		reporter: {
			collectorEndpoint: 'http://localhost:14268/api/traces',
			// collectorEndpoint: 'http://localhost:9412/api/v2/spans',
			logSpans: true
		},
		sampler: {
			type: "const",
			param: 1,
		}
	}, 
	{
		tags: { 'graphql.galaxy': '0.0.1' },
		logger: console,
	}
);

opentracing.initGlobalTracer(tracer);
export default opentracing.globalTracer();