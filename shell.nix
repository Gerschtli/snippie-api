with import <nixpkgs> { };

let
  name = "snippie";
in

stdenv.mkDerivation {
  name = "${name}-shell";
  NIX_SHELL = name;

  buildInputs = [
    git-crypt
    nodePackages.node2nix
    nodejs-6_x
  ];
}
