with import <nixpkgs> { };

let
  name = "snippie";
in

stdenv.mkDerivation {
  name = "${name}-shell";
  NIX_SHELL = name;

  buildInputs = [
    git-crypt
    nixops
    nodePackages.node2nix
    nodejs-6_x
  ];

  shellHook = ''
    export NIX_PATH="$NIX_PATH:."
  '';
}
