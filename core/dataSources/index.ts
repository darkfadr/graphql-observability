import { Tracer } from 'opentracing';
import UserDatasource from './user';
import EmailDatasource from './email';

export type DataSources = {
  user: UserDatasource,
  email: EmailDatasource
}

export type ApolloContext = {
  dataSources: DataSources,
  tracer: Tracer
}

export default function(): DataSources {
  console.info('🏃🏿‍♂️ Initializing datasources');
  return {
    user: new UserDatasource(),
    email: new EmailDatasource()
  };
}