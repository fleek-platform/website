# ZenDesk's proxy

The following is the ZenDesk's proxy service.

## Requirements

- Nginx >= 1.24
- SSL/HTTPS

To learn more about Nginx read it [here](https://nginx.org/en/docs)

## Enable SSL

Enable SSL by utilizing the Let's Encrypt which provide free SSL certificates. Use Certbot to automate the process.

1. Make sure that a location block for the acme challenge is set

```
location /.well-known/acme-challenge/ {
    root /var/www/certbot-challenges;
    allow all;
}
```

2. Enable port 443

```sh
sudo ufw allow 443
```

3. Stop any services on port 80 as it'll be used for the challenge

```sh
systemctl stop nginx
```

4. Install required binaries

Install certbot and the Nginx certbot extension to generate certificates.

```sh
apt install certbot python3-certbot-nginx
```

5. Generate the certificates

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

6. Copy the NGINX configuration

You're required to setup the Nginx configuration and related includes such as the shared directory files to the server. By default these should be placed in /etc/nginx.

Make any customizations as required.

7. Declare the SSL Certificates for each domain blog and docs.

```sh
ssl_certificate /etc/letsencrypt/live/<URL>/fullchain.pem;
ssl_certificate_key  /etc/letsencrypt/live/<URL>/privkey.pem;
```

8. Test

```sh
nginx -t
```

9. Restart the nginx service

```sh
systemctl reload nginx
```

10. Verify

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

## Systemd Service

The Service is wrapped as a Systemd service located in:

```
/lib/systemd/system
```

For this reason, any of the systemctl commands should be familiar to manage the Systemd service:

```sh
systemctl daemon-reload
systemctl start support-prod-eu-lon-1-01.flkservices.io.service
systemctl enable support-prod-eu-lon-1-01.flkservices.io.service
systemctl restart support-prod-eu-lon-1-01.flkservices.io.service
```

Although, it uses [Bun](https://bun.sh/) to run the service.

```sh
bun run <USERNAME>/<REPO>/Services/ZenDesk/api.ts
```

More importantly, the HTTP Server is NGINX. Utilized as a forward proxy to the Systemd or Bun service.

Find the configuration located in:

```sh
/etc/nginx/sites-enabled/default
```

The following commands should be familiar.

```sh
systemctl status nginx
systemctl reload nginx
```

💡At time of writting, templates are available under the repository path [/Services/ZenDesk](https://github.com/fleek-platform/website/tree/331f5c1b9e75d3e6c580a93bedb612267257bda7/Services/ZenDesk).
