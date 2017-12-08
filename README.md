# Crypto Dashboard Single Page Application

> This is an open source project for managing your cryptocurrency portfolio.

## Components
This project has 2 parts:
1. [Self-hosted API Server](https://github.com/JBaczuk/crypto-dashboard)
2. Single Page Dashboard Application (this repo)

## Run---

```bash
# clone the project
git clone https://github.com/JBaczuk/crypto-dashboard-spa
# Install http-server module
npm install http-server -g
cd dist
http-server -p 8001
```

### API Server
See instructions at [Self-hosted API Server](https://github.com/JBaczuk/crypto-dashboard)

## Development

### Set Up
(same as above)  

```bash
# Start development live-reload server
npm run dev
```

## Release
### v1.0.0
- Dashboard using vue.js
- Calculate profit
> In progress
- Price Charts

## Future
- Add history of deposits and withdrawals
- Chart trade and price history
- Add trade ability
- Add bot dashboard
- create docker containers

## Development
- Please submit pull requests to the dev branch.
- This repository has a pre-commit script that will check for api keys and prevent that from being submitted, to protect your account.  To enable it, you must run:

`ln -s ../../pre-commit.sh .git/hooks/pre-commit`

## Thanks to:
- [Vue](https://github.com/vuejs/vue)

## License
-------

[MIT](https://github.com/JBaczuk/crypto-dashboard/blob/master/LICENSE)
