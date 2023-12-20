job "main-website" {
  datacenters = ["dc1"]
  type        = "service"

  group "main-website" {
    count = 2

    network {
      mode = "bridge"

      port "http" {}
    }

    service {
      name = "main-website"
      port = "http"

      connect {
        sidecar_service {}
      }

      check {
        type     = "http"
        port     = "http"
        path     = "/"
        interval = "20s"
        timeout  = "2s"
      }
    }

    task "main-website" {
      driver = "docker"

      resources {
        cpu        = 100
        memory     = 256
        memory_max = 256
      }

      template {
        destination = "local/default.conf"
        change_mode = "restart"
        data        = <<EOF
server {
	listen {{ env "NOMAD_PORT_http" }} default_server;

	gzip on;
	gzip_min_length 1000;
	gzip_types text/plain text/xml application/javascript text/css;

	root /app;

	location / {
		add_header Cache-Control "no-cache";
		try_files $uri $uri/index.html /index.html;
	}

  location ~* \.(?:ttf|ico|svg|woff2|css)$ {
    expires 1d;
    add_header Cache-Control "public";
  }
}
EOF
      }

      config {
        image = "__IMAGE__"

        volumes = [
          "local:/etc/nginx/conf.d",
        ]
      }
    }
  }
}
