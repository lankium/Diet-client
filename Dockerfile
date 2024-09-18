FROM node
LABEL name="diet-client"
LABEL version="1.0"
COPY ./dist /usr/share/nginx/html
COPY ./Diet-client.conf /etc/nginx/conf.d
EXPOSE 80