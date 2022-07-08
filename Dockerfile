FROM node:15
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
RUN npm run build
EXPOSE $PORT
RUN ls -all
CMD ["npm", "start"]