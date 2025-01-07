# Tools
A various toolkit created for niche uses.

## Development
1. Each project should live in its own `www/<project>/` directory.
1. The can contain a `run` script to compile or build the project, which should be built to `dist/<project>/`.
1. If no `run` script is found, all files are simply copied to `dist/<project>/`.
1. Everything under the `dist/` directory is published online.