# vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## Nginx 配置

```shell
    server {
        listen       80;
        server_name  localhost;
        # 对http请求重定向到https
        rewrite ^(.*)$ https://yongge.outsrkem.top permanent;
    }
    # HTTPS server
    server {
        listen       443 ssl http2;
        server_name  yongge.outsrkem.top;

        ssl_certificate      ../cert/server.crt;
        ssl_certificate_key  ../cert/server.key;
        ssl_session_timeout	 5m;
        ssl_protocols        TLSv1 TLSv1.1 TLSv1.2;

        ssl_session_cache    shared:SSL:1m;

        ssl_ciphers  ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers  on;

        location / {
            root   html;
            index  index.html index.htm;
        }

	    location ^~ /api/v1/common/ {
	    
		if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Origin' $http_origin;
            add_header 'Access-Control-Allow-Methods' 'POST,GET,OPTIONS,PUT,DELETE';
	    	add_header 'Access-Control-Max-Age' '3600';
	    	return 204;
    	}	
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Origin' $http_origin;
            add_header 'Access-Control-Allow-Methods' 'POST,GET,OPTIONS,PUT,DELETE';
            add_header 'Access-Control-Max-Age' '3600';
            proxy_redirect off;
        	proxy_set_header Host $host;
       		proxy_set_header X-Real_IP $remote_addr;
        	proxy_set_header X-Forwarded-For $remote_addr:$remote_port;
        	proxy_set_header Upgrade $http_upgrade;
        	proxy_set_header Connection upgrade;
        	# 后端地址
            proxy_pass http://10.10.10.25:9443;
    	}
    }

```

