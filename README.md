# Snippie API

A simple REST API for storing text snippets by a key.


## NixOps

Updates npm dependencies with
```sh
$ npm run update
```

### Development (mounted vboxsf)

```sh
$ npm run create-dev
$ npm deploy create-dev
```

You need to configure virtualbox manually!

### Staging (production deployment in vbox)

```sh
$ npm run create-staging
$ npm deploy create-staging
```

You need to configure virtualbox manually!

### Production

```sh
$ npm run create-production
$ npm deploy create-production
```

You need to configure the ssh connection (hostname: `app.snippie`) manually!
