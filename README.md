# dnd 3기 4조

<br>

- [4조 notion](https://www.notion.so/dnd3rdteam4)<br>
- [4조 Wiki](https://github.com/dnd-mentee-3rd/dnd-mentee-3rd-4-docs/wiki/1.-DND-4%EC%A1%B0)<br>

가상환경을 만들어 놓았습니다 개발 진행전에 가상환경에 접속해주세요<br>
django-react-venv\Scripts\activate

## 개발환경 올리기

docker-compose를 활용하여, 하나의 명령으로 손쉽게 개발환경을 올릴 수 있습니다.

```sh
docker-compose -f docker-compose.dev.yml up -d
```

다음 주소로 각 개발서버에 접근할 수 있습니다.

- http://localhost:8000 : 장고 개발서버
- http://localhost:3000 : 리액트 개발서버

## 배포하기

`docker-compose.prod.yml`을 통해 docker-compose 혹은 docker swarm에 배포할 수 있습니다.

아래 명령 수행 전에 관련 환경변수를 필히 참조토록 해주세요.

1. `docker-compose.prod.env` 설정파일
2. docker swarm의 config 혹은 secret 활용

```sh
# docker-compose의 경우
docker-compose -f docker-compose.prod.yml up -d

# docker swarm의 경우
docker stack deploy -c docker-compose.prod.yml 서비스명
```
