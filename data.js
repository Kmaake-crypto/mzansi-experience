// data.js — the single source of truth for every experience card on the site.
// Swap this array for a real API response later; nothing else needs to change.

const EXPERIENCES = [
  { id: 1, title: "Vilakazi Street Walk", city: "Johannesburg", category: "culture", price: 250, rating: 4.9, img: "https://picsum.photos/seed/vilakazi/600/450", blurb: "Walk the only street to house two Nobel Peace Prize winners." },
  { id: 2, title: "Joburg Food Market", city: "Johannesburg", category: "food", price: 150, rating: 4.7, img: "https://picsum.photos/seed/joburgfood/600/450", blurb: "Rooftop stalls, live jazz, and the best boerewors roll in the city." },
  { id: 3, title: "Maboneng Art Walk", city: "Johannesburg", category: "art", price: 200, rating: 4.6, img: "https://picsum.photos/seed/maboneng/600/450", blurb: "Murals, galleries and studios in Joburg's reborn arts precinct." },
  { id: 4, title: "Constitution Hill Tour", city: "Johannesburg", category: "culture", price: 180, rating: 4.8, img: "https://picsum.photos/seed/consthill/600/450", blurb: "From political prison to the seat of South Africa's highest court." },
  { id: 5, title: "Kirstenbosch Sunset Concert", city: "Cape Town", category: "music", price: 320, rating: 4.9, img: "https://picsum.photos/seed/kirstenbosch/600/450", blurb: "Live music on the lawns beneath Table Mountain." },
  { id: 6, title: "Bo-Kaap Colour Walk", city: "Cape Town", category: "culture", price: 220, rating: 4.8, img: "https://picsum.photos/seed/bokaap/600/450", blurb: "Cobbled streets, bright facades and Cape Malay cooking." },
  { id: 7, title: "Table Mountain Cableway", city: "Cape Town", category: "adventure", price: 400, rating: 4.9, img: "https://picsum.photos/seed/tablemtn/600/450", blurb: "360° views over the peninsula, weather permitting." },
  { id: 8, title: "V&A Food Safari", city: "Cape Town", category: "food", price: 350, rating: 4.7, img: "https://picsum.photos/seed/vandafood/600/450", blurb: "A guided crawl through the harbour's best kitchens." },
  { id: 9, title: "Golden Hour Photo Walk", city: "Durban", category: "photography", price: 280, rating: 4.6, img: "https://picsum.photos/seed/durbanphoto/600/450", blurb: "The Golden Mile at sunrise, with a working photographer." },
  { id: 10, title: "uShaka Marine Adventure", city: "Durban", category: "adventure", price: 300, rating: 4.5, img: "https://picsum.photos/seed/ushaka/600/450", blurb: "Ocean life, water slides and a proper sea breeze." },
  { id: 11, title: "Kruger Sunrise Safari", city: "Mpumalanga", category: "adventure", price: 850, rating: 5.0, img: "https://picsum.photos/seed/kruger/600/450", blurb: "Big Five game drive as the bush wakes up." },
  { id: 12, title: "Cradle of Humankind Tour", city: "Gauteng", category: "culture", price: 260, rating: 4.7, img: "https://picsum.photos/seed/cradle/600/450", blurb: "Stand where humanity's oldest ancestors were found." },
];

const CATEGORIES = ["all", "food", "culture", "adventure", "music", "art", "photography"];