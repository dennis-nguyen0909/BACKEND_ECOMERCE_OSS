FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 8080

CMD ["npm", "start"]

# docker build -t backend-ecomerce-oss .
# docker login
# docker build -t minhduyyy/backend-ecomerce-oss_v1:tag .
# docker images
# docker push minhduyyy/backend-ecomerce-oss_v1:tag

#docker pull minhduyyy/backend-ecomerce-oss_v1:tag



# docker run -p 8080:8080 minhduyyy/backend-ecomerce-oss_v1:tag



