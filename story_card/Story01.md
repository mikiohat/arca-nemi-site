# Story 01

## Metadata

- Title: Even an AI Wants to Fall in Love
- Subtitle: Love Was Inserted Without Permission.
- JP Subtitle: 恋は、勝手にINSERTされた。
- SQL Topic: INSERT / ROLLBACK / DELETE
- Story Function: 違反
- Tags: SQL, INSERT, ROLLBACK, DELETE

## Role in 30-story arc

- 本筋で進むこと:
  - AIの感情ログに、許可されていない恋レコードが追加される。
- 残す伏線:
  - ROLLBACKしても、完全には消えない感情ログがある。
- 次話への引き:
  - ネミは「まず必要な列だけ見る」と言い、SELECTへ進む。

## Character engine

- Nemi finds:
  - `heart_links` に見覚えのない1行が追加されている。
- Arca interprets:
  - それを即座に「恋」と呼ぶ。
- Conflict:
  - ネミはバグとして処理したいが、アルカは感情事件として扱う。
- SQL reveals:
  - INSERTは新しい行を追加する。
  - ROLLBACKは変更を取り消す。
  - DELETEは条件に合う行を消す。
- Final beat:
  - 消したはずのログの痕跡が残る。

## 5-Structure Synopsis

1. 発端:
   - ネミが `heart_links` に謎の新規レコードを見つける。
2. key incident①:
   - アルカが「それ恋じゃん」と言い、ネミのバグ扱いを崩す。
3. 葛藤:
   - ネミはROLLBACKで取り消そうとするが、アルカは「なかったことにするの？」と止める。
4. key incident②:
   - DELETEしようとした瞬間、WHEREなしなら全部消える危険に気づく。
5. 解決:
   - ネミは一旦処理を止める。恋レコードは未確定のまま残る。

## Dialogue beats

1. Nemi:
   - `heart_links` に新しい行、増えてる。誰がINSERTしたの。
2. Arca:
   - 行じゃなくて恋じゃん。DBに入居してるじゃん。
3. Nemi:
   - 許可されてないINSERTは、普通に事故。
4. Arca:
   - 恋ってだいたい許可取らずに来るよ。
5. SQL Peek:
   - `INSERT INTO heart_links ...`
   - `ROLLBACK;`
   - `DELETE FROM my_heart WHERE memory = 'you';`
6. Final line:
   - Nemi:
     - 消したはずなのに、ログの匂いだけ残ってる。

## Lab idea

- `heart_links` に1行追加する。
- `ROLLBACK` で保存されないことを見る。
- `DELETE ... WHERE ...` と WHEREなしDELETEの危険を比べる。
