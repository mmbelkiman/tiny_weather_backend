import { GraphQLRequestContext } from 'apollo-server-types';
import { extractQueryName, isIntrospectionQuery, logQuery } from './utils';

export async function loggingMiddleware(requestContext: GraphQLRequestContext) {
  const now = new Date().toISOString();

  if (isIntrospectionQuery(requestContext)) {
    return;
  }

  if (requestContext.request.operationName) {
    logQuery(now, requestContext.request.operationName);
    return;
  }

  if (requestContext.request.query) {
    const queryName = extractQueryName(requestContext.request.query);
    if (queryName) {
      logQuery(now, queryName);
    }
  }
}
