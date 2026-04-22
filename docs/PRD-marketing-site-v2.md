# PRD: Kaynos Marketing Site v2

**Author:** jlambert229
**Date:** 2026-04-10
**Status:** Draft
**Repo:** kaynos-site
**Live:** https://kaynos.net

---

## Problem

The current marketing site shipped fast and got the basics right — clear pricing, honest positioning, live demos, no dark patterns. But it's a v1 built for launch, not for sustained conversion. Specific gaps:

- **No social proof beyond "we're early."** The testimonials section literally says "we don't have testimonials." This was honest at launch; it's now a liability. Real coaches are using the product.
- **No product video.** Visitors must leave the site and navigate a live demo to understand the product. Most won't.
- **Single-persona messaging.** The hero, use cases, and pricing all speak to the same archetype: a coach evaluating tools. There's no path for the curious student who got a Kaynos link from their coach, no path for the academy owner comparing platforms for a multi-coach operation.
- **No conversion funnel beyond "Start Trial."** Every CTA goes to the same place. No email capture that works (the newsletter form opens a mailto link). No lead nurture. No content that builds trust over multiple visits.
- **SEO is structural, not strategic.** Prerendering and JSON-LD are in place, but there's no content strategy — no blog, no landing pages for specific coaching verticals, no long-tail keyword coverage.
- **Mobile conversion is likely underperforming.** The site is responsive, but no mobile-specific optimizations exist for the coach-on-the-go scenario (Marco checking the site between classes on his phone).

## Goal

Transform the marketing site from a static brochure into a conversion engine that:
1. Speaks to each visitor persona in their language
2. Demonstrates the product without requiring a live demo visit
3. Builds trust through real social proof and founder credibility
4. Captures and nurtures leads who aren't ready to trial today
5. Ranks for coaching-vertical search terms that drive qualified traffic

---

## Visitor Personas

> Adapted from [kaynos/docs/personas.md](/home/owner/Repos/kaynos/docs/personas.md). These are the same people, but in a different context — they're evaluating, not using.

### Marco on the Marketing Site — The Evaluator

**Marco Silva, 42. Academy owner, 130 members, 3 coaches. Moderate tech comfort.**

Marco found Kaynos via a Facebook group for BJJ gym owners or a Google search for "video review for martial arts coaches." He's on his phone. He has 4 minutes between classes.

**What he's looking for:**
- Does this work for BJJ specifically, or is it a generic coaching app?
- How much does it cost for my size gym (130 members, but only ~30 active privates)?
- Can my assistant coaches use it too?
- Is the video hosting reliable? I've been burned by Vimeo pricing changes.
- Who else uses this? Any academy owners I've heard of?

**What makes him leave:**
- Landing on a page that says "for fitness coaches" with stock photos of personal trainers
- Having to create an account to see what the product looks like
- Pricing that requires a calculator or "contact sales"
- No sign anyone in combat sports actually uses this

**What converts him:**
- Seeing a BJJ-specific example (timestamped notes on a sparring round)
- A price calculator where he plugs in his numbers and sees exactly what he'd pay
- A quote from another academy owner
- A 60-second product video showing the coach workflow

---

### Sofia on the Marketing Site — The Link Follower

**Sofia Reyes, 31. Purple belt, dedicated student. Her coach just sent her a Kaynos session link.**

Sofia didn't search for Kaynos. She got a link from Professor Marco. She's on the site because she tapped "What is Kaynos?" in the email notification or tried to understand what this new thing is before creating an account.

**What she's looking for:**
- What is this? (She needs a 10-second answer)
- Is it free for me? (Coach pays, students are free — but this isn't obvious from the current hero)
- Will this actually help me improve, or is it another app my coach will abandon in a month?
- How does video review work from the student side?

**What makes her leave:**
- A page that talks only about coaches and pricing — she thinks it's not for her
- No explanation of the student experience
- Requiring payment information before she can see anything

**What converts her:**
- A clear "Students use Kaynos free" message visible without scrolling
- A quick visual of the student experience (watch video, see coach's notes, reply)
- A link straight to signup/accept-invite (not the generic trial flow)

---

### David on the Marketing Site — The Accidental Visitor

**David Park, 37. White belt, 10 months. Casual. Low engagement threshold.**

David got an email saying his coach posted a session. He clicked the link, maybe landed on the marketing site by mistake (wrong URL, expired session link, not logged in). Or his coach mentioned "I'm using this new app" and he googled it.

**What he's looking for:**
- One sentence explaining what this is
- Whether he needs to pay for anything
- Whether he needs to install an app

**What makes him leave:**
- Anything confusing, long, or sales-oriented
- Having to scroll to find out it's free for students
- Feature comparison tables (he doesn't care about competitors)

**What converts him:**
- "Your coach uses Kaynos. You use it free. No app to install." above the fold
- A direct link to log in or accept his invite

---

### New Persona: Teri — The Operations Researcher

**Teri Washington, 38. Operations manager for a 3-location martial arts franchise. Researching tools for the ownership group.**

Teri isn't a coach. She manages scheduling, billing, and vendor relationships for three academies under common ownership. She found Kaynos while comparing CoachNow, OnForm, and Hudl alternatives. She'll present a recommendation to the owners.

**What she's looking for:**
- Feature comparison vs. specific competitors (she's already made a spreadsheet)
- Pricing at scale (50-100 active students across 3 locations)
- Security and privacy posture (she'll ask about SOC 2, GDPR, data residency)
- Whether Kaynos can handle multi-location or multiple coaches
- Case studies or references she can forward to the owners

**What makes her leave:**
- No way to calculate multi-location pricing
- No security/compliance page
- "Contact sales" with no public information
- No PDF or shareable format for her comparison

**What converts her:**
- A detailed comparison page she can screenshot for her deck
- A pricing calculator that handles 50+ students across multiple accounts
- A security/trust page with specific claims (encryption, hosting, data handling)
- A "Talk to us" path that isn't just a mailto link

---

### New Persona: Jess — The Solo Coach

**Jess Okafor, 29. Private swim coach. 8 clients, no gym, no staff. iPhone is her entire office.**

Jess coaches kids and adults at a community pool. She films lessons on her phone propped against the lane divider. Currently she texts clips to parents via iMessage, loses track of who she sent what, and has no way to add coaching notes to the video. She found Kaynos searching "video coaching app for swim lessons" after a parent asked if there was a better way to share footage.

She's not Marco. She doesn't have 130 members or assistant coaches. She has 8 clients, a tight budget, and zero tolerance for enterprise software.

**What she's looking for:**
- Does this work for one person with a small roster? Or is it built for big gyms?
- What does it cost for 8 clients? (She needs to see the number instantly — not "starting at")
- Can she use it on her phone? She doesn't own a laptop
- How fast can she go from filming to sharing? If it's more than 3 taps, she'll keep using iMessage
- Is this just for martial arts? The BJJ examples are everywhere

**What makes her leave:**
- Hero copy that screams "academy" or "gym" — she doesn't have one
- Pricing that starts at $50/mo for a tool she'll use with 8 people (sticker shock without context)
- Use cases that only show BJJ, fitness, and martial arts — no swim, no dance, no general coaching
- Feature overload: AI review, pose overlays, admin panels — she just wants video + notes + share

**What converts her:**
- Seeing "$50/mo, first 3 clients included" and quickly calculating her cost ($75/mo for 8 clients)
- A use case example that isn't combat sports — "technique coaching" tab showing swim/dance/golf
- The "no app for your clients" message — her students' parents don't want another app
- A 30-second product video showing the simple loop: film, upload, add notes, share link

---

### New Persona: Ray — The Platform Refugee

**Ray Petrov, 45. Tennis coach, 22 clients. Currently on CoachNow, actively looking to leave.**

Ray has used CoachNow for two years. He pays $50/mo for PRO but his clients also need to pay for CoachNow accounts, and three parents have complained about the cost. The app is clunky on Android, the web version barely works, and CoachNow just raised prices. He googled "CoachNow alternative" and landed on the Kaynos comparison page.

He's not evaluating from scratch — he's comparing against a specific tool he already knows.

**What he's looking for:**
- Direct CoachNow comparison (he wants to confirm what he already suspects)
- "Clients use it free" — this is the line that hooked him. Is it real?
- Can he migrate? What happens to his existing videos and notes?
- Does the video player actually work on all devices? CoachNow's doesn't
- Will his less tech-savvy clients (ages 10-65) figure it out?

**What makes him leave:**
- Vague claims without a direct comparison table
- No mention of CoachNow by name (he suspects the comparison is theoretical)
- "Coming soon" on features he currently uses in CoachNow
- No migration path or data portability mention

**What converts him:**
- The comparison table naming CoachNow directly with honest feature-by-feature comparison
- "Clients access free — no app install" confirmed prominently
- AI features CoachNow doesn't have (voice dictation, AI review) — he's paying the same price for less
- A trial where he can test the workflow before committing to migration
- A contact path to ask about data migration

---

### New Persona: Kenji — The Assistant Coach

**Kenji Yamamoto, 26. Assistant instructor at Marco's BJJ academy. Purple belt. Teaches kids class and helps film competition team.**

Kenji didn't choose Kaynos — Marco did. Kenji got an email saying "you've been added as a coach on Kaynos." He clicked the link and landed on the marketing site because he wasn't sure what this was. He'll use whatever Marco tells him to, but he has his own opinions about tools.

**What he's looking for:**
- What is this? (10-second answer — he's not reading a sales page)
- What am I supposed to do with it? (Coach workflow overview)
- Can he use it on his phone between classes? (He teaches back-to-back)
- Is this going to be more work for him? (He already films classes — now he has to add notes too?)

**What makes him leave:**
- A page entirely about buying/pricing — he's not the buyer
- No explanation of the coach experience (only the admin/owner perspective)
- Having to create an account from scratch when he was already invited

**What converts him:**
- Seeing the coach workflow in 30 seconds: film → upload → dictate notes → done
- Voice dictation pitch: "Talk through what you see — no typing between classes"
- AI review pitch: "AI flags the moments worth discussing — you decide what to tell the student"
- A clear "Accept your invite" or "Log in" path, not "Start free trial"

---

### New Persona: Linda — The Parent

**Linda Chen, 44. Mother of two kids (ages 9 and 12) in martial arts and piano lessons. Not a coach, not a student.**

Linda received an email: "Coach posted a new session for Ethan." She has no idea what Kaynos is. She clicked the link, maybe landed on the marketing site, and is now trying to figure out whether this is safe for her kid, whether it costs money, and whether she should be worried about an app with video of her children.

**What she's looking for:**
- Is this safe? Who has access to videos of my kid?
- Do I need to pay for this?
- Do I need to install anything?
- Can I watch the video too, or is it only for Ethan?
- Who is behind this? Is it a real company?

**What makes her leave:**
- Any ambiguity about privacy — she's protective about video of minors
- A page that looks like it's for adults only (BJJ sparring footage, corporate language)
- Having to enter credit card information for anything
- No clear company identity (no founder, no address, no trust signals)

**What converts her:**
- "Private by default — students only see their own sessions" visible without digging
- "Free for students. No app to install. Works in the browser."
- The founder story section (real person, real name, not a faceless startup)
- A security/privacy page she can skim (data handling, who can see what)
- A clear path to accept the invite and watch her kid's session

---

### New Persona: Marcus — The Online Coach

**Marcus Webb, 33. Strength and conditioning coach. Runs an online coaching business with 35 remote clients across 4 time zones. Never meets most of them in person.**

Marcus doesn't have a gym. His clients film themselves training at home or at their local gym, upload the footage, and Marcus reviews it asynchronously. He currently uses a combination of Google Drive (video storage), Loom (video feedback), and Trello (client tracking). He found Kaynos searching "async video coaching platform."

His workflow is the inverse of Marco's — the client films, the coach reviews. Not the other way around.

**What he's looking for:**
- Can clients upload video? Or is it coach-upload only?
- Async-first workflow: he reviews at midnight, his client watches at 6am in a different timezone
- Does it scale to 35+ clients without the pricing becoming absurd?
- Timestamped notes are exactly what he does manually in Loom — but can clients reply?
- Can he organize clients by program (hypertrophy, powerlifting, rehab)?

**What makes him leave:**
- In-person-only assumptions ("film your class," "session recordings")
- No mention of client-side uploads
- Pricing that only makes sense for small rosters (he needs 35 clients at a reasonable cost)
- No async/remote coaching language — everything positioned as "academy" or "gym"

**What converts him:**
- Pricing calculator showing 35 clients = $210/mo (cheaper than Drive + Loom + Trello combined)
- Timestamped notes with threaded replies — his exact workflow, built-in
- AI review: "I review 8 client videos a day — AI flagging key moments saves me an hour"
- Voice dictation: "I can talk through form corrections while watching, not type them out"
- "Works in the browser" — his clients are on every device imaginable

---

## Current State Assessment

### What's Working

| Element | Status | Evidence |
|---------|--------|----------|
| Value prop clarity | Strong | "Stop losing your best coaching moments" — specific, relatable |
| Pricing transparency | Strong | One plan, no tiers, calculator shows exact cost |
| Competitive positioning | Strong | Comparison table with real competitors, honest claims |
| Technical foundation | Strong | Prerendered, fast, accessible, dark-mode native |
| Founder trust | Strong | Personal story section builds credibility |
| Live demos | Strong | No-signup required, real product with sample data |
| Use case targeting | Good | Four verticals (fitness, martial arts, music, technique) |

### What's Missing or Weak

| Gap | Impact | Persona Affected |
|-----|--------|-----------------|
| No product video | High — most visitors won't click through to live demo | All |
| No real testimonials/social proof | High — "we're early" is no longer true | Marco, Teri |
| No student-facing messaging | High — Sofia and David don't see themselves | Sofia, David |
| Newsletter form is broken (mailto) | Medium — no lead capture at all | All |
| No security/trust page | Medium — blocker for Teri's evaluation | Teri |
| No blog or content pages | Medium — no SEO long-tail coverage | Marco (search) |
| No case studies | Medium — no shareable proof for Teri | Teri |
| Single CTA path | Medium — everyone goes to same trial signup | All |
| No student invite/accept flow | Low-medium — Sofia lands on coach-focused page | Sofia, David |
| Mobile-specific optimizations | Low — responsive but not mobile-optimized | Marco (phone) |
| **AI features invisible on marketing site** | **High — two flagship differentiators not mentioned anywhere** | **Marco, Teri, Ray, Marcus** |
| No non-combat-sports use case depth | High — Jess (swim) and Marcus (S&C) don't see themselves | Jess, Marcus |
| No "accept invite" / onboarding path | Medium — Kenji, Sofia, David, Linda all arrive via invite links | Kenji, Linda, Sofia, David |
| No privacy/safety messaging for parents | Medium — Linda won't let her kids use a video app without reassurance | Linda |
| No async/remote coaching positioning | Medium — Marcus's entire workflow is invisible | Marcus |
| No competitor migration messaging | Low-medium — Ray is ready to switch but sees no migration path | Ray |

### AI Features: Hidden Differentiators

The product has two AI-powered capabilities that no competitor offers. Neither is mentioned anywhere on the marketing site — not in the hero, not in features, not in the comparison table, not in use cases. This is the single biggest messaging gap.

#### Voice-to-Note Dictation (Deepgram)

**What it does:** Coaches dictate notes hands-free while watching video. Speech streams to Deepgram's `nova-2` model and appears as text in real-time. The coach clicks a mic button, talks through what they see ("at 2:15 your hips need to be lower on the guard pass"), and the transcribed note is anchored to that exact video timestamp.

**Why it matters for Marco:** He reviews film between classes with his hands occupied — demonstrating corrections on a grappling dummy, holding his phone, eating lunch. Typing timestamped notes is his biggest friction point. Voice dictation removes it entirely. *"I can talk through a roll while warming up for the next class."*

**Why it matters for Teri:** No competitor (CoachNow, OnForm, Sprongo) has hands-free video annotation. This is a defensible differentiator she can put in her comparison spreadsheet.

**Current marketing site presence:** Zero. Not in features, not in the hero, not in the comparison table, not in use cases.

#### AI-Assisted Video Review (Twelve Labs)

**What it does:** Coach clicks "AI Review" on any session or class video. An AI analyzes the footage and generates 2-3 timestamped suggestions highlighting moments the coach should review with the student — mistakes, missed opportunities, technique breakdowns. These appear as special "AI suggestion" notes in the timeline. The coach can edit, delete, or build on them.

**The default prompt is BJJ-specific:**
> "You are a BJJ coach's assistant. Flag 2-3 moments in this video that a coach should review with the student. Focus on mistakes, missed opportunities, or areas to improve — not things done well. One short sentence per moment. Be blunt."

**Why it matters for Marco:** Reviewing a full 60-minute class recording takes time he doesn't have. AI Review gives him a starting point — "look at 14:32, the student drops their underhook" — so he can jump to the key moments instead of scrubbing through the entire video. It's not replacing his coaching eye; it's highlighting where to point it.

**Why it matters for Sofia:** Her coach leaves better notes because AI catches moments the coach might have missed or forgotten. She gets more value from each private lesson recording.

**Why it matters for Teri:** This is a clear technology moat. She can write "AI-assisted video analysis" in her recommendation with no competitor equivalent.

**Current marketing site presence:** Zero.

#### Skeleton Pose Overlay (MediaPipe)

**What it does:** Toggle a real-time pose skeleton overlay on any video during playback. Uses MediaPipe to detect body position and draw the skeleton on top of the video frame. Useful for analyzing form, posture, and movement patterns.

**Why it matters:** Visual tool for technique analysis — coaches can see skeletal alignment without drawing annotations manually. Particularly useful for fitness, dance, and martial arts.

**Current marketing site presence:** Zero.

---

## Proposed Changes

### Phase 1: Convert What We Have (2 weeks)

High-impact changes to existing pages. No new routes.

#### 1.1 Product Video (Hero)

Embed a 60-90 second product walkthrough video directly in the hero section. Show the core loop: upload → timestamped notes → student watches → replies in thread.

**Requirements:**
- Hosted on Kaynos infrastructure or a privacy-respecting CDN (not YouTube — we're a video platform)
- Autoplay muted with play button overlay on desktop; static thumbnail on mobile (saves bandwidth)
- Sits below the hero headline, above the fold on desktop
- Fallback: animated GIF or screenshot sequence if video isn't ready

**Acceptance:** Video plays inline without leaving the page. Mobile users see a thumbnail that expands to video on tap.

#### 1.2 Real Social Proof (Testimonials Section)

Replace the "we're early" section with actual coach quotes and usage data.

**Requirements:**
- 3-5 real quotes from coaches using the product (collect via email or in-app prompt)
- Each quote includes: name, discipline, approximate roster size, photo (optional)
- If fewer than 3 quotes available at launch, supplement with aggregate stats: "X coaches, Y sessions reviewed, Z hours of video"
- Keep the honest tone — don't fabricate urgency or fake logos

**Acceptance:** At least 2 real quotes with attribution. Stats are pulled from a config file (not hardcoded in JSX).

#### 1.3 AI Features on the Homepage

The three AI capabilities need to be visible on the marketing site. They should appear in the Features section, the Comparison table, and the Use Cases tabs.

##### 1.3a Features Section — Add AI Cards

Add two new feature cards to the existing Features grid (currently 4 cards → 6 cards):

**Card 5: "Dictate notes hands-free"**
- Icon: Microphone
- Copy: "Talk through what you see while the video plays. Your voice becomes timestamped notes — no typing, no pausing. Review film between classes with your hands free."
- This is Marco's workflow: dictating corrections while warming up or demonstrating on a dummy.

**Card 6: "AI spots what you might miss"**
- Icon: Sparkles
- Copy: "One click and AI analyzes your video, flagging 2-3 moments worth reviewing. It's a starting point, not a replacement — jump to the key timestamps instead of scrubbing through an hour of footage."
- Positions AI as an assistant, not an autopilot. Matches the product's actual UX (coach reviews and edits AI suggestions).

**Optional Card 7: "Pose overlay for form analysis"**
- Icon: Body/skeleton
- Copy: "Toggle a real-time skeleton overlay on any video to analyze body position, alignment, and movement patterns. No manual drawing needed."
- Lower priority — include if the grid layout supports 7 cards (or 3+3+1), otherwise defer.

##### 1.3b Comparison Table — Add AI Rows

Add to the existing comparison table in `src/data/competitors.js`:

| Feature | Kaynos | CoachNow | OnForm | Drive + Vimeo |
|---------|--------|----------|--------|---------------|
| Voice-to-note dictation | Yes | No | No | No |
| AI video analysis | Yes | No | No | No |
| Pose skeleton overlay | Yes | No | No | No |

These are clean "only Kaynos" rows — no competitor has any of these. They strengthen the differentiation story significantly.

##### 1.3c Use Cases — Mention AI per Vertical

Update each use case tab to include one AI-specific example:

- **Fitness:** "AI flags reps where form breaks down — jump straight to the moments that matter."
- **Martial Arts:** "Dictate corrections hands-free while demonstrating the fix. AI highlights the key scrambles from a 60-minute class."
- **Music:** "Voice-annotate a student's recital while listening — no typing interrupts the flow."
- **Technique:** "Pose overlay shows skeletal alignment frame by frame. AI spots the three moments worth discussing."

##### 1.3d Hero Subheading — Mention AI

Update the hero subheading to hint at AI capabilities. Current:
> "Upload training videos. Leave notes at specific moments. Share them privately with your clients so they can review between sessions."

Proposed:
> "Upload training videos. Dictate notes at exact moments — or let AI flag the key timestamps for you. Share privately with your clients so they can review between sessions."

This plants the AI seed without making the hero feel like an AI product pitch. The details live in Features.

**Acceptance:** AI features visible in Features grid, Comparison table, Use Cases tabs, and hero subtext. No AI-washing — each mention describes what the feature actually does, not hype.

#### 1.4 Dual-Audience Hero

The hero currently speaks only to coaches. Add a secondary message track for students.

**Requirements:**
- Primary headline remains coach-focused: "Stop losing your best coaching moments."
- Below the primary CTA row, add a quiet secondary line: **"Are you a student? Your coach uses Kaynos — you use it free. No app to install."** with a "Log in" link
- This addresses Sofia and David without diluting the coach message
- On mobile, ensure the student line is visible without scrolling past the first CTA

**Acceptance:** Student message visible on both desktop and mobile hero. Does not visually compete with primary coach CTA.

#### 1.6 Working Newsletter Capture

Replace the mailto-based newsletter form with actual email collection.

**Requirements:**
- Netlify Forms integration (simplest path — no backend needed)
- Or: a lightweight email service integration (Resend, Buttondown, or similar) via Netlify Function
- Single field: email address. Honeypot + validation already in place from KAY-133
- Success state: "You're on the list. We email about once a month." (no redirect)
- Store submissions for later import into whatever email tool is chosen

**Acceptance:** Email submissions are captured and retrievable (Netlify Forms dashboard or email service). No mailto fallback.

#### 1.7 Pricing Calculator Enhancement

The calculator works but doesn't serve Teri's multi-location scenario.

**Requirements:**
- Add a "Multiple coaches?" toggle or note explaining that each coach account is billed separately
- Show annual cost alongside monthly (annual = monthly × 12, no discount yet, but the number helps budget conversations)
- Add a "Share this estimate" button that copies a URL with the slider value as a query param (e.g., `?clients=20`)

**Acceptance:** Calculator handles the "how much for my 3-coach gym" question without requiring a sales call.

---

### Phase 2: New Pages (4 weeks)

Add pages that serve underrepresented personas and SEO goals.

#### 2.1 `/for/coaches` Landing Page

Dedicated landing page for coach-focused ad campaigns and search traffic.

**Content:**
- Hero: "Video review that your clients actually watch."
- 3-step workflow visual (film → annotate → share)
- Discipline-specific examples (reuse UseCases content but expanded)
- Pricing summary
- CTA: Start Trial

**SEO targets:** "video review for coaches," "coaching video platform," "timestamped video feedback"

#### 2.2 `/for/students` Landing Page

For Sofia and David. Linked from coach invite emails and the main hero.

**Content:**
- Hero: "Your coach sent you a session. Here's how it works."
- 3-step visual from student perspective (get link → watch video → see coach notes at exact moments → reply)
- "It's free for you" messaging prominent
- "No app to install — works in your browser"
- CTA: Log in / Accept Invite (not "Start Trial")

**SEO targets:** Minimal — this page is for direct traffic from invite emails, not search.

#### 2.3 `/security` Trust & Security Page

For Teri and any buyer doing due diligence.

**Content:**
- Data hosting: Netlify (CDN), Neon (PostgreSQL), Backblaze B2 (video storage)
- Encryption: TLS in transit, encrypted at rest
- Authentication: JWT in HttpOnly cookies, bcrypt password hashing, rate-limited login
- Privacy: Per-school data isolation, students see only their own sessions
- Compliance: GDPR-ready data export, deletion on request, no third-party tracking on the marketing site
- SOC 2 status: "In progress" or "Not yet — here's what we do instead" (honest)
- Contact for security questions: security@kaynos.net

**Acceptance:** Page exists, content is accurate, no false claims. Teri can screenshot it for her deck.

#### 2.4 `/blog` or `/updates` Content Hub

Lightweight blog for SEO and trust-building. Start with 3-5 posts.

**Content strategy:**
- Coaching workflow posts: "How to give better video feedback in 5 minutes"
- AI feature deep-dives: "How AI video review works in Kaynos," "Hands-free coaching notes with voice dictation"
- Comparison posts: "Kaynos vs CoachNow: honest comparison for 2026"
- Product updates: Pull from changelog, add context and screenshots
- Discipline-specific: "Video review for BJJ coaches," "Music lesson recordings"

**Technical approach:**
- Markdown files in `src/content/blog/` or `docs/blog/`
- Simple list page + individual post pages
- Prerendered at build time (extend vite-prerender-plugin config)
- JSON-LD Article structured data per post

**Acceptance:** At least 3 posts live. Pages prerender correctly. Blog index accessible from nav.

---

### Phase 3: Conversion Infrastructure (6 weeks)

Longer-term investments in conversion tracking and optimization.

#### 3.1 Analytics Foundation

**Requirements:**
- Privacy-respecting analytics (Plausible, Fathom, or Netlify Analytics)
- No Google Analytics, no cookie banners needed
- Track: page views, CTA clicks (start trial, see demo, log in), calculator interactions, blog reads
- Dashboard accessible to the team

**Why now:** Without analytics, we can't measure whether Phase 1 and 2 changes improve conversion. Every change after this is guesswork.

#### 3.2 A/B Testing Capability

**Requirements:**
- Lightweight client-side A/B framework (or Netlify split testing)
- First test: hero headline variants
- Second test: pricing section position on homepage (currently near bottom)

**Depends on:** Analytics foundation (3.1)

#### 3.3 Lead Nurture Automation

**Requirements:**
- Email service integration (Resend, Loops, or Buttondown)
- Welcome sequence for newsletter signups (3 emails over 2 weeks)
- Trial reminder sequence for signups who don't convert
- Triggered from Netlify Forms submissions or direct API integration

**Depends on:** Working newsletter capture (1.4)

#### 3.4 Multi-Language Support

**Requirements:**
- See KAY-123 (labeled "Needs Architecture")
- Priority: Spanish (largest secondary market for martial arts coaching in the US)
- Approach: i18n framework selection, route-based locale (`/es/`), RTL not needed for Spanish

**Depends on:** Architecture decision from KAY-123

---

## Per-Persona Impact

### Marco (Coach Evaluator)

| Change | Impact |
|--------|--------|
| **AI features on homepage** | **High** — voice dictation is his #1 workflow enabler; AI review saves hours |
| Product video in hero | **High** — sees the product in 60 seconds without leaving |
| Real testimonials | **High** — sees other coaches using it, especially if BJJ-specific |
| AI in comparison table | **High** — 3 rows where only Kaynos says "Yes" |
| `/for/coaches` landing page | **Medium** — better search-to-landing experience |
| Blog (discipline-specific posts) | **Medium** — finds Kaynos via "video review for BJJ" search |
| Calculator annual cost | **Low** — helpful for budget planning |

### Sofia (Student Link Follower)

| Change | Impact |
|--------|--------|
| Dual-audience hero ("students free") | **High** — immediately understands she doesn't pay |
| `/for/students` page | **High** — full explanation of student experience |
| AI review mention | **Medium** — she benefits from better coach notes powered by AI |
| Student log-in CTA | **Medium** — reduces friction to accept invite |

### David (Accidental Visitor)

| Change | Impact |
|--------|--------|
| "Students free, no app" in hero | **High** — answers his only two questions |
| `/for/students` page | **Medium** — only if he bothers to click through |

### Teri (Operations Researcher)

| Change | Impact |
|--------|--------|
| **AI features in comparison table** | **High** — 3 exclusive capabilities for her spreadsheet |
| `/security` page | **High** — unblocks her evaluation |
| Calculator multi-coach note | **High** — answers the multi-location pricing question |
| Real testimonials with roster sizes | **Medium** — validates scale |
| Comparison page (existing) | Already **good** — may need a "Download as PDF" option |

### Jess (Solo Coach)

| Change | Impact |
|--------|--------|
| Pricing calculator (she can see $75/mo for 8 clients) | **High** — removes sticker shock, makes cost concrete |
| Use cases: "Technique" tab with swim/dance/golf | **High** — she needs to see herself, not just BJJ |
| Product video (simple loop: film → notes → share) | **High** — proves it's not enterprise bloatware |
| "No app for your clients" messaging | **Medium** — her students' parents will appreciate this |
| Blog: discipline-specific posts beyond combat sports | **Medium** — SEO path for "video coaching for swim" |

### Ray (Platform Refugee)

| Change | Impact |
|--------|--------|
| Comparison table naming CoachNow directly | **High** — confirms what he already suspects |
| "Clients access free" prominent on homepage | **High** — the single feature driving his switch |
| AI features in comparison (CoachNow has none) | **High** — justifies switching effort |
| Blog: "Kaynos vs CoachNow" comparison post | **Medium** — SEO for "[competitor] alternative" searches |
| Contact path for migration questions | **Medium** — reduces switching anxiety |

### Kenji (Assistant Coach)

| Change | Impact |
|--------|--------|
| Dual-audience hero with "Log in" path | **High** — he's not buying, he's onboarding |
| Voice dictation in features | **High** — he teaches back-to-back, can't type notes |
| AI review in features | **Medium** — helps him contribute notes without Marco's experience |
| `/for/students` page (similar "accept invite" flow) | **Medium** — same "I was sent here" pattern |

### Linda (Parent)

| Change | Impact |
|--------|--------|
| "Private by default" messaging | **High** — her #1 concern is safety of video of her kids |
| `/security` page | **High** — she'll skim it for privacy reassurance |
| "Free for students, no app" in hero | **High** — answers cost and friction questions |
| Founder story section | **Medium** — builds trust (real person, not faceless company) |
| `/for/students` page | **Medium** — explains what her kid will see |

### Marcus (Online Coach)

| Change | Impact |
|--------|--------|
| Pricing calculator at 35 clients ($210/mo) | **High** — proves it's cheaper than his current stack |
| AI features (voice dictation + AI review) | **High** — reviews 8 videos/day, time savings are massive |
| Use cases showing async/remote workflow | **High** — he needs to see his workflow, not in-person academy |
| Comparison: Kaynos vs DIY (Drive + Loom + Trello) | **Medium** — his actual competitive set |
| Blog: "Async video coaching with Kaynos" | **Medium** — SEO for online coaching searches |

---

## Success Metrics

| Metric | Current | Phase 1 Target | Phase 2 Target |
|--------|---------|----------------|----------------|
| Trial signups / month | Unknown (no analytics) | Baseline established | +30% from baseline |
| Demo page visits | Unknown | Baseline established | — |
| Product video play rate | N/A | >40% of homepage visitors | — |
| Newsletter capture rate | 0 (broken) | >2% of visitors | >4% with lead nurture |
| Avg. time on site | Unknown | Baseline established | +20% |
| `/for/students` → login clicks | N/A | N/A | >50% of page visitors |
| `/security` page views | N/A | N/A | >10/week (Teri-type visitors) |
| Organic search traffic | Unknown | Baseline established | +50% in 3 months (blog) |

---

## Technical Considerations

### Routing

New routes to add:

```
/for/coaches        → src/pages/ForCoaches.jsx
/for/students       → src/pages/ForStudents.jsx
/security           → src/pages/Security.jsx
/blog               → src/pages/Blog.jsx
/blog/:slug         → src/pages/BlogPost.jsx
```

Update `vite.config.js` prerender list and `scripts/generate-sitemap.mjs` for each new route.

### Content Management

Blog posts as markdown files parsed at build time. Options:
- **Simple:** Import markdown files in the blog page component, render with a lightweight markdown library
- **Moderate:** Use a Vite plugin to transform `.md` → importable modules with frontmatter
- **Full CMS:** Overkill for 3-5 posts. Defer until post count exceeds 20.

Recommendation: Start simple. Markdown files in `src/content/blog/`, import and render at build time.

### Video Hosting

Product walkthrough video options:
- **Self-hosted in `/public`:** Simple, fast, no third-party. Increases build artifact size.
- **Backblaze B2 (same as product):** Consistent with product architecture. Requires signed URL or public bucket.
- **Cloudflare Stream or Bunny.net:** Low-cost video CDN, good for a single asset.

Recommendation: Self-host in `/public` for v1 (it's one video). Move to B2 if we add more video content.

### Performance Budget

Current build: 42KB CSS, 178KB main JS (gzipped: 8KB + 56KB). New pages must not bloat the main bundle.

- Blog pages: Lazy-loaded route, markdown parser in its own chunk
- Landing pages: Lazy-loaded, reuse existing section components
- Security page: Static content, minimal JS
- Video: Lazy-load `<video>` element, don't include in prerender HTML

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| No real testimonials available yet | Medium | Phase 1.2 blocked | Use aggregate stats as fallback; begin outreach to active coaches now |
| Product video quality is poor | Medium | Hurts trust more than no video | Use screen recording with voiceover (Loom-style), not polished corporate video |
| Blog posts feel thin or AI-generated | Medium | Damages founder-credibility tone | Write from founder perspective; specific examples from real coaching sessions |
| Analytics adds tracking/privacy concern | Low | Contradicts privacy-first positioning | Use Plausible or Fathom (no cookies, GDPR-compliant by default) |
| New pages dilute SEO authority | Low | Existing pages lose rank | Internal linking strategy; new pages link back to homepage sections |
| Multi-language scope creeps | High | KAY-123 becomes a 6-month project | Defer to Phase 3; start with content translation only, not framework |

---

## Out of Scope

- **Kaynos app changes** — this PRD covers the marketing site only (kaynos-site repo)
- **Help center changes** — covered in [PRD-streamline-docs](/home/owner/Repos/kaynos-docs/docs/PRD-streamline-docs.md)
- **Pricing model changes** — this PRD works with the current $50/mo + $5/seat model
- **Payment processing on the marketing site** — trial signup lives on app.kaynos.net
- **Mobile app** — marketing site is responsive web; native app is a product decision
- **Custom branding / white-label** — not a marketing site concern

---

## Dependencies

| Dependency | Owner | Blocker For |
|------------|-------|-------------|
| Real coach testimonials (quotes + permission) | Product / founder | Phase 1.2 |
| Product walkthrough video (recording) | Product / founder | Phase 1.1 |
| Email service selection (Resend vs Buttondown vs other) | Engineering | Phase 1.4, 3.3 |
| Analytics tool selection | Engineering / founder | Phase 3.1 |
| KAY-123 architecture decision (i18n) | Engineering | Phase 3.4 |
| Security posture documentation (accurate claims) | Engineering | Phase 2.3 |

---

## Open Questions

1. **Do we have 3+ coaches willing to provide named testimonials?** If not, Phase 1.2 ships with stats only.
2. **What's the preferred analytics tool?** Plausible (hosted, $9/mo) vs Fathom ($14/mo) vs Netlify Analytics (included but limited).
3. **Should `/for/coaches` and `/for/students` be full pages or simplified landing variants of the homepage?** Full pages allow different messaging and SEO targeting but increase maintenance surface.
4. **Is the product video a screen recording or a produced video?** Screen recording is faster and more authentic; produced video is more polished but risks feeling corporate (violates Marco's "not a corporate HR tool" anti-pattern).
5. **Blog publishing cadence?** Recommend 2 posts/month minimum to build SEO momentum. Who writes?
