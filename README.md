# MiniFlix

A Nuxt app that allows users to search for and view details of movies using the [OMDb API](https://www.omdbapi.com/). Recently viewed movies are stored locally and prepopulated for easy access.

---

## Demo Link (Vercel)

This app is hosted on https://xcentium-mini-netflix-app.vercel.app/

## Features

- Search movies by title
- View full movie details
- Automatically save last viewed movies (in `localStorage`)
- Responsive design (mobile-friendly)

---

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/iampawan31/xcentium-mini-netflix-app.git
   cd xcentium-mini-netflix-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Add Environment Variables**

   Create a `.env` file (or `.env.local` in Nuxt):

   ```env
   OMDB_API_KEY=your_api_key_here
   ```

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

5. **Build for Production**

   ```bash
   npm run build
   npm run preview
   ```
