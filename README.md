# OAO Clients app

## Description

A react-based web-application for clients of the OAO project.

## Setup env vars

copy example enb and change it's contents.

```bash
cp example.env .env
```

## Running the app in development mode

### With Docker

You need to install [docker](https://docs.docker.com/), then you can start the app with:

```bash
$ docker compose up
```

### Without Docker

You need to install [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating), then run:

```bash
$ nvm use
```

Install dependencies:

```bash
$ yarn
```

Then run up the app in `dev` mode:

```bash
$ yarn dev
```

## Production Build

### With Docker

Build the image:

```bash
$ docker build --build-arg="VITE_API_URL=<VITE_API_URL>" --build-arg="VITE_LLM_API_URL=<VITE_LLM_API_URL>" -t oao_clients_app .
```

Run it on any port you want:

```bash
$ docker run -p <any_port>:3000 oao_clients_app
```

### Without Docker

Build and serve the app on `localhost:3000`:

```bash
$ yarn build
```

For testing locally:

```bash
$ yarn preview
```

For serving as a service:

```bash
$ yarn global add pm2 serve
$ pm2 start ecosystem.config.cjs
```
