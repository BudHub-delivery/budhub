import User from './User'
import { mergeTypeDefs } from '@graphql-tools/merge';

const typeDefs = mergeTypeDefs(
  [
    User
  ]
)

export default typeDefs;
