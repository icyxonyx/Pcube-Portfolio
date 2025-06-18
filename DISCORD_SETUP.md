# Discord Contact Form Setup

This guide will help you set up Discord notifications for your portfolio contact form.

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Create a Discord Webhook

1. **Open your Discord server** (or create one if you don't have one)

2. **Go to Server Settings:**

   - Right-click on your server name
   - Select **"Server Settings"**

3. **Navigate to Integrations:**

   - Click on **"Integrations"** in the left sidebar
   - Click on **"Webhooks"**

4. **Create a New Webhook:**

   - Click **"Create Webhook"**
   - Name it like **"Portfolio Contact Form"**
   - Choose the channel where you want to receive notifications
   - Optionally, upload an avatar for the webhook

5. **Copy the Webhook URL:**

   - Click **"Copy Webhook URL"**
   - Save this URL — you'll need it in the next step

---

### Step 2: Configure Environment Variables

1. **Open your `.env.local` file** in your project root

2. **Add your Discord webhook URL:**

   ```env
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_URL_HERE
   ```

3. **Replace** `YOUR_WEBHOOK_URL_HERE` with the URL you copied from Discord

---

### Step 3: Test the Setup

1. **Start your development server:**

   ```bash
   npm run dev
   ```

2. **Go to your portfolio** and navigate to the contact section

3. **Fill out and submit the contact form**

4. **Check your Discord channel** — you should see a notification with the form submission!

---

## 📱 What You'll Receive

When someone submits your contact form, you'll get a Discord message with:

- 👤 **Name**
- 📧 **Email address**
- 📝 **Subject**
- 💬 **Message**
- 🕒 **Timestamp**
- 🌐 **IP address**

---

## 🎨 Customization

You can customize the Discord notifications by editing `/app/api/contact/route.ts`:

- 🎨 **Change colors** → Modify the `color` field (hex color as number)
- ➕ **Add fields** → Add entries to the `fields` array
- 🖼 **Change avatar** → Modify `avatar_url` or `thumbnail.url`
- 🧾 **Change name** → Set a custom `username`

---

## 🔒 Security Features

- ✅ **Rate limiting**: 5 submissions per 15 minutes per IP
- ✅ **Input validation**: Required and sanitized fields
- ✅ **XSS protection**: Dangerous characters stripped
- ✅ **IP tracking**: For abuse detection

---

## 🚀 Production Deployment

### ✅ Vercel

1. **Add the environment variable** in the Vercel dashboard:

   - Go to your **project settings**
   - Open **"Environment Variables"**
   - Add:

     ```
     Key: DISCORD_WEBHOOK_URL
     Value: https://discord.com/api/webhooks/...
     ```

2. **Redeploy** your project for changes to take effect.

---

### ✅ Netlify

1. **Log into Netlify** and go to your site

2. Navigate to:

   - **Site Settings** → **Environment Variables**

3. **Add the variable**:

   - `Key`: `DISCORD_WEBHOOK_URL`
   - `Value`: `https://discord.com/api/webhooks/…`

4. **Save** and **redeploy** your site

5. If you’re using a build command like `npm run build`, make sure Netlify installs dependencies and builds your site properly.

---

## 📞 Support

If something doesn't work:

- 🔗 **Double-check webhook URL**
- 🔐 **Ensure Discord server allows webhooks**
- 🛠 **Look for errors in the browser console**
- 🧪 **Test in development** before deploying

---

## 🎯 Benefits of Discord Integration

- 🔔 **Instant notifications** on desktop and mobile
- 💌 **No email setup needed**
- 🎨 **Rich formatting** via Discord embeds
- 💸 **Free and reliable**
- 📱 **Mobile-friendly alerts**
- 📚 **Searchable message history**

---
