# Snippie API

A simple REST API for storing text snippets by a key.

## NPM

Updates npm dependencies with
```sh
$ npm run update
```

## NixOps

For `deployment` in (`dev`, `staging`, `prod`) use `nixops/manage`.

For example:
```sh
$ nixops/manage dev create "<nixops/dev.nix>"
$ nixops/manage dev deploy
```

### dev (mounted vboxsf)

You need to configure virtualbox manually!

### staging (production deployment in vbox)

You need to configure virtualbox manually!

### prod

You need to configure the ssh connection (hostname: `app.snippie`) manually!
