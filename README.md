# React Admin Dashboard - User & Post Management System

A modern, full-featured admin dashboard built with React, TypeScript, and Tailwind CSS for managing users and posts with full CRUD operations.

## 🚀 Features

### 🔐 Authentication

- User login/signup with JWT token-based authentication
- Protected routes and navigation guards
- Persistent session management

### 👥 User Management

- View all users with pagination and search
- View user details with complete information
- Edit user profiles (name, email, role)
- Role-based access control (USER/ADMIN)

### 📝 Post Management

- Create, read, update, and delete posts
- View all posts with pagination
- Rich text content support
- Author attribution
- Search functionality

### 🎨 UI/UX Features

- Responsive design with Tailwind CSS
- Clean, modern dashboard layout
- Loading states and error handling
- Form validation
- Confirmation dialogs
- Smooth navigation

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **TanStack Query (React Query)** - Data fetching & caching
- **Axios** - HTTP client

### Development Tools

- **Vite** - Build tool & dev server
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📁 Project Structure

```
src/
├── app/                 # App configuration & routing
├── pages/              # Page components
├── components/         # Reusable components
│   ├── users/         # User-related components
│   ├── posts/         # Post-related components
│   └── ui/            # Generic UI components
├── api/               # API service layer
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
├── lib/               # Core utilities & configuration
├── utils/             # Helper functions
└── styles/            # Global styles
```

## 🚦 Getting Started

### Prerequisites

- Node.js 16+ & npm/yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ibrahim-nazari/user-post-management-system.git
cd admin-dashboard-crud
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` file:

```env
VITE_API_URL=http://localhost:3000/api
```

4. Start the development server:

```bash
pnpm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🔧 Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint
- `pnpm run type-check` - Run TypeScript compiler check

## 🎯 API Integration

This project expects a REST API with the following endpoints:

### Authentication

- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `POST /auth/logout` - User logout
- `GET /auth/profile` - Get user profile

### Users

- `GET /users` - Get users (with pagination & search)
- `GET /users/:id` - Get specific user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Posts

- `GET /posts` - Get posts (with pagination & search)
- `GET /posts/:id` - Get specific post
- `POST /posts` - Create post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

## 📱 Pages & Routes

- `/login` - Login page
- `/signup` - Signup page
- `/users` - Users list
- `/users/:id` - User details
- `/users/:id/edit` - Edit user
- `/posts` - Posts list
- `/posts/:id` - Post details
- `/posts/create` - Create post
- `/posts/:id/edit` - Edit post

## 🎨 Styling

This project uses **Tailwind CSS** for styling. Key features:

- Responsive utility classes
- Custom color palette
- Component-based styling
- Dark mode ready (can be extended)

## 🔒 Security Features

- JWT token storage in localStorage
- Protected routes
- API request interception for auth headers
- Automatic token refresh handling
- Input validation on forms

## 📊 State Management

- **React Query** for server state
- **React hooks** for local state
- Optimistic updates for better UX
- Automatic cache invalidation

## 🧪 Testing

### To add testing:

```bash
pnpm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

### Example test structure:

```
__tests__/
├── components/
├── pages/
├── hooks/
└── utils/
```

## 📦 Deployment

### Build for production:

```bash
pnpm run build
```

The build output will be in the `dist` folder.

### Deploy to Vercel/Netlify:

1. Connect your repository
2. Set environment variables
3. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Ibrahim**

---

## 🚀 Quick Start with Mock API

For testing without a backend, you can use JSON Server:

1. Install JSON Server:

```bash
npm install -g json-server
```

2. Create `db.json`:

```json
{
  "users": [],
  "posts": []
}
```

3. Run JSON Server:

```bash
json-server --watch db.json --port 3000
```

4. Update `.env`:

```env
VITE_API_URL=http://localhost:3000
```

## 🔄 Future Enhancements

- [ ] Dark mode toggle
- [ ] Export data (CSV/PDF)
- [ ] Charts & analytics dashboard
- [ ] Real-time notifications
- [ ] Image upload for posts
- [ ] User profile pictures
- [ ] Email verification
- [ ] Password reset
- [ ] Multi-language support
- [ ] Unit & integration tests
- [ ] E2E testing with Cypress

## 📈 Performance Optimizations

- Code splitting with React.lazy()
- Image optimization
- Bundle size analysis
- Memoized components
- Debounced search inputs

---

**Built with ❤️ using modern web technologies**
