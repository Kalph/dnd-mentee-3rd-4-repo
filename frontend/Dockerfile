FROM node:13 as builder

ARG PACKAGE_PRODUCTION=--production=true

WORKDIR /reactproject
COPY package.json yarn.lock /reactproject/
RUN echo "PACKAGE_PRODUCTION: yarn install ${PACKAGE_PRODUCTION}"
RUN yarn install ${PACKAGE_PRODUCTION}

COPY ./src /reactproject/src
COPY ./public /reactproject/public
# COPY ./config-overrides.js ./jsconfig.json /reactproject/

ARG REACT_APP_API_HOST="http://localhost:8000"
RUN echo "REACT_APP_API_HOST: ${REACT_APP_API_HOST}" && \
    REACT_APP_API_HOST=${REACT_APP_API_HOST} yarn build

FROM nginx:1.19-alpine

COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /reactproject/build /usr/share/nginx/html

EXPOSE 80

CMD nginx -g 'daemon off;'
