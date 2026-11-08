# 이야온 어드민

iyaon-site 관리자 페이지 (Next.js, 민트 테마).

## 기능
- **로그인**: 비밀번호(`ADMIN_PASSWORD`) 기반, 서명된 쿠키 세션 12시간
- **대시보드**: 게시글/공개/미처리 문의/활성 회원 통계, 최근 내역
- **게시글/공지**: 작성·수정·삭제, 공개/비공개, 상단 고정, 분류 필터
- **문의/예약**: 유형·상태 필터, 상태 변경(접수→처리중→완료), 관리자 메모, 삭제
- **회원 관리**: 검색, 추가, 권한(회원/관리자) 변경, 정지/활성화, 삭제

## 실행
```bash
npm install
cp .env.example .env.local   # ADMIN_PASSWORD 설정
npm run dev                  # http://localhost:3000/admin
```

## Vercel 배포
1. Vercel에서 이 저장소를 Import
2. Environment Variables에 `ADMIN_PASSWORD`, `SESSION_SECRET` 추가
3. **데이터 영구 저장**: Storage → Upstash Redis(KV) 연결 → `KV_REST_API_URL`, `KV_REST_API_TOKEN`이 자동 설정됩니다.
   설정하지 않으면 메모리 저장소로 동작하며 재배포·콜드스타트 시 데이터가 초기화됩니다.
