export interface Review {
  id: string;
  employee: string;
  selfScore: number;
  peerScore: number;
  managerScore: number;
}

export interface SelfReviewPayload {
  employeeId: string;
  achievements: string;
  strengths: string;
  improvements: string;
  rating: number;
}