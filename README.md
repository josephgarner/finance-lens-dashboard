# Planter Dashboard

Node based irrigaction dashboard monitor application.

The Planter Dashbaord is the frontend compnent to display the data and statistics retrieved from the Plant Irrigation Service.

#### Current MVP features

1. Clickable summary for each plantr node
2. Detailed breakdown view
3. Battery and moisture percentages
4. Moisture history graph.
5. Irrigate and stop irrigate buttons.
6. Show command history table.

#### Technology

- Node
- Socket.io
- Vite
- Typscript
- Docker

## Installation and Running

#### Install Yarn

```
npm install --global yarn
```

After cloaning this repo navigate to the folder and proceed with the following

#### Enviroment File Schema

```
NODE_ENV=
VITE_WEBSOCKET_ADDRESS=
VITE_WEBSOCKET_PORT=
```

#### Install dependacies

```
yarn
or
yarn install
```

#### Local Development

```
yarn dev
```

#### Deploy to docker compose

```
docker-compose build

docker-compose up -d
```

## Why?

- I wanted to grow fruit and veg at home. As other people will be interacting with this system the UI needs to be user friendly not just dev friendly.

- All Data is stored on a local server and data owership is held by the user.

- Practice and learning
