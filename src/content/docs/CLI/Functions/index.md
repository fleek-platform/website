---
order: 7
title: Fleek Functions
date: 2024-05-23
desc: The Fleek Functions are code snippets that are executed server-side using Fleek Network's on-chain cloud infrastructure.
---

# Fleek Functions

:::warn
This feature is in alpha and runs on a new testnet version of Fleek Network. Until functionality is finalized further, we do not recommend using Fleek Functions in production apps due to changes that may be made during this ongoing development period. We have a lot of improvements planned to the entire data flow, but they require more precise engineering efforts which will take more time. Releasing this alpha version now while we are still developing it, to get early usage and feedback, felt like the best approach to achieve the long-term goals of Fleek Functions.
:::

Fleek Functions are code snippets that are executed server-side using Fleek Network’s on-chain cloud infrastructure.

These aim to offer a more economical, high-performance, and scalable solution for running server-side code compared to well-known options like Lambda functions, thanks to the [Fleek Network](https://fleek.network) architecture.

Fleek Functions make it possible for users to create serverless apps with lightning-fast performance at a much lower cost.

## Create a Draft Function

To create your first Fleek Function, you must first draft the code and then configure the deployment settings accordingly. To follow the instructions, open your terminal, and change directory to your liking.

For our example, we'll create a file named "my-first-function.js", you can choose any name:

```sh
touch my-first-function.js
```

Open your favourite text editor and declare a function. We'll write a simple function that returns the text "Hello world!".

```js
export const main = (params) => {
  return 'hello world';
};
```

You are obligated to export a **main** function. The **main** signifies the entry point for computations or declarations within the file scope. It'll not compute or operate if you neglect to declare and export it.

To learn more about what the export declaration is, read the MDN Web docs [here](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export).

### HTTP Requests and Responses

Every execution of your Fleek Function receives an [HttpRequest](https://fleek-network.github.io/js-docs/~/Fleek.HttpRequest.html) argument. It represents the HTTP request made to your function. You can find all the relevant information of your request there.

```js
export const main = (params) => {
  const { method, path } = params;
  return `${method} request to ${path}`;
};
```

You can respond either with a string, that will be your HTTP response body, or with an [HttpResponse](https://fleek-network.github.io/js-docs/~/Fleek.HttpResponse.html) to set your response headers or status.

Check out our [docs](https://fleek-network.github.io/js-docs/) for more information on the APIs available to your Fleek Function code.

## Create a Fleek Function

To create a Fleek Function, we utilize the **functions** command. You can learn how to use it by appending **help**:

```sh
fleek functions help
```

For our example, we'll create a function named "my-first-function".

```sh
fleek functions create --name my-first-function
```

The `--name` flag takes a new unique identifier of your project list. It should be descriptive to help you identify it at later stage, e.g. if you have to manage a large number of Fleek Functions within a project.

```sh
✅ Success! The function has been successfully created.

> You can create a new deployment using the following command
> Fleek functions deploy
```

A few examples of valid syntax identifier names are calculator, my-custom-function or add_2. A name does not have to be the same as the function file name, or the export name. A good practice can be to name in accordance to your project conventions.

## Deploy a Fleek Function

At this stage you should have created a [draft function file](#create-a-draft-function) in your local file system and a [Fleek Function](#create-a-fleek-function) via the Fleek Platform CLI.

To deploy the Fleek Function, we'll use the sub-command **deploy**. You can learn about it by appending help to the **functions** command.

```sh
fleek functions help
```

In order to deploy a Fleek Function, we need to provide a name and a file path.

In our example, we've titled our [draft function](#create-a-draft-function) file "my-first-function.js" and [created](#create-a-fleek-function) a Fleek Function called "my-first-function". It's important to note that we had the choice to give them different names as the file and Fleek Function names don't have to match.

Here, we'll pass those values as arguments to the --name and --path flag.

```sh
fleek functions deploy \
  --name my-first-function \
  --path ~/some/path/my-first-function.js
```

The response should be similar to:

```sh
✅ Success! The deployment has been successfully created.

> You can call this Fleek Function by making a request to the following URL
🤖 Make a request to the following URL
🔗 https://<SLUG>.functions.dev.on-fleek-test.app
```

Given that our function is a basic 'Hello World' program and doesn't require any parameters, visit the provided invoke URL to execute your function code. However, keep in mind that the functions are deployed into IPFS, requiring a grace period for propagation.

## List Fleek Functions

To display all the Fleek Functions you've deployed in your Fleek project, execute the following command:

```js
fleek functions list
```

This command will output a table showing the ID, Name, Slug, and Fleek Function invocation URL for each of your Fleek Functions.

## Update Fleek Functions

To update the source-code for a Fleek Function, you'll have to edit the draft file and re-deploy it, preferencly to the same Fleek Function name. It's expected, to push edits to the same Fleek Function name to work iteratively.

But since the code for a particular _deployment_ of a Fleek Function is immutable, every update will cause the Fleek Function ID to change. Although, the Slug URL associated to access the resource will remain the same.

Thus, to view a list of all deployments for a function, run the following command:

```sh
fleek function deployments --name <Fleek Function Name>
```

For our example, we'd run:

```sh
fleek function deployments --name my-first-function
```

We can verify that the ID and [CID](https://docs.ipfs.tech/concepts/content-addressing/) change per deployment of different function iterations.

```sh
ID            CID               Created At
------------------------------------------
clv...1ex     baf...h1z         2024-04-22
clv...qb2     baf...un2         2024-02-14
clv...y3l     baf...3st         2024-01-06
```

Content addressing is where we use a hash to access the content, and it allows us to verify that the content we received is the content we asked for. This is one of the principles that help us provide guarantees to end-users who require a high ability for content verification; As a consequence, the immutability of files is critical to this system powered by [Fleek Network](https://fleek.network).

Thus, it's crucial to remember that the functions are deployed into IPFS, requiring a period for propagation.

## Interact with Fleek Functions

To interact with Fleek Functions, you can send requests to the Fleek Function URL using a variety of HTTP methods, such as GET and POST.

Here's the syntax for simple HTTP GET request via [cURL](https://curl.se):

```sh
curl -X GET \
  https://<SLUG>.functions.stg.on-fleek-test.app
```

### Limitations

When writing code for your functions, please keep in mind Fleek Functions currently have a timeout of 15 seconds, and a memory limit of 50 MiB during execution.

## Modify properties

After the deployment of a Fleek Function, you can edit the following properties:

- Status: Can switch between ACTIVE or INACTIVE state
- Name: Modify the unique identifier term listed in the project
- Slug: The alias utilized to access the specific function resource

### Update the Name or Slug

You might find it necessary to rename an existing Fleek Function, e.g. if the code it executes now diverges from its initial purpose or to improve clarity.

To modify the name, run:

```sh
fleek functions update \
  --functionName <NAME> \
  --name <NEW-NAME>
```

As an example, we can modify the name we opted for this demo "my-first-function" to "my-function".

```sh
fleek functions update \
  --functionName my-first-function \
  --name my-function
```

Similarly, you can modify the "slug" of the Fleek Function by utilizing the flag --slug instead of --name.

```sh
fleek functions update \
  --functionName <NAME> \
  --slug <NEW-SLUG>
```

For example, let's say that the Fleek Function URL we got for the demo "my-first-function" is:

```sh
https://big-coffeeshop-little.functions.stg.on-fleek-test.app
```

If we'd like to modify the slug "big-coffeeshop-little" to another available name, we'd run:

```sh
fleek functions update \
  --functionName my-first-function \
  --slug my-unique-slug
```

Afterwards, we could interface with our Fleek Function via the URL:

```sh
https://my-unique-slug.functions.stg.on-fleek-test.app
```

## Using private data with Fleek Functions

You can make use of environment variables through any combination of the following:

- Those set within your CLI
- Those imported from a separate file
- Those exported into your local environment

:::warn

Your Fleek Function are stored on IPFS. They are publicly accessible by default, and will expose all of your code associated with the function including any environment variables which are bundled into your code. Ensure you are not inadvertently exposing data you are interested in keeping private.

:::

### Environment variables set within your CLI

You can pass `-e` or `--env` flags to the CLI in order to set simple, non-array environment variables from within the CLI. For example, the following code would set VAR1 as 'foo' and VAR2 as 'bar' for use within your Fleek Function.

```js
fleek functions deploy --name print-hello-world --path *./function.js --env VAR1='foo' --env VAR2='bar'
```

### Environment variables imported from a separate file

Additionally, you can pass a `--envFile` flag to the CLI, followed by a file location relative to the current directory, in order to load environment variables from a file. This file should represent variables using a key value pair syntax.

```js
# This is a comment
PORT=3000 # This is also a comment
NAME="Some value"
MULTI_LINE="THIS IS
A MULTILINE"
```

In the example below, the user's environment variables are located in an `env.list` file.

```js
fleek functions deploy --name print-hello-world --path *./function.js --envFile ./env.list
```

### Environment variables exported to your local environment

Lastly, you can use variables exported to your local environment.

If you have exported a variable to your environment with export VAR1='foo'and export VAR2='bar', e.g., you can run:

```js
fleek functions deploy --name print-hello-world --path *./function.js --env VAR1 --env VAR2
```

### Using your environment variables

Your environment variables are available under `fleek.env`. You can test it out with the following function:

```js
export const main = (params) => {
  const foo = fleek.env.FOO;
  return `foo=${foo}`;
};
```

## Making Fleek Functions private (🧪 Alpha)

If you are interested in making your Fleek Function code private, add the `--private` flag to your deployment command:

```js
fleek functions deploy --name print-hello-world --path *./function.js --private
```

:::warn
This is an experimental feature, performance will be impacted. We are actively working on improving this experience to be on par with IPFS stored functions.
:::

## Deactivate Functions

To _deactivate_ such a Fleek Function, you can run the command below, replacing <fleek_function_name> with the name of the Fleek Function you’re deactivating.

To deactivate a Fleek Function, use the command below:

```sh
fleek functions update \
  --functionName <NAME> \
  --status <STATUS>
```

As demonstrated in the [Managing Fleek Functions](#managing-fleek-functions) table, the available status are **ACTIVE** or **INACTIVE**. So, let's say that we'd like to _deactivate_ the "my-first-function".

You'd want to run:

```sh
fleek functions update \
  --functionName my-fleek-function \
  --status INACTIVE
```

If successful, a response should be expected, as follows:

```sh
✅ Success! The function has been successfully updated.
```

Through this action, we've deactivated a Fleek Function, choosing not to delete it.

:::note
These update commands will update the _existing deployment_ of a Fleek Function rather than triggering an additional deployment.
:::

To _reactivate_ a Fleek Function you previously activated, simply run the same command but with the status set to `ACTIVE`.

## Delete a Fleek Function

If you determine that a Fleek Function is no longer useful to you or your project, you can delete it outright by running the following command:

```js
fleek functions delete --name <fleek_function_name>
```

Should you decide that a Fleek Function is no longer useful to your project, you can delete it by executing the following command:

```sh
fleek functions delete \
  --name <NAME>
```

For example, let's delete the Fleek Function named "my-first-function":

```sh
fleek functions delete \
  --name my-first-function
```

On completion, you'd get a confirmation message:

```sh
✅ Success! The function has been successfully deleted.
```
