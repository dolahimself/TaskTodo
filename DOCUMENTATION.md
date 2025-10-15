# Task Management App - TakTodo Documentation

Hey there! 👋 I wanted to share some insights into how I built the task management app and the thinking behind my decisions.

## Architecture Decisions

### Why Context API?

I went with React's Context API for state management instead of Redux or MobX. Here's why: this app doesn't have crazy complex state interactions. Context gives me exactly what I need, a way to share task data between screens without prop drilling—without the overhead of setting up a whole state management library.

Plus, it keeps the bundle size down and the code easier to understand.

### Component Structure

I tried to keep components focused on one thing. For example:

- `TaskItem` only cares about displaying a single task
- `SubTaskItem` handles just the subtask display and toggle
- `CategoryCard` is purely presentational

This made debugging so much easier. When something broke, I knew exactly where to look.

### Screen Organization

The app has three main screens, and I thought carefully about the navigation flow:

**HomeScreen**: This is your daily hub. I put the most important stuff here—today's tasks and a quick overview of your categories. The floating action button to add tasks is positioned where your thumb naturally rests (on most phones, anyway), and navigation to the calendar screen on press of the category card.

**CalendarScreen**: I wanted this to feel like a real planner. The horizontal date scroll was intentional—it mimics how you'd flip through a physical calendar. The 24-hour timeline view helps you see your day at a glance, and that red line showing the current time? That was a fun little detail that makes the calendar feel alive.

**ViewTaskScreen**: This needed to work for both creating and editing tasks. I made the title editable by default because, let's be honest, we all make typos or change our minds about how to phrase things. The subtask system was important to me because big tasks are less intimidating when broken into smaller chunks.

## Code Organization Choices

### File Structure

```
src/
├── components/     # Reusable UI pieces
├── screens/        # Full page views
├── navigation/     # React Navigation setup
├── context/        # State management
├── constants/      # Colors and theme values
├── data/           # Mock data (for now)
├── utils/          # computations relating to the app's core
└── types/          # TypeScript definitions
```

I kept things separated by function rather than by feature. It scales better as the project is a small one.

### TypeScript Usage

I'm pretty strict with my TypeScript types. Yeah, it takes a bit more time upfront, but it's saved me countless hours of debugging. Every component has proper prop types, and I avoid using `any` like the plague.

The `types.ts` file is my single source of truth. When I need to add a new field to a task, I update it there, and TypeScript tells me everywhere I need to make changes. It's like having a really attentive code reviewer.

### Styling Approach

All styles are in StyleSheet objects within each component file. Some people prefer separate style files, but I like having the styles right there where I'm using them. It makes it easier to see what's affecting what, and I don't have to jump between files constantly.

I created a `Colors` constant file to maintain consistency. This was a game-changer—when I wanted to tweak the color scheme, I changed it in one place and boom, everything updated.

## Features Implementation

### Task Categories

The four categories (Health, Work, Mental Health, Others) felt like natural groupings for most people's daily tasks. I color-coded them distinctly enough that they're easy to distinguish but kept them all professional-looking.

The count on each category card updates in real-time. It's a small thing, but it gives you instant feedback about how much you have going on in each area of your life.

### Subtasks System

This was crucial. A task like "Plan birthday party" is overwhelming, but breaking it into "Order cake," "Send invitations," "Buy decorations" makes it manageable. The checkboxes give you those little dopamine hits as you complete each piece.

### Time-based Calendar

The calendar view scrolls automatically to the current time when you open it. I wanted to reduce friction—you shouldn't have to hunt for "now" when you're checking your schedule.

The current time indicator (that red line) moves in real-time. It's subtle, but it helps maintain context about where you are in your day.

## State Management Flow

Here's how data flows through the app:

1. **TaskContext** holds all tasks in memory
2. **HomeScreen** reads tasks to display them and calculate category counts
3. When you toggle a task or navigate to edit it, **ViewTaskScreen** updates the context
4. Context notifies all subscribed components about the change
5. UI re-renders with updated data

It's straightforward and predictable. No magic, no surprises.

## Things I'd Improve

Being honest here—there are things I'd do differently with more time:

**Persistence**: Right now, tasks only live in memory. Close the app, and they're gone.

**Categories on Creation**: New tasks default to "Others" category. I'd add a category picker in the create/edit screen.

**Time Selection**: The calendar shows scheduled tasks, but there's no way to schedule a task from the create screen. That's a missing piece I'd add.

**Validation**: The only validation is checking for empty titles. I'd add more—like preventing duplicate subtask titles or limiting title length.

**Animations**: The app works, but it could feel more polished with smooth transitions between states.

## Testing Approach

I manually tested the main flows:

- Creating tasks with and without subtasks
- Editing existing tasks
- Toggling task completion
- Adding subtasks in the edit view
- Empty title validation

For a production app, I'd add proper unit tests for the context logic and integration tests for the critical user flows.

## Conventions I Followed

- **Naming**: Components are PascalCase, functions are camelCase, constants are UPPER_CASE
- **Component Files**: One component per file, default export at the bottom
- **Props**: Destructured in function parameters with TypeScript interfaces
- **Hooks**: Always at the top of components, never conditional
- **Comments**: Only where the code isn't self-explanatory (which hopefully isn't often)

## Running the Project

Standard React Native stuff:

```bash
npm install
npm run android  # or npm run ios
```

Make sure you have your React Native environment set up. The official docs are your friend if you run into issues.

## Final Thoughts

This project was a balance between functionality and simplicity. Every feature serves a purpose, and I tried to keep the user experience smooth and intuitive.

The codebase is structured in a way that should be easy to extend. Want to add task categories? Easy—just update the types and add to the categories array. Need to add task priorities? The structure supports it.

I'm pretty happy with how it turned out, but I'm always open to feedback and suggestions for improvement!

---

_P.S. - If you're reading this and something doesn't make sense, that's probably on me. Feel free to reach out with questions!_
