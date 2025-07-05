# Writing Test Pages Implementation Plan

This document outlines the steps to create separate pages for each writing test type.

## Action Items

- [x] **Step 1: Create New Page Components for Each Writing Test**
    - [x] Create `src/pages/GeneralTrainingWritingPage.tsx`
    - [x] Create `src/pages/AcademicWritingPracticePage.tsx`
    - [x] Create `src/pages/AdvancedWritingChallengePage.tsx`

- [x] **Step 2: Add New Routes in `App.tsx`**
    - [x] Add route for `/modules/writing/general-training`
    - [x] Add route for `/modules/writing/academic-practice`
    - [x] Add route for `/modules/writing/advanced-challenge`

- [x] **Step 3: Update Links in `ModuleDetail.tsx`**
    - [x] Change the "Start This Test" link for "General Training Writing" to point to `/modules/writing/general-training`.
    - [x] Change the "Start This Test" link for "Academic Writing Practice" to point to `/modules/writing/academic-practice`.
    - [x] Change the "Start This Test" link for "Advanced Writing Challenge" to point to `/modules/writing/advanced-challenge`.
