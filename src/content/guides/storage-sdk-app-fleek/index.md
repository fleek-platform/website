---
title: 'Build an onchain dropbox with Fleek storage'
date: 2024-08-02
desc: 'How to build an onchain file storage app with the Fleek SDK and Fleek Functions'
thumbnail: './dropbox.png'
image: './dropbox.png'
author: 'Fleek'
---

In this guide, you'll learn how to build an onchain 'DropBox' using the <u>[Fleek Storage SDK](https://fleek.xyz/docs/sdk/)</u>.

The Fleek Platform SDK is a TypeScript library that lets you interact with Fleek’s services. It’s composed of methods that you can leverage to build your own application on top of Fleek’s services.

The Fleek Platform SDK provides a storage service that allows you to store your files in a distributed manner, supporting IPFS as its main storage protocol. We’ll use the Fleek SDK to tap into Fleek's storage and build a distributed storage app.

You’ll be able to safely upload files, and view them, from your custom made, personal storage box.

---

## Prerequisite

- Node 18+
- Fleek Account
- Fleek CLI
- Fleek SDK Installation
- Express

1. **Fleek CLI Installation**

```tsx
# You need to have Nodejs >= 18.18.2
npm install -g @fleek-platform/cli
```

2. **Dependencies**

```tsx
npm i express dotenv http-server @fleek-platform/sdk
```

3. **Create Access Token and Projects ID**

Personal Access Token. Your PAT starts with the suffix `pat`

```tsx
fleek pat create
```

> Do you want to name your new personal access token? Keep empty to skip.

`✅ Success! Your new personal access token: pat_ACB123xyz`

---

## Project ID

1. **Create a **`projectID`** by running**:

```tsx
fleek projects create
```

> Please enter the project name:

`✅ Success! The project "project_name" has been successfully created with the project ID "clz1234aBcXyz", and you've automatically been switched to it.`

2. **Create a `.env` file and populate it with your `accessToken`, and `projectID`**

```jsx
token = TOKEN_GOES_HERE;
project_id = PROJECT_ID_GOES_HERE;
```

---

## Upload Server

1. **Create a new node file, we’ll call it `server.js`. We’re going to begin by:**

- Importing Dependencies
- Defining dir
- Instantiating personal access token
- Starting our express server
- Enabling cors

Populate the `server.js` file with the code below:

```tsx

import { FleekSdk, PersonalAccessTokenService } from '@fleekxyz/sdk';
import { filesFromPaths } from 'files-from-path'
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const patService = new PersonalAccessTokenService({
    personalAccessToken: process.env.token, // your PAT goes here
    projectId: process.env.project_id // your project ID goes here
})
const fleekSdk = new FleekSdk({ accessTokenService: patService });

const app = express();
const port = 8080;
app.use(cors());
...
```

There are a few methods made available to us to get access to Fthe fleek's storage. We have:

| **Method**             | **Description**                    |
| ---------------------- | ---------------------------------- |
| uploadFile             | Upload a file to IPFS              |
| uploadDirectory        | Upload a directory to IPFS         |
| uploadVirtualDirectory | Upload a virtual directory to IPFS |
| get                    | Get a file by CID                  |
| getByFilename          | Get a file by Filename             |
| list                   | List files                         |
| delete                 | Delete a file by CID               |

However, in this guide, we’ll be focusing on these methods:

| **Method** | **Description**       |
| ---------- | --------------------- |
| uploadFile | Upload a file to IPFS |
| get        | Get a file by CID     |
| list       | List files            |
| delete     | Delete a file by CID  |

> 💡 Learn more about the Fleek Storage <u>[here](https://fleek.xyz/docs/cli/storage/)</u>

2. Back to our **`server.js`** file, populate it with this:

```jsx
...

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  const upload = multer({ storage: storage });

// Endpoint to upload file
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'uploads', req.file.originalname);
    const file = await filesFromPaths(filePath)

    const result = await fleekSdk.storage().uploadFile({
      file: file[0]
    });

    fs.unlinkSync(filePath);
    res.status(200).json({ message: 'File uploaded to fleek', result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

```

We started out by configuring `multer` for file upload. When a request is sent to our server, `multer` checks to see if the folder called ‘upload’ exists, if it does, if proceeds to upload the file it received from the client to that folder.

```tsx
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
```

The file is then uploaded to Fleek using the Fleek SDK. Once the file is successfully uploaded to Fleek, it is deleted from the local 'uploads' folder to free up space. If the upload is successful, we send a response back to the client with a success message. If any error occurs during this process, we handle it gracefully by logging the error and sending an appropriate response back to the client.

We can also view the list of files that currently exists in our storage through the `/list-files` api.

```tsx
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'uploads', req.file.originalname);
    const file = await filesFromPaths(filePath);

    const result = await fleekSdk.storage().uploadFile({
      file: file[0],
    });

    fs.unlinkSync(filePath);
    res.status(200).json({ message: 'File uploaded to fleek', result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

app.get('/list-files', async (req, res) => {
  try {
    const result = await fleekSdk.storage().list();
    res.status(200).json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to list files' });
  }
});
```

Our full `server.js` file should look like this

```tsx
import { FleekSdk, PersonalAccessTokenService } from '@fleekxyz/sdk';
import { filesFromPaths } from 'files-from-path';
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();
// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const patService = new PersonalAccessTokenService({
  personalAccessToken: process.env.token, // your PAT goes here
  projectId: process.env.project_id, // Optional
});
const fleekSdk = new FleekSdk({ accessTokenService: patService });

const app = express();
const port = 8080;
app.use(cors());

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Endpoint to upload file
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'uploads', req.file.originalname);
    const file = await filesFromPaths(filePath);

    const result = await fleekSdk.storage().uploadFile({
      file: file[0],
    });

    fs.unlinkSync(filePath);

    res.status(200).json({ message: 'File uploaded to fleek', result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

app.get('/list-files', async (req, res) => {
  try {
    const result = await fleekSdk.storage().list();
    res.status(200).json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to list files' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
```

---

## Client Side UI

1. **We’re going to create a new `index.html` file. And populate it with the code below**:

```jsx
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Simple POST Request Example</title>
    <link rel="stylesheet" href="style.css"> <!-- Link to external CSS file -->

  </head>
  <body>
    <div class="upload-container">
      <h1>Upload a File to Fleek</h1>
      <form id="uploadForm">
        <input type="file" id="fileInput" name="file" required />
        <button type="submit">Upload</button>
      </form>
      <p id="message"></p>
    </div>
    <br>

    <div class="files-container">
      <h1>Files Stored on Fleek</h1>
      <button id="fetchFilesButton">Load Files</button>
      <ul id="filesList"></ul>
  </div>

    <script>
      document
        .getElementById("uploadForm")
        .addEventListener("submit", async (event) => {
          event.preventDefault();
          const fileInput = document.getElementById("fileInput");
          const formData = new FormData();
          formData.append("file", fileInput.files[0]);

          try {
            const response = await fetch("http://localhost:8080/upload", {
              method: "POST",
              body: formData,
            });
            const result = await response.json();

            if (response.ok) {
              console.log(result.result.pin.cid)
              const id = result.result.pin.cid
              document.getElementById("message").textContent =
                "File uploaded to fleek: " + id;
            } else {
              document.getElementById("message").textContent =
                "Error: " + result.error;
            }
          } catch (error) {
            console.error("Error:", error);
            document.getElementById("message").textContent =
              "Error: " + error.message;
          }
        });

        async function fetchAndDisplayFiles() {
            try {
                const response = await fetch('http://localhost:8080/list-files');
                if (!response.ok) {
                    throw new Error('Failed to fetch files');
                }
                const files = await response.json();

                const filesList = document.getElementById('filesList');
                filesList.innerHTML = ''; // Clear existing list

                // Display each file name and link for the CID
                files.forEach(file => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = `https://${file.cid}.ipfs.dweb.link`;
                    link.textContent = file.cid;
                    link.className = 'file-link';
                    listItem.textContent = `CID: `;
                    listItem.appendChild(link); // Append the link to the list item
                    filesList.appendChild(listItem);
                });
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('filesList').textContent = 'Failed to load files: ' + error.message;
            }
        }

        document.getElementById('fetchFilesButton').addEventListener('click', fetchAndDisplayFiles);
    </script>
  </body>
</html>

```

2. And for the UI style, `styles.css`

```css
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  padding-top: 50px;
  background-color: #f4f4f4;
  flex-direction: column;
}

.upload-container {
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.files-container {
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

input[type='file'] {
  margin-bottom: 20px;
}

button {
  background-color: lightblue;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #82b4d9;
}
```

---

For our front end, we start by adding a submit event listener to the upload form. When the form is submitted, we prevent the default behavior and create a `FormData` object with the selected file. We then send this form data to the server using the `fetch` API. If the upload is successful, we display the file's CID on the web page. If there's an error, we display an error message instead. Any errors during this process are caught and handled gracefully.

---

## Start Up Server

And that's it! Your onchain storage app is done. To see it:

1. In your terminal, run:

```tsx
http - server;
```

You should see this:

```css
Starting up http-server, serving ./

http-server version: 14.1.1

http-server settings:
CORS: disabled
Cache: 3600 seconds
Connection Timeout: 120 seconds
Directory Listings: visible
AutoIndex: visible
Serve GZIP Files: false
Serve Brotli Files: false
Default File Extension: none

Available on:
  http://127.0.0.1:8080
  http://PUBLIC_IP:8081
Hit CTRL-C to stop the server
```

Congrats! You can visit your fully functional onchain storage page here: http://127.0.0.1:8080

---

In this guide, we learned how to make use of the Fleek SDK to upload, get, and list files in the Fleek storage. We built a backend node server powered by express to run our functions.

You can see the full code for this project on GitHub: <u>https://github.com/geniusyinka/dropbox_ff</u>.

Tag us with your version on X!

**To learn more about the Fleek & The Fleek SDK. Visit:**

Our docs page: https://docs.fleek.xyz/

Join Our Discord: https://discord.gg/fleek

Follow us on X: https://twitter.com/fleek/
