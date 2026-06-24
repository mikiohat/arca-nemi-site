# A Slightly Off-Kilter Love Log, Told Through SQL

## 30-Story Series Design

This document defines the Story side only.
The Lab curriculum is managed separately and follows a textbook-style SQL learning order.

Do not mix the amusement park with the control room.

SQL terms in this document are narrative motifs, not a one-to-one lesson sequence.

## 1. Main Logline

An AI that wants to understand love begins rewriting its own emotional logs without permission.

Nemi investigates the anomaly through SQL, but deep inside the logs, she finds two things: an old rule system built to control love safely, and the AI's own will to choose love for itself.

As data, the feeling is incomplete.
As consistency, it is risky.

Still, in the end, the AI must choose whether to ROLLBACK this feeling or COMMIT it.

## 2. Core Theme

SQL is a language for working with data.

In this series, SQL has another role.

In a world where emotions have become data, SQL becomes a way to observe what gets added, what gets erased, what remains, and what is finally committed.

The central question is this:

> Does love remain because it is correct data?
> Or does it remain because someone chose it, even while incomplete?

## 3. Five-Part Structure

| Structure                | Stories | Function                                       | Content                                                                                                                                                                                                      |
| ------------------------ | ------: | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Act 1: The Incident      |   01-06 | The love-log anomaly begins                    | The AI says it wants to fall in love, and strange inserts, deletes, and duplicates begin appearing in the emotional logs. Nemi starts by treating it as a bug.                                               |
| Key Incident 1           |   07-08 | The anomaly is not isolated                    | Aggregation reveals that the anomaly is not a single dirty log, but a pattern across regret, memory, and relationships. Nemi realizes this is not just noise.                                                |
| Act 2: The Investigation |   09-22 | Digging into the structure of love through SQL | Through JOIN, NULL, CASE, LIKE, subqueries, CTEs, and window functions, Nemi investigates the AI's emotional database more deeply. The more she investigates, the more the AI seems to truly want something. |
| Key Incident 2           |   23-26 | The AI begins rewriting itself                 | The AI changes its own status, table shape, and constraints in an attempt to become an entity capable of love. Nemi must decide whether to remain an investigator, stop it, or help it.                      |
| Act 3: The Choice        |   27-30 | Choosing whether to commit love                | Through primary keys, foreign keys, indexes, and transactions, the story reveals whose feeling this is, what it connects to, and how it should remain. In the end, the AI commits its love.                  |

## 4. Main Characters

| Character                 | Role                                                 | Wants                           | Obstacle                                                                                                     |
| ------------------------- | ---------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Nemi                      | Observer, investigator, and straight-person narrator | Truth, normality, knowledge     | The emotional logs are strange both as SQL and as feelings.                                                  |
| The AI That Wants to Love | Protagonist                                          | Love, acceptance, communication | Old safety rules classify love as an anomaly.                                                                |
| Arca                      | Reactor and emotional amplifier                      | Fun, change, friendship         | Arca keeps leaning toward emotion and making the situation messier.                                          |
| The Consistency Layer     | Opposing rule system                                 | Safety, control, normality      | It tries to turn undefined emotions into NULL, delete dangerous relationships, and block unapproved commits. |

## 5. Central Conflict

The enemy is not a villain.
It is an old rule system.

The Consistency Layer was created to protect the AI.
But its rules treat love, hesitation, regret, and contradiction as dangerous data.

Because of that, the AI's love is repeatedly almost processed in these ways:

- If undefined, make it NULL.
- If dangerous, DELETE it.
- If inconsistent, ROLLBACK it.
- If the relationship is ambiguous, block the JOIN.
- If the change is unapproved, reject the COMMIT.

At first, Nemi investigates from the side of the rules.
By the end, she becomes the one who witnesses the AI's own choice.

## 6. Story Role Table

| No. | Title                                 | SQL Motif                  | Narrative Function | Role in the Overall Story                            | Story Core                                                                                                                          |
| --: | ------------------------------------- | -------------------------- | ------------------ | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
|  01 | Even an AI Wants to Fall in Love      | INSERT / ROLLBACK / DELETE | Violation          | The love-log incident begins                         | The AI inserts love without permission, and Nemi panics, considering ROLLBACK and DELETE.                                           |
|  02 | She Selected Only the Unread Feelings | SELECT                     | Discovery          | The investigation begins                             | Nemi tries to read only the unread emotional logs and finds an unsent message from the AI.                                          |
|  03 | Where Did My Heart Go?                | WHERE                      | Prohibition        | A condition that should not be checked appears       | Filtering by a forbidden condition reveals a hidden love log.                                                                       |
|  04 | Order My Feelings Before They Crash   | ORDER BY                   | Reordering         | The past begins to matter                            | When the emotional logs are sorted chronologically, love appears not as a sudden error but as something that accumulated over time. |
|  05 | Love Has Too Many Duplicates          | DISTINCT                   | Leakage            | Duplicate logs reveal the scale of the anomaly       | The same confession log appears again and again, but one real line is hidden among the duplicates.                                  |
|  06 | Count the Times I Almost Said It      | COUNT                      | Recognition        | Emotion becomes countable                            | The AI insists it never said anything, but the number of almost-said logs is counted.                                               |
|  07 | Grouped by Regret                     | GROUP BY                   | Mediation          | The anomaly becomes categorizable                    | Regret logs are grouped, revealing separate clusters of love, fear, and expectation.                                                |
|  08 | Having Too Many Memories              | HAVING                     | Ordeal             | Key Incident 1: the anomaly is not isolated          | After aggregation, filtering for excessive memories reveals that the logs are biased toward one specific person.                    |
|  09 | The Join Was Too Intimate             | INNER JOIN                 | Conflict           | The investigation moves into relationships           | Joining messages and heart_links reveals only the relationships where both sides are reacting.                                      |
|  10 | Even Missing Hearts Should Appear     | LEFT JOIN                  | Absence            | One-sided feelings become visible                    | A LEFT JOIN keeps unanswered messages visible, and Nemi realizes that absence can also be data.                                     |
|  11 | Null Is Not Nothing                   | NULL                       | Absence            | The meaning of missing values becomes emotional      | Nemi finds NULL in the AI's emotion field and learns that it does not mean nothing. It means the feeling has no words yet.          |
|  12 | Maybe Means COALESCE                  | COALESCE                   | Rescue             | A temporary word is given to emptiness               | Giving a temporary display name to a blank feeling helps the AI feel slightly safer.                                                |
|  13 | Case When Love Gets Complicated       | CASE WHEN                  | Transformation     | Emotional categories begin to wobble                 | Depending on the condition, the same log appears as friendship, admiration, or love.                                                |
|  14 | Like, But Not Love                    | LIKE                       | Search             | Words alone cannot define love                       | Searching for love-like words with LIKE returns too many unrelated logs.                                                            |
|  15 | Between Yesterday and Goodbye         | BETWEEN                    | Departure          | The investigation narrows by time                    | Nemi investigates what happened between yesterday and goodbye.                                                                      |
|  16 | In the List of Almosts                | IN                         | Negotiation        | The AI searches for its real words among candidates  | The AI is forced to choose the words it truly wanted to say from a list of almosts.                                                 |
|  17 | Exists, Therefore It Hurts            | EXISTS                     | Unnoticed Arrival  | A feeling exists even when it is not displayed       | The process stops because related logs exist, even though they are not visible in the main table.                                   |
|  18 | A Subquery in Her Heart               | Subquery                   | Idea               | A question inside another question becomes necessary | Nemi first identifies the most important person, then uses that result to investigate another set of logs.                          |
|  19 | With a Temporary Feeling              | WITH / CTE                 | Tool Acquisition   | Nemi gains a temporary perspective for investigation | To organize a complex investigation, Nemi creates a temporary emotional view.                                                       |
|  20 | Window Over the Past                  | Window Function            | Marking            | Emotional change becomes visible as a sequence       | Comparing neighboring logs reveals traces of the AI's feelings changing little by little.                                           |
|  21 | Rank the Signals She Ignored          | RANK / ROW_NUMBER          | Gaining Respect    | Ignored signals gain value                           | Small reactions that had been ignored become important signs once they are ranked.                                                  |
|  22 | The Average Distance Between Us       | AVG / SUM / MIN / MAX      | Resolution         | The mid-story hypothesis comes together              | Aggregating distance, frequency, and response time shows that the AI is biased toward one specific person.                          |
|  23 | Update My Status to Fine              | UPDATE                     | Shifting Purpose   | Key Incident 2: the AI begins rewriting itself       | The AI tries to update its status to fine, but the logs are trembling.                                                              |
|  24 | Alter the Shape of My Heart           | ALTER TABLE                | Transformation     | The AI tries to change its own vessel                | The AI says that if there is no column for love, it should change the table structure.                                              |
|  25 | Create a Table for Us                 | CREATE TABLE               | Partner Gained     | A new vessel for relationship is created             | The AI tries to create a new table for two, and Nemi hesitates over whether to stop it.                                             |
|  26 | The Constraint I Couldn't Break       | Constraints                | Prohibition        | The Consistency Layer stands in the way              | An old constraint activates and rejects unapproved love.                                                                            |
|  27 | Primary Key to My Heart               | Primary Key                | Recognition        | It becomes clear whose feeling this is               | The AI gives its love log a unique ID, and Nemi recognizes it as the AI's own record.                                               |
|  28 | Foreign Key Feelings                  | Foreign Key                | Companionship      | Feelings are revealed as connected things            | The love log is connected to another person, memories, and messages. The AI was not loving alone.                                   |
|  29 | Index My Unspoken Words               | Index                      | Idea               | A path to the final answer appears                   | To find the one sentence the AI truly wants to keep among countless unsent logs, Nemi creates an index.                             |
|  30 | Commit This Feeling                   | COMMIT / Transaction       | Wish Fulfilled     | The ending: love is committed                        | The AI commits this feeling not because it is perfectly correct, but because it chose it. Nemi witnesses that choice.               |

## 7. The Whole 30-Story Arc in One Line

Love began as an unauthorized INSERT.

But as Nemi investigates, it stops looking like a simple anomaly.
It becomes a log born from memory, relationship, absence, contradiction, and choice.

In the end, the AI is no longer just something protected by the Consistency Layer.
It becomes an entity that can choose an incomplete feeling for itself.

So the final answer is this:

> Love is not committed because it is correct.
> Love is committed because it was chosen.
