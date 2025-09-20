# IELTS AI: Level Up Your English

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

IELTS AI is a comprehensive SaaS platform designed to help English language learners prepare for the IELTS (International English Language Testing System) exam. Leveraging AI-powered tools and personalized learning paths, the platform helps users achieve their target band scores efficiently.

## Features

- **AI-Powered IELTS Preparation**: Personalized feedback and adaptive learning paths
- **Realistic Mock Tests**: Practice tests that mirror actual IELTS exams
- **Comprehensive Module Coverage**: Listening, Reading, Writing, and Speaking modules
- **Progress Tracking**: Dashboard with performance analytics and band score visualization
- **Instant Feedback**: Detailed scoring and improvement suggestions powered by AI

## Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) components
- **Routing**: [React Router](https://reactrouter.com/)
- **State Management**: [React Query](https://tanstack.com/query/latest) for server state, React Context for global state
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Framer Motion](https://www.framer.com/motion/)

### Backend
- **API Layer**: [Express.js](https://expressjs.com/)
- **AI Integration**: [OpenAI API](https://platform.openai.com/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)

### Additional Libraries
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Date Handling**: [date-fns](https://date-fns.org/)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ai-ielts-ace-prep
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   OPENAI_ORGANIZATION=your_openai_organization
   ```

### Development

Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:8080`.

Start the backend server:
```bash
npm run server
# or
yarn server
```

The backend API will be available at `http://localhost:3001`.

### Building for Production

To create a production build:
```bash
npm run build
# or
yarn build
```

To preview the production build:
```bash
npm run preview
# or
yarn preview
```

### Linting and Type Checking

Run ESLint:
```bash
npm run lint
# or
yarn lint
```

Run TypeScript type checking:
```bash
npm run type-check
# or
yarn type-check
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── integrations/   # Third-party service integrations
├── lib/            # Utility functions and libraries
├── pages/          # Page components
├── types/          # TypeScript type definitions
└── App.tsx         # Main application component
```

## IELTS Reading Module

The IELTS Reading module provides AI-generated passages and questions for both Academic and General Training tests:

### Features
- **Passage Generation**: AI-powered generation of realistic IELTS reading passages
- **Question Types**: Support for all IELTS reading question types including:
  - Multiple Choice
  - True/False/Not Given
  - Matching Headings
  - Sentence Completion
  - Short Answer Questions
  - And more
- **Adaptive Difficulty**: Questions adjusted based on user performance
- **Detailed Scoring**: Band score calculation with detailed feedback

### API Endpoints
- `POST /api/ielts/generate-passage`: Generate a reading passage
- `POST /api/ielts/generate-questions`: Generate questions for a passage
- `POST /api/ielts/score-test`: Score a completed test with feedback

## Contributing

We welcome contributions to IELTS AI! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue on the GitHub repository or contact our team at [support@ielts-ai.com](mailto:support@ielts-ai.com).

## Acknowledgments

- Thanks to [OpenAI](https://openai.com/) for providing the AI capabilities that power this platform
- Thanks to all the open-source projects that made this platform possible