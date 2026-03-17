# 🛠️ Supabase Setup Guide for Jay Accounts

Follow these steps to set up your backend for the Enterprise Client Portal.

## 1. Create a Supabase Project
1. Go to [Supabase.com](https://supabase.com/) and sign in.
2. Click **"New Project"**.
3. Name it `Jay Accounts` and set a secure database password.
4. Choose the region closest to you (e.g., Mumbai for India).

## 2. Get Your Credentials
1. Once the project is ready, go to **Project Settings** (gear icon) > **API**.
2. Find the **Project URL** and **`anon` public key**.
3. Open the `.env` file in your code editor and paste them:
   ```env
   VITE_SUPABASE_URL=your_project_url_here
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

## 3. Enable Authentication (Crucial Step)
Authentication allows your clients to log in securely.

### A. Enable Email Provider
1. On the left-hand sidebar, click the **Authentication** icon (it looks like a person).
2. Click on **Providers** in the sub-menu.
3. You will see a list of providers (Email, Google, etc.). Click on **Email**.
4. Ensure the toggle for "Enable Email provider" is **ON** (Blue/Green).

### B. Configure Login Settings (For Easy Testing)
By default, Supabase requires users to click a link in their email to "confirm" their account before they can log in. To skip this for now:
1. In the same **Authentication** section, click on **Auth Settings** (or **Configuration** > **Email Results** depending on your dashboard version).
2. Look for the toggle labeled **"Confirm email"** (under the "Signup" or "Security" section).
3. **Turn this OFF**. This allows you to create a user and log in immediately without waiting for a verification email.
4. Click **Save** at the bottom of the page.

### C. Create Your First Client Account (Manually)
To test the login page right now:
1. Go to **Authentication** > **Users**.
2. Click **Add User** > **Create new user**.
3. Enter a test email (e.g., `test@client.com`) and a password.
4. Click **Create User**. You can now use these credentials on your website's `/login` page!

## 4. Setup Database Tables (SQL Editor)
Go to the **SQL Editor** in Supabase, click **"New Query"**, paste the following block, and click **Run**:

```sql
-- 1. Create Profiles Table (Linked to Auth)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  company_name text,
  role text default 'client',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Documents Table
create table documents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  category text not null,
  status text default 'In Review',
  file_url text, -- To be used when we upload real files
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. ENABLE SECURITY (CRITICAL)
alter table profiles enable row level security;
alter table documents enable row level security;

-- 4. CREATE POLICIES (Users only see THEIR OWN data)

-- Profiles Policies
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

-- Documents Policies
create policy "Users can view own documents" on documents
  for select using (auth.uid() = user_id);

create policy "Users can insert own documents" on documents
  for insert with check (auth.uid() = user_id);

-- 5. TRIGGER: Auto-create Profile on Signup
-- This function runs every time a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, company_name)
  values (
    new.id, 
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'company_name'
  );
  return new;
end;
$$ language plpgsql security definer;

-- The actual trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

---

## 5. Setup Storage (Secure Vault)
1. Go to **Storage** (box icon).
2. Create a new bucket called `client-vault`.
3. Set it to **Private** (sensitive documents should not be public).
4. (Optional but Recommended) Go to **Policies** in Storage and add a policy:
   - **Policy Name**: "Users can only access their own folder"
   - **Action**: SELECT, INSERT, UPDATE
   - **Logic**: `(auth.role() = 'authenticated') AND (bucket_id = 'client-vault') AND ((storage.foldername(name))[1] = auth.uid()::text)`

---
**Done!** Your app is now ready to handle real logins and document uploads.

