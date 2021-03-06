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
          targetEnv = "virtualbox";

          virtualbox = {
            memorySize = 1024;
            headless = true;
          };
        };
      }

      (app.snippie-api {
        inherit pkgs;
        mockInfrastructure = true;
        nodeEnv = "dev";
      })
    ];
}
