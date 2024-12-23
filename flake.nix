{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    prisma-6.url = "github:NixOS/nixpkgs/4f0dadbf38ee4cf4cc38cbc232b7708fddf965bc";
    systems.url = "github:nix-systems/default";
    devenv.url = "github:cachix/devenv";
    devenv.inputs.nixpkgs.follows = "nixpkgs";
  };

  nixConfig = {
    extra-trusted-public-keys = "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };

  outputs = {
    self,
    nixpkgs,
    prisma-6,
    devenv,
    systems,
    ...
  } @ inputs: let
    forEachSystem = nixpkgs.lib.genAttrs (import systems);
  in {
    packages = forEachSystem (system: {
      devenv-up = self.devShells.${system}.default.config.procfileScript;
      devenv-test = self.devShells.${system}.default.config.test;
    });

    devShells =
      forEachSystem
      (system: let
        pkgs = nixpkgs.legacyPackages.${system};
        prisma-engines = prisma-6.legacyPackages.${system}.prisma-engines;
      in {
        default = devenv.lib.mkShell {
          inherit inputs pkgs;
          modules = [
            {
              languages.javascript.enable = true;
              languages.typescript.enable = true;
              languages.javascript.pnpm.enable = true;

              packages = [prisma-engines];
              enterShell = ''
                export PRISMA_MIGRATION_ENGINE_BINARY="${prisma-engines}/bin/migration-engine"
                export PRISMA_SCHEMA_ENGINE_BINARY="${prisma-engines}/bin/schema-engine"
                export PRISMA_QUERY_ENGINE_BINARY="${prisma-engines}/bin/query-engine"
                export PRISMA_QUERY_ENGINE_LIBRARY="${prisma-engines}/lib/libquery_engine.node"
                export PRISMA_INTROSPECTION_ENGINE_BINARY="${prisma-engines}/bin/introspection-engine"
                export PRISMA_FMT_BINARY="${prisma-engines}/bin/prisma-fmt"
                export PATH="$PWD/node_modules/.bin:$PATH"
              '';
            }
          ];
        };
      });
  };
}
