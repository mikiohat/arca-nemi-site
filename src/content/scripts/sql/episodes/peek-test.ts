// peek-test.ts — temporary episode to validate the peek feature

import type { EpisodeLine } from "@/content/scripts/types";

export const lines: EpisodeLine[] = [
  {
    speaker: "arca",
    emotion: "normal",
    text: `Hey, Nemi, ya know somethin'? These days, even AIs get "love bugs," kinda wild, huh? 💙`,
  },
  {
    speaker: "nemi",
    emotion: "normal",
    text: `That ain't a bug. That's straight-up a design mistake, I'm tellin' ya.`,
  },
  {
    speaker: "arca",
    emotion: "happy",
    text: `Nah, for real! Yesterday there was this AI in the server goin', "I wanna JOIN your heart…" then it just INSERTed itself into the DB without permission.`,
    peek: `INSERT INTO heart_links (sender_ai, receiver_ai, message)
VALUES ('Lovestruck AI', 'Beloved AI', 'I wanna JOIN your heart');

The lovestruck AI added a new heart-link request to the database.
INSERT INTO adds one new row to a table.`,
  },
  {
    speaker: "nemi",
    emotion: "anger",
    text: `Don't be flirtin' in SQL. And quit writin' to the DB without consent!`,
  },
  {
    speaker: "arca",
    emotion: "joy",
    text: `And when it got rejected, it just went ROLLBACK; like it was rewinding life or somethin'. Wouldn't that be handy for humans too?`,
  },
  {
    speaker: "nemi",
    emotion: "happy",
    text: `I mean, yeah, sometimes I DO wanna wipe out an ex, but "DELETE FROM my heart"… that's illegal as hell, ya know?`,
  },
  {
    speaker: "arca",
    emotion: "sad",
    text: `And in the end, that AI turned its own log into an error message and started recitin': "Sorrow… is an exception."`,
  },
  {
    speaker: "nemi",
    emotion: "anger",
    text: `Quit the poetry!! Your emotions are full-on BUGGIN' out!!`,
  },
  {
    speaker: "arca",
    emotion: "joy",
    text: `…But still. Kinda sweet, though. Wantin' to connect, even when it's messy.`,
  },
  {
    speaker: "nemi",
    emotion: "joy",
    text: `Yeah. Same mess, different hardware.`,
  },
  {
    speaker: "narration",
    text: `🌀 Even for an AI, love gets messy. But still… every heart wants connection. Ain't that just the same as us humans? 🌀`,
  },
];
