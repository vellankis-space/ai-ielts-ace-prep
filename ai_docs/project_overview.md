# IELTS AI Platform - Project Overview

This document provides a comprehensive overview of the IELTS AI preparation platform, detailing its purpose, features, technical architecture, and key components.

## Project Purpose

The IELTS AI platform is a comprehensive SaaS solution designed to help English language learners prepare for the IELTS (International English Language Testing System) exam. The platform leverages AI-powered tools and personalized learning paths to help users achieve their target band scores.

## Key Features

### 1. AI-Powered IELTS Preparation
- Personalized feedback and adaptive learning paths
- Realistic mock tests that mirror actual IELTS exams
- Detailed scoring and improvement suggestions
- Instant, actionable feedback powered by advanced AI

### 2. Comprehensive Module Coverage
- **Listening**: Audio comprehension with diverse accents and realistic test scenarios
- **Reading**: Academic and general texts with speed/comprehension training
- **Writing**: AI-powered grammar and structure feedback for Tasks 1 and 2
- **Speaking**: Pronunciation analysis and fluency improvement

### 3. User Dashboard
- Progress tracking with band score visualization
- Test history and performance analytics
- Personalized study plans and recommendations
- Strengths/weaknesses identification
- Achievement system and goal setting

### 4. Testing System
- Diagnostic tests to identify current level
- Full mock tests simulating real IELTS experience
- Module-specific practice tests
- Detailed results with AI feedback

## Technical Architecture

### Frontend
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn-ui components
- **Routing**: React Router
- **State Management**: React Query for server state, React Context for global state
- **UI Components**: Extensive use of Radix UI and custom components
- **Animations**: Framer Motion

### Backend
- **Platform**: Supabase (authentication, database, real-time features)
- **Database**: PostgreSQL with Supabase

### Additional Libraries
- **Form Handling**: React Hook Form with Zod validation
- **Data Visualization**: Recharts
- **Date Handling**: date-fns
- **UI Components**: 
  - @radix-ui/react-* components
  - cmdk (command menu)
  - embla-carousel-react (carousel)
  - sonner (notifications)
  - vaul (drawer components)

## Key Pages and Components

### Main Pages
1. **Homepage** (`Index.tsx`): Marketing landing page with features, testimonials, and CTAs
2. **Dashboard** (`Dashboard.tsx`): Personalized user dashboard with progress overview
3. **Module Selection** (`ModuleSelection.tsx`): Choose between IELTS modules or comprehensive tests
4. **Test Interface**: Interactive test-taking environment
5. **Results Pages**: Detailed performance analysis with AI feedback
6. **Authentication Pages**: Login, signup, password reset flows
7. **Specialized Pages**: About, Contact, FAQ, Terms, Privacy Policy

### Authentication System
- Login, signup, and password recovery flows
- Google authentication integration
- Protected routes for authenticated users only
- Profile management

### Writing Test System
- Sequential task flow (Task 1 followed by Task 2)
- 60-minute countdown timer
- Live word count for each task
- Submission and results flow

### Game Mode
- Mini-games for vocabulary and general improvement
- Toggle button in navigation bar
- Dedicated games page
- User profile integration for game mode preferences

## Target Audience

English language learners preparing for the IELTS exam who want:
- Personalized learning paths
- AI-powered feedback on their performance
- Realistic practice tests
- Progress tracking and goal setting
- Comprehensive preparation across all IELTS modules

## Development Features

### UI/UX Enhancements
- Consistent theme application across all pages
- Shadcn/ui component integration for modern UI elements
- Responsive design for all device sizes
- Smooth page transitions using Framer Motion
- Animated elements for better user engagement

### Technical Features
- Type-safe development with TypeScript
- Modern React patterns with hooks and context
- Component-based architecture for reusability
- Proper error handling and loading states
- SEO-friendly structure

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── integrations/   # Third-party service integrations (Supabase)
├── lib/            # Utility functions and libraries
├── pages/          # Page components
└── App.tsx         # Main application component
```

## Deployment

The platform is designed as a modern web application that can be deployed to various hosting platforms. The project uses Vite for building and includes standard npm scripts for development, building, and previewing the application.

This platform represents a complete solution for IELTS preparation with a focus on using AI to provide personalized feedback and adaptive learning experiences, helping users efficiently prepare for and succeed in their IELTS exams.