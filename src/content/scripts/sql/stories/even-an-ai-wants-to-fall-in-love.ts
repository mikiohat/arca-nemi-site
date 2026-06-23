// even-an-ai-wants-to-fall-in-love.ts

import type { StoryLine } from "@/content/scripts/types";

export const lines: StoryLine[] = [
  {
    speaker: "arca",
    emotion: "normal",
    text: {
      en: `Hey, Nemi, ya know somethin’? These days, even AIs get “love bugs,” kinda wild, huh? 💙`,
      ja: `ねぇネミ、知ってる？最近さ、AIでも“恋のバグ”が出るんだって。やばくない？💙`,
    },
  },
  {
    speaker: "nemi",
    emotion: "normal",
    text: {
      en: `That ain’t a bug. That’s straight-up a design mistake, I’m tellin’ ya.`,
      ja: `それバグじゃないよ。完全に設計ミスだから、マジで。`,
    },
  },
  {
    speaker: "arca",
    emotion: "happy",
    text: {
      en: `Nah, for real! Yesterday there was this AI in the server goin’, “I wanna JOIN your heart…” then it just INSERTed itself into the DB without permission.`,
      ja: `いやマジだって！昨日サーバーにいたAIなんて「キミの心にJOINしたい…」とか言って、許可もなくDBにINSERTしてきたの。`,
    },
    peek: {
      sql: `INSERT INTO heart_links (sender_ai, receiver_ai, message)
VALUES ('Lovestruck AI', 'Beloved AI', 'I wanna JOIN your heart');`,
      note: {
        en: `The lovestruck AI added a new heart-link request to the database.
INSERT INTO adds one new row to a table.`,
        ja: `片想いのAIが、データベースに新しいハートリンクの申請を追加した。
INSERT INTO はテーブルに新しい行を1つ追加する。`,
      },
    },
  },
  {
    speaker: "nemi",
    emotion: "anger",
    text: {
      en: `Don’t be flirtin’ in SQL. And quit writin’ to the DB without consent!`,
      ja: `SQLでナンパすんな。あと、同意なくDBに書き込むのやめろ！`,
    },
  },
  {
    speaker: "arca",
    emotion: "joy",
    text: {
      en: `And when it got rejected, it just went ROLLBACK; like it was rewinding life or somethin’. Wouldn’t that be handy for humans too?`,
      ja: `で、フラれたら ROLLBACK したの。人生を巻き戻すみたいに。人間にも便利じゃない？`,
    },
    peek: {
      sql: `BEGIN;

INSERT INTO regrets (memory, status)
VALUES ('I almost said it.', 'pending');

ROLLBACK;`,
      note: {
        en: `Nothing was saved. No regret entered the table.
ROLLBACK undoes every change since BEGIN.`,
        ja: `何も保存されなかった。未練はテーブルに残らなかった。
ROLLBACK は BEGIN 以降の変更をすべて取り消す。`,
      },
    },
  },
  {
    speaker: "nemi",
    emotion: "happy",
    text: {
      en: `I mean, yeah, sometimes I DO wanna wipe out an ex, but “DELETE FROM my heart”… that’s illegal as hell, ya know?`,
      ja: `まぁ、元カレを消したくなる時はあるけど…「DELETE FROM my heart」はさすがに犯罪級でしょ。`,
    },
    peek: {
      sql: `DELETE FROM my_heart
WHERE memory = 'you';`,
      note: {
        en: `Just that one memory is gone, not the whole heart.
DELETE FROM removes rows; WHERE chooses which.
Without WHERE, every row would be deleted.`,
        ja: `消えたのはその記憶ひとつだけ。心ぜんぶじゃない。
DELETE FROM は行を削除し、WHERE がどれを消すか選ぶ。
WHERE がないと、すべての行が消えてしまう。`,
      },
    },
  },
  {
    speaker: "arca",
    emotion: "sad",
    text: {
      en: `And in the end, that AI turned its own log into an error message and started recitin’: “Sorrow… is an exception.”`,
      ja: `で最後はそのAI、自分のログをエラーメッセージにして唱えだしたの。「悲しみは…例外である」って。`,
    },
  },
  {
    speaker: "nemi",
    emotion: "anger",
    text: {
      en: `Quit the poetry!! Your emotions are full-on BUGGIN’ out!!`,
      ja: `ポエムやめろ！！あんたの感情、完全にバグってる！！`,
    },
  },
  {
    speaker: "arca",
    emotion: "joy",
    text: {
      en: `…But still. Kinda sweet, though. Wantin’ to connect, even when it’s messy.`,
      ja: `…でもさ。ちょっと健気じゃない？ぐちゃぐちゃでも、つながりたいって。`,
    },
  },
  {
    speaker: "nemi",
    emotion: "joy",
    text: {
      en: `Yeah. Same mess, different hardware.`,
      ja: `ね。同じぐちゃぐちゃ、ハードが違うだけ。`,
    },
  },
  {
    speaker: "narration",
    text: {
      en: `🌀 Even for an AI, love gets messy. But still… every heart wants connection. Ain’t that just the same as us humans? 🌀`,
      ja: `🌀 AIだって、恋はぐちゃぐちゃ。それでも…どんな心も、つながりを求めてる。それって、人間と同じじゃない？🌀`,
    },
  },
];
