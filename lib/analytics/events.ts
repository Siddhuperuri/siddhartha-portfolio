export const analyticsEvents = {
  caseStudyDepth: "case_study_depth",
  contactInitiated: "contact_initiated",
  externalProfileOpened: "external_profile_opened",
  projectOpened: "project_opened",
  resumeDownloaded: "resume_downloaded",
} as const;

export type AnalyticsEventName =
  (typeof analyticsEvents)[keyof typeof analyticsEvents];
