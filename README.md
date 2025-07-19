# Craftfolio 
The easiest way to create professional developer portfolios. Build, customize, and share your portfolio in minutes.

## ✨ Features
🚀 Quick Setup: Create a professional portfolio in minutes \
📱 Responsive Design: Looks great on all devices \
🔐 Secure Authentication: Powered by Clerk. \
☁️ Cloud Storage: Your data is safely stored on AWS DynamoDB. \
🤖 AI-Powered: Generate portfolio content using Gemini AI. \
🔗 Custom URLs: Share your portfolio with a personalized link. \
🎯 SEO Optimized: Built for search engine visibility. 

## ⚙️ Tech stack
- Next.js frontend framework 
- Vercel for hosting and deployment 
- Clerk for authentication 
- Tailwind CSS for styling utilities 
- AWS for cloud infrastructure 
- Google for Gemini AI 

## 🔄 How It Works
- **Sign Up**: Register or log in using Clerk authentication. 
- **Upload Resume**: Upload your resume; it will be securely stored in AWS S3.  
- **Content Generation**: Gemini AI will parse your PDF and extract structured content in JSON format. 
- **Customize, Preview & Publish**: Edit content in real time, preview your portfolio, and publish it instantly.


## 🎯 Live Demo
Check out the live application: [craftfolio.space](https://www.craftfolio.space/)

## 🚀 Run Locally
**Prerequisites** 
- Node.js 18+ 
- npm, yarn, pnpm, or bun 
- AWS account (for DynamoDB and S3 bucket) 
- Clerk account (for authentication) 
- Google Cloud account (for Gemini AI)

**Clone repo**
```bash
git clone https://github.com/thanoschild/craftfolio.git
cd craftfolio
```

**Install dependencies**
```bash
npm install
```

**Set up your environment variables** 
```txt
Use the example.env file as a reference to define your environment variables.
```