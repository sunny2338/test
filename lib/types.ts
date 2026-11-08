export type Post = {
  id: string;
  title: string;
  content: string;
  category: "공지" | "게시글";
  pinned: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type InquiryStatus = "접수" | "처리중" | "완료";

export type Inquiry = {
  id: string;
  type: "문의" | "예약";
  name: string;
  contact: string;
  message: string;
  reservedAt?: string;
  status: InquiryStatus;
  memo: string;
  createdAt: string;
};

export type MemberRole = "관리자" | "회원";

export type Member = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: MemberRole;
  active: boolean;
  createdAt: string;
};

export type Collections = {
  posts: Post;
  inquiries: Inquiry;
  members: Member;
};
