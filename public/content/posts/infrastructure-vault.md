# Infrastructure of peoplesmarkets.com - Vault

Hello! : ) After [listing the main components](https://community.peoplesmarkets.com/posts/infrastructure) of the [infrastructure repository](https://github.com/peoplesmarkets/infrastructure) of [peoplesmarkets.com](https://peoplesmarkets.com/) and having provided some reasoning for the selection, albeit not very technically insightful, I want to dig a little bit deeper into the secret store and management software called [Vault](https://github.com/hashicorp/vault) and what it provides to the project.

![peoplesmarkets.com website logo icon](/content/BannerLogo.png)

**peoplesmarkets.com website logo**

---

## 02 - Vault cluster deployment and its purpose

The setup of a Vault cluster is quite simple. There is no separation between server and client nodes, or control-plane and worker nodes. We use the integrated storage that is recommended by the HashiCorp docs which in turn uses the Raft Consensus Algorithm. That means one node is active and the other nodes are standing by. Requests to standby nodes get proxied to the active one. That means in order to be able to handle more load on the cluster, it is not helpful to simply increase the number of nodes, which is something to keep in mind for the future regarding scaling the system.

For starters, we are deploying three nodes in a single availability zone. In the playbook, we are generating self-signed SSL certificates for node-to-node communication, installing the vault binary, and starting the services with their configurations. Currently, we need to manually initialize the system when starting for the first time, after which the playbook can create an admin role for management purposes. Vault can be configured with a single file where we state which network interfaces the Vault API should listen to and at which addresses the other nodes are accessible.

When you start the Vault cluster and initialize it, you will be given five secrets that are used to "seal" and "unseal" the vault, i.e. encrypt and decrypt the stored data.¹ With those keys, it is also possible to generate a new root token with access to everything, which means those keys should be stored securely somewhere else. You need three of those five keys to do the mentioned actions, so it would be good to only store at most two keys in one place. Also, there are our self-signed SSL certificates that the nodes use to encrypt and authenticate the communication between each other, which should be stored securely as well. Because I've had to manually enter those keys into the Vault CLI too many times in my life already, I configured an external cloud KMS (cloud key management service) that Vault can use to auto-unseal itself on startup.

The purpose of running the Vault cluster is to store and manage secrets. Not only the secrets the other infrastructure components need to encrypt data and perform authentication, but also the secrets the services running on that infrastructure need, are stored and provided by our Vault cluster. For example, we can store credentials that our services need to authenticate against databases in Vault and then acquire them through our container runtime when needed. Rotating those secrets in this scenario is also very simple because we can fetch the secrets once they are changed and then restart the containers with the new secrets configured.

We use tokens in Consul (our service mesh software) in order to authenticate requests to its API. Vault has a so-called "secret engine" for Consul's ACL (access control list) system where we can acquire access tokens through Vault that are authorized to do specific actions. But more on that next time, when I want to discuss the integration between Vault and Consul in more detail. Maybe we can also look at Vault and Nomad, or even Consul and Nomad.

[1]: It is not completely correct that those keys (using Shamir's secret sharing algorithm) encrypt and decrypt the data directly. Read the [Vault docs](https://developer.hashicorp.com/vault/docs/concepts/seal#why) for details.

_Maximilian Temeschinko_

## Shameless Ads:

Check out [peoplesmarkets.com](https://peoplesmarkets.com)! And the [community page](https://community.peoplesmarkets.com)! And the [repositories](https://github.com/peoplesmarkets)! Have a good one : )

![peoplesmarkets.com website logo icon](/content/FooterLogoAndPreviewImage.png)

**peoplesmarkets.com website logo icon**
