
        FROM node:lts-alpine as build
        WORKDIR /usr/local/app
        COPY ./ /usr/local/app
        RUN npm install

        # port on which you app is running
        EXPOSE 5500

        # your typescript app entry file
        CMD ["node", "dist/app.js"]