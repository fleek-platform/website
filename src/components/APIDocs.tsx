import { useState, useEffect } from 'react';
import {
  fetchOpenAPISpec,
  transformOpenAPISpec,
  type Endpoint,
} from '../utils/fetchAndParseOpenAPIDocs';

const MethodBadge = ({ method }: { method: string }) => {
  const colors: Record<string, string> = {
    GET: 'bg-blue-100 text-blue-800',
    POST: 'bg-green-100 text-green-800',
    PUT: 'bg-yellow-100 text-yellow-800',
    DELETE: 'bg-red-100 text-red-800',
  };

  return (
    <span
      className={`rounded-md font-mono text-sm px-2 py-1 ${colors[method] || 'bg-gray-100'}`}
    >
      {method}
    </span>
  );
};

const ResponseSection = ({ responses }: { responses: Record<string, any> }) => (
  <div className="mt-4">
    <h4 className="mb-2 font-semibold">Responses</h4>
    <div className="space-y-2">
      {Object.entries(responses).map(([code, details]: [string, any]) => (
        <div key={code} className="flex items-start gap-2">
          <span className="font-mono">{code}</span>
          <span className="text-gray-600">{details.description}</span>
        </div>
      ))}
    </div>
  </div>
);

export const ApiDocs = ({
  endpoint = 'https://api.dev.fleeksandbox.xyz/api-docs/openapi.json',
}) => {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSpec = async () => {
      try {
        const data = await fetchOpenAPISpec(endpoint);
        setEndpoints(transformOpenAPISpec(data));
      } catch (err) {
        setError('Failed to load API documentation');
      } finally {
        setLoading(false);
      }
    };

    loadSpec();
  }, [endpoint]);

  if (loading) return <div className="p-4">Loading API documentation...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!endpoints.length) return null;

  return (
    <div className="prose max-w-none">
      <div className="space-y-8">
        {endpoints.map((endpoint) => (
          <div
            key={`${endpoint.path}-${endpoint.method}`}
            className="border-b-2 border-gray-dark-6 p-6"
          >
            <div className="mb-4 flex items-center gap-4">
              <MethodBadge method={endpoint.method} />
              <code className="text-sm rounded bg-gray-100 px-2 py-1">
                {endpoint.path}
              </code>
            </div>

            <h2 className="text-lg mb-2 font-semibold">{endpoint.summary}</h2>
            {endpoint.description && (
              <p className="mb-4 text-gray-600">{endpoint.description}</p>
            )}

            {endpoint.parameters && endpoint.parameters.length > 0 && (
              <div className="mb-4">
                <h4 className="mb-2 font-semibold">Parameters</h4>
                <ul className="list-disc space-y-2 pl-5">
                  {endpoint.parameters.map((param: any) => (
                    <li key={param.name}>
                      <code>{param.name}</code>
                      {param.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                      <span className="ml-2 text-gray-600">
                        {param.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {endpoint.requestBody && (
              <div className="mb-4">
                <h4 className="mb-2 font-semibold">Request Body</h4>
                <div className="rounded p-4">
                  <pre className="text-sm overflow-auto">
                    {JSON.stringify(
                      endpoint.requestBody.content['application/json'].schema,
                      null,
                      2,
                    )}
                  </pre>
                </div>
              </div>
            )}

            <ResponseSection responses={endpoint.responses} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiDocs;
