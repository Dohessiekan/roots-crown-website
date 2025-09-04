#!/bin/bash

# Hostinger Deployment Script
# This script will be executed on Hostinger when deploying

echo "🚀 Starting Hostinger deployment for Roots & Crown website..."

# Set Node.js version
echo "📦 Setting up Node.js environment..."
export NODE_VERSION="18"

# Install dependencies
echo "📥 Installing dependencies..."
npm ci --production=false

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Setup database
echo "🗄️ Setting up database..."
node hostinger-setup.js

# Build the application
echo "🔨 Building application..."
npm run build

# Clean up development dependencies to reduce size
echo "🧹 Cleaning up..."
npm prune --production

echo "✅ Deployment completed successfully!"
echo "🌐 Your website should now be available at your domain"
echo "📊 Admin panel available at: /admin"
echo "📧 Email notifications configured and ready"
echo "💾 Database initialized with all staff and services"
