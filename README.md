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

## iyaon-site.vercel.app/admin 으로 접속하기
1. 이 저장소를 Vercel에 **별도 프로젝트**로 배포 (예: 프로젝트 이름 `iyaon-admin` → `https://iyaon-admin.vercel.app`)
2. 이 프로젝트 환경변수 추가 후 Redeploy
   - `ADMIN_PASSWORD`, `SESSION_SECRET`
   - `ASSET_PREFIX=https://iyaon-admin.vercel.app` (이 어드민 프로젝트의 실제 주소)
   - `ALLOWED_ORIGINS=iyaon-site.vercel.app` (기본값과 같음, 커스텀 도메인이 있으면 쉼표로 추가)
3. **iyaon-site 프로젝트** 루트의 `vercel.json`에 아래 rewrites 추가 후 배포 (`docs/iyaon-site-vercel.json` 참고)
```json
{
  "rewrites": [
    { "source": "/admin", "destination": "https://iyaon-admin.vercel.app/admin" },
    { "source": "/admin/:path*", "destination": "https://iyaon-admin.vercel.app/admin/:path*" }
  ]
}
```
이미 `vercel.json`이 있으면 `rewrites` 배열에 두 줄만 추가하세요. 도메인이 다르면 `iyaon-admin.vercel.app` 부분을 실제 주소로 바꾸세요.
