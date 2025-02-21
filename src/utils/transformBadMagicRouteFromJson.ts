import type {
  BadMagicRoute,
  OpenAPIOperation,
} from '@components/OpenAPIPanel/BadmagicClient';
import type { Method } from 'badmagic/dist/types';

export function transformBadMagicRouteFromJson(
  path: string,
  method: string,
  operation: OpenAPIOperation,
): BadMagicRoute {
  const route: BadMagicRoute = {
    name: operation.summary || path,
    path: path,
    method: method.toUpperCase() as Method,
    documentation: operation.description,
    deprecated: operation.deprecated,
  };

  const bodyParams: BadMagicRoute['body'] = [];

  // Add path parameters
  if (operation.parameters) {
    operation.parameters.forEach((param) => {
      bodyParams.push({
        name: param.name,
        required: param.required,
        description: param.description,
        type: 'text',
        placeholder: param.example?.toString(),
      });
    });
  }

  // Add request body parameters if they exist
  if (
    operation.requestBody?.content?.['application/json']?.schema?.properties
  ) {
    const props =
      operation.requestBody.content['application/json'].schema.properties;
    const required =
      operation.requestBody.content['application/json'].schema.required || [];

    Object.entries(props).forEach(([name, prop]) => {
      bodyParams.push({
        name,
        required: required.includes(name),
        description: prop.description,
        type: prop.type === 'array' ? 'textarea' : 'text',
      });
    });
  }

  if (bodyParams.length > 0) {
    route.body = bodyParams;
  }

  return route;
}
