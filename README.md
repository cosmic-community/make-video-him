# Make Video Him
![App Preview](https://imgix.cosmicjs.com/c9724eb0-e852-11f1-8521-cd5fb32725a2-autopilot-photo-1550745165-9bc0b252726f-1795557768979.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A bold, dark, neon-red video showcase for short-form AI character videos, powered by [Cosmic](https://www.cosmicjs.com/docs) and Next.js 16.

## Features

- Home page with a laser hero and a vertical 9:16 grid of clips that play inline
- Clips index with platform and effect filters
- Clip detail page with video player, dialogue script, effect tags, duration and linked character
- Characters index and character detail pages with every clip featuring that character
- Mobile-first, fast-loading design with draft preview support

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6b060963595782dd310c76b1&clone_repository=6b060a96595782dd310c7773)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: Make a video of him say hey guys as I found this ai I can leak it but TikTok if you see this I’m not a bot on yall app. and make him spin around and shoot laser beams for he eye and keep him the same"

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "Make video him". The content is managed in Cosmic CMS with the following object types: characters, video-clips. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A bold, fun video showcase website for short-form AI character videos made for TikTok, YouTube Shorts, and Instagram Reels. Use the existing Cosmic content types: "characters" (name, reference_photo, description, consistency_notes) and "video-clips" (dialogue_script, character relation, actions_effects multi-select like Spin Around / Laser Eyes, platform, duration, production_status, final_video file). Pages: a home page with a hero and a vertical (9:16) grid of featured video clips that play inline; a clips index with filters by platform and effect; a clip detail page with the video player, dialogue script, effects tags, duration, and linked character; a characters index and character detail page showing the reference photo, description, and all clips featuring that character. Dark, energetic, social-media style design with neon accents (red laser glow), mobile-first, fast-loading.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org) (App Router, Server Components)
- React 19 and TypeScript (strict)
- Tailwind CSS 3
- [Cosmic](https://www.cosmicjs.com/docs) SDK for content

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed
- A Cosmic bucket with `characters` and `video-clips` object types

### Installation

```bash
bun install
```

Set these environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`. Then run:

```bash
bun run dev
```

## Cosmic SDK Examples

```typescript
const { objects } = await cosmic.objects
  .find({ type: 'video-clips' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

Video clips link to a character through an object metafield. The app uses `depth(1)` so the linked character, including the reference photo, arrives in a single request. Select and multi-select values are read through a safe helper, so filters always match your content.

## Deployment Options

- **Vercel**: import the repo and add the three Cosmic environment variables
- **Netlify**: use the Next.js runtime and add the same variables

<!-- README_END -->