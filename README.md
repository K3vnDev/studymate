# Studymate

A modern web application to enhance self-learning with AI. Create, follow, and complete Studyplans, track your progress, earn achievements to flex on your profile, and chat with Mate — your virtual assistant.

🚀 Built using Next.js, TypeScript, Zustand, Supabase, Zod, and TailwindCSS.


## Table of Contents

- [Features](#features)
    - [/dashboard](#dashboard)
    - [/chat](#chat)
    - [/studyplan](#studyplan)
    - [/studyplan/tasks](#studyplan/tasks)
    - [/studyplan/focus](#studyplan/focus)
    - [/profile](#profile)
- [Future Additions](#future-additions)
- [Can I Use This?](#can-i-use-this)
- [Special Thanks](#special-thanks)

## Features

### /dashboard
If you don’t have a Studyplan selected, Mate will be there to greet you 🤖<br>
Clicking its card takes you straight into the [chat](#chat) — and if you hit the button directly, it throws in a precooked prompt

You’ll also see a list of Studyplans you can pick from.

![The dashboard of the application, showing mate greeting you and a list of Studyplans](/public/screenshots/dashboard.webp)


### /chat
Here you will be interacting with Mate, your helpful and friendly virtual assistant 👾<br>
Ask him—in a polite way—to create a new Studyplan for you, help you with your tasks, give you study tips or just chat with him.

He also knows what's your Studyplan and what's your progress, so he can give you personalized recommendations and help you with your tasks.

![The chat interface, showing mate creating a new studyplan for the user](/public/screenshots/chat.webp)


### /studyplan
This is what Studymate is all about. Here you can start, manage and complete your Studyplans.

Every Studyplan has a list of lessons, one for each day of its duration.
Each one of these lessons has a list of tasks which you will have to complete every day in order to complete the Studyplan 🎉

There's a card for the current day's lesson, and a list of all the lessons and tasks of the Studyplan regardless of the day so you know what's to come.

![The studyplan interface, showing the user's Studyplan and tasks](/public/screenshots/studyplan.webp)
<small>📜 Remember that you can ask Mate to create a new Studyplan for you, or just select an existing one in the [dashboard](#dashboard).</small>


### /studyplan/tasks

Here you can see the general goal of the day and a list of tasks to complete. Click on any of them to start working on it.

Mate will also be there to help you with your tasks, you can ask him to explain the task or just give you a hint.

Once you have completed all the tasks, Mate will congratulate you and you'd be free to enjoy your well deserved rest 🎉

![The tasks page, showing the user's tasks for the current day](/public/screenshots/studyplan-tasks.webp)
<small>🎯 You can access this page by clicking on the "Today's Lesson" card in the [Studyplan](#studyplan) page.</small>

### /studyplan/focus

This page is meant for you to *focus* and complete your tasks. There's a timer to help you stay focused and a list of tasks to complete.

On the bottom of the page you'll find a card with swapable tasks, here you can mark your task as done or swap it if you want to complete another one first.


![The focus page, showing the user's tasks for the current day](/public/screenshots/focus.webp)
<small>⚠️ This page is still under development. You can complete your tasks, but the timer and settings menu are not functional yet.</small>


### /profile
Here you can see your info, statistics and achievements. You'll also find lists of your saved and completed Studyplans.

Reach a high streak, collect trophies 🏆 and flex your grind 💪

![The profile page, showing the user's info, achievements and lists of saved and completed Studyplans](/public/screenshots/profile.webp)

<small>⚠️ This page is still under development. The achievements, statistics and streak are not fully implemented yet.</small>


## Future Additions

StudyMate is still in development and will keep getting updates — all of its content will still be free, of course.

📃 Planned features include:
- User profiles
- Achievements
- Streak tracking
- Study statistics
- Chat messages deletion and editing
- Mate responses streaming
- Max days for Studyplans increase

...and more cool stuff along the way.


## Can I Use This?

Totally! Just keep in mind that Studymate relies on private Supabase and OpenAI keys, so it's not exactly plug-and-play.

That said, you're more than welcome to dive into the codebase, check out how it's structured, or steal—I mean, *borrow*—components and logic for your own projects 😌

Here's what might be useful:
- `/components`: UI building blocks  
- `/lib`: Utility logic  
- `/hooks`: Custom hooks, some are modular


## Special Thanks
- Random YouTube Lo-fi and videogame music playlists.
- Mate.
- [Tabler Icons](https://tabler.io/icons) and [Heroicons](https://heroicons.com).
- ChatGPT, but you didn't hear it from me.