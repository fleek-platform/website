import { useState, useEffect } from 'react';
import { BadMagic } from 'badmagic';
import type { Method } from 'badmagic/dist/types';
import { transformBadMagicRouteFromJson } from '@utils/transformBadMagicRouteFromJson';

export type BadMagicRoute = {
  name: string;
  path: string;
  method?: Method;
  documentation?: string;
  body?: {
    name: string;
    required?: boolean;
    description?: string;
    type?: string;
    placeholder?: string;
  }[];
  deprecated?: boolean;
};

export type BadMagicWorkspace = {
  id: string;
  name: string;
  config: {
    baseUrl: string;
  };
  routes: BadMagicRoute[];
};

export type OpenAPIParameter = {
  name: string;
  in: string;
  description?: string;
  required?: boolean;
  schema?: {
    type: string;
    format?: string;
  };
  example?: any;
};

export type OpenAPIOperation = {
  tags?: string[];
  summary?: string;
  description?: string;
  parameters?: OpenAPIParameter[];
  requestBody?: {
    content?: {
      'application/json'?: {
        schema?: {
          $ref?: string;
          properties?: Record<
            string,
            {
              type: string;
              description?: string;
            }
          >;
          required?: string[];
        };
        examples?: Record<
          string,
          {
            value: any;
          }
        >;
      };
    };
    required?: boolean;
  };
  responses?: Record<string, any>;
  deprecated?: boolean;
};

export type OpenAPIPathItem = {
  get?: OpenAPIOperation;
  post?: OpenAPIOperation;
  put?: OpenAPIOperation;
  delete?: OpenAPIOperation;
  patch?: OpenAPIOperation;
};

export type OpenAPISpec = {
  paths: Record<string, OpenAPIPathItem>;
  tags?: { name: string; description?: string }[];
};

export function BadMagicClient() {
  const [workspaces, setWorkspaces] = useState<BadMagicWorkspace[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAndTransformSpec();
  }, []);

  const fetchAndTransformSpec = async () => {
    try {
      const response = await fetch('https://api.fleek.xyz/api/openapi.json');
      const data: OpenAPISpec = await response.json();

      // Group routes by tags
      const routesByTag = new Map<string, BadMagicRoute[]>();

      // Process each path and its methods
      Object.entries(data.paths).forEach(([path, pathItem]) => {
        Object.entries(pathItem).forEach(([method, operation]) => {
          if (!operation || method === 'parameters' || method === 'servers')
            return;

          const route = transformBadMagicRouteFromJson(path, method, operation);

          // Add route to each tag's group
          (operation.tags || ['Other']).forEach((tag) => {
            if (!routesByTag.has(tag)) {
              routesByTag.set(tag, []);
            }
            const routes = routesByTag.get(tag);
            if (routes) {
              routes.push(route);
            }
          });
        });
      });

      // Create workspaces for each tag
      const newWorkspaces = Array.from(routesByTag.entries()).map(
        ([tag, routes]) => ({
          id: tag.toLowerCase().replace(/\s+/g, '-'),
          name: tag,
          config: {
            baseUrl: 'https://api.fleek.xyz',
          },
          routes: routes.sort((a, b) => a.name.localeCompare(b.name)),
        }),
      );

      setWorkspaces(newWorkspaces);
    } catch (err) {
      console.error('Error fetching API spec:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (error) {
    return <div>Error loading API documentation: {error}</div>;
  }

  if (workspaces.length === 0) {
    return <div>Loading API documentation...</div>;
  }

  return <BadMagic basename="/api" workspaces={workspaces} />;
}

export default BadMagicClient;
