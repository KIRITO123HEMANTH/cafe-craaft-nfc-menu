/* ==========================================================================
   CAFE CRAAFT — DEMO CONFIGURATION
   --------------------------------------------------------------------------
   Everything a café owner would swap lives in this one file:
   business details, links, hours, menu, reviews and Instagram imagery.

   • All values below are SAMPLE / DEMO content for a fictional café.
   • Set `isDemo: false` once real details, reviews and links are supplied —
     this removes the "Demo" / "Sample" labels across the page.
   • Images: any URL works. Unsplash URLs get responsive sizes automatically.
   ========================================================================== */
window.CAFE_CONFIG = {
  isDemo: true,

  name: "Cafe Craaft",
  tagline: "A little craft in every cup.",
  currency: "USD",          // ISO code used to format prices
  locale: "en-US",

  contact: {
    address: "12 Roastery Lane, Old Town, Your City 00000",
    phone: "+1 (555) 010-0142",       // 555-01xx numbers are reserved for fiction
    email: "hello@example.com",        // example.com is a reserved demo domain
  },

  /* ------------------------------------------------------------------------
     NFC LANDING DESTINATIONS  ← REPLACE THESE
     The five buttons on the tap landing screen (index.html) open these.
     The full site (menu.html) uses the same links.
     Leave a value as "" and the button uses the matching demo fallback
     below and shows a visible "Demo link" label.
     ------------------------------------------------------------------------ */
  links: {
    MENU_URL: "",            // e.g. "menu.html" or your own online menu
    GOOGLE_REVIEWS_URL: "",  // your Google Business Profile reviews link
    INSTAGRAM_URL: "",       // e.g. "https://www.instagram.com/yourcafe/"
    MAPS_URL: "",            // Google/Apple Maps link to your address
    CONTACT_URL: "",         // e.g. "tel:+15551234567", "mailto:…" or a contact page
  },

  // Demo fallbacks — used only while a link above is empty.
  demoLinks: {
    MENU_URL: "menu.html#menu",
    GOOGLE_REVIEWS_URL: "https://www.google.com/maps/search/?api=1&query=cafe+reviews",
    INSTAGRAM_URL: "https://www.instagram.com/",
    MAPS_URL: "https://www.google.com/maps/search/?api=1&query=coffee+near+me",
    CONTACT_URL: "tel:+15550100142",   // fictional 555 number from `contact.phone`
  },

  // `days` uses JS weekday numbers (0 = Sunday) to highlight today's row.
  hours: [
    { label: "Mon – Fri", time: "7:00 am – 6:00 pm", days: [1, 2, 3, 4, 5] },
    { label: "Saturday", time: "8:00 am – 7:00 pm", days: [6] },
    { label: "Sunday",   time: "8:00 am – 4:00 pm", days: [0] },
  ],

  // Dietary label legend. Keys are used in each item's `tags`.
  dietary: {
    v:  { short: "V",  label: "Vegetarian" },
    vg: { short: "VG", label: "Vegan" },
    gf: { short: "GF", label: "Gluten-free" },
  },

  menu: [
    {
      id: "coffee",
      name: "Coffee",
      blurb: "Small-batch roasts, pulled with care.",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      items: [
        { name: "Espresso", desc: "Double shot of our house blend — cocoa, cherry, a toasted-almond finish.", price: 3.25, tags: ["vg", "gf"] },
        { name: "Flat White", desc: "Silky micro-foam over a ristretto double. Oat milk on request.", price: 4.5, tags: ["v", "gf"] },
        { name: "Cortado", desc: "Equal parts espresso and warm milk. Short, balanced, honest.", price: 4.25, tags: ["v", "gf"] },
        { name: "Cappuccino", desc: "Classic and airy, dusted with cacao.", price: 4.75, tags: ["v", "gf"] },
        { name: "Pour-Over of the Day", desc: "Single-origin, brewed by hand. Ask what's on the bar today.", price: 5.5, tags: ["vg", "gf"] },
        { name: "Cold Brew", desc: "Steeped 18 hours for a smooth, chocolatey cup.", price: 4.95, tags: ["vg", "gf"] },
      ],
    },
    {
      id: "tea",
      name: "Tea",
      blurb: "Loose-leaf, steeped to order.",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574",
      items: [
        { name: "Jasmine Silver Needle", desc: "Delicate white tea scented with fresh jasmine blossoms.", price: 4.5, tags: ["vg", "gf"] },
        { name: "House Masala Chai", desc: "Black tea simmered with ginger, cardamom and cinnamon.", price: 4.75, tags: ["v", "gf"] },
        { name: "Ceremonial Matcha Latte", desc: "Whisked stone-ground matcha with your choice of milk.", price: 5.75, tags: ["v", "gf"] },
        { name: "Chamomile & Honey", desc: "Calming whole-flower chamomile with local honey.", price: 4.25, tags: ["v", "gf"] },
      ],
    },
    {
      id: "signature",
      name: "Signature Drinks",
      blurb: "Crafted here, and only here.",
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735",
      items: [
        { name: "Copper Honey Cortado", desc: "Our signature: wildflower honey, a pinch of sea salt, toasted cinnamon.", price: 5.75, tags: ["v", "gf"], featured: true },
        { name: "Smoked Maple Latte", desc: "Maple syrup lightly smoked in-house, with a velvety espresso base.", price: 6.25, tags: ["v", "gf"] },
        { name: "Sage & Citrus Espresso Tonic", desc: "Espresso over sparkling tonic, fresh orange and garden sage.", price: 6.0, tags: ["vg", "gf"] },
        { name: "Rose Cardamom Iced Latte", desc: "Floral, lightly spiced and served over hand-cut ice.", price: 6.25, tags: ["v", "gf"] },
      ],
    },
    {
      id: "brunch",
      name: "Brunch",
      blurb: "Served until 3 pm, every day.",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8",
      items: [
        { name: "Smashed Avocado Sourdough", desc: "Lemon, chili flakes, herbs and toasted seeds on house sourdough.", price: 12.5, tags: ["vg"] },
        { name: "Garden Shakshuka", desc: "Eggs baked in spiced tomato and pepper, with feta and herbs.", price: 14.0, tags: ["v", "gf"] },
        { name: "Ricotta Hotcakes", desc: "Fluffy and golden, with seasonal berries and whipped butter.", price: 13.5, tags: ["v"] },
        { name: "Craaft Grain Bowl", desc: "Quinoa, roasted squash, greens, tahini and pickled onion.", price: 13.0, tags: ["vg", "gf"] },
        { name: "Croque Madame", desc: "Ham, gruyère and béchamel on brioche, topped with a fried egg.", price: 14.5, tags: [] },
      ],
    },
    {
      id: "desserts",
      name: "Desserts",
      blurb: "Baked fresh each morning.",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
      items: [
        { name: "Basque Burnt Cheesecake", desc: "Caramelised outside, creamy within.", price: 7.5, tags: ["v", "gf"] },
        { name: "Olive Oil Citrus Cake", desc: "Moist and fragrant, finished with candied orange.", price: 6.5, tags: ["v"] },
        { name: "Dark Chocolate Tart", desc: "70% cacao ganache, sea salt and a buttery crust.", price: 7.0, tags: ["v"] },
        { name: "Cardamom Morning Bun", desc: "Laminated dough rolled with cardamom sugar.", price: 4.75, tags: ["v"] },
      ],
    },
  ],

  featured: {
    name: "Copper Honey Cortado",
    menuTab: "signature",
    price: 5.75,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d",
    imageAlt: "A cortado in a small glass with a fine layer of crema, on a wooden counter",
    story: "Our signature cup began as a staff-room experiment: a short cortado sweetened with wildflower honey, a whisper of sea salt and cinnamon toasted on the bar. It's warm, round and quietly surprising — the drink we hand to anyone visiting for the first time.",
  },

  reviews: {
    rating: 4.8,           // SAMPLE rating — not a real Google rating
    count: "Sample",       // replace with real count text, e.g. "312 reviews"
    items: [
      { author: "Sample guest A", rating: 5, text: "The honey cortado is something else. Lovely light, friendly team, and the menu opened right on my phone from the table card." },
      { author: "Sample guest B", rating: 5, text: "Came for coffee, stayed for the shakshuka. Calm, warm space — a great spot to work for an hour." },
      { author: "Sample guest C", rating: 4, text: "Excellent pour-over and the cheesecake is a must. Gets busy around noon on weekends." },
    ],
  },

  instagram: {
    handle: "@cafecraaft.demo",
    images: [
      { src: "https://images.unsplash.com/photo-1534778101976-62847782c213", alt: "Latte art in a ceramic cup seen from above" },
      { src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24", alt: "Warm café interior with wooden tables" },
      { src: "https://images.unsplash.com/photo-1484723091739-30a097e8f929", alt: "French toast with berries on a plate" },
      { src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085", alt: "Coffee cup and saucer on a table by a window" },
      { src: "https://images.unsplash.com/photo-1488477181946-6428a0291777", alt: "Layered berry dessert in a glass" },
      { src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb", alt: "Café counter with pendant lights" },
    ],
  },
};
