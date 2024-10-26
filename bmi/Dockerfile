FROM node:20-alpine

WORKDIR /usr/src/app

COPY --chown=node . .

RUN ["npm","ci","--verbose"]

USER node

EXPOSE 5173

CMD ["npm","run","start"]
