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

export interface CognitoUserSummary {
  id: string;
  username: string;
  employeeId: string;
  displayName: string;
  email?: string;
  role: "employee" | "manager" | "hr";
  groups: string[];
}
