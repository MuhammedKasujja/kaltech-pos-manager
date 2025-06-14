export type SyncMode = "create" | "update" | "delete";

export type AccountPlanFree = "free";
export type AccountPlanPro = "pro";
export type AccountPlanEnterprise = "enterprise";
export type AccountPlanWhileLable = "white_label";

export const AccountPlan = {
  free: "free",
  pro: "pro",
  enterprise: "enterprise",
  whiteLabel: "white_label",
} as const;
