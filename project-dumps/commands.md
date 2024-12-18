# Commands
## NestJs
- npm install -g @nestjs/cli => this command is used to create a nestjs CLI in global.
- nest -v => Used to view the nest version.
- nest new project-name => creates new project. use . to create the project in the same location.
- nest g --help => displays all the schematics.
- nest g module module-name => creates a module and updates in the root module. 'g'  stand for generic 'module' is a schematic
- nest g controller controller-name --no-spec => creates a controller without specs.
- nest g service service-name --no-spec => creates a service without specs.
- "start:dev": "cross-env STAGE=dev nest start --watch" => 

## Yarn
- yarn run start:dev => start the project in watch mode.
- yarn test --watch => start the unit test in watch mode.
- env=value yarn run start:dev => start the project in watch mode. and add environment variables.
- yarn => install all the dependencies in the package.json file.
- yarn add package_name => add the package.
- yarn add -D package_name => add the package as a dev dependency.
- yarn remove package_name => remove the package.

## Docker
- docker => used to check the docker installation and commands
- docker version => displays the docker version
- docker info => displays the docker info
- docker ps => displays all the running containers.
- docker run --name name_of_the_container -p 8080:8080 -e environmental_variable_name=value -d postgres => creates a container (env may be like POSTGRES_PASSWORD=value)
- docker container ls => used to list down the containers in the docker
- docker container ls -a => checks stopped containers
- docker container stop name_of_the_container => used to stop the container
- docker container rm name_of_the_container => used to remove the container (stop the container before removing)
