#  Project Deployment Guide: JN Shah Associates

This guide provides a step-by-step process for deploying the **JN Shah Associates** platform to a professional production environment.

---

##  1. Prerequisites
- A **GitHub / GitLab / Bitbucket** account.
- A **Vercel** account (Recommended for Vite/React).
- Access to your **Supabase Dashboard**.

---

##  2. Push Code to GitHub
1. Create a new repository on GitHub (e.g., `jn-shah-associates`).
2. Open your terminal in the project root:
   ```bash
   git init
   git add .
   git commit -m "feat: complete authentication and initial dashboard"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```

---

## ⚡ 3. Deploy to Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. **Import** your repository from GitHub.
3. **Configure Project**:
   - **Framework Preset**: Vite (detected automatically).
   - **Build Command**: `npm run build`.
   - **Output Directory**: `dist`.
4. **Environment Variables**:
   Open **"Environment Variables"** and add the following keys from your `.env` file:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_NEWSDATA_API_KEY`
5. Click **"Deploy"**.

---

## ⚙️ 4. Final Supabase Configuration (CRITICAL)
Once the project is deployed, you'll get a production URL (e.g., `https://jn-shah-associates.vercel.app`). You must authorize this URL in Supabase for authentication to work.

1. Go to **Supabase Dashboard > Authentication > URL Configuration**.
2. In **Site URL**, enter your production URL.
3. In **Redirect URLs**, add:
   - `https://your-production-url.vercel.app/update-password`
   - `https://your-production-url.vercel.app/dashboard`
4. Go to **Authentication > Email Templates > Reset Password** and ensure the link redirect is correct.

---

## ⏰ 5. Set Password Reset Expiry
1. In Supabase, go to **Authentication > Providers > Email**.
2. Find the **"Email OTP Expiration"** field.
3. Set it to **300** seconds (to match the 5-minute requirement).
4. Save changes.

---

## 🛠️ 6. Troubleshooting
- **"404 on Refresh"**: If you refresh the page on Vercel and get a 404, create a `vercel.json` file in the root directory:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```
- **"Supabase Credentials Missing"**: Double-check that all environment variables are correctly spelled in the Vercel dashboard.

---

## ✅ Deployment Checklist
- [ ] Build is successful (`npm run build`).
- [ ] Production URL is added to Supabase Redirects.
- [ ] Reset password flow works on production.
- [ ] News feed loads (NewsData API key is active).
