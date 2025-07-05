# Authentication Forms UX Enhancement: Theming

This document outlines the steps to enhance the User Experience (UX) of the `LoginForm.tsx`, `SignupForm.tsx`, and `ForgotPasswordForm.tsx` components by aligning their visual theme with the main landing page's aesthetic (blue/teal gradients).

## Action Items

- [x] **Global Theme Integration (AuthLayout):**
    - [x] Ensure the `AuthLayout`'s background gradient (`from-blue-50 via-white to-teal-50`) is effectively utilized and visible behind the forms.
    - [x] Adjust the overall padding/margins in `AuthLayout` to allow more of the background gradient to show, if necessary.

- [x] **Form Container Theming:**
    - [x] Apply a subtle background color or gradient to the form container (`mx-auto grid w-[350px] gap-6`) within each component (`LoginForm`, `SignupForm`, `ForgotPasswordForm`) to complement the main theme, rather than a stark white.
    - [x] Add subtle shadows or borders to the form container for depth.

-   [x] **Primary Button Styling:**
    -   [x] Update the primary action buttons (e.g., "Sign In", "Sign Up", "Send Reset Link") to use a gradient background consistent with the main theme (e.g., `bg-gradient-to-r from-blue-600 to-teal-500`).
    -   [x] Ensure text color on primary buttons is white for contrast.
    -   [x] Add hover effects that subtly change the gradient or lighten/darken the button.

-   [x] **Secondary Button Styling:**
    -   [x] Update secondary action buttons (e.g., "Login with Google", "Sign Up with Google") to use an `outline` variant with a border color that matches the primary theme colors.
    -   [x] Ensure text color on secondary buttons aligns with the theme (e.g., `text-blue-600`).

-   [x] **Text and Link Styling:**
    -   [x] Adjust the color of primary headings (`h1`) and descriptive text (`p`) within the forms to better integrate with the new theme (e.g., `text-blue-800` or `text-teal-700` for headings, `text-gray-600` or `text-muted-foreground` for descriptions, but ensuring it's not too dark against a potentially lighter form background).
    -   [x] Ensure all `Link` components (e.g., "Forgot your password?", "Sign up", "Login") use the theme's accent color (e.g., `text-blue-600` or `text-teal-500`) and have appropriate hover states.

-   [x] **Input Field Refinement:**
    -   [x] Apply subtle border colors to input fields that complement the theme.
    -   [x] Enhance focus states for input fields (e.g., a subtle glow or border color change using the theme's accent color).

-   [x] **Branding Column Enhancement:**
    -   [x] Review the branding column's background (`bg-gray-800`) and text colors (`text-white`) in `LoginForm.tsx`, `SignupForm.tsx`, and `ForgotPasswordForm.tsx` to ensure they harmoniously blend with the overall blue/teal theme. Consider using a darker blue/teal shade or a complementary color.

- [x] **Review and Refine:**
    - [x] Review all three components (`LoginForm`, `SignupForm`, `ForgotPasswordForm`) to ensure visual consistency and adherence to the new theme.
    - [x] Test responsiveness across different screen sizes.
    - [x] **Resolved Blank Screen Issue:** Addressed import errors and layout conflicts to ensure proper rendering of authentication pages.

## IELTS AI Branding on Auth Pages

-   [x] **Modify `src/components/LoginForm.tsx`:**
    *   [x] Remove the branding from the right column.
    *   [x] Add the "IELTS AI" logo and text above the form, ensuring it's centered.
-   [x] **Modify `src/components/SignupForm.tsx`:**
    *   [x] Apply the same changes as described for `LoginForm.tsx`.
-   [x] **Modify `src/components/ForgotPasswordForm.tsx`:**
    *   [x] Apply the same changes as described for `LoginForm.tsx`.

## ShadCN UI Auth Pages Update
- [x] **Implement `shadcn/ui` `login-04` component for Login Page:**
    - [x] Create `src/pages/LoginPage.tsx` with the `login-04` layout.
    - [x] Replace placeholder branding in `LoginPage.tsx` with "IELTS AI" and `BookOpen` icon.
    - [x] Ensure `LoginPage.tsx` imports and uses `src/components/LoginForm.tsx`.
    - [x] Modify `src/pages/AuthLayout.tsx` to render `LoginPage.tsx` for the login route.
    - [x] Verify the new login page UI and functionality.
- [x] **Update `SignupForm.tsx` to match `shadcn/ui` style:**
    - [x] Create `src/pages/SignupPage.tsx` with the `login-04` layout.
    - [x] Replace placeholder branding in `SignupPage.tsx` with "IELTS AI" and `BookOpen` icon.
    - [x] Ensure `SignupPage.tsx` imports and uses `src/components/SignupForm.tsx`.
    - [x] Modify `src/pages/AuthLayout.tsx` to render `SignupPage.tsx` for the signup route.
    - [x] Verify the updated signup page UI and functionality.
- [x] **Update `ForgotPasswordForm.tsx` to match `shadcn/ui` style:**
    - [x] Create `src/pages/ForgotPasswordPage.tsx` with the `login-04` layout.
    - [x] Replace placeholder branding in `ForgotPasswordPage.tsx` with "IELTS AI" and `BookOpen` icon.
    - [x] Ensure `ForgotPasswordPage.tsx` imports and uses `src/components/ForgotPasswordForm.tsx`.
    - [x] Modify `src/pages/AuthLayout.tsx` to render `ForgotPasswordPage.tsx` for the forgot password route.
    - [x] Verify the updated forgot password page UI and functionality.

## Theming and Layout Refinements
- [x] **Apply Home Page Theme to Login Page:**
    - [x] Adjust styling in `src/pages/LoginPage.tsx` and `src/components/LoginForm.tsx` to align with the home page's visual theme (blue/teal gradients, typography, etc.).
- [x] **Apply Home Page Theme to Forgot Password Page:**
    - [x] Adjust styling in `src/pages/ForgotPasswordPage.tsx` and `src/components/ForgotPasswordForm.tsx` to align with the home page's visual theme.
- [x] **Shorten Forgot Password Page Layout:**
    - [x] Review and condense the content and layout of `src/pages/ForgotPasswordPage.tsx` and `src/components/ForgotPasswordForm.tsx` to make it less lengthy.
- [x] **Re-add Branding to Forgot Password Page (Left Column):**
    - [x] Re-insert the "IELTS AI" text and icon into the left-most column of `src/pages/ForgotPasswordPage.tsx`.
- [x] **Update Top-Left Branding Theme and Hover Effect:**
    - [x] Apply home page theme and hover effects to the "IELTS AI" text and Book Open icon in the top-left corner of `src/pages/LoginPage.tsx`, `src/pages/SignupPage.tsx`, and `src/pages/pages/ForgotPasswordPage.tsx`.

## Bug Fixes
- [x] **Fix Reset Password Redirect:**
    - [x] Correct the redirect path in `src/pages/ResetPassword.tsx` from `/auth` to `/login` to ensure proper redirection after password reset.
