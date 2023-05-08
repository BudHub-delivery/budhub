import userResolver from './User'
import { mergeResolvers } from '@graphql-tools/merge';

const resolvers = mergeResolvers([
  userResolver
]);

export default resolvers;

