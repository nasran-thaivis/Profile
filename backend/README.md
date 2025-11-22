# Profile Backend API

NestJS Backend with Prisma ORM and PostgreSQL

## 🚀 Quick Start

### Development Mode

```bash
# Install dependencies
npm install

# Start PostgreSQL (if not using Docker)
# Update DATABASE_URL in .env

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database (optional)
npx prisma db seed

# Start development server
npm run start:dev
```

Backend will run on: `http://localhost:3001/api`

### Docker Mode

```bash
# From project root directory
docker-compose up --build

# Or run in background
docker-compose up -d --build

# View logs
docker-compose logs -f backend

# Stop containers
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## 📋 API Endpoints

### Health Check
- `GET /api/health` - Health check endpoint

### Users
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Contact Requests
- `GET /api/contact` - List all contact requests
- `GET /api/contact/:id` - Get contact request by ID
- `POST /api/contact` - Create new contact request
- `PUT /api/contact/:id/status` - Update contact status
- `DELETE /api/contact/:id` - Delete contact request

## 🗄️ Database

### Prisma Commands

```bash
# Create a new migration
npx prisma migrate dev --name <migration-name>

# Apply migrations in production
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio (Database GUI)
npx prisma studio

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Seed database
npx prisma db seed
```

### Database Schema

**Users Table:**
- id (UUID, Primary Key)
- email (String, Unique)
- name (String)
- password (String)
- createdAt (DateTime)
- updatedAt (DateTime)

**ContactRequests Table:**
- id (UUID, Primary Key)
- name (String)
- email (String)
- message (Text)
- status (String: new/read/replied)
- createdAt (DateTime)
- updatedAt (DateTime)

## 🔧 Environment Variables

Create `.env` file in backend directory:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/profiledb?schema=public"
PORT=3001
NODE_ENV=development
```

For Docker, these are set in `docker-compose.yml`

## 📦 Tech Stack

- **Framework**: NestJS 10.x
- **ORM**: Prisma 5.x
- **Database**: PostgreSQL 15
- **Language**: TypeScript
- **Container**: Docker + Docker Compose

## 🐛 Troubleshooting

### Port already in use
```bash
# Find process using port 3001
lsof -ti:3001 | xargs kill -9

# Find process using port 5432 (PostgreSQL)
lsof -ti:5432 | xargs kill -9
```

### Database connection error
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Ensure database exists: `createdb profiledb`

### Prisma Client not generated
```bash
npx prisma generate
```

## 📝 Notes

- Passwords are stored in plain text for development
- In production, use bcrypt to hash passwords
- CORS is enabled for `http://localhost:3000`
- API prefix is `/api`

