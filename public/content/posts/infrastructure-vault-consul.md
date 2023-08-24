# Infrastructure of peoplesmarkets.com - Vault ❤ Consul

## And Consul ❤ Vault, certainly

Hello! : ) Today I want to write a little bit about how the [Vault](https://github.com/hashicorp/vault) cluster is connected to the [Consul](https://github.com/hashicorp/consul) cluster for the [infrastructure](https://github.com/peoplesmarkets/infrastructure) of [peoplesmarkets.com](https://peoplesmarkets.com/) and what this provides to the project.

![peoplesmarkets.com website logo icon](/content/BannerLogo.png)

**peoplesmarkets.com website logo**

---

### 03 - Vault and Consul configuration and its purpose

#### Consul ACL and secret engine

After Consul is installed on each node and we configure the right addresses for the other nodes, the cluster is now communicating, and all servers are participating in leader election of the Raft algorithm. Now we can enable and bootstrap the ACL system (Access Control List) in order to authenticate and authorize different requests to Consuls API. Luckily, Vault has a built-in [Consul secret engine](https://developer.hashicorp.com/vault/docs/secrets/consul), which will be first enabled and then configured. At this point, besides the tokens that we need to authenticate against the Vault API and Consul API, respectively, we also need to configure the address at which Vault will call the Consul API. Because our setup has a Consul agent running on every node, we will just call Consul on localhost. That way, each vault agent will communicate with the consul agent running on the same host.

> For other setups where the Consul agents are on different nodes than the Vault agents, or for that matter, when Consul needs to call Vault, we need to do a bit more work. Simply putting the address of one agent will work, but if that node goes down or the connections get lost, the whole communication from one service to the other is cut off. This is not HA => not OK!

Now that the setup is done, we can create ACL policies on Consul. In those policies, we can define which parts and resources of the Consul API can be accessed and also the type of access, e.g. “read” or “write”. For example, we define a policy for DNS queries that allows us to read all “node” and “service” resources on Consul. We also create a role on Vault that we associate with that newly created policy. Without the Vault integration, we would require a Consul ACL token with the right permissions in order to generate a new Consul ACL token for that newly created policy, but we have Vault configured, so we can authenticate against Vault, and if our permissions are sufficient, we can get a new Consul ACL token from Vault. I know this is more complex than just using Consul’s ACL system on its own, but with more and more secrets we need to manage from here on, the complexity will explode. When we use Vault as our central place to authenticate and get our tokens for other services, where we can also set up policies for who can get which tokens, we will have a more manageable system in the future and, with that, happier times. I promise : )

#### Consul DNS and systemd-resolved

In order to add the service information about running vault agents to the Consul service catalog, we can add one line to the Vault configuration that tells Vault to register itself with Consul. Because every node in our setup has Consul running, it will register over localhost. With that in place, we can [configure an additional resolver in systemd-resolved](https://developer.hashicorp.com/consul/tutorials/networking/dns-forwarding#systemd-resolved-setup), which is the consul DNS server. From here on out, we can get the address of our vault servers by using a DNS lookup.

#### Consul gossip key rotation —  entering consul-template

Consul uses a gossip protocol to manage membership and broadcast messages to the cluster. ¹ It can also encrypt these messages with an encryption key, which can be configured in the configuration file. Whenever I encounter a secret in a configuration file, I want to find a solution so that the plaintext there is not valid for a long time. Entering consul-template. With consul-template, we can query the Vault API, as well as the Consul API and Nomad API, to get secrets or other data from Key-Value stores or the service catalog and write this information, using a template, to a file. So we set up consul-template to listen for changes to the encryption key, which is saved in Vaults Key-Value store, fetch it on the consul servers, and install it via the Consul API. That way we can change the value stored in Vault whenever we want, and once consul-template picks it up, our Consul cluster will use a new encryption key for gossip messages.

> [1]: From [Consul docs](https://developer.hashicorp.com/consul/docs/architecture/gossip)

#### consul-template everywhere

This pattern will be used for all our secret configuration needs. The next secrets are the SSL certificates Consul uses for its HTTP API. Here we use consul-template in almost the same way; the difference is that we can use Vaults [PKI secret engine](https://developer.hashicorp.com/vault/docs/secrets/pki) (Public Key Infrastructure), which handles our self-signed SSL certificates and their authority for us. Whenever an agent certificate is close to expiration, consul-template will request a fresh one and configure it on the nodes. We can also revoke a specific certificate manually, and consul-template will renew the certificates for us.

The configuration of our Nomad cluster will be very similar to this one. We will use consul-template whenever we can and use the built-in secret engines of Vault. Nomad will also use Vault as a means of getting secrets into our services that run on it, but more on that next time.

_Maximilian Temeschinko_

---

### Shameless Ads:

Check out [peoplesmarkets.com](https://peoplesmarkets.com)! And the [repositories](https://github.com/peoplesmarkets)! Have a good one : )

![peoplesmarkets.com website logo icon](/content/FooterLogoAndPreviewImage.png)

**peoplesmarkets.com website logo icon**
