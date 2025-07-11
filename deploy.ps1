# Adaptive Personas - Deployment Script

Write-Host "🚀 Starting deployment..." -ForegroundColor Green

# Check if Vercel CLI is installed
try {
    vercel --version | Out-Null
    Write-Host "✅ Vercel CLI found" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

# Check if user is logged in
try {
    vercel whoami | Out-Null
    Write-Host "✅ Already logged in to Vercel" -ForegroundColor Green
} catch {
    Write-Host "🔐 Please login to Vercel..." -ForegroundColor Yellow
    vercel login
}

# Build the project
Write-Host "📦 Building the project..." -ForegroundColor Blue
npm run build

# Deploy to Vercel
Write-Host "🌐 Deploying to Vercel..." -ForegroundColor Blue
vercel --prod

Write-Host "✅ Frontend deployment complete!" -ForegroundColor Green
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Deploy your backend to Railway/Render/Heroku" -ForegroundColor Yellow
Write-Host "   2. Set NEXT_PUBLIC_API_URL in your Vercel dashboard" -ForegroundColor Yellow
Write-Host "   3. Your app will be live!" -ForegroundColor Yellow 