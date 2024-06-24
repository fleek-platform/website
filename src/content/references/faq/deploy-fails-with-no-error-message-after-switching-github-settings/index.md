---
title: 'Deploy fails with no error message after switching GitHub settings'
date: 2023-03-12
desc: 'It is possible that your deploy with fail with no error message after you switched GitHub settings like:.'
thumbnail: './dns-fleek.png'
image: './dns-fleek.png'
---

It is possible that your deploy with fail with no error message after you switched GitHub settings like:

- Account
- Organization
- Branch
- Repository

In most cases this can be quickly fixed by visiting [https://github.com/settings/installations](https://github.com/settings/installations) and removing fleek from the Authorized and Installed tabs. Then simply reinstall fleek on app.fleek.co on the hosting tab, by triggering a new deploy or adding a site.

If the above still didn't solve your issue, please open a support ticket for fleek.co and we will fix this for you. You will need to provide your site's fleek url ( for example, "burning-hall-9201.on.fleek.co" )
