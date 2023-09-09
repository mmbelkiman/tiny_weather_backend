import { GraphQLRequestContext } from 'apollo-server-types';

export const isIntrospectionQuery = (
  requestContext: GraphQLRequestContext,
): boolean => requestContext.request.operationName === 'IntrospectionQuery';

export const logQuery = (now: string, queryName: string): void =>
  console.log(`${now} - Query called: ${queryName}`);

export const extractQueryName = (query: string): string | null => {
  const queryNameMatch = query.match(/^\s*query\s+(\w+)/);
  return queryNameMatch ? queryNameMatch[1] : null;
};
