export {
  createSupabaseAdminClient,
  createSupabaseClient,
  getSupabase,
  supabase,
  type TypedSupabaseClient,
} from "./client";

export type {
  BlogPost,
  Database,
  EmailSubscriber,
  Enums,
  Event,
  Expense,
  ExpenseCategory,
  ExpenseTotals,
  GivingFrequency,
  GivingFund,
  GivingRecord,
  GivingTotals,
  Json,
  Member,
  MemberWithProfile,
  NotificationPrefs,
  PrayerRequest,
  PrayerStatus,
  Profile,
  Rsvp,
  Sermon,
  SermonSeries,
  SermonWithSeries,
  SmallGroup,
  SubscriberSegment,
  Tables,
  TablesInsert,
  TablesUpdate,
  Translation,
  TranslationLanguage,
  TranslationStatus,
  TranscriptStatus,
  UserRole,
} from "./types";

export {
  getSermons,
  getSermonBySlug,
  getSermonsBySeries,
} from "./queries/sermons";

export {
  submitPrayer,
  getPrayers,
  updatePrayer,
  type GetPrayersOptions,
  type SubmitPrayerInput,
  type UpdatePrayerInput,
} from "./queries/prayers";

export {
  getEvents,
  getEventById,
  createRsvp,
  type CreateRsvpInput,
  type GetEventsOptions,
} from "./queries/events";

export {
  getProfile,
  updateProfile,
  getMemberRecord,
} from "./queries/members";

export {
  getGivingHistory,
  getGivingTotals,
  syncZeffyRecord,
  type GetGivingHistoryOptions,
  type SyncZeffyRecordInput,
} from "./queries/giving";

export {
  getExpenses,
  createExpense,
  getExpenseTotals,
  type GetExpensesOptions,
} from "./queries/expenses";

export {
  getBlogPosts,
  getBlogPostBySlug,
  type BlogPostWithAuthor,
} from "./queries/blog";

export { subscribeEmail, type SubscribeInput } from "./queries/subscribers";

export { getActiveSmallGroups } from "./queries/smallGroups";

export { getAllMembers, getDirectoryProfiles } from "./queries/staff";

export {
  getNotificationPrefs,
  upsertNotificationPrefs,
} from "./queries/notifications";

export {
  createEvent,
  updateEvent,
  deleteEvent,
  getRsvpsForEvent,
} from "./queries/eventsAdmin";

export {
  getAllBlogPostsForStaff,
  setBlogEmailSent,
  unpublishBlogPost,
} from "./queries/blogAdmin";

export { getAllGivingForYear, createGivingAdminClient } from "./queries/givingAdmin";
