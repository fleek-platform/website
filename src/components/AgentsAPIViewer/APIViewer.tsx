import { useCallback, useEffect, useState } from "react";

interface OpenAPIInfo {
	title: string;
	description: string;
}

interface OpenAPIParameter {
	name: string;
	in: string;
	description: string;
	required: boolean;
	schema?: any;
	example?: any;
}

interface OpenAPIExample {
	summary: string;
	value: any;
}

interface OpenAPIContent {
	schema?: any;
	examples?: Record<string, OpenAPIExample>;
}

interface OpenAPIResponse {
	description: string;
	content?: Record<string, OpenAPIContent>;
}

interface OpenAPIRequestBody {
	required?: boolean;
	content?: Record<string, OpenAPIContent>;
}

interface OpenAPIMethod {
	summary: string;
	description: string;
	parameters?: OpenAPIParameter[];
	requestBody?: OpenAPIRequestBody;
	responses: Record<string, OpenAPIResponse>;
}

interface OpenAPIData {
	openapi: string;
	info: OpenAPIInfo;
	paths: Record<string, Record<string, OpenAPIMethod>>;
	components: any;
	tags: Array<{ name: string }>;
}

const APIViewer = () => {
	// Fetch the OpenAPI spec at build time
	const [apiData, setApiData] = useState<any | undefined>();
	const [error, setError] = useState<string | undefined>();

	const fetchData = useCallback(async () => {
		try {
			const response = await fetch("https://api.fleek.xyz/api/openapi.json");
			if (!response.ok) {
				throw new Error(
					`Failed to fetch API spec: ${response.status} ${response.statusText}`,
				);
			}

			const fullData = await response.json();

			const aiAgentsPaths: Record<string, Record<string, OpenAPIMethod>> = {};

			for (const [path, methods] of Object.entries(fullData.paths)) {
				if (path.includes("ai-agents")) {
					aiAgentsPaths[path] = methods as Record<string, OpenAPIMethod>;
				}
			}

			setApiData({
				openapi: fullData.openapi,
				info: fullData.info,
				paths: aiAgentsPaths,
				components: fullData.components,
				tags: fullData.tags.filter(
					(tag: { name: string }) => tag.name === "AI Agents",
				),
			});
		} catch (err) {
			console.error("Error fetching or parsing OpenAPI spec:", err);
			setError("Failed to load API documentation. Please try again later.");
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	function getMethodColor(method: string): string {
		switch (method.toLowerCase()) {
			case "get":
				return "bg-blue-500";
			case "post":
				return "bg-green-500";
			case "put":
				return "bg-yellow-dark-8";
			case "delete":
				return "bg-red-dark-8";
			default:
				return "bg-gray-500";
		}
	}

	function formatJSON(obj: any): string {
		return JSON.stringify(obj, null, 2);
	}

	if (error) {
		return <div className="text-red-500 text-center">{error}</div>;
	}

	if (!apiData) {
		return <div className="p-4 text-center">Loading API documentation...</div>;
	}

	return (
		<div>
			<div className="space-y-8">
				{Object.entries(apiData.paths).map(([path, methods]) => (
					<div className="rounded-lg p-4 shadow-sm">
						<h2 className="text-lg mb-2 font-semibold">{path}</h2>

						<div className="space-y-4">
							{Object.entries(methods).map(([method, details]) => (
								<div className="border-t pt-4">
									<div className="mb-2 mt-4 flex items-center gap-2">
										<span
											className={`${getMethodColor(method)} rounded text-sm px-2 py-1 font-bold uppercase text-white`}
										>
											{method}
										</span>
										<span className="font-medium">{details.summary}</span>
									</div>

									<div className="text-sm mb-3 whitespace-pre-line">
										{details.description}
									</div>

									{details.parameters && details.parameters.length > 0 && (
										<div className="mb-3">
											<h3 className="text-sm mb-1 font-semibold">
												Parameters:
											</h3>
											<ul className="text-sm list-disc pl-5">
												{details.parameters.map((param) => (
													<li>
														<span className="font-medium">{param.name}</span>
														{param.required && (
															<span className="text-red-500">*</span>
														)}
														<span> ({param.in}) - </span>
														<span className="">{param.description}</span>
														{param.example && (
															<div className="ml-2 mt-1">
																<span className="text-xs font-medium">
																	Example:{" "}
																</span>
																<code className="py-0.5 rounded text-xs bg-gray-100 px-1">
																	{param.example.toString()}
																</code>
															</div>
														)}
													</li>
												))}
											</ul>
										</div>
									)}

									{details.requestBody && (
										<div className="mb-3">
											<h3 className="text-sm mb-1 font-semibold">
												Request Body:
											</h3>
											<div className="text-sm">
												{details.requestBody.required && (
													<span className="text-red-500">Required. </span>
												)}
												{details.requestBody.content &&
													Object.entries(details.requestBody.content).map(
														([contentType, content]) => (
															<div>
																<div className="ml-2">
																	<span className="font-mono text-xs">
																		{contentType}
																	</span>
																</div>

																{/* Request Body Examples */}
																{content.examples &&
																	Object.keys(content.examples).length > 0 && (
																		<div className="mt-2">
																			<div className="text-xs mb-1 font-medium">
																				Examples:
																			</div>
																			<div className="space-y-2">
																				{Object.entries(content.examples).map(
																					([exampleName, example]) => (
																						<details className="ml-4">
																							<summary className="text-xs cursor-pointer font-medium text-yellow">
																								{example.summary || exampleName}
																							</summary>
																							<code className="rounded text-xs overflow-auto p-2">
																								{formatJSON(example.value)}
																							</code>
																						</details>
																					),
																				)}
																			</div>
																		</div>
																	)}
															</div>
														),
													)}
											</div>
										</div>
									)}

									<div>
										<h3 className="text-sm mb-1 font-semibold">Responses:</h3>
										<div className="text-sm grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
											{Object.entries(details.responses).map(
												([status, response]) => (
													<div className="rounded p-2">
														<div className="font-medium">Status: {status}</div>
														<div className="text-xs text-gray-600">
															{response.description}
														</div>

														{/* Response Examples */}
														{response.content &&
															Object.entries(response.content).map(
																([contentType, content]) => (
																	<div className="mt-2">
																		<div className="text-xs font-mono">
																			{contentType}
																		</div>

																		{content.examples &&
																			Object.keys(content.examples).length >
																				0 && (
																				<div className="mt-1">
																					<details>
																						<summary className="text-xs cursor-pointer font-medium text-yellow">
																							View Example
																						</summary>
																						<div className="mt-1 space-y-2">
																							{Object.entries(
																								content.examples,
																							).map(
																								([exampleName, example]) => (
																									<div>
																										{example.summary && (
																											<div className="text-xs font-medium">
																												{example.summary}
																											</div>
																										)}
																										<code>
																											{formatJSON(
																												example.value,
																											)}
																										</code>
																									</div>
																								),
																							)}
																						</div>
																					</details>
																				</div>
																			)}
																	</div>
																),
															)}
													</div>
												),
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default APIViewer;
