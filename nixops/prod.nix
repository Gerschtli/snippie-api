let
  app = import ./app.nix;
in

{
  network = { inherit (app) description; };

  snippie-api =
    { lib, pkgs, ... }:
    lib.mkMerge [
      {
        deployment = {
          targetEnv = "container";
          container.host = "app.snippie";
        };
      }

      (app.snippie-api { inherit pkgs; })
    ];
}
