# ProjectShowcase

**ProjectShowcase** is a dynamic Next.js application that enables users to create, explore, and interact with projects shared by the community. Built with cutting-edge web technologies, it offers seamless authentication, robust filtering options, and an intuitive user experience.

<img width="800" alt="app-screenshot" src="https://github.com/user-attachments/assets/481bfdb4-5535-4678-9c11-89972379c716" />
<img width="800" alt="Zrzut ekranu 2025-01-2 o 11 31 22" src="https://github.com/user-attachments/assets/9626301f-0b22-4ce2-b01e-977fcff8bdac" />

## Features

### Authentication
- **NextAuth v5:** Supports credentials-based authentication.
- **Google OAuth Integration:** Users can log in securely with their Google accounts.

### User Functionality
- **Create Projects:** Share your work with the community by creating detailed project entries.
- **User Profile Dashboard:** Manage your projects and view your activity through a personalized dashboard.
- **Follow Users:** Stay updated by following other creators.
- **Like Projects:** Show appreciation by liking your favorite projects.

### Explore Projects
- **Category Filtering:** Browse projects based on specific categories.
- **Search Filter:** Quickly find projects using keywords.
- **Sorting Options:** Sort projects by popularity, date, or other criteria.
- **Pagination:** Navigate through large datasets efficiently.

### Media Management
- **Cloudinary Integration:** Store and manage user and project images seamlessly using Cloudinary.

### Responsive Design
- Fully optimized for desktop, tablet, and mobile devices, ensuring a seamless user experience.

## Tech Stack
- **Next.js:** Framework for server-side rendering and React-based web applications.
- **TypeScript:** Strongly typed programming language for safer and scalable code.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **Cloudinary:** Cloud-based media management for storing and retrieving images.
- **NextAuth v5:** Authentication solution for secure user logins.
- **Vercel:** Hosting for fast, reliable deployment.

## Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/project-showcase.git
   cd project-showcase
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   API_URL="http://localhost:3000/"
   MONGODB_URI=
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   ```
   Deploy the build folder to your preferred hosting service.

## Demo
Check out the live application: [ProjectShowcase](https://project-showcase-pied.vercel.app/explore)

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push to your branch and create a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

**Happy showcasing!**


