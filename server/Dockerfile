# Used when running in Docker: docker compose --profile app up
# Default workflow: run locally with npm run start:dev
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3001
CMD ["npm", "run", "start:dev"]
