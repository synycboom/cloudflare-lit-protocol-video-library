### Project name
- Video Library

### Person of contact
- Discord ID: synycboom#0624
- UnstoppableDomain registered account email address: synycboom@gmail.com

# Cloudflare + Lit Protocol + Login with Unstoppable integration
This is a demo website for Cloudflare + Lit Protocol + Login with Unstoppable integration. This is a simple video library website where everyone can upload videos.
In order to watch the videos, users need to request presigned urls from the API, but not all users can request them.  
The presigned urls are limited to those who have authorization (using Lit Protocol dynamic content).

The API part of this project is https://github.com/synycboom/cloudflare-lit-video-api
  
### DEMO
- https://cloudflare-lit-video-library.synycboom.workers.dev

### Cloudflare + Lit Protocol Video Demo
- TODO

### Unstoppabledomains Login Video Demo
- TODO

## To run this project 
1. Create .env.development file (see .env.example)
2. Set unstoppabledomains credentials in .env.development
2. Make sure that you have run the API (https://github.com/synycboom/cloudflare-lit-video-api)
```
npm ci
npm run start
```

## To deploy this project
This project has to be deployed to Cloudflare using wrangler. Make sure that wrangler cli has been installed.
1. Create .env.production file (see .env.example)
2. Set unstoppabledomains credentials in .env.development
```
npm i @cloudflare/wrangler -g
```

```
npm run build
wrangler publish
```