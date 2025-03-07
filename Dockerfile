FROM node:22.14.0

USER node

WORKDIR /home/node/app

COPY . ./

EXPOSE 3000

CMD ["tail", "-f", "/dev/null"]