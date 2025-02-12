server {
    server_name ladlilaxmiyoj.shop;


    # Frontend location for "/t" route
    location / {
        root /var/www/ladliLakshmiYojana/frantend/dist;  # Replace with your frontend build path
        index index.html;
        try_files $uri $uri/ /index.html;  # Redirect unmatched routes to index.html
    }


    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/ladlilaxmiyoj.shop/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/ladlilaxmiyoj.shop/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = ladlilaxmiyoj.shop) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;                                                        
    server_name ladlilaxmiyoj.shop;
    return 404; # managed by Certbot


}