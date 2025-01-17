{
  description = "A Nix-flake-based Node.js development environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, flake-utils, nixpkgs }:
    flake-utils.lib.eachDefaultSystem (system:
      let pkgs = nixpkgs.legacyPackages.${system};
      in {
        packages = rec {
          doppel = pkgs.stdenv.mkDerivation rec {
            pname = "doppel";
            version = "product";
            src = ./.;
            nativeBuildInputs = with pkgs; [
              nodejs
              pnpm.configHook
            ];
            pnpmDeps = pkgs.pnpm.fetchDeps {
              inherit pname version src;
              hash = "sha256-sTM57s9d72JMQlw3LaUrzbLnIHFrtioicNMuPzBiPr0=";
            };
            installPhase = ''
              pnpm run build
              cp -r .output/public $out
            '';
          };

          default = doppel;
        };
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs
            nodePackages.pnpm
          ];
          shellHook = ''
              mkdir -p $TMPDIR/bin
              corepack enable --install-directory=$TMPDIR/bin
              export PATH=$TMPDIR/bin:$PATH
            '';
        };
      }
    );
}
