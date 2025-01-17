# Beehviih Proxy

The Beehiih Proxy is a Digitalocean function. A function build on nodejs runtime.

## Setup

Here's a quick step-by-step guide to install and deploy a DigitalOcean function. As an example, we'll stick with macOS.

Assuming that you have [brew package manager](https://brew.sh/).
Install the digitalocean `doctl` CLI:

```sh
brew install doctl
```

### Authenticate

Initialize authentication

```sh
doctl auth init --context do-functions-fleek-xyz-website-production
```

We use the context `do-functions-fleek-xyz-website-production`. Alternatively to overriding the default authentication.

### Install dependencies

Install the serverless component by executing:

```sh
doctl serverless install
```

### Connect to namespace

We're looking for the ID for `do-functions-fleek-xyz-website-production`. Note that to keep it simple we use the same term used for authentication context.

```sh
doctl serverless namespaces list

```

You should find:

```sh
Label                                        Region    Namespace ID                               API Host
do-functions-fleek-xyz-website-production    lon1      fn-5aaf2a72-1b5b-4ac6-8c42-a2e735a32d8b    https://faas-lon1-917a94a7.doserverless.co
```

Connect to your namespace:

```sh
doctl serverless connect fn-5aaf2a72-1b5b-4ac6-8c42-a2e735a32d8b
```

### Deploy function

From the repository project root:

```sh
doctl serverless deploy Services/Beehiiv
```

Alternatively, change directory to project path, e.g. from repository project root you'll find it in:

```sh
./Services/Beehiiv
```

Execute the command:

```sh
doctl serverless deploy .
```

The function should be available at:

```sh
https://faas-lon1-917a94a7.doserverless.co/api/v1/web/fn-5aaf2a72-1b
5b-4ac6-8c42-a2e735a32d8b/main/create-subscription
```

Notice the function base URL, followed by the namespace ID and the function corresponding to the [project.yml](project.yml).

### Test

Post some data via cURL for testing:

```sh
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"email": "helder.202501161931@fleek.xyz"}' \
  https://faas-lon1-917a94a7.doserverless.co/api/v1/web/fn-5aaf2a72-1b
5b-4ac6-8c42-a2e735a32d8b/main/create-subscription
```

A valid response should contain the status "validating" and any of the data can be send in the request object.

```sh
{
  "data": {
    "data": {
      "created": 1737056445,
      "email": "helder.202501161931@fleek.xyz",
      "id": "sub_7df93504-9d74-4014-a6d6-e53ac022e024",
      "referralCode": "LK62pDskOo",
      "referringSite": "",
      "status": "invalid",
      "stripe_customer_id": "",
      "subscriptionPremiumTierNames": [],
      "subscriptionTier": "free",
      "utmCampaign": "",
      "utmChannel": "api",
      "utmMedium": "",
      "utmSource": "direct"
    }
  }
}
```
