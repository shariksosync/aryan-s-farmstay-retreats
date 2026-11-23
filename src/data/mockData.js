// Mock data for Aryan's Farmstays. No backend — everything lives in React state
// (and optionally localStorage for demo persistence).

export const PROPERTY_IDS = {
  KOLHE: "new-kolhe-khind",
  MANAS: "manas-agro",
};

export const PROPERTIES = [
  {
    id: PROPERTY_IDS.KOLHE,
    name: "New Kolhe Khind Farms",
    tagline: "Pool villa & open-lawn estate",
    description:
      "Experience the perfect countryside getaway with scenic surroundings, open spaces and a relaxing farmhouse atmosphere. Ideal for family picnics, group gatherings, private celebrations and overnight stays.",
    longDescription:
      "Set amidst mango trees and bougainvillea, New Kolhe Khind Farms is a whitewashed, terracotta-roofed villa with a sparkling private swimming pool and a sprawling manicured lawn. Spend lazy afternoons by the water, host a birthday under the stars, or simply unwind with family on the verandah while homestyle meals are prepared fresh in the kitchen.",
    image: "/images/kolhe-khind.jpg",
    gallery: ["/images/kolhe-khind.jpg", "/images/pool-party.jpg", "/images/lawn-seating.jpg", "/images/celebration.jpg"],
    features: [
      { label: "Swimming Pool", icon: "pool" },
      { label: "Open Lawn", icon: "tree" },
      { label: "Family Picnics", icon: "sun" },
      { label: "Overnight Stays", icon: "moon" },
      { label: "Private Celebrations", icon: "celebrate" },
      { label: "Group Gatherings", icon: "users" },
    ],
    highlights: [
      { label: "Ideal group size", value: "10 – 80 guests" },
      { label: "Day picnic", value: "9:00 AM – 6:00 PM" },
      { label: "Overnight stay", value: "Check-in 12 PM · Check-out 11 AM" },
      { label: "Dining", value: "Homestyle veg & non-veg meals" },
    ],
    amenities: ["Private swimming pool", "Landscaped open lawn", "Air-conditioned rooms", "Music system", "Outdoor games", "Ample parking", "Caretaker on site", "Power backup"],
  },
  {
    id: PROPERTY_IDS.MANAS,
    name: "Manas Agro Farms",
    tagline: "Agro-tourism countryside retreat",
    description:
      "Enjoy a peaceful agro-tourism experience with spacious outdoor surroundings, comfortable accommodation and memorable moments with family and friends.",
    longDescription:
      "Manas Agro Farms is a working farm turned warm retreat — stone cottages, vegetable patches, sugarcane rows and a mango orchard with a rope swing under an old banyan tree. Children learn where food comes from, grown-ups slow down, and everyone gathers for a traditional Maharashtrian meal on the lawn as the sun sets over the fields.",
    image: "/images/manas-agro.jpg",
    gallery: ["/images/manas-agro.jpg", "/images/homestyle-dining.jpg", "/images/staycation-room.jpg", "/images/countryside.jpg"],
    features: [
      { label: "Countryside Experience", icon: "mountain" },
      { label: "Outdoor Spaces", icon: "tree" },
      { label: "Family Gatherings", icon: "users" },
      { label: "Day Picnics", icon: "sun" },
      { label: "Private Parties", icon: "celebrate" },
      { label: "Staycation Experiences", icon: "bed" },
    ],
    highlights: [
      { label: "Ideal group size", value: "8 – 60 guests" },
      { label: "Day picnic", value: "9:00 AM – 6:00 PM" },
      { label: "Overnight stay", value: "Check-in 12 PM · Check-out 11 AM" },
      { label: "Dining", value: "Traditional Maharashtrian thali" },
    ],
    amenities: ["Stone cottages", "Farm walks & orchard", "Tree swing & play area", "Bonfire area", "Outdoor dining lawn", "Ample parking", "Caretaker on site", "Power backup"],
  },
];

export const EXPERIENCE_TYPES = [
  "One-Day Picnic",
  "Overnight Stay",
  "Pool Party",
  "Family Gathering",
  "Birthday Celebration",
  "Corporate Event",
  "Other",
];

export const LEAD_STATUSES = [
  "New",
  "Contacted",
  "Follow-up",
  "Interested",
  "Confirmed",
  "Completed",
  "Cancelled",
  "Lost",
];

export const GALLERY_CATEGORIES = ["Farmhouses", "Swimming Pools", "Lawns", "Events", "Dining"];

export const initialEnquiries = [
  { id: "AF001", customerName: "Rahul Sharma", phone: "9876543210", email: "rahul@example.com", property: PROPERTY_IDS.KOLHE, experience: "One-Day Picnic", visitDate: "2026-12-15", guests: 15, message: "Looking for a family picnic booking with lunch and pool access.", status: "New", adminNotes: "", createdAt: "2026-11-20T10:15:00" },
  { id: "AF002", customerName: "Anjali Shinde", phone: "9822001122", email: "anjali.shinde@example.com", property: PROPERTY_IDS.MANAS, experience: "Family Gathering", visitDate: "2026-12-08", guests: 22, message: "Family get-together for my parents' anniversary. Need veg lunch and evening snacks.", status: "New", adminNotes: "", createdAt: "2026-11-21T09:40:00" },
  { id: "AF003", customerName: "Priya Deshmukh", phone: "9823456781", email: "priya.d@example.com", property: PROPERTY_IDS.KOLHE, experience: "Birthday Celebration", visitDate: "2026-12-05", guests: 40, message: "Daughter's 10th birthday. Would like decoration on the lawn and a pool session.", status: "Confirmed", adminNotes: "Advance of ₹10,000 received via UPI. Decor vendor arranged.", createdAt: "2026-11-12T16:20:00" },
  { id: "AF004", customerName: "Suresh Bhosale", phone: "9763344556", email: "suresh.bhosale@example.com", property: PROPERTY_IDS.MANAS, experience: "Overnight Stay", visitDate: "2026-12-19", guests: 8, message: "Weekend staycation for two families. Kids would love a farm walk.", status: "Confirmed", adminNotes: "2 cottages blocked. Bonfire requested.", createdAt: "2026-11-10T11:05:00" },
  { id: "AF005", customerName: "Amit Kulkarni", phone: "9765432109", email: "amit.k@infotech.example.com", property: PROPERTY_IDS.KOLHE, experience: "Corporate Event", visitDate: "2026-12-20", guests: 60, message: "Annual team outing for our Pune office. Need team activities and buffet lunch.", status: "Follow-up", adminNotes: "Sent quote on 16 Nov. Call back on Monday.", createdAt: "2026-11-15T14:30:00" },
  { id: "AF006", customerName: "Pooja Nair", phone: "9819988776", email: "pooja.nair@example.com", property: PROPERTY_IDS.MANAS, experience: "One-Day Picnic", visitDate: "2026-11-30", guests: 18, message: "Day picnic with college friends.", status: "Contacted", adminNotes: "Shared menu options on WhatsApp.", createdAt: "2026-11-16T18:10:00" },
  { id: "AF007", customerName: "Sneha Patil", phone: "9890123456", email: "sneha.patil@example.com", property: PROPERTY_IDS.KOLHE, experience: "Pool Party", visitDate: "2026-11-29", guests: 25, message: "Pool party for friends, afternoon to evening.", status: "Contacted", adminNotes: "Asked about DJ permission.", createdAt: "2026-11-18T12:45:00" },
  { id: "AF008", customerName: "Arjun Rao", phone: "9900112233", email: "arjun.rao@example.com", property: PROPERTY_IDS.MANAS, experience: "Corporate Event", visitDate: "2027-01-16", guests: 45, message: "Leadership offsite, one night with conference setup on the lawn.", status: "Interested", adminNotes: "Wants projector & seating for 45.", createdAt: "2026-11-14T10:00:00" },
  { id: "AF009", customerName: "Vikram Joshi", phone: "9922334455", email: "vikram.joshi@example.com", property: PROPERTY_IDS.KOLHE, experience: "Overnight Stay", visitDate: "2026-10-25", guests: 12, message: "Overnight stay with cousins.", status: "Completed", adminNotes: "Great feedback. Asked for Google review.", createdAt: "2026-10-10T09:30:00" },
  { id: "AF010", customerName: "Meera Iyer", phone: "9845566778", email: "meera.iyer@example.com", property: PROPERTY_IDS.MANAS, experience: "Birthday Celebration", visitDate: "2026-10-31", guests: 28, message: "Surprise 40th birthday for my husband.", status: "Completed", adminNotes: "Event went smoothly.", createdAt: "2026-10-12T15:50:00" },
  { id: "AF011", customerName: "Neha Gupta", phone: "9811122233", email: "neha.gupta@example.com", property: PROPERTY_IDS.KOLHE, experience: "Family Gathering", visitDate: "2026-12-27", guests: 30, message: "Year-end family reunion. Need both lunch and dinner.", status: "Interested", adminNotes: "", createdAt: "2026-11-19T17:25:00" },
  { id: "AF012", customerName: "Karan Malhotra", phone: "9867788990", email: "karan.m@example.com", property: PROPERTY_IDS.MANAS, experience: "Pool Party", visitDate: "2026-12-24", guests: 20, message: "Christmas eve party with friends.", status: "Follow-up", adminNotes: "Informed Manas has no pool — suggested Kolhe Khind. Awaiting reply.", createdAt: "2026-11-17T20:05:00" },
  { id: "AF013", customerName: "Rohan Mehta", phone: "9850011223", email: "rohan.mehta@example.com", property: PROPERTY_IDS.KOLHE, experience: "One-Day Picnic", visitDate: "2026-11-08", guests: 20, message: "Society picnic.", status: "Lost", adminNotes: "Went with another venue due to budget.", createdAt: "2026-10-28T11:40:00" },
  { id: "AF014", customerName: "Swati Gaikwad", phone: "9767890123", email: "swati.g@example.com", property: PROPERTY_IDS.MANAS, experience: "Family Gathering", visitDate: "2026-11-15", guests: 40, message: "Naming ceremony lunch.", status: "Cancelled", adminNotes: "Cancelled by customer — family emergency.", createdAt: "2026-10-30T13:15:00" },
  { id: "AF015", customerName: "Kavita Jadhav", phone: "9970554433", email: "kavita.jadhav@example.com", property: PROPERTY_IDS.KOLHE, experience: "Birthday Celebration", visitDate: "2026-12-12", guests: 35, message: "Son's birthday party with magician and pool time.", status: "New", adminNotes: "", createdAt: "2026-11-22T19:30:00" },
  { id: "AF016", customerName: "Nikhil Wagh", phone: "9890765432", email: "nikhil.wagh@example.com", property: PROPERTY_IDS.MANAS, experience: "Overnight Stay", visitDate: "2026-12-31", guests: 14, message: "New Year's eve overnight with bonfire.", status: "New", adminNotes: "", createdAt: "2026-11-23T08:50:00" },
  { id: "AF017", customerName: "Sanjay Pawar", phone: "9881234567", email: "sanjay.pawar@example.com", property: PROPERTY_IDS.KOLHE, experience: "Other", visitDate: "2027-01-10", guests: 50, message: "Pre-wedding haldi function on the lawn.", status: "Cancelled", adminNotes: "Date moved to a different city.", createdAt: "2026-11-02T10:20:00" },
  { id: "AF018", customerName: "Rashmi Kale", phone: "9823344110", email: "rashmi.kale@example.com", property: PROPERTY_IDS.MANAS, experience: "Other", visitDate: "2026-11-22", guests: 16, message: "Photography workshop at the farm.", status: "Lost", adminNotes: "No response after two follow-ups.", createdAt: "2026-11-01T16:00:00" },
];

export const initialExperiences = [
  { id: "EXP1", title: "One-Day Picnic", description: "Sunrise-to-sunset escapes with games, meals and open lawns.", image: "/images/family-picnic.jpg", enquiryType: "One-Day Picnic", visible: true },
  { id: "EXP2", title: "Overnight Staycation", description: "Cosy rooms, starlit evenings and slow countryside mornings.", image: "/images/staycation-room.jpg", enquiryType: "Overnight Stay", visible: true },
  { id: "EXP3", title: "Swimming Pool Parties", description: "Private pool afternoons with music, floats and fresh coolers.", image: "/images/pool-party.jpg", enquiryType: "Pool Party", visible: true },
  { id: "EXP4", title: "Family Gatherings", description: "Space for every generation to reconnect under the trees.", image: "/images/lawn-seating.jpg", enquiryType: "Family Gathering", visible: true },
  { id: "EXP5", title: "Birthday Celebrations", description: "Decorated lawns, fairy lights and cake under open skies.", image: "/images/celebration.jpg", enquiryType: "Birthday Celebration", visible: true },
  { id: "EXP6", title: "Private Events", description: "Haldi, anniversaries and intimate functions, privately yours.", image: "/images/kolhe-khind.jpg", enquiryType: "Other", visible: true },
  { id: "EXP7", title: "Corporate Outings", description: "Team-building, offsites and fresh air away from the city.", image: "/images/corporate-outing.jpg", enquiryType: "Corporate Event", visible: true },
  { id: "EXP8", title: "Homestyle Dining", description: "Traditional Maharashtrian thalis cooked fresh on the farm.", image: "/images/homestyle-dining.jpg", enquiryType: "Other", visible: true },
];

export const initialGallery = [
  { id: "G01", title: "Villa at golden hour", category: "Farmhouses", url: "/images/hero-farmhouse.jpg", visible: true },
  { id: "G02", title: "New Kolhe Khind Farms", category: "Farmhouses", url: "/images/kolhe-khind.jpg", visible: true },
  { id: "G03", title: "Manas Agro cottages", category: "Farmhouses", url: "/images/manas-agro.jpg", visible: true },
  { id: "G04", title: "Infinity pool view", category: "Swimming Pools", url: "/images/hero-farmhouse.jpg", visible: true },
  { id: "G05", title: "Poolside afternoons", category: "Swimming Pools", url: "/images/pool-party.jpg", visible: true },
  { id: "G06", title: "Evening lawn lounge", category: "Lawns", url: "/images/lawn-seating.jpg", visible: true },
  { id: "G07", title: "Picnic under the trees", category: "Lawns", url: "/images/family-picnic.jpg", visible: true },
  { id: "G08", title: "Countryside sunrise", category: "Lawns", url: "/images/countryside.jpg", visible: true },
  { id: "G09", title: "Floral celebration setup", category: "Events", url: "/images/celebration.jpg", visible: true },
  { id: "G10", title: "Corporate team day", category: "Events", url: "/images/corporate-outing.jpg", visible: true },
  { id: "G11", title: "Maharashtrian thali", category: "Dining", url: "/images/homestyle-dining.jpg", visible: true },
  { id: "G12", title: "Cottage bedroom", category: "Farmhouses", url: "/images/staycation-room.jpg", visible: true },
];

export const initialContent = {
  heroHeading: "Escape to Nature. Experience Luxury.",
  heroSubtitle:
    "Discover peaceful countryside escapes, private pool villas, beautiful open lawns and unforgettable moments with Aryan's Farmstays.",
  heroImage: "/images/hero-farmhouse.jpg",
  aboutHeading: "Experience the Beauty of Countryside Living",
  aboutDescription:
    "Aryan's Farmstays brings you closer to nature with thoughtfully selected farmhouse destinations designed for relaxation, celebrations and memorable experiences. Whether you are planning a family picnic, a weekend staycation or a private celebration, we offer the perfect countryside escape.",
  whyHeading: "Why Choose Aryan's Farmstays",
  whySubtitle: "Every stay is shaped around space, privacy and warm, homestyle hospitality.",
  whyItems: [
    { title: "Beautiful Natural Locations", description: "Hand-picked farms framed by orchards, fields and Sahyadri views." },
    { title: "Private and Peaceful Environment", description: "The entire property is yours — no shared spaces, no strangers." },
    { title: "Spacious Open Lawns", description: "Room to play, dance, dine and celebrate under open skies." },
    { title: "Swimming Pool Experiences", description: "Clean, private pools for lazy afternoons and lively parties." },
    { title: "Perfect for Families and Groups", description: "Comfortable for 8 to 80 guests, from toddlers to grandparents." },
    { title: "Memorable Hospitality Experiences", description: "Caretakers on site and fresh homestyle meals, cooked with love." },
  ],
  footerDescription:
    "Private farmhouses, swimming pool villas and agro-tourism escapes on the edge of Pune — crafted for picnics, staycations and celebrations.",
  galleryEnabled: true,
};

export const initialContact = {
  businessName: "Aryan's Farmstays",
  phone1: "9371088099",
  phone2: "8888809809",
  email: "aryansfarmsstays@gmail.com",
  address:
    "32/2/6, Sr No 26/3 B, Manjari Village Road, Lonkar Wasti, Keshav Nagar, Mundhwa, Pune, Maharashtra 411036.",
  whatsapp: "9371088099",
};

export const initialAdmin = {
  name: "Aryan Kolhe",
  email: "admin@aryansfarmstays.com",
  password: "Admin@123",
  role: "Owner & Administrator",
};
