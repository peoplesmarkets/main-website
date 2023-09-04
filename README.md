# Main website for peoplesmarekts.com

## Prerequesites

### Update submodule with gRPC definitions

Ensure `service-apis` git submodule is initialized. If not yet done run:

```sh
git submodule update --init
```

If `service-apis` git submodule was already initialized, ensure to pull the newest changes:

```sh
git submodule update --remote
```

### Install NPM dependencies

```sh
npm install
```

### Generate clients

```sh
npm run gen
```

## Run

Ensure environment variables are set in .env file

```
VITE_BASE_URL='http://localhost:8000'
VITE_SERIVCE_APIS_URL='https://api-dev.peoplesmarkets.com'
VITE_AUTH_OAUTH_URL='https://auth-dev.peoplesmarkets.com'
VITE_AUTH_OAUTH_CLIENT_ID='227388213923233803@main'
VITE_AUTH_OAUTH_ORG_ID='227375460168777737'
VITE_AUTH_OAUTH_LOGOUT_REDIRECT_URL='http://localhost:8000'
VITE_OPEN_SOURCE_REPOSITORIES_URL='https://github.com/peoplesmarkets'
VITE_MAIN_WEBSITE_URL='https://dev.peoplesmarkets.com'
VITE_IMAGE_MAX_SIZE='512000'
```

Then run:

```sh
npm run dev
```
