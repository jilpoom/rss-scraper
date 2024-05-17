# Nest-Fake-API BoilerPlate

[Nest.js Documentation](https://docs.nestjs.com/recipes/prisma)을 참고하여, 구성한 nest.js 보일러 플레이트

## 개발 환경

### 프레임워크

- Nest.js

### 데이터베이스

- SQLite

### ORM

- Prisma

## 프로젝트 실행을 위한 절차

1. nest-fake-api의 `master` 브랜치를 로컬 PC에 복사하세요.

```shell
> git clone https://github.com/jilpoom/nest-fake-api.git
```

2. `Prisma`와 `Nest.js`는 `dotenv` 패키지를 지원합니다. 루트 디렉토리에 `.env` 파일을 생성하여 다음을 입력한 후, 원하는 값으로 변경하여 사용하세요.

```shell
DEV_DATABASE_URL="file:./dev.db"
JWT_SECRET_KEY="nest-fake-api-secret-keys"
BCRYPT_SALT_ROUNDS="10"
ENV="dev"
```

> `SQLite`는 임베디드 DB로, 위의 데이터베이스 경로(`DEV_DATABASE_URL`) 값 외에 추가적인 메타 데이터가 필요하지 않습니다.

3. `package.json`에 정의된 종속성을 설치합니다.

```shell
> npm i
```

4. `/prisma/schema.prisma`에 정의된 데이터베이스 스키마를 생성하세요.

```shell
> npm run migrate:prisma init
```

5. 이후, 다음 명령을 이용해, 유닛 테스트를 진행하세요.

```shell
# 테스트 실행
> npm run test

# 테스트 커버리지 문서화
> npm run test:cov
```

> 현재 유닛 테스트만 작성되어 있으며, 추후 통합 테스트를 작성할 예정입니다.

6. 다음의 명령어를 통해, 프로젝트를 실행하세요

```shell
> npm run start:dev
```

7. 다음 주소를 통해 Swagger UI에 접근할 수 있습니다.

```shell
http://localhost:3000/api
```

## 프로젝트 주요 변경점

| No. | 변경사항                                  | 날짜         | 브랜치              | 
|-----|---------------------------------------|------------|------------------|
| 1   | Swagger UI 추가                         | 2024-05-08 | master           |
| 2   | Prettier, Eslint 설정 변경                | 2024-05-08 | master           |
| 3   | Prisma Migrate Scripts 작성             | 2024-05-08 | master           |
| 4   | `src` 디렉토리 구조 변경                      | 2024-05-08 | master           |
| 5   | `posts`, `users` 모듈화 및 Swagger 태깅     | 2024-05-09 | master           |
| 6   | `PostController` 테스트 코드 작성            | 2024-05-09 | master           |
| 7   | `auth` 모듈 생성                          | 2024-05-10 | feature/auth     |
| 8   | JWT Access Token 부여                   | 2024-05-10 | feature/auth     |
| 9   | user 비밀번호 단방향 암호화                     | 2024-05-10 | feature/bcrypto  |
| 10  | cors, helmet, morgan 적용               | 2024-05-10 | feature/cors     |
| 11  | UserController 테스트 코드 작성              | 2024-05-14 | feature/user     |
| 12  | 테스트 파일 `modules/__test__/` 디렉토리 하위 종속 | 2024-05-14 | architect/test   |
| 13  | `PostService` 테스트 코드 작성               | 2024-05-14 | feature/post     |
| 14  | `AppModule`, `AppService` 테스트 코드 작성   | 2024-05-14 | feature/app      |
| 15  | `UserService` 테스트 코드 작성               | 2024-05-16 | feature/user     |
| 16  | `class-validator` Request DTO 유효성 검사  | 2024-05-16 | feature/validate |
| 17  | `User`, `Post` 모델에 `create_at` 칼럼 추가  | 2024-05-16 | feature/domain   |
| 18  | `README.md`에 프로젝트 사용방법 최신화            | 2024-05-17 | docs/readme      |