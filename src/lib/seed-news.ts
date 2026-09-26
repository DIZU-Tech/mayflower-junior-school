// Always-present announcements from the school office. These appear on the
// News page and homepage alongside anything the admin publishes via /admin.
import type { NewsItem } from "./store";

export const seedNews: NewsItem[] = [
  {
    id: "seed-admissions-2026",
    kind: "news",
    title: "Admissions Open · Common Entrance Examination 2026/2027",
    summary:
      "Applications are now open for the Common Entrance Examination into Mayflower Junior School, Ikenne for the 2026/2027 academic session. " +
      "The examination is open to pupils entering JSS 1 and covers English Language, Mathematics, Quantitative and Verbal Reasoning, and General Studies. " +
      "Registration forms and full details (fees, examination date and required documents) are available from the school office. " +
      "Parents and guardians are warmly encouraged to apply early — places fill quickly. To request the registration pack or arrange a campus visit, please contact the school on mayflowerjnrschool.contact@gmail.com.",
    date: "Admissions in progress · 2026/2027 Session",
    createdAt: Date.now(),
  },
];
