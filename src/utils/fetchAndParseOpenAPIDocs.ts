interface ParameterObject {
  name: string;
  in: string;
  description?: string;
  required?: boolean;
  schema: {
    type: string;
    nullable?: boolean;
  };
}

interface ResponseObject {
  description: string;
  content?: {
    'application/json': {
      schema: {
        $ref?: string;
        type?: string;
      };
    };
  };
}

interface RequestBodyObject {
  content: {
    'application/json': {
      schema: {
        $ref?: string;
      };
    };
  };
  required?: boolean;
}

interface OperationObject {
  tags: string[];
  summary: string;
  operationId: string;
  parameters?: ParameterObject[];
  responses: Record<string, ResponseObject>;
  requestBody?: RequestBodyObject;
}

interface PathItemObject {
  get?: OperationObject;
  post?: OperationObject;
  put?: OperationObject;
  delete?: OperationObject;
}

interface OpenAPISpec {
  paths: Record<string, PathItemObject>;
  components?: Record<string, any>;
}

export interface Endpoint {
  path: string;
  method: string;
  summary: string;
  description?: string;
  parameters?: ParameterObject[];
  requestBody?: RequestBodyObject;
  responses: Record<string, ResponseObject>;
}

export const fetchOpenAPISpec = async (
  endpoint: string,
): Promise<OpenAPISpec> => {
  const response = await fetch(endpoint);
  const text = await response.text();

  // Extract JSON from script tag
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');
  const scriptContent = doc.getElementById('api-reference')?.textContent;

  if (!scriptContent) {
    throw new Error('Could not find API reference content');
  }

  const data: OpenAPISpec = JSON.parse(scriptContent);

  console.log(data, 'original JSON');

  const aiAgentsPaths = Object.entries(data.paths).reduce<
    Record<string, PathItemObject>
  >((acc, [path, methods]) => {
    if (path.includes('ai-agents')) {
      acc[path] = methods;
    }
    return acc;
  }, {});

  return { ...data, paths: aiAgentsPaths };
};

export const transformOpenAPISpec = (spec: OpenAPISpec): Endpoint[] => {
  const endpoints: Endpoint[] = [];

  //   console.log(spec);

  Object.entries(spec.paths).forEach(([path, pathItem]) => {
    Object.entries(pathItem).forEach(
      ([method, operation]: [string, OperationObject]) => {
        endpoints.push({
          path,
          method: method.toUpperCase(),
          summary: operation.summary,
          parameters: operation.parameters,
          requestBody: operation.requestBody,
          responses: operation.responses,
        });
      },
    );
  });

  return endpoints.sort((a, b) => a.path.localeCompare(b.path));
};
