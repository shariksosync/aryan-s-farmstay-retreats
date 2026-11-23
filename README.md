# Aryan’s Farmstay Retreats

# Project: Aryan's Farmstays – Premium Farmhouse Portfolio Website with Admin Panel

Build a modern, premium, responsive portfolio website for **Aryan's Farmstays**, a hospitality, agro-tourism, and private farmhouse rental business based in Pune, Maharashtra.

## 1. Technology Requirements (STRICT)

Use ONLY the following technologies:

- React.js
- Vite
- Tailwind CSS
- JavaScript
- React Hooks (useState, useEffect, useMemo, etc.)

**Strictly DO NOT use:**
- Next.js
- TypeScript
- React Router
- Redux
- Bootstrap
- Material UI
- Shadcn UI
- Any third-party UI component library
- Any icon library
- Any external database
- Firebase
- Supabase
- Node.js backend
- Express.js
- Any additional framework or library

Use native React components, CSS, Tailwind utility classes, and inline SVG icons wherever required.

Use mock data only. No database or backend integration is required.

All admin functionality should work using React state and mock data. LocalStorage can optionally be used for retaining demo data across browser refreshes.

## 2. Business Information

**Client Name:** Aryan's Farmstays

**Business Name:** Aryan's Farmstays

**Address:**
32/2/6, Sr No 26/3 B, Manjari Village Road, Lonkar Wasti, Keshav Nagar, Mundhwa, Mundhwa - Manjari Rd, Lonkar Nagar, Sade Satra Nali, Pune, Maharashtra 411036.

**Contact Numbers:**
9371088099 / 8888809809

**Email:**
aryansfarmsstays@gmail.com

**Business Description:**

Aryan's Farmstays is working in the field of hospitality, agro-tourism, and private farmhouse rentals. The business offers scenic countryside accommodations, swimming pool villas, open-lawn estates, and homestyle dining experiences across its flagship properties.

The two flagship properties are:

1. New Kolhe Khind Farms
2. Manas Agro Farms

The properties cater to:
- One-day picnics
- Overnight staycations
- Family gatherings
- Swimming pool parties
- Private celebrations
- Corporate outings
- Birthday parties
- Group get-togethers

## 3. Website Design & Color Theme

Create a premium, elegant, nature-inspired hospitality website.

The overall design should communicate:
- Luxury countryside experiences
- Relaxation and peaceful surroundings
- Nature and greenery
- Family-friendly hospitality
- Premium private farmhouse rentals

### Color Palette

Use the following colors consistently:

- Primary Forest Green: #244B36
- Secondary Olive Green: #657B4B
- Deep Green: #183A2A
- Warm Beige: #E9DFC9
- Cream Background: #F8F6EF
- Golden Accent: #C6A15B
- White: #FFFFFF
- Main Text: #303A32

Avoid bright neon colors and excessive gradients.

### Typography

Use elegant typography with a combination of:
- Large editorial-style headings
- Clean, readable body text
- Strong visual hierarchy

Use CSS font stacks and system fonts. Do not install external font libraries.

### Overall UI Style

- Premium farmhouse aesthetic
- Large photography sections
- Rounded image corners
- Spacious layouts
- Subtle hover animations
- Elegant buttons
- Beautiful property cards
- Smooth scrolling
- Responsive mobile navigation
- Clean and modern layouts

## 4. Public Website Modules

Create the following website sections.

### A. Header / Navigation

Create a premium sticky navigation bar.

Left:
- Aryan's Farmstays logo (create an elegant text-based logo with a simple leaf/house SVG symbol).

Right:
- Home
- About Us
- Our Farmhouses
- Experiences
- Gallery
- Contact Us
- Enquire Now button

On mobile, show a responsive hamburger menu.

### B. Hero Section

Create a full-width, visually impressive hero banner.

Use a large farmhouse/nature-themed banner image.

Image direction:
- Luxury farmhouse surrounded by greenery
- Swimming pool with scenic countryside background
- Beautiful lawn and outdoor seating
- Peaceful nature-inspired atmosphere

Use a dark transparent overlay so white text is readable.

Hero heading:

"Escape to Nature. Experience Luxury."

Subheading:

"Discover peaceful countryside escapes, private pool villas, beautiful open lawns and unforgettable moments with Aryan's Farmstays."

CTA Buttons:
- Explore Our Farmhouses
- Book Your Experience

Add a small bottom information strip highlighting:
- Private Farmhouses
- Swimming Pool Villas
- Family Getaways
- Private Celebrations

### C. About Us

Heading:

"Experience the Beauty of Countryside Living"

Description:

"Aryan's Farmstays brings you closer to nature with thoughtfully selected farmhouse destinations designed for relaxation, celebrations and memorable experiences. Whether you are planning a family picnic, a weekend staycation or a private celebration, we offer the perfect countryside escape."

Show:
- Hospitality
- Comfort
- Privacy
- Nature
- Memorable Experiences

Use an image-and-text split layout.

### D. Our Farmhouses

This is one of the most important sections.

Display exactly two flagship farmhouse properties in beautiful premium cards.

**Property 1: New Kolhe Khind Farms**

Description:
"Experience the perfect countryside getaway with scenic surroundings, open spaces and a relaxing farmhouse atmosphere. Ideal for family picnics, group gatherings, private celebrations and overnight stays."

Features:
- Swimming Pool
- Open Lawn
- Family Picnics
- Overnight Stays
- Private Celebrations
- Group Gatherings

CTA:
"Enquire About This Property"

**Property 2: Manas Agro Farms**

Description:
"Enjoy a peaceful agro-tourism experience with spacious outdoor surroundings, comfortable accommodation and memorable moments with family and friends."

Features:
- Countryside Experience
- Outdoor Spaces
- Family Gatherings
- Day Picnics
- Private Parties
- Staycation Experiences

CTA:
"Enquire About This Property"

Each property card should include:
- Large property image
- Property name
- Short description
- Feature icons using inline SVG
- View Details button
- Enquire Now button

Clicking View Details should open a dedicated property detail view or modal with more information, images and enquiry form.

### E. Experiences Section

Create an attractive visual grid with these experiences:

1. One-Day Picnic
2. Overnight Staycation
3. Swimming Pool Parties
4. Family Gatherings
5. Birthday Celebrations
6. Private Events
7. Corporate Outings
8. Homestyle Dining

Use large photography cards with elegant overlays and titles.

### F. Why Choose Aryan's Farmstays

Display the following benefits:

- Beautiful Natural Locations
- Private and Peaceful Environment
- Spacious Open Lawns
- Swimming Pool Experiences
- Perfect for Families and Groups
- Memorable Hospitality Experiences

### G. Gallery Section

Create an attractive image gallery with categories:

- All
- Farmhouses
- Swimming Pools
- Lawns
- Events
- Dining

Use mock images and responsive image grids.

Clicking an image should open a larger image preview modal.

### H. Enquiry / Contact Section

Heading:

"Plan Your Perfect Farmhouse Experience"

Create an enquiry form with the following fields:

- Full Name
- Mobile Number
- Email Address
- Select Farmhouse:
  - New Kolhe Khind Farms
  - Manas Agro Farms
- Experience Type:
  - One-Day Picnic
  - Overnight Stay
  - Pool Party
  - Family Gathering
  - Birthday Celebration
  - Corporate Event
  - Other
- Expected Visit Date
- Number of Guests
- Message

Submit Button: "Submit Enquiry"

On submission:
- Validate required fields.
- Show success notification.
- Save the enquiry in mock React state.
- Assign a unique enquiry ID.
- Automatically categorize the enquiry under the selected farmhouse.
- Make the enquiry visible in the corresponding admin lead management module.

Important: Do not connect any backend or database.

### I. Contact Information

Display:

Aryan's Farmstays

Address:
32/2/6, Sr No 26/3 B, Manjari Village Road, Lonkar Wasti, Keshav Nagar, Mundhwa, Pune, Maharashtra 411036.

Phone:
9371088099
8888809809

Email:
aryansfarmsstays@gmail.com

Add:
- Click-to-call links
- Click-to-email link
- WhatsApp enquiry button using the business contact number
- Map section with a location placeholder

### J. Footer

Create a premium dark green footer.

Include:
- Logo
- Short business description
- Quick Links
- Farmhouse Links
- Contact Information
- Social Media Links (placeholder URLs)

**IMPORTANT: Add an Admin Login link in the footer.**

The Admin Login link must redirect to the admin login page.

Copyright:
© 2026 Aryan's Farmstays. All Rights Reserved.

## 5. Admin Panel – Most Important Module

Create a complete, modern, professional admin dashboard.

The admin panel should be visually different from the public website.

Use:
- Dark green sidebar
- White content background
- Light beige dashboard background
- Modern stat cards
- Clean tables
- Search and filtering
- Modal-based forms
- Responsive layout

### Admin Login

Create a separate admin login screen.

Admin URL:
 /admin

Demo credentials:

Email: admin@aryansfarmstays.com

Password: Admin@123

Login requirements:
- Email input
- Password input
- Show/hide password option
- Login button
- Form validation
- Invalid credentials error
- Successful login redirects to admin dashboard

Implement demo authentication using React state only.

Important: This is a frontend-only demonstration, not secure production authentication.

### Admin Dashboard Layout

Sidebar Navigation:

1. Dashboard
2. New Kolhe Khind Farms Leads
3. Manas Agro Farms Leads
4. All Enquiries
5. Experiences Management
6. Gallery Management
7. Website Content Management
8. Contact Information Management
9. Admin Profile
10. Logout

### A. Dashboard Overview

Show summary cards:

- Total Enquiries
- New Enquiries
- Contacted Leads
- Confirmed Bookings
- Closed / Lost Leads
- New Kolhe Khind Farms Enquiries
- Manas Agro Farms Enquiries

Add a visual analytics section using CSS-based charts or simple SVG charts. Do not install chart libraries.

Include:
- Recent Enquiries
- Latest Leads
- Property-wise Enquiry Summary
- Enquiry Status Distribution

All statistics must calculate dynamically from mock data.

### B. New Kolhe Khind Farms – Lead Management

Create a completely separate lead management module for New Kolhe Khind Farms.

This module should only display enquiries related to New Kolhe Khind Farms.

Features:

- View all leads
- Search by name or phone number
- Filter by enquiry status
- Filter by experience type
- Filter by visit date
- Sort by newest and oldest
- View lead details
- Edit lead details
- Delete lead with confirmation
- Update lead status
- Add internal admin notes

Lead statuses:

- New
- Contacted
- Follow-up
- Interested
- Confirmed
- Completed
- Cancelled
- Lost

Lead table columns:

- Enquiry ID
- Customer Name
- Mobile Number
- Experience Type
- Visit Date
- Guests
- Status
- Created Date
- Actions

Actions:
- View
- Edit
- Delete
- Update Status

### C. Manas Agro Farms – Lead Management

Create a separate lead management module for Manas Agro Farms.

It should have the exact same functionality as New Kolhe Khind Farms, but must display only Manas Agro Farms enquiries.

IMPORTANT:
Keep both property lead modules completely separated through their property IDs.

Updating, deleting or changing the status of one property's lead must not affect the other property's leads.

### D. All Enquiries

Create a combined enquiry management module.

Display leads from both farmhouses.

Features:
- Search all enquiries
- Filter by farmhouse
- Filter by status
- Filter by date
- Filter by experience
- View complete enquiry details
- Edit enquiries
- Update status
- Delete enquiries
- Add internal notes

Show a property badge to identify which farmhouse the enquiry belongs to.

### E. Experiences Management

Allow admin to:

- View all experiences
- Add new experiences
- Edit existing experiences
- Delete experiences
- Change experience title
- Change description
- Enable/disable experience visibility

Use mock data and React state.

### F. Gallery Management

Allow admin to:

- View gallery images
- Add image using an image URL
- Edit image title
- Change image category
- Delete images
- Enable/disable gallery visibility

Categories:
- Farmhouses
- Swimming Pools
- Lawns
- Events
- Dining

No cloud image upload or storage integration is required.

### G. Website Content Management

Create an admin module to manage the public website's content.

Admin should be able to edit:

- Hero heading
- Hero subtitle
- Hero banner image URL
- About Us heading
- About Us description
- Why Choose Us content
- Footer description

Changes should immediately reflect on the public website using shared React state.

### H. Contact Information Management

Allow admin to edit:

- Business name
- Contact number 1
- Contact number 2
- Email address
- Business address
- WhatsApp number

Updated details should reflect throughout the public website.

### I. Admin Profile

Display:
- Admin name
- Admin email
- Change password demo interface
- Logout button

Use mock state only.

## 6. Mock Data Structure

Create realistic mock enquiry records for both properties.

Use JavaScript objects and arrays.

Example:

{
  id: "AF001",
  customerName: "Rahul Sharma",
  phone: "9876543210",
  email: "rahul@example.com",
  property: "new-kolhe-khind",
  experience: "One-Day Picnic",
  visitDate: "2026-12-15",
  guests: 15,
  message: "Looking for a family picnic booking.",
  status: "New",
  adminNotes: "",
  createdAt: "2026-11-20"
}

Create at least:
- 8 mock enquiries for New Kolhe Khind Farms
- 8 mock enquiries for Manas Agro Farms

Use different statuses and experience types to demonstrate dashboard filters and statistics.

Also create realistic mock data for:
- Experiences
- Gallery
- Website content
- Business contact information

## 7. Functional Requirements

The website must be more than a static design.

Implement working frontend interactions.

Required functionality:

1. Public navigation must work.
2. Footer Admin Login link must open /admin.
3. Admin login must work with demo credentials.
4. Successful login must open the dashboard.
5. Logout must return to the admin login screen.
6. Both farmhouse lead modules must work independently.
7. Enquiry form must create new leads.
8. New enquiries must automatically appear in the correct farmhouse module.
9. Search and filters must work.
10. Lead editing must work.
11. Lead deletion must work with confirmation.
12. Lead status updates must work.
13. Internal notes must be editable.
14. Experience management must work.
15. Gallery management must work.
16. Website content editing must update the frontend.
17. Contact information editing must update the frontend.
18. All dashboard statistics must update dynamically.
19. All modals must open and close properly.
20. Responsive design must work on mobile, tablet and desktop.

## 8. Application Structure

Organize the application using reusable React components.

Suggested structure:

src/
  components/
    Header.jsx
    Footer.jsx
    Hero.jsx
    About.jsx
    PropertyCards.jsx
    Experiences.jsx
    Gallery.jsx
    Contact.jsx
    EnquiryForm.jsx
    AdminSidebar.jsx
    AdminHeader.jsx
    StatCard.jsx
    DataTable.jsx
    Modal.jsx

  pages/
    Home.jsx
    AdminLogin.jsx
    AdminDashboard.jsx
    KolheKhindLeads.jsx
    ManasAgroLeads.jsx
    AllEnquiries.jsx
    ExperienceManagement.jsx
    GalleryManagement.jsx
    WebsiteContent.jsx
    ContactManagement.jsx
    AdminProfile.jsx

  data/
    mockData.js

  App.jsx
  main.jsx
  index.css

Use simple React state-based navigation instead of React Router.

Use the browser History API or a lightweight state-based routing approach implemented directly in React, without installing any routing library.

## 9. Image Requirements

Use beautiful, high-quality farmhouse and nature photographs.

The hero banner should be visually impressive and occupy a large portion of the first screen.

Suggested image subjects:

- Luxury farmhouse exteriors
- Swimming pools surrounded by greenery
- Landscaped gardens
- Open lawns
- Outdoor dining setups
- Countryside landscapes
- Family-friendly outdoor spaces
- Private celebration setups

Use suitable publicly accessible image URLs as mock image sources.

Use object-cover and appropriate image aspect ratios.

Ensure that image failures do not break the design by providing fallback backgrounds.

Do not use generic corporate office or city skyscraper images.

## 10. Final Quality Requirements

The final result should look like a premium hospitality brand website, not a generic template.

Prioritize:

- Visually impressive hero section
- Premium farmhouse photography
- Beautiful property presentation
- Excellent mobile responsiveness
- Elegant typography
- Smooth user experience
- Professional admin dashboard
- Fully working mock lead management
- Separate lead management for both farmhouses
- Consistent brand colors

Make sure the public website and admin panel are connected through shared React state.

The admin panel must be fully navigable and interactive.

Do not leave buttons non-functional or create empty placeholder pages.

Use realistic mock data throughout the project.

**MOST IMPORTANT:** Build the complete public portfolio website AND the complete frontend admin panel. Do not stop after creating the landing page. All requested modules must be implemented and usable.

Remember: React + Vite + Tailwind CSS only. No additional libraries, frameworks, databases or backend services.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/75c04753-b4f7-4780-860e-6afd733ff573).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
