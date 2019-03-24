### Installation / Setup

- For dev environments, it is recommended to use docker-compose, that references to a Timescaledb image, without requiring to install or use any existing database, leaving to docker to resolve this:
`make up` sets up both order and payment services on port 3001 and 3000
`make down` would kill docker containers for both services

### Endpoints
