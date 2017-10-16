let
  app = import ./app.nix;
in

{
  network = {
    description = app.description;
    enableRollback = true;
  };

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
