import { mergeResolvers } from './util';
import * as User from './user';
import * as Email from './email';

export const resolvers = mergeResolvers(
  User,
  Email
);