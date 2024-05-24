# Ko-RSS-Scraper

각종 한국 신문사의 RSS를 기반으로 원하는 카테고리의 뉴스 구독 서비스를 제공하는 Nest.js 기반 API

## 개발환경

### 프레임워크

Nest.js

### 데이터베이스

SQLite

### ORM

Prisma

## 프로젝트 주요 업데이트

| No. | 내용                                                                | 날짜         | 브랜치               | 비고 |
|-----|-------------------------------------------------------------------|------------|-------------------|----|
| 0   | [Nest-Fake-API](https://github.com/jilpoom/nest-fake-api) 프로젝트 복제 | 2024-05-19 | master            |    |  
| 1   | `Newspaper`, `RSS` 스키마 생성 및 CRUD 구현                               | 2024-05-20 | feature/scraper   |    |
| 2   | `NewspaperController` 테스트코드 작성                                    | 2024-05-21 | feature/scraper   |    |
| 3   | 매일경제, YTN, RSS 등록                                                 | 2024-05-21 | feature/scraper   |    |
| 4   | 카카오 메시지 전송 API 연동(나에게 보내기)                                        | 2024-05-22 | feature/kakao     |
| 5   | 카카오 뉴스 전송                                                         | 2024-05-22 | feature/kakao     |    |
| 6   | 구독(`Subscribe`) 모델 및 Controller, Service 구현                       | 2024-05-23 | feature/subscribe |    | 
| 7   | 카카오 OAuth 로그인 및 회원가입 구현 및 Access Token 발급                         | 2024-05-24 | feature/kakao     |    |