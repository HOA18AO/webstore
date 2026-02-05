# Used when running in Docker: docker compose --profile app up
# Default workflow: run locally with npm run dev
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
