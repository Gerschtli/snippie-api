# Snippie API

A simple REST API for storing text snippets by a key.

## Docker Redis

```sh
$ docker run -p 6379:6379 --name redis-box -d redis
```

## NixOps

`package.json` to `nix` via
```sh
$ node2nix
```

### Development

```sh
$ nixops create -d snippie-dev server/app.nix server/dev.nix
$ nixops deploy -d snippie-dev
```

You need to configure virtualbox manually!

### Production

```sh
$ nixops create -d snippie-prod server/app.nix server/prod.nix
$ nixops deploy -d snippie-prod
```

You need to configure the ssh connection manually!
