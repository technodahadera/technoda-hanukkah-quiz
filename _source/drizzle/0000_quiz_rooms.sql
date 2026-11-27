CREATE TABLE quiz_rooms (
  code TEXT PRIMARY KEY NOT NULL,
  revision INTEGER NOT NULL,
  expires INTEGER NOT NULL,
  data TEXT NOT NULL
);
--> statement-breakpoint
CREATE INDEX quiz_room_expiry ON quiz_rooms(expires);
