# Environment Variables Setup

## Required for Basic Functionality

The application will work without any environment variables, but some features require configuration:

### 1. NextAuth (Required for Production)

```env
NEXTAUTH_SECRET=your-random-secret-string-here
NEXTAUTH_URL=http://localhost:3000
```

**Generate secret:**
```bash
openssl rand -base64 32
```

### 2. Contact Form (Optional)

If you want the contact form to send emails, configure SMTP:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_TO_EMAIL=recipient@email.com
```

**Note:** For Gmail, you need to create an "App Password":
1. Go to Google Account Settings
2. Security → 2-Step Verification
3. App passwords → Generate

### 3. OAuth Providers (Optional)

For Google login:
```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

For GitHub login:
```env
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

## How to Setup

1. Create a file named `.env.local` in the root directory
2. Copy the required variables from above
3. Replace the values with your actual credentials
4. Restart the development server

## Default Behavior (Without .env.local)

- ✅ Login works with demo credentials: `Nasran2002` / `Nasran2002`
- ✅ Reviews stored in localStorage (client-side)
- ✅ Portfolio stored in localStorage (client-side)
- ❌ Contact form will show "SMTP not configured" error
- ❌ Social login (Google/GitHub) will not work

## Security Notes

- **Never commit `.env.local` to version control**
- The `.gitignore` already excludes `.env*` files
- Use different secrets for development and production

