interface GraphQLResponse<T> {
  data: {
    [key: string]: T;
  };
  errors?: Array<{ message: string }>;
}

interface GraphQLOperation<Variables, Result> {
  operationName: string;
  query: string;
  variables: Variables;
  dataField: keyof GraphQLResponse<Result>['data'];
}

type Errors = 'UNAUTHORIZED' | 'NETWORK_ERROR' | 'GRAPHQL_ERROR';

export type GraphQLError = {
  type: Errors;
  message: string;
};

export type ExecGraphQLOperationResult<Data> =
  | { success: true; data: Data }
  | { success: false; error: GraphQLError };

export const executeGraphQLOperation = async <Variables, Result>(
  graphqlApiUrl: string,
  operation: GraphQLOperation<Variables, Result>,
): Promise<ExecGraphQLOperationResult<Result>> => {
  try {
    const { operationName, query, variables } = operation;
    const body = JSON.stringify({
      operationName,
      query,
      variables,
    });

    const response = await fetch(graphqlApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    if (!response.ok) {
      if (response.status === 401) {
        return {
          success: false,
          error: {
            type: 'UNAUTHORIZED',
            message: 'You are not authorized to access this resource.',
          },
        };
      }

      return {
        success: false,
        error: {
          type: 'NETWORK_ERROR',
          message: 'Unexpected error. Repeat the action or contact support.',
        },
      };
    }

    const jsonRes: GraphQLResponse<Result> = await response.json();

    if (jsonRes?.errors?.[0]) {
      return {
        success: false,
        error: {
          type: 'GRAPHQL_ERROR',
          message: 'Unexpected error. Repeat the action or contact support.',
        },
      };
    }

    return {
      success: true,
      data: jsonRes.data[operation.dataField],
    };
  } catch (err) {
    console.error('Failed to execute GraphQL operation', err);
    return {
      success: false,
      error: {
        type: 'NETWORK_ERROR',
        message: 'Failed to execute the operation. Please try again.',
      },
    };
  }
};
