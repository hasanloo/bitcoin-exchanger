### Instruction

A simple applicatin that constantly checks the currency exchange rate from Bitcoin to different currencies using [this API](https://blockchain.info/ticker) and store it in [Timescaldb](https://github.com/timescale/timescaledb).
It provide an endpoint to get the latest rate of the currency and another endpoint to return rates in a time range.

### Installation / Setup

For dev environments, it is recommended to use docker-compose, that references to a Timescaledb image, without requiring to install or use any existing database, leaving remaining to docker.

Copy `.env.sample` to `.env` and run `make up` to set up and run the application with all its dependencies.

`make down` would kill docker containers for the application.

`INTERVAL` value that is set in `.env` is base on minutes, to configure for any other value, set it in `.env` or set enviroment variable in docker-compose.yaml file.


### Endpoints

- Get latest bitcoin rate of USD ( you can replace USD with any currency )

`curl "http://localhost:3000/latest/USD"`

- Get bitcoin rate of USD ( you can replace USD with any currency ) in a range

`curl "http://localhost:3000/range/USD?from=2019-03-24T07:21:00.000Z&to=2019-03-24T07:29:00.000Z"`


### Why Timescaledb

In this application we try to store sequence of data points, measuring the same thing over time, stored in time order. For this purpose we can still use normal database, but using a time series database can give better results in terms of scalability and usablity. For details benefits of using Timescaledb with time series data please refer to [this link](https://blog.timescale.com/what-the-heck-is-time-series-data-and-why-do-i-need-a-time-series-database-dcf3b1b18563/).
