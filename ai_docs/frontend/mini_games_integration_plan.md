# Mini-Games Integration Plan

This document outlines the detailed steps to integrate mini-games for IELTS vocabulary and general improvement, along with a toggle button in the navigation bar.

## Phase 1: Database Schema Modification (Supabase)

- [x] **Create `profiles` table and RLS policies:** Created `profiles` table with `game_mode_enabled` and `game_mode_disabled_timestamp` columns, and set up RLS policies in Supabase.
- [x] **Create `handle_new_user` trigger:** Created a trigger to automatically create a profile for new users in Supabase.
- [x] **Generate Supabase types:** Updated `src/integrations/supabase/types.ts` to reflect the new schema.

## Phase 2: Update `AuthContext` to Fetch User Profile

- [x] **Modify `src/hooks/auth-context.ts`:** Updated `AuthContextType` to include `profile` data.
- [x] **Modify `src/hooks/useAuth.tsx`:** Added logic to fetch user profile from Supabase and provide it via `AuthContext`.

## Phase 3: Update `GameModeContext` to Use Supabase

- [x] **Modify `src/hooks/GameModeContext.tsx`:** Updated to use `useAuth` for profile data and interact with Supabase for game mode updates, removing `localStorage` usage.

## Phase 2: Implementing the Toggle Button in `Header.tsx`

- [x] **Create `GameModeToggle.tsx`:** Create `src/components/GameModeToggle.tsx` to encapsulate the UI for the toggle button, using `src/components/ui/switch.tsx` and `useGameMode`.
- [x] **Integrate `GameModeToggle` into `Header.tsx`:** Place the `GameModeToggle` component next to the user profile icon (or Login/Sign Up buttons) in `src/components/Header.tsx`.

## Phase 3: Adding "Games" Link to `Header.tsx`

- [x] **Add "Games" Link:** Add a new `Link` component for "/games" next to the "Modules" dropdown in `src/components/Header.tsx`.

## Phase 4: Creating a Placeholder Games Page

- [x] **Create `GamesPage.tsx`:** Create a new page component `src/pages/GamesPage.tsx` to serve as the entry point for mini-games.
- [x] **Update `App.tsx` for Routing:** Add a new route for `/games` in `src/App.tsx` to render the `GamesPage` component.

## Phase 5: Integrating Mini-Games (Placeholder)

- [x] **Create Placeholder Mini-Game Component:** Create a simple `VocabularyGame.tsx` in `src/components/games/`.
- [x] **Conditional Rendering in `GamesPage.tsx`:** Modify `GamesPage.tsx` to conditionally display the `VocabularyGame` if `isGameModeEnabled` is true.

## Phase 6: Testing and Refinement

- [ ] **Manual Testing:** Verify the toggle button functionality, persistence, and the "Games" link navigation.
- [ ] **UI/UX Review:** Ensure the new elements are well-aligned and visually consistent with the existing design.
- [ ] **Code Quality:** Run linters and formatters.
