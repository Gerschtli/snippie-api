rec {
  description = "snippie-api";

  uid = 1100;

  snippie-api =
    { pkgs, appDir ? null, mockInfrastructure ? false, nodeEnv ? "prod", ... }:
    let
      nodejs = pkgs.nodejs-6_x;
      package = (import ../default.nix { inherit pkgs nodejs; }).package;
      root = if (appDir != null) then appDir else "${package}/lib/node_modules/snippie-api";
    in
    {
      networking.firewall = {
        enable = true;
        allowedTCPPorts = [ 8080 ];
      };

      services.redis = pkgs.lib.mkIf mockInfrastructure {
        enable = true;
        requirePass = "test";
      };

      systemd.services.snippie-api = {
        description = "Snippie API application";
        after = [ "network.target" ];
        wantedBy = [ "multi-user.target" ];
        environment = { PORT = "8080"; NODE_ENV = nodeEnv; };
        path = [ pkgs.bash ];
        serviceConfig = {
          ExecStart = "${nodejs}/bin/npm run start --prefix ${root}";
          User = "snippie";
          Restart = "always";
        };
      };

      users = {
        groups.snippie.gid = uid;

        users.snippie = {
          inherit uid;
          group = "snippie";
        };
      };
    };
}
