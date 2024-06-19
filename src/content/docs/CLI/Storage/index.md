---
order: 4
title: Storage
date: 2023-01-10
desc: Dive into Fleek's decentralized storage service. Offering support for IPFS, Arweave, and Filecoin, Fleek ensures high availability and performance..
tags:
  - Edge Platform
  - CDN
  - Guide
  - Learn
  - Fleek
---

# Storage

The Fleek Platform CLI provides a storage service allowing you to store your files in a decentralized manner. Our service supports IPFS as our main storage protocol, complemented by Arweave and Filecoin as a backup layer. This approach ensures a high-performing and highly available service. Filecoin acts as the default backup layer, but modifications can be implemented in the storage settings.

Storage configurations are unique to each project, offering flexibility in how each project utilizes the service.

## Add a File or Directory to Fleek Storage

Add file via Fleek Storage to ipfs and backup on filecoin or arweave or both

To add a file to Fleek Storage run the command:

```sh
fleek storage add <PATH>
```

For example, let's say that you have a file "~/MyFiles/hello_world.txt", that contains the following:

```sh
Hello World!
```

To upload the file to Fleek Platform Storage service, you'd run the command **storage**:

```sh
fleek storage \
  add ~/MyFiles/hello_world.txt
```

```sh
Upload Progress [████████████████████████████████████████] 100% | ETA: 0s
```

Once complete, you'll get a confirmation message, including a gateway URL to access the content of the file:

```sh
✅ Success! The Storage IPFS CID is <CID>

> You can access it through your private gateway
🔗 https://<CID>.ipfs.cf-ipfs.com
```

## List Storage

The **list** command gives the user a list of files or directories in the Fleek Storage for the current project.

To view the table run the command:

```sh
fleek storage list
```

You should get table similar to:

```sh
filename            cid        filecoin id      arweave id      link
----------------------------------------------------------------------------------------------------
hello-world.txt     baf...x3a  -                -               https://<CID>.ipfs.cf-ipfs.com
hello-world.txt     baf...kia  -                -               https://<CID>.ipfs.cf-ipfs.com
john-coltrane.mp3   baf...yu2  -                -               https://<CID>.custom-domain.xyz
```

## Get a Storage file

You can retrieve files or directories from Fleek Storage by providing a Name or a CID. Use the list table to identify the files you are interested in.

:::note
Currently, the data isn't downloaded, a table is presented instead. For single files, you can lookup for the content URL and use cURL and pipe to a local file.

```sh
curl https://<CID>.ipfs.cf-ipfs.com > hello-world.txt
```

:::

Use the flag --cid to retrieve a file by its CID.

```sh
fleek storage \
  get --cid <CID>
```

Use the flag --name to retrieve a file by its Name.

```sh
fleek storage \
  get --name <FILENAME>
```

For example, let's say that we'd like to retrieve the file of the pseudo CID xyz:

```sh
fleek storage \
  get --cid xyz
```

You should get table similar to:

```sh
filename            cid        filecoin id      arweave id      link
----------------------------------------------------------------------------------------------------
john-coltrane.mp3   baf...yu2  -                -               https://<CID>.custom-domain.xyz
```

## Delete a Storage file or directory

Delete files and directories in Fleek Storage either by Name or CID.

Use the flag --cid to delete a file by its CID.

```sh
fleek storage \
  get --cid <CID>
```

Use the flag --name to delete a file by its Name.

```sh
fleek storage \
  get --name <FILENAME>
```

For example, let's say that we'd like to delete the file of the pseudo CID xyz:

```sh
fleek storage \
  delete --cid xyz
```

You'll get the action status and a delete confirmation message, if the request is fully processed.

```sh
> Processing cid: baf...kup
✅ Success! The cid: baf...kup has been successfully deleted.
```
