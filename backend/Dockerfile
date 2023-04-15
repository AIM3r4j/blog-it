FROM node:18.14.0 as development
COPY . /app
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .

FROM node:18.14.0 as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
COPY . /app
WORKDIR /app
COPY package*.json .
RUN npm ci --omit=dev

COPY --from=development ./app/dist ./dist
CMD ["npm", "start"]