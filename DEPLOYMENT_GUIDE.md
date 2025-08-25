# Vercel Deployment Guide for FetchIt Angular Application

## Prerequisites
- Node.js installed (version compatible with Angular 19)
- Vercel CLI installed (`npm install -g vercel`)
- Git repository set up

## Deployment Steps

### 1. Build the Application
```bash
npm run build
```

This will create production files in the `dist/fetchit_clone` directory.

### 2. Install Vercel CLI (if not already installed)
```bash
npm install -g vercel
```

### 3. Deploy to Vercel
```bash
vercel
```

Follow the interactive prompts:
- Log in to your Vercel account (or create one)
- Link to existing project or create new
- Confirm build settings

### 4. Alternative: Deploy via Git Integration
1. Push your code to GitHub/GitLab
2. Connect your repository in Vercel dashboard
3. Vercel will automatically deploy on each push

## Configuration Details

### Vercel Configuration (`vercel.json`)
- Routes all requests to the built Angular application
- Uses static file serving for optimal performance
- Compatible with Angular's client-side routing

### Build Configuration
- Production build with optimization enabled
- Output path: `dist/fetchit_clone`
- SSR (Server-Side Rendering) ready configuration

## Environment Variables (If Needed)

If your application requires environment variables:
1. Set them in Vercel dashboard under Project Settings → Environment Variables
2. Common variables might include:
   - API endpoints
   - Authentication keys
   - Feature flags

## Testing the Deployment

After deployment, test:
- ✅ Home page loads correctly
- ✅ Authentication flow works
- ✅ Navigation between routes
- ✅ Form submissions
- ✅ API calls (if backend is deployed)

## Troubleshooting

### Common Issues:
1. **Routing issues**: Ensure `vercel.json` routes are correctly configured
2. **Build failures**: Check Node.js version compatibility
3. **Environment variables**: Verify they're set in Vercel dashboard

### Build Logs:
Check Vercel deployment logs for any build errors or warnings.

## Continuous Deployment

For automatic deployments:
1. Connect your Git repository to Vercel
2. Configure build settings in Vercel dashboard
3. Each push to main branch will trigger a new deployment

## Performance Optimization

Vercel automatically provides:
- Global CDN distribution
- Automatic HTTPS
- Edge caching
- Image optimization

## Support

For Vercel-specific issues, refer to:
- Vercel Documentation: https://vercel.com/docs
- Angular Deployment Guide: https://angular.io/guide/deployment
