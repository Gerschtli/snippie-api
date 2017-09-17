# Snippie API

A simple REST API for storing text snippets by a key.

## NPM

Updates npm dependencies with
```sh
$ npm run update
```

## Deployments

### Development (mounted vboxsf)

```sh
$ npm run create-dev
$ npm run deploy-dev
```

You need to configure virtualbox manually!

### Staging (production deployment in vbox)

```sh
$ npm run create-staging
$ npm run deploy-staging
```

You need to configure virtualbox manually!

### Production

```sh
$ npm run create-prod
$ npm run deploy-prod
```

You need to configure the ssh connection (hostname: `app.snippie`) manually!
