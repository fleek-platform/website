# Deprecated Content Sites Redirect Proxy

The following is the Nginx proxy server nginx.conf that forwards requests from docs.fleek.xyz or blog.fleek.xyz to the fleek.xyz new site with a 301 Permanent redirect.

## Usage

1) Open the Nginx configuration file that is typically  located at `/etc/nginx/nginx.conf` or within the `/etc/nginx/sites-available` directory

2) Modify current or add a new server block that should listen to port 80 (or 443 for SSL/HTTPS) for requests coming from `docs.fleek.xyz` and `blog.fleek.xyz`

3) Save the configuration file

4) Check syntax for the Nginx configuration, e.g. `sudo nginx -t`

5) Reload Nginx by running `sudo systemctl reload nginx` or `sudo service nginx reload`

6) Test that requests are successfully forwarded under a test domain, e.g. you'll have to modify the nginx.conf to apply the test domain
