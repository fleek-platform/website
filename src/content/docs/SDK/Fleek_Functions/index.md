---
order: 5
title: Fleek Functions
date: 2025-02-06
desc: Create, deploy, and manage serverless functions using the Fleek SDK.
keywords: [services, Fleek SDK, serverless functions]
tags:
  - Guide
  - Learn
  - Fleek
---

# Managing Fleek Functions with the Fleek SDK

The Fleek SDK lets you create, deploy, and manage Fleek Functions within your applications. This document outlines the available methods for interacting with the Fleek Functions service.

:::note
You need to [authenticate to Fleek](/docs/sdk/#authentication) via the Fleek SDK.
:::

The `FunctionsClient` class provides an interface for managing Fleek Functions, enabling users to create, deploy, update, list, and delete serverless functions via the Fleek SDK.

## Methods

### `get`

Retrieve a specific Fleek Function by its name.

#### **Function Signature**

```typescript
get({ name }: GetFleekFunctionArgs): Promise<FleekFunction>
```

#### **Parameters**

- `name` (string) - The name of the Fleek Function to retrieve.

#### **Returns**

A `Promise` resolving to an object containing:

- Function metadata, including `id`, `name`, `slug`, `invokeUrl`, `projectId`, `status`, and `createdAt`.
- Deployment details, including `currentDeployment` and `deployments`.

#### **Usage Example**

```typescript
const functionData = await functionsClient.get({ name: 'my-function' });
console.log(functionData.invokeUrl);
```

### `list`

Retrieve a list of all Fleek Functions.

#### **Function Signature**

```typescript
list(): Promise<FleekFunction[]>
```

#### **Returns**

A `Promise` resolving to an array of Fleek Functions with details such as `id`, `name`, `slug`, `status`, and `deployments`.

#### **Usage Example**

```typescript
const functions = await functionsClient.list();
functions.forEach((fn) => console.log(fn.name));
```

### `listDeployments`

Retrieve all deployments associated with a specific function.

#### **Function Signature**

```typescript
listDeployments({ functionId }: ListFleekFunctionArgs): Promise<FleekFunctionDeployment[]>
```

#### **Parameters**

- `functionId` (string) - The unique identifier of the Fleek Function.

#### **Returns**

A `Promise` resolving to an array of Fleek Function deployments with attributes such as `id`, `cid`, `createdAt`, `updatedAt`, and `sgx`.

#### **Usage Example**

```typescript
const deployments = await functionsClient.listDeployments({
  functionId: '12345',
});
deployments.forEach((deployment) => console.log(deployment.cid));
```

### `create`

Create a new Fleek Function.

#### **Function Signature**

```typescript
create({ name, siteId }: CreateFleekFunctionArgs): Promise<FleekFunction>
```

#### **Parameters**

- `name` (string) - The name of the function to create.
- `siteId` (string) - The associated site ID.

#### **Returns**

A `Promise` resolving to a Fleek Function object with details such as `id`, `name`, `slug`, and `invokeUrl`.

#### **Usage Example**

```typescript
const newFunction = await functionsClient.create({
  name: 'my-new-function',
  siteId: 'site123',
});
console.log(newFunction.id);
```

### `deploy`

Deploy a new version of a Fleek Function.

#### **Function Signature**

```typescript
deploy({ functionId, cid, sgx, blake3Hash, assetsCid }: DeployFleekFunctionArgs): Promise<FleekFunctionDeployment>
```

#### **Parameters**

- `functionId` (string) - The function ID to deploy.
- `cid` (string) - The content identifier (CID) of the deployment.
- `sgx` (boolean) - Whether SGX (secure enclave execution) is enabled.
- `blake3Hash` (string) - The Blake3 hash of the deployment.
- `assetsCid` (string, optional) - CID of associated assets.

#### **Returns**

A `Promise` resolving to a Fleek Function deployment object with `id`, `cid`, `createdAt`, and `updatedAt`.

#### **Usage Example**

```typescript
const deployment = await functionsClient.deploy({
  functionId: '12345',
  cid: 'Qm...',
  sgx: false,
  blake3Hash: 'abc123',
});
console.log(deployment.id);
```

### `delete`

Delete a Fleek Function by ID.

#### **Function Signature**

```typescript
delete({ id }: DeleteFleekFunctionArgs): Promise<FleekFunction>
```

#### **Parameters**

- `id` (string) - The unique identifier of the Fleek Function.

#### **Returns**

A `Promise` resolving to the deleted Fleek Function's details.

#### **Usage Example**

```typescript
const deletedFunction = await functionsClient.delete({ id: '12345' });
console.log(`Deleted function: ${deletedFunction.name}`);
```

### `update`

Update an existing Fleek Function.

#### **Function Signature**

```typescript
update({ id, slug, name, status }: UpdateFleekFunctionArgs): Promise<FleekFunction>
```

#### **Parameters**

- `id` (string) - The function ID.
- `slug` (string, optional) - The updated function slug.
- `name` (string, optional) - The new function name.
- `status` (FleekFunctionStatus, optional) - The updated function status.

#### **Returns**

A `Promise` resolving to the updated Fleek Function details.

#### **Usage Example**

```typescript
const updatedFunction = await functionsClient.update({
  id: '12345',
  name: 'updated-function',
});
console.log(updatedFunction.name);
```

## Notes

- Ensure that API authentication is properly configured.
- Function names must be unique within a project.
- Deleting a function removes its reference, but deployments may persist.
