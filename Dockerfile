FROM node as builder

WORKDIR /app

COPY ./frontend/ .

RUN npm install

RUN node node_modules/@angular/cli/bin/ng build --prod

FROM staticfloat/nginx-certbot

COPY --from=builder /app/dist/frontend /usr/share/nginx/html

COPY ./conf.d /etc/nginx/conf.d/

COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443





	
