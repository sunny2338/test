import type { Inquiry, Member, Post } from "./types";

const now = new Date();
const daysAgo = (d: number) => new Date(now.getTime() - d * 86400000).toISOString();

export const seed: { posts: Post[]; inquiries: Inquiry[]; members: Member[] } = {
  posts: [
    {
      id: "p1",
      title: "홈페이지 리뉴얼 안내",
      content: "새로운 민트 테마로 홈페이지가 새단장했습니다.",
      category: "공지",
      pinned: true,
      published: true,
      createdAt: daysAgo(3),
      updatedAt: daysAgo(3),
    },
    {
      id: "p2",
      title: "첫 번째 게시글",
      content: "어드민에서 게시글을 작성·수정·삭제할 수 있습니다.",
      category: "게시글",
      pinned: false,
      published: false,
      createdAt: daysAgo(1),
      updatedAt: daysAgo(1),
    },
  ],
  inquiries: [
    {
      id: "i1",
      type: "예약",
      name: "홍길동",
      contact: "010-1234-5678",
      message: "다음 주 상담 예약 원합니다.",
      reservedAt: daysAgo(-5).slice(0, 16),
      status: "접수",
      memo: "",
      createdAt: daysAgo(0),
    },
    {
      id: "i2",
      type: "문의",
      name: "김민지",
      contact: "minji@example.com",
      message: "가격 안내 부탁드립니다.",
      status: "처리중",
      memo: "견적 메일 발송 예정",
      createdAt: daysAgo(2),
    },
  ],
  members: [
    {
      id: "m1",
      name: "관리자",
      email: "admin@example.com",
      phone: "",
      role: "관리자",
      active: true,
      createdAt: daysAgo(30),
    },
    {
      id: "m2",
      name: "이서준",
      email: "seojun@example.com",
      phone: "010-9876-5432",
      role: "회원",
      active: true,
      createdAt: daysAgo(7),
    },
  ],
};
