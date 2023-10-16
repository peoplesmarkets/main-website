# Infrastructure of peoplesmarkets.com - CockroachDB

## With Vault’s PKI and database secret engine in our Consul service mesh

Hello! : ) Today I want to give a broad overview of how the [CockroachDB](https://github.com/cockroachdb/cockroach/) cluster is deployed and configured for the [infrastructure](https://github.com/peoplesmarkets/infrastructure) of [peoplesmarkets.com](https://peoplesmarkets.com/) and how we integrate it with Vault and Consul.

![peoplesmarkets.com website logo icon](/content/BannerLogo.png)

**peoplesmarkets.com website logo**

---

### 05 - CockroachDB configuration and its purpose

#### SSL (Secure Sockets Layer) with Vault PKI (Public Key Infrastructure)

In order for the nodes in our CockroachDB cluster to communicate securely with each other, we configure SSL certificates. Those certificates are created, issued and rotated by our Vault PKI. For this to work, we enable the [PKI secrets engine](https://developer.hashicorp.com/vault/docs/secrets/pki) in vault and create two roles. One role for the node certificates and one role for the client certificates. As usual, we also create a Vault role with a policy that only allows renewing certificates from this secret engine. Further, we use the same pattern as always to get and renew the certificates and keys with [consul-template](https://github.com/hashicorp/consul-template) and place them into the certificates directory on the CockroachDB nodes, where the cockroach program can access them. Each node gets a certificate and key issued with its private IP address configured as IP SAN (Subject Alternative Name). As always, the private key of the CA (Certificate Authority) certificate is managed and kept safe in Vault.

#### Consul service mesh

After the cockroach binary and library files are installed on the nodes, and we successfully started and initialized the cluster with our SSL certificates in place, it is time to let all other services know that there is a database now available in our cluster. In order to do that, we ensure that a Consul agent is also running on each node, so we can configure the cockroach service to the service catalog. Additionally, we install [envoy](https://github.com/envoyproxy/envoy) as a sidecar service mesh proxy, which allows us to have other services in the mesh securely communicate with the cockroach service and also lets us configure Consul intentions.

#### Vault database secret engine

A practically very noticeable integration is Vault’s database secret engine. After we enabled it, we can configure the postgresql-database-plugin using a cockroach user with permissions to manage database users and credentials and connect it to the cockroach service in our cluster. This way we can create new databases in cockroach and add database users that can only access specific databases and have Vault manage their credentials. This way, we can configure Vault to rotate the database credentials periodically and are also able to directly inject those database credentials in our Nomad job file when deploying a service. So in order to deploy a new API, we do not need to touch passwords at any point and can configure access to the database in terms of Vault policies.

---

This was a broad overview of how we initially deploy our default database. In the next one I want to shortly discuss the deployment and configuration of our Identity Management and Authentication service called ZITADEL.

_Maximilian Temeschinko_


### Shameless Ads:

Check out [peoplesmarkets.com](https://peoplesmarkets.com)! And the [repositories](https://github.com/peoplesmarkets)! Have a good one : )

![peoplesmarkets.com website logo icon](/content/FooterLogoAndPreviewImage.png)

**peoplesmarkets.com website logo icon**
