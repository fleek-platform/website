---
order: 8
title: Applications
date: 2023-01-10
desc: Learn to manage the Applications
keywords: [services, documentation, getting started]
tags:
  - PAT
  - Guide
  - Learn
  - Fleek
---

# Applications

Manage the Client IDs associated with applications powered by the Fleek Platform SDK.

```
Commands:
  list              Display all application Client IDs for the selected
                    project
  create [options]  Generate a new client ID for an SDK-powered
                    Application
  update [options]  Update the Client ID for an SDK-powered Application
  delete [options]  Delete an SDK-powered Application's Client ID
  help [command]    display help for command
```

## Create

Generate a new Client ID for an SDK-powered Application.

```sh
fleek applications create
```

Then, you'll have to provide a name for the new application:

```sh
✔ Enter the name of the new application: …
```

A list of domains for whitelisting separated by commas.

```sh
✔ Enter one or more domain names to whitelist, separated by commas (e.g. example123.com, site321.com) …
```

Once complited, you'll get a confirmation message.

```sh
✅ Success! New application Client ID created: client_XXXX
```

## List

Display all application Client IDs for the selected project.

```sh
fleek applications list
```

You'll get a table containing a list of applications with corresponding ID, Name, Client ID, white listed domain and date of creation.

```sh
ID          Name        Client ID     White list domains        Created At
----------------------------------------------------------------------------------------
clu...x3b   Appzilla    cli...xej     my-appzilla-domain.xyz    2024-03-28T15:36:38.115Z
```

## Update

Update the Client ID for an SDK-powered Application.

```sh
fleek applications update
```

Then, you'll have to select the application from a selection list.

```sh
? Choose application: ›
❯   Appzilla
❯   MyCustomAppX
❯   SuperClientApp
```

Type a new name (if required):

```sh
✔ Enter the name of the new application: …
```

Provide a list of domain names for whitelisting:

```sh
✔ Enter one or more domain names to whitelist, separated by commas (e.g. example123.com, site321.com) …
```

Once completed, you'll get a confirmation message.

```sh
✅ Success! The application Client ID was successfully updated.
```

## Delete

Delete an application by selecting the name.

```sh
fleek applications delete
```

Then, you'll have to select the application from a selection list.

```sh
? Choose application: ›
❯   Appzilla
❯   MyCustomAppX
❯   SuperClientApp
```

Once completed, you'll get a confirmation message.

```sh
✅ Success! The Client ID has been successfully deleted.
```
