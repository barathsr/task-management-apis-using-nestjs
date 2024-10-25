> # Task management APIs using NestJs

## 1. Application structure - AppModule(root)
- TasksModule 
- AuthMoudule

### TaskModule
- TaskController
- TaskService
- StatusValidationPipe
- TaskEntity
- TaskRepository
- ...

### AuthModule
- AuthController
- AuthService
- UserEntity
- UserRepository
- JwtStrategy
- ...

## 2. APIs 

### API Endpoints - Tasks
| Endpoints   | Method      | Description   |
| :---        |    :----:   |          ---: |
| tasks/      | GET       | Get all tasks(incl. filters)|
| tasks/:id/  | GET        | Get a task      |
| tasks/      | POST       | Create a task   |
| tasks/:id/  | DELETE        | Delete a task|
| tasks/:id/status| PATCH      | Update task status|

### API Endpoints - Auth
| Endpoints   | Method      | Description   |
| :---        |    :----:   |          ---: |
| auth/signup/ | POST       | User sign up|
| auth/signin/ |   POST      | User sign in      |
| auth/:id/ |   POST      | User logout      |
| auth/:id/      |   PATCH     | Edit user   |
| auth/:id/  | DELETE        | Delete user|


## 3. Objectives:
### Back-end & Architecture
- Develop production-ready REST APIs
- CRUD operations( Create, Read, Update, Delete )
- Error handling
- Data Transfer Objects(DTO)
- System modularity
- Back-end development best practices
- Configuration management
- Logging
- Security best practices

### Persistence
- Connecting the application to a database
- Working  with relational database
- Using TypeORM
- Writing simple and complex queries using QueryBuilder
- Performance when working with a database

### Authorization/Authentication
- Signing up, Signing in, logging out
- Authentication and Authorization
- Protected resources
- Ownership of tasks by users
- Using JWT tokens (JSON Web Tokens)
- Password hashing, salts and properly storing password

### Deployment
- Polishing the application for production use
- Deploying NestJS apps to AWS(Amazon Web Services)
- Deploying front-end application to Amazon S3
- Writing up the front-end and back-end
-

### Front-end Application
- Fully-featured front-end application that consumes the API we are developing.

### 
-
-
-
-
-
