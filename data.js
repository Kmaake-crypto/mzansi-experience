// data.js — the single source of truth for every experience card on the site.
// Swap this array for a real API response later; nothing else needs to change.
// Images: real photographs of each location, hosted on Wikimedia Commons
// (freely licensed) via Special:FilePath, so they stay accurate and stable.

const EXPERIENCES = [
  { id: 1, title: "Vilakazi Street Walk", city: "Johannesburg", category: "culture", price: 250, rating: 4.9, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Soweto-002.jpg?width=600", blurb: "Walk the only street to house two Nobel Peace Prize winners." },
  { id: 2, title: "Joburg Food Market", city: "Johannesburg", category: "food", price: 150, rating: 4.7, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Johannesburg%20CBD.jpg?width=600", blurb: "Rooftop stalls, live jazz, and the best boerewors roll in the city." },
  { id: 3, title: "Maboneng Art Walk", city: "Johannesburg", category: "art", price: 200, rating: 4.6, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Busy%20sidewalk%20in%20Johannesburg%2C%20South%20Africa.jpg?width=600", blurb: "Murals, galleries and studios in Joburg's reborn arts precinct." },
  { id: 4, title: "Constitution Hill Tour", city: "Johannesburg", category: "culture", price: 180, rating: 4.8, img: "https://commons.wikimedia.org/wiki/Special:FilePath/ConstitutionalCourtofSouthAfrica-entrance-20070622.jpg?width=600", blurb: "From political prison to the seat of South Africa's highest court." },
  { id: 5, title: "Kirstenbosch Sunset Concert", city: "Cape Town", category: "music", price: 320, rating: 4.9, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Kirstenbosch%20-%20View%20from%20the%20Botanical%20Gardens.jpg?width=600", blurb: "Live music on the lawns beneath Table Mountain." },
  { id: 6, title: "Bo-Kaap Colour Walk", city: "Cape Town", category: "culture", price: 220, rating: 4.8, img: "https://commons.wikimedia.org/wiki/Special:FilePath/15-37%20Pentz%20Street%2C%20Bo-Kaap%20(01).jpg?width=600", blurb: "Cobbled streets, bright facades and Cape Malay cooking." },
  { id: 7, title: "Table Mountain Cableway", city: "Cape Town", category: "adventure", price: 400, rating: 4.9, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Waiting%20Sunset%20Table%20Mountain%20Cape%20Town%20South%20Africa%20Luca%20Galuzzi%202004.JPG?width=600", blurb: "360° views over the peninsula, weather permitting." },
  { id: 8, title: "V&A Food Safari", city: "Cape Town", category: "food", price: 350, rating: 4.7, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Cape%20Town%20Waterfront.jpg?width=600", blurb: "A guided crawl through the harbour's best kitchens." },
  { id: 9, title: "Golden Hour Photo Walk", city: "Durban", category: "photography", price: 280, rating: 4.6, img: "https://commons.wikimedia.org/wiki/Special:FilePath/GoldenMileDurbanduringJulyFest2004.jpg?width=600", blurb: "The Golden Mile at sunrise, with a working photographer." },
  { id: 10, title: "uShaka Marine Adventure", city: "Durban", category: "adventure", price: 300, rating: 4.5, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Durban%20skyline.jpg?width=600", blurb: "Ocean life, water slides and a proper sea breeze near the beachfront." },
  { id: 11, title: "Kruger Sunrise Safari", city: "Mpumalanga", category: "adventure", price: 850, rating: 5.0, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Elephant%20side-view%20Kruger.jpg?width=600", blurb: "Big Five game drive as the bush wakes up." },
  { id: 12, title: "Cradle of Humankind Tour", city: "Gauteng", category: "culture", price: 260, rating: 4.7, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Sterkfontein%20Caves%201.jpg?width=600", blurb: "Stand where humanity's oldest ancestors were found." },
];

const CATEGORIES = ["all", "food", "culture", "adventure", "music", "art", "photography"];

const EVENTS = [
  { id: "e1", title: "Neighbourgoods Market", city: "Johannesburg", category: "food", price: 0, rating: 4.8, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Johannesburg%20CBD.jpg?width=600", blurb: "Braamfontein's Saturday food and design market." },
  { id: "e2", title: "Cape Town Jazz Night", city: "Cape Town", category: "music", price: 180, rating: 4.7, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Cape%20Town%20Waterfront.jpg?width=600", blurb: "Live sets at a harbourside venue." },
  { id: "e3", title: "Durban Beach Run", city: "Durban", category: "adventure", price: 50, rating: 4.5, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Durban%20skyline.jpg?width=600", blurb: "A community 5km along the Golden Mile at sunrise." },
  { id: "e4", title: "Bo-Kaap Heritage Day", city: "Cape Town", category: "culture", price: 0, rating: 4.9, img: "https://commons.wikimedia.org/wiki/Special:FilePath/15-37%20Pentz%20Street%2C%20Bo-Kaap%20(01).jpg?width=600", blurb: "Open studios, cooking demos and music in the Bo-Kaap." },
  { id: "e5", title: "Soweto Wine & Art Fest", city: "Johannesburg", category: "art", price: 220, rating: 4.6, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Soweto-002.jpg?width=600", blurb: "Local wineries and artists on Vilakazi Street." },
  { id: "e6", title: "Kruger Night Drive", city: "Mpumalanga", category: "adventure", price: 400, rating: 4.9, img: "https://commons.wikimedia.org/wiki/Special:FilePath/Elephant%20side-view%20Kruger.jpg?width=600", blurb: "Spotlit game drive for nocturnal wildlife." },
];

const BADGES = [
  { id: "b1", name: "First Save", emoji: "🏆", check: (favs, itin) => favs >= 1 },
  { id: "b2", name: "Collector", emoji: "❤️", check: (favs, itin) => favs >= 5 },
  { id: "b3", name: "Day Planner", emoji: "🗓️", check: (favs, itin) => itin >= 1 },
  { id: "b4", name: "Weekend Warrior", emoji: "🔥", check: (favs, itin) => itin >= 3 },
];