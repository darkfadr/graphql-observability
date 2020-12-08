import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { Span } from 'opentracing';
import { ApolloContext } from '.';

interface TracedFunction {
  (span: Span): Promise<any>
}

export default class BaseDataSource extends DataSource<ApolloContext> {
  context!: ApolloContext;

  constructor() {
    super();
  }

  initialize(_config: DataSourceConfig<ApolloContext>) {
    this.context = _config.context;
  }

  trace(spanName: string, parentSpan: Span, action: TracedFunction): Promise<any> {
    const span = this.context.tracer.startSpan(spanName, { childOf: parentSpan });
    const result = action(span);
    span.finish();

    return result;
  }

  errorHandler(err:  Error | undefined): any {
    console.error('[Datasource Error]: ', err);
    return err;
  }
}
