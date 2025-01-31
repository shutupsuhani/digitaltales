// schema.tsx
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const Blogs = pgTable('Blogs', {
  id: serial('id').primaryKey(),
  title: varchar('title').notNull(),
  content: text('content').notNull(),
  createdBy: varchar('createdBy').notNull(),  // This should store `userId` now, not email
  createdAt: varchar('createdAt'),
});
