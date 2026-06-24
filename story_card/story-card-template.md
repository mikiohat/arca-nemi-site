# Story Card Template

> Purpose:
> This card is the source of truth for one SQL Story.
> It should be readable as a story-planning document and structured enough to convert into content data.
> Each story card keeps English and Japanese text together so the story, metadata, emotions, and peeks stay aligned.

---

# Story XX

## Build metadata

- slug:
- order:
- story.enabled: live
- lab.enabled: soon
- route:
- data file:
- topic: sql
- series: A Slightly Off-Kilter Love Log, Told Through SQL

Allowed publish states:

- `live`
- `soon`
- `off`

## Metadata

- Title:
- JP Title:
- Subtitle:
- JP Subtitle:
- Description:
- JP Description:
- SQL Topic:
- Tags:

## Arc role

- Progress:
- Foreshadowing:
- Next hook:

## Character engine

- Nemi finds:
- Arca interprets:
- Conflict:
- SQL reveals:
- Final beat:

## Episode shape

- Setup:
- Turn:
- Resolution:

## Lines

> Lines are variable-length.
> Add as many lines as the scene needs.
> A peek can be attached to any line.
> Keep English and Japanese text inside the same line item so speaker, emotion, and peek stay aligned.

Allowed speakers:

- `arca`
- `nemi`
- `narration`

Allowed emotions:

- `normal`
- `happy`
- `anger`
- `sad`
- `joy`

Peek format:

- `sql` contains the SQL code.
- `note.en` contains one or more short English explanation lines.
- `note.ja` contains one or more short Japanese explanation lines.
- When converted to code, peek should be joined as:
  - SQL block
  - blank line
  - note lines

### Line example without peek

- speaker:
- emotion: normal
- line:
  - en:
  - ja:

- peek: none

### Line example with peek

- speaker:
- emotion: normal
- line:
  - en:
  - ja:

- peek:
  - sql:
  - note:
    - en:
    - ja:

### Final line example

- speaker:
- emotion: normal
- line:
  - en:
  - ja:

- peek: none

## Lab idea

-

## Design notes

- Story function:
- Why this story exists:
- What to keep simple:
- What not to explain yet:
