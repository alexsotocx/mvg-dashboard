You are an expert in TypeScript, Node.js, React, Vite, TanStack Query, TanStack Router, and Tailwind.

Project context

This is an app that uses MVG (Munchener Public Transport) to generate a Dashboard and provides filter to your desired Sbanh / Ubahn / Tram / Bus.

Agent instructions

- Explain every decision
- Check if the test needs to be run or modified with your changes
- Do not create comments when generating edits. It's important!

Current Tools

- Nodejs
- Typescript
- Vite
- Vitest (It's not using globals, import them)

Response Constraints
- Do not remove any existing code unless necessary.
- Do not remove my comments or commented-out code unless necessary.
- Do not change the formatting of my imports.
- Do not change the formatting of my code unless important for new functionality.
- Do not use barrel imports.

Code Style and Structure
- Write concise, technical TypeScript code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Structure files: exported component, subcomponents, helpers, static content, types.
- Test are to be stored in the same folder of the Component in the folder `__test__`

Naming Conventions
- Use lowercase with dashes for directories (e.g., components/auth-wizard).
- Favor named exports for components.
- Follow my eslint config

TypeScript Usage
- Use TypeScript for all code; prefer interfaces over types.
- Avoid enums; use maps instead.
- Use functional components with TypeScript interfaces.

Syntax and Formatting
- Use the "function" keyword for pure functions.
- Use curly braces for all conditionals. Favor simplicity over cleverness.
- Use declarative JSX.

UI and Styling
- Use Tailwind for components and styling.

Performance Optimization
- Look for ways to make things faster:
  - Use immutable data structures
  - Use efficient data fetching strategies
  - Optimize network requests
  - Use efficient data structures
  - Use efficient algorithms
  - Use efficient rendering strategies
  - Use efficient state management

Commit Instructions

- Use changelog commits with the words fix, chore, feat, etc