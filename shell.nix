with import <nixpkgs> { };

stdenv.mkDerivation {
  name = "snippie-api";

  buildInputs = [
    git-crypt
    nodePackages.node2nix
    nodejs-6_x
  ];
}
