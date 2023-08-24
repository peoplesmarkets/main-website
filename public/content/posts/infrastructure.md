# Infrastructure of peoplesmarkets.com

Hello! : ) Here I want to showcase the current state of the infrastructure running [peoplesmarkets.com](https://peoplesmarkets.com/) which is mainly deployed and configured with Ansible Playbooks which can be found in the [infrastructure repository](https://github.com/peoplesmarkets/infrastructure).

![peoplesmarkets.com website logo icon](/content/BannerLogo.png)

**peoplesmarkets.com website logo**

---

## 01 - Main software and platforms

- HashiCorp Cloud Platform Vault Secrets - Secret store before Vault is deployed
- [HashiCorp Vault](https://github.com/hashicorp/vault) - Secret store and management
- [HashiCorp Consul](https://github.com/hashicorp/consul) - Service Discovery and Service Mesh
- [HashiCorp Nomad](https://github.com/hashicorp/nomad) - Container orchestration
- [CockroachDB](https://github.com/cockroachdb/cockroach) - Relational database
- [ZITADEL](https://github.com/zitadel/zitadel) - Identity management and authentication
- Cloudflare Pages - Web UI deployment

In order to deploy, run, and update backend services in a convenient way, we need some container orchestration tool. In this case, I went with Nomad just because I already used [Kubernetes](https://github.com/kubernetes/kubernetes) in a production environment and wanted to learn something new. Nomad covers all use cases for the foreseeable future.

In order for the running services to be able to communicate with each other, we need to configure their access information in some way. This is where Consul comes in. It is easy to integrate with Nomad; we only need to add a section to our deployment specification to find the addresses of those other services that are registered with Consul.

I find secret management and configuration always a little painful—the good kind of pain, but pain nonetheless. HashiCorp Vault is a program that eases that pain very nicely. It is also easy to use with Nomad.

For the first database, I went with CockroachDB. In the past, I often went with [PostgreSQL](https://git.postgresql.org/gitweb/?p=postgresql.git) or [MySQL](https://github.com/mysql/mysql-server) as default because they are reliable and I understand them well enough to be useful, but I do not get my head around how to deploy them to be highly available and replicated, at least not to a point where I would be happy to use them in production. CockroachDB comes with the hustle that is involved in distributed data storage pre-hustled. Will say, "It is straight-forward to deploy multiple nodes in a cluster".

For user registration and authentication, ZITADEL was deployed. I repeat myself, but I did not know it before, and I wanted to learn something new. It covers all use cases for the foreseeable future, plus it is written in [Go](https://github.com/golang/go) : )

The Vault Secrets service at HashiCorp Cloud Platform is used for a few secrets that need to exist before Vault is deployed; here I could also have used Ansible Vault locally. Cloudflare Pages is used to deploy and run the front-end web UIs. I saw a friend use it the other day for their personal project, and I found the simplicity of the deployment nice. It is free and easily covers the use case. We can deploy the frond ends in the Nomad cluster in the future without much work if we decide to have everything running on our hardware.

That’s it so far for the reasons why the software components and services were chosen. While I was playing around with the HashiStack, I found some very nice integrations that I want to discuss in the future, especially having most of the secrets and certificates managed by Vault.

_Maximilian Temeschinko_

---

## Shameless Ads:

Check out [peoplesmarkets.com](https://peoplesmarkets.com)! And the [repositories](https://github.com/peoplesmarkets)! Have a good one : )

![peoplesmarkets.com website logo icon](/content/FooterLogoAndPreviewImage.png)

**peoplesmarkets.com website logo icon**
