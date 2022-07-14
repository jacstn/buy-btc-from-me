FROM node:16.16.0
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
RUN npm run build
EXPOSE 3333
RUN ls -all
CMD ["npm", "start"]