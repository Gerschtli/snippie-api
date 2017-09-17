let
  app = import ./app.nix;
  appDir = "/var/www/snippie-api";
in

{
  network.description = app.description;

  snippie-api =
    { lib, pkgs, ... }:
    lib.mkMerge [
      {
        deployment = {
          targetEnv = "virtualbox";

          virtualbox = {
            memorySize = 1024;
            headless = true;

            sharedFolders = {
              snippie-api = {
                hostPath = "/home/tobias/projects/snippie-api";
                readOnly = false;
              };
            };
          };
        };

        fileSystems.${appDir} = {
          device = "snippie-api";
          fsType = "vboxsf";
          options = [ "uid=1100" "gid=1100" ];
        };

        virtualisation.virtualbox.guest.enable = true;
      }

      (app.snippie-api { inherit pkgs appDir; })
    ];
}
