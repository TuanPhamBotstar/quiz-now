# FROM node:latest
# WORKDIR /app

# COPY . .
# RUN npm install
# RUN node_modules/.bin/ng build --prod
# CMD ["npm", "start" ]
# RUN npm run build --prod

# FROM nginx:alpine
# COPY --from=node /app/dist/my-app /usr/share/nginx/html

# FROM node:latest
# WORKDIR /app
# COPY . .
# RUN npm install 
# EXPOSE 4200
# HEALTHCHECK --interval=2m --timeout=5s --start-period=2m \
#   CMD nc -z -w5 127.0.0.1 5080 || exit 1
# CMD echo "Warming up" && sleep 5 && npm start

FROM node:latest

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app/

RUN npm install
COPY . /app/

EXPOSE 4200

CMD ["npm", "start"]