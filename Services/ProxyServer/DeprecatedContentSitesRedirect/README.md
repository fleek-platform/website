# Deprecated Content Sites Redirect Proxy

The following is the Nginx proxy server nginx.conf that forwards requests from docs.fleek.xyz or blog.fleek.xyz to the fleek.xyz new site with a 301 Permanent redirect.

## Requirements

- Nginx >= 1.23.3
- SSL/HTTPS

To learn more about Nginx read it [here](https://nginx.org/en/docs)

## Enable SSL

Enable SSL by utilizing the Let's Encrypt which provide free SSL certificates. Use Certbot to automate the process.

1) Make sure that a location block for the acme challenge is set

```
location /.well-known/acme-challenge/ {
    root /var/www/certbot-challenges;
    allow all;
}
```

2) Enable port 443

```sh
sudo ufw allow 443
```

3) Stop any services on port 80 as it'll be used for the challenge

```sh
systemctl stop nginx
```

4) Install required binaries

Install certbot and the Nginx certbot extension to generate certificates.

```sh
apt install certbot python3-certbot-nginx
```

5) Generate the certificates

Generate the certificates by following the prompts to complete the SSL setup use the team admin email address during registration.

Run the command for each domain.
  
```sh
certbot certonly \
  --nginx \
  --standalone \
  -d <DOMAIN>
```

Expect a response similar to the following for each domain blog and docs.

```sh
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/<URL>/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/<URL>/privkey.pem
This certificate expires on 2024-08-25.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.
```

6) Copy the NGINX configuration

You're required to setup the Nginx configuration and related includes such as the shared directory files to the server. By default these should be placed in /etc/nginx.

Make any customizations as required.

7) Declare the SSL Certificates for each domain blog and docs.

```sh
ssl_certificate /etc/letsencrypt/live/<URL>/fullchain.pem;
ssl_certificate_key  /etc/letsencrypt/live/<URL>/privkey.pem;
```

8) Test

```sh
nginx -t
```

9) Restart the nginx service

```sh
systemctl reload nginx
```

10) Verify

Run the openssl command for the domain.

```sh
openssl s_client -connect <DOMAIN>:443 -servername <DOMAIN>
```

You should find.

```sh
-----END CERTIFICATE-----
subject=CN=<DOMAIN>
issuer=C=US, O=Let's Encrypt, CN=R11
---
```

## Enable njs module

The original URL are case-sensitive and we'd like to normalize it as lowercase. For that we can use the njs module to allow us to compute with javascript.

Edit the nginx.conf file and load the module outside the http block.

```sh
load_module modules/ngx_http_js_module.so;

http {
  ...
}
```

Include the path where the njs script is going to be located, import the script and set the utility variable.

```sh
js_path "/etc/nginx/njs/";
js_import utils from lowercase.js;
js_set $lc utils.lowercase;
```

Create the directory njs

```sh
mkdir /etc/nginx/njs
```

Create the script file

```sh
touch /etc/nginx/njs/lowercase.js
```

Open the file and put the content

```sh
function lowercase(r) {
    var originalValue = r.uri.split(/^\/(docs|post)(.*)$/)[2];
    var lowercased = originalValue.toLowerCase();
    return lowercased;
}
```

## Usage

1) Open the Nginx configuration file that is typically  located at `/etc/nginx/nginx.conf` or within the `/etc/nginx/sites-available` directory

2) Modify current or add a new server block that should listen to port 80 (or 443 for SSL/HTTPS) for requests coming from `docs.fleek.xyz` and `blog.fleek.xyz`

3) Save the configuration file

4) Check syntax for the Nginx configuration, e.g. `sudo nginx -t`

5) Reload Nginx by running `sudo systemctl reload nginx` or `sudo service nginx reload`

6) Test that requests are successfully forwarded under a test domain, e.g. you'll have to modify the nginx.conf to apply the test domain

Ref:
- Nginx location match tester
  https://nginx.viraptor.info
