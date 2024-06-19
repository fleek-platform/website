---
order: 2
title: Projects
date: 2023-01-10
desc: Learn how to use the projects command.
---

# Projects

A Project on Fleek Platform is essentially a folder to help you manage your application settings.

Every interaction with the Fleek Platform requires a project to be selected. A user must create at least one project, to access and utilize any of the Fleek Platform services features, e.g. Site deployment or File Storage. User can initiate their own projects, or grant access to others simply by supplying an email address.

A user account can take on the role of owning several projects and still be part of projects belonging to other user accounts.

## Create a Project

As soon as you create a new user account on the Fleek Platform, an initial Project is immediately created for you, with a temporary name and left blank. You have the option to personalize the project name at your convenience.

Creating a project is as simple as running:

```sh
fleek projects create
```

If you enter a valid name, you'll be automatically switched to it.

## List Projects

Show a list of all projects where the user is a member by running:

```sh
fleek projects list
```

You'll get a table containing the project list:

```sh
ID        Name               Created At        Current
------------------------------------------------------
xxxx      First Project      2024-03-20        ✅
xxxx      Quick Start        2024-05-10
```

## Select a Project

Selecting a project can be accomplished using the **switch** command. Running it opens a simple selection menu:

```sh
fleek projects switch
```

For example, here we have switched to the project "Quick start":

```sh
✅ Success! You have switched to project "Quick start"
```

Remember, you can always append help to any command to learn more:

```sh
fleek projects help
```

From this point onwards, all interactions with the Fleek Platform services will be tied to the selected Project. Whenever required, you can switch and select a different project.
