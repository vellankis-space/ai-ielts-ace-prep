# Writing Test Pages Implementation Plan (Revised)

This document outlines the revised, detailed steps to create a proper, sequential writing test experience.

## Action Items

- [x] **Step 1: Overhaul the `WritingTestLayout.tsx` Component**
    - [x] Introduce test state management (`not_started`, `task_1`, `task_2`, `finished`).
    - [x] Implement a functional 60-minute countdown timer that starts on "Start Test".
    - [x] Add navigation controls: "Back to Writing Module", "Start Test", "Continue to Task 2", and "Submit Test".
    - [x] Implement a live word count for each textarea.

- [x] **Step 2: Redesign for Sequential Task Flow**
    - [x] Refactor the layout to show only one task at a time (Task 1, then Task 2).
    - [x] Ensure the content of Task 1 is saved in state when moving to Task 2.

- [x] **Step 3: Simplify Individual Writing Page Components**
    - [x] Refactor `GeneralTrainingWritingPage.tsx` to only provide task-specific content to the layout.
    - [x] Refactor `AcademicWritingPracticePage.tsx` to only provide task-specific content to the layout.
    - [x] Refactor `AdvancedWritingChallengePage.tsx` to only provide task-specific content to the layout.

- [x] **Step 4: Implement the Submission Flow**
    - [x] Implement the "Submit Test" button functionality.
    - [x] Ensure the test stops the timer, changes state to `finished`, and navigates to a results page.
