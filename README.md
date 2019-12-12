# pianobot-api

## Getting ready

```bash
nvm use
npm i
export ACCESS_KEY=abc
export SECRET_KEY=xyz
```

## Running Locally

```bash
sam build
sam local start-api
curl localhost:3000/load/someuserhash
curl -X POST localhost:3000/save/someuserhash --data "yoman"
```

## Deploying to Prod

```bash
sam build
sam deploy --guided
```

## Running Tests

```bash
npm run test
```
