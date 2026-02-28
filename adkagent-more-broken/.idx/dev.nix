# Development environment configuration using Nix
# Used for local workspace setup (not production CI)

{ pkgs }: {
  # Use stable nixpkgs channel
  channel = "stable-24.11";

  # Required development packages
  packages = [
    pkgs.nodejs_20
    pkgs.nodePackages.npm
    pkgs.zulu
  ];

  # Environment variables
  env = {};

  # Firebase emulator configuration (disabled for production)
  services.firebase.emulators = {
    detect = false;
    projectId = "demo-app";
    services = [ "auth" "firestore" ];
  };

  idx = {
    extensions = [];

    workspace = {
      onCreate = {
        default.openFiles = [
          "src/app/page.tsx"
        ];
      };
    };

    previews = {
      enable = true;
      previews = {
        web = {
          command = [
            "npm" "run" "dev" "--"
            "--port" "$PORT"
            "--hostname" "0.0.0.0"
          ];
          manager = "web";
        };
      };
    };
  };
}