# New Page Creation Plan

This document outlines a detailed step-by-step approach for creating new pages within the `src/pages/` directory, ensuring consistency with the existing project structure and styling.

## General Steps for Creating a New Page

1.  **Define Page Purpose and Content:**
    *   [x] Clearly understand the purpose and required content for the new page (e.g., "About Us" needs company mission, vision, team; "Contact" needs form/contact info).

2.  **Create the Page Component File:**
    *   [x] Create a new `.tsx` file in `src/pages/` (e.g., `src/pages/ContactPage.tsx`).
    *   [x] Ensure the file name follows existing conventions (e.g., `PascalCase` ending with `Page.tsx`).

3.  **Scaffold Basic React Component:**
    *   [x] Import `React` and `Layout` component.
    *   [x] Define a functional component (e.g., `const ContactPage: React.FC = () => { ... };`).
    *   [x] Export the component as default.

4.  **Integrate with `Layout` Component:**
    *   [x] Wrap the page content within the `Layout` component to ensure consistent header, footer, and overall structure.

5.  **Add Initial Content and Structure (Leveraging Shadcn UI):**
    *   [x] Add a main `div` with appropriate Tailwind CSS classes for container, padding, and margin (e.g., `className="container mx-auto px-4 py-8"`).
    *   [x] Add a main heading (`h1`) for the page title (e.g., `About Us`, `Contact Us`, `FAQ`).
    *   [x] **Identify and Integrate Shadcn UI Components:** For visually appealing and interactive elements (e.g., forms, accordions, cards, buttons), identify suitable Shadcn UI components.
        *   *Tip: Use `resolve_library_id` and `get_library_docs` to access Shadcn UI documentation. For example, to find Shadcn UI documentation, you can use `resolve_library_id(libraryName='shadcn/ui')` and then `get_library_docs(context7CompatibleLibraryID='/shadcn/ui')`.*
    *   [x] Import necessary Shadcn UI components at the top of the file (e.g., `import { Button } from '@/components/ui/button';`).
    *   [x] Replace placeholder HTML elements with their Shadcn UI equivalents where appropriate (e.g., `<button>` with `<Button>`, `<form>` elements with `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage` from Shadcn's form component).
    *   [x] Add placeholder paragraphs (`p`) or specific elements for the page's content.
    *   [x] Use semantic HTML where appropriate.

6.  **Update `App.tsx` for Routing:**
    *   [x] Open `src/App.tsx`.
    *   [x] Import the newly created page component (e.g., `import ContactPage from './pages/ContactPage';`).
    *   [x] Add a new `Route` within the `Routes` component, specifying the `path` and `element` for the new page (e.g., `<Route path="/contact" element={<ContactPage />} />`).
    *   [x] Ensure the path is logical and user-friendly (e.g., `/about-us`, `/contact`, `/faq`).

7.  **Add Navigation Links (Optional but Recommended):**
    *   [x] Identify appropriate navigation areas (e.g., `src/components/Footer.tsx` for policy pages, `src/components/Header.tsx` for main navigation).
    *   [x] Open the relevant component file.
    *   [x] Add a `Link` component (from `react-router-dom`) pointing to the new page's path.
    *   [x] Ensure the link text is clear and descriptive.

8.  **Apply Project-Consistent Styling:**
    *   [x] Review existing components and `index.css` for common styling patterns (e.g., font sizes, colors, spacing).
    *   [x] Apply Tailwind CSS classes to elements within the new page component to match the project's visual style.
    *   [ ] If custom CSS is needed, add it to `App.css` or create a new CSS module if the project uses them.

9.  **Review and Test:**
    *   [ ] Run the development server (`npm run dev` or `bun dev`).
    *   [ ] Navigate to the new page's URL to verify it renders correctly.
    *   [ ] Check responsiveness on different screen sizes.
    *   [ ] Test navigation links to ensure they lead to the correct page.
    *   [x] Run `npm run build`

---

## Specific Pages to Create (if not already existing):

### About Us Page (`AboutUsPage.tsx`)
- [x] Create `src/pages/AboutUsPage.tsx`
- [ ] Add content: Mission, Vision, Team (placeholders), leveraging Shadcn UI components for sections like team cards or testimonials.
- [x] Add route `/about-us` in `App.tsx`
- [x] Add link in `Footer.tsx` or `Header.tsx`

### Contact Page (`ContactPage.tsx`)
- [x] Create `src/pages/ContactPage.tsx`
- [ ] Add content: Contact form (placeholder), email, phone, address. **Strongly recommend using Shadcn UI's `Form` component for the contact form.**
- [x] Add route `/contact` in `App.tsx`
- [x] Add link in `Footer.tsx` or `Header.tsx`

### FAQ Page (`FaqPage.tsx`)
- [x] Create `src/pages/FaqPage.tsx`
- [x] Add content: Accordion/list of common questions and answers (placeholders). **Strongly recommend using Shadcn UI's `Accordion` component.**
- [x] Add route `/faq` in `App.tsx`
- [x] Add link in `Footer.tsx`

### Terms of Service Page (`TermsOfServicePage.tsx`)
- [x] Create `src/pages/TermsOfServicePage.tsx`
- [x] Add content: Legal terms and conditions (placeholder). Consider using Shadcn UI's `Card` or `ScrollArea` for better presentation of long text.
- [x] Add route `/terms-of-service` in `App.tsx`
- [x] Add link in `Footer.tsx`

### Privacy Policy Page (`PrivacyPolicyPage.tsx`)
- [x] Create `src/pages/PrivacyPolicyPage.tsx`
- [x] Add content: Privacy policy details (placeholder). Consider using Shadcn UI's `Card` or `ScrollArea` for better presentation of long text.
- [x] Add route `/privacy-policy` in `App.tsx`
- [x] Add link in `Footer.tsx`

### Cookie Policy Page (`CookiePolicyPage.tsx`)
- [x] Create `src/pages/CookiePolicyPage.tsx`
- [x] Add content: Cookie usage details (placeholder). Consider using Shadcn UI's `Card` or `Table` for presenting cookie details.
- [x] Add route `/cookie-policy` in `App.tsx`
- [x] Add link in `Footer.tsx`
