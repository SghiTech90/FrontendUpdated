#!/bin/bash
echo "🧹 Cleaning iOS build..."
cd ios
rm -rf build
rm -rf Pods
rm -rf Podfile.lock
echo "✅ Cleaned build artifacts"

echo "📦 Installing pods..."
pod install
echo "✅ Pods installed"

cd ..
echo "🚀 Building and running iOS app..."
npx react-native run-ios
