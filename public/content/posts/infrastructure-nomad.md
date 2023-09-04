# Infrastructure of peoplesmarkets.com - Nomad

## … and the services deployed on it.

Hello! : ) Here I will cover the deployment of [Nomad](https://github.com/hashicorp/nomad), a container orchestration software and its integration with Consul and Vault.

![peoplesmarkets.com website logo icon](/content/BannerLogo.png)

**peoplesmarkets.com website logo**

---

### 04 - Nomad configuration and its purpose

#### Nomad ACL and secret engine

Nomad uses an ACL system (Access Control List) similar to Consuls, which we can bootstrap after all Nomad nodes are installed and configured so that we have at least three server nodes connected to each other and all client nodes can register themselves to the control plane. Also, similar to Consul, Vault provides a built-in [secret engine](https://developer.hashicorp.com/vault/docs/secrets/nomad) for Nomad ACL tokens and policies.

#### Connecting to Consul

With the Consul secret engine already configured in Vault, we can create Consul ACL policies for Nomad servers and clients with permissions that enable them to register new services to Consul. Here, we also use [consul-template](https://github.com/hashicorp/consul-template) to automatically configure a new Consul token whenever it is close to expiration. The template queries Vault and writes the token into a config file. Whenever it is updated, we reload the nomad process. Here is also one important thing I overlooked at the beginning: It is important, that each Nomad agent has one Consul agent to connect to. In our case, it is on the same node, so we use localhost. Otherwise, it can happen that some services are not unregistered properly from the service catalog. ¹

> [1]: [Nomad docs](https://developer.hashicorp.com/nomad/docs/configuration/consul) highlighted section.

#### SSL certificates

Again, similar to Consul SSL certificate, we will use Vaults build in PKI engine to manage the SSL certificates for the Nomad API. And again, we use consul-template to update the configuration whenever a certificate is close to expiration.

#### Vault integration

Nomad has also a configuration section where we can connect it to Vault in order to access secrets before deploying a service, which we can provide to the process. This way we can manage the secrets in Vault and use Nomad templates section of the job definition to set and update them. As you might have already noticed, the pattern is the same throughout the system.

This was a short one because the pattern used to configure this component is more or less exactly the same as the one used to configure Consul. Next time I want to cover the CockroachDB and ZITADEL deployments, which finishes the basic infrastructure.

_Maximilian Temeschinko_

---

### Shameless Ads:

Check out [peoplesmarkets.com](https://peoplesmarkets.com)! And the [repositories](https://github.com/peoplesmarkets)! Have a good one : )

![peoplesmarkets.com website logo icon](/content/FooterLogoAndPreviewImage.png)

**peoplesmarkets.com website logo icon**
