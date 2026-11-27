ALTER TABLE quiz_rooms ADD COLUMN replaced_by TEXT;
--> statement-breakpoint
CREATE TABLE quiz_players (
  code TEXT NOT NULL REFERENCES quiz_rooms(code) ON DELETE CASCADE,
  token TEXT NOT NULL,
  name TEXT NOT NULL,
  name_key TEXT NOT NULL,
  joined INTEGER NOT NULL,
  PRIMARY KEY (code, token),
  UNIQUE (code, name_key)
);
--> statement-breakpoint
CREATE TABLE quiz_answers (
  code TEXT NOT NULL,
  token TEXT NOT NULL,
  round INTEGER NOT NULL,
  choice INTEGER NOT NULL,
  points INTEGER NOT NULL,
  PRIMARY KEY (code, token, round),
  FOREIGN KEY (code, token) REFERENCES quiz_players(code, token) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE INDEX quiz_answers_round ON quiz_answers(code, round, choice);
