### Dashboard UX/UI Improvement Plan with Shadcn/ui

This plan outlines the steps to enhance the user experience and interface of the dashboard by integrating relevant components from the `shadcn/ui` library.

#### Phase 1: Assessment and Component Selection

- [x] **Review Existing Dashboard Components:**
    - [x] Analyze `src/components/dashboard/Achievements.tsx`
    - [x] Analyze `src/components/dashboard/GoalSetting.tsx`
    - [x] Analyze `src/components/dashboard/ProgressOverview.tsx`
    - [x] Analyze `src/components/dashboard/QuickAccess.tsx`
    - [x] Analyze `src/components/dashboard/StrengthsWeaknesses.tsx`
    - [x] Analyze `src/components/dashboard/StudyPlan.tsx`
    - [x] Analyze `src/components/dashboard/TestHistory.tsx`
    - [x] Analyze `src/components/dashboard/WelcomeSection.tsx`
    - [x] Identify specific UI elements within each component that can be replaced or enhanced with `shadcn/ui` components (e.g., buttons, cards, forms, data displays).

- [x] **Explore Shadcn/ui Library:**
    - [x] Identify suitable `shadcn/ui` components for each dashboard section based on the assessment.

#### Phase 2: Setup and Installation

- [x] **Verify Shadcn/ui Installation:**
    - [x] Check `components.json` to confirm `shadcn/ui` is initialized. If not, run `npx shadcn@latest init`.
    - [x] Ensure `tailwind.config.ts` and `postcss.config.js` are correctly configured for `shadcn/ui`.

- [x] **Install Necessary Shadcn/ui Components:**
    - [x] For each identified `shadcn/ui` component, run `npx shadcn@latest add [component-name]` (e.g., `npx shadcn@latest add button card input table progress chart`).

#### Phase 3: Component Integration (Iterative for each Dashboard Component)

- [x] **`src/components/dashboard/WelcomeSection.tsx`:**
    - [x] Replace existing greeting/introductory elements with `shadcn/ui` Card and Button components.
    - [x] Consider using `shadcn/ui` Avatar for user profile display.
    - [x] **Implement new card style for "Welcome back Surya" section and its internal cards.**
    - [x] **Change avatar fallback to use `User` icon instead of first letter of name.**

- [x] **`src/components/dashboard/QuickAccess.tsx`:**
    - [x] Refactor quick access links/buttons using `shadcn/ui` Button and Card components.
    - [ ] Potentially use `shadcn/ui` DropdownMenu for more options.

- [x] **`src/components/dashboard/ProgressOverview.tsx`:**
    - [x] **Integrate a `shadcn/ui` Chart component to display overall progress as a Radar Chart.**
    - [x] Display key metrics using `shadcn/ui` Card components.
    - [x] **Update radar chart style and match main page gradient theme.**
    - [x] **Add hover effect to the radar chart.**
    - [x] **Remove progress bars for each module.**
    - [x] **Adjust card layout for progress section.**
    - [x] **Adjust icon colors to match circle colors.**

- [x] **`src/components/dashboard/Achievements.tsx`:**
    - [x] Display achievements using `shadcn/ui` Card components.
    - [x] Use `shadcn/ui` Badge for achievement status or categories.
    - [ ] Implement a `shadcn/ui` Dialog for detailed achievement view.

- [x] **`src/components/dashboard/GoalSetting.tsx`:**
    - [x] Rebuild goal setting forms using `shadcn/ui` Form, Input, Select, and Button components.
    - [x] Utilize `shadcn/ui` Calendar for date selection.

- [x] **`src/components/dashboard/StudyPlan.tsx`:**
    - [x] Structure study plan sections using `shadcn/ui` Accordion or Collapsible components.
    - [x] Display tasks/modules using `shadcn/ui` Card or Table components.
    - [ ] Use `shadcn/ui` Checkbox for task completion.

- [x] **`src/components/dashboard/TestHistory.tsx`:**
    - [x] Display test results using `shadcn/ui` Table component with sorting and pagination.
    - [x] Implement filtering options using `shadcn/ui` Input and Select.

- [x] **`src/components/dashboard/StrengthsWeaknesses.tsx`:**
    - [x] Visualize strengths and weaknesses using `shadcn/ui` Chart components.
    - [x] Present insights using `shadcn/ui` Card components.

#### Phase 4: Refinement and Verification

- [ ] **Code Refactoring and Cleanup:**
    - [ ] Remove old UI component imports and code.
    - [ ] Ensure consistent styling and responsiveness across all dashboard components.
    - [ ] Optimize imports and code structure.

- [ ] **Run Linting and Type Checking:**
    - [ ] Execute `npm run lint` (or equivalent) to ensure code quality.
    - [ ] Execute `tsc` (or equivalent) for type checking.

- [ ] **Testing:**
    - [ ] Manually test all dashboard functionalities to ensure correct behavior and improved UX/UI.
    - [ ] If applicable, run existing unit/integration tests.
