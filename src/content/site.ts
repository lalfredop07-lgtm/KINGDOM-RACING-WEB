/**
 * Organizational facts in this file come from the public Kingdom Racing website
 * (kingdomracing.net — home, /about, /events, /donate, /contact, /news), read on 2026-10-29.
 * Do not add statistics, partners, or dates that are not published by Kingdom Racing.
 */

export const site = {
  name: "Kingdom Racing",
  legalName: "Kingdom Racing Foundation",
  tagline: "Delivering God’s Word Through Motorsports",
  motto: "Speed. People. Purpose.",
  pillars: ["Faith", "Spirit", "Truth"],
  email: "team@kingdomracing.net",
  address: {
    line1: "915 Tiki Drive",
    city: "Galveston",
    state: "TX",
    zip: "77554",
  },
  nonprofit: "Kingdom Racing Foundation is a non-denominational Christian 501(c)(3).",
  donateUrl: "https://www.paypal.com/fundraiser/charity/1876022",
  newsUrl: "https://kingdomracing.net/news",
  channelUrl: "https://www.youtube.com/@KingdomRacing2025",
  socials: [
    { label: "Instagram", short: "IG", href: "https://www.instagram.com/kingdomracing/" },
    { label: "Facebook", short: "FB", href: "https://www.facebook.com/KingdomRacing" },
    { label: "X", short: "X", href: "https://x.com/KingdomRacing" },
    { label: "LinkedIn", short: "IN", href: "https://linkedin.com/company/Kingdom-racing" },
  ],
} as const;

export type NavItem = { href: string; label: string; blurb: string; image: string };

export const nav: NavItem[] = [
  { href: "/mission", label: "Mission", blurb: "Why we race", image: "/images/sharing-the-word.jpg" },
  { href: "/legacy", label: "Legacy", blurb: "Our story since 2007", image: "/images/front-straight.jpg" },
  { href: "/ministry", label: "Ministry", blurb: "Community & outreach", image: "/images/prayer-circle.jpg" },
  { href: "/racing", label: "Racing", blurb: "Events & the track", image: "/images/track-pack.jpg" },
  { href: "/stories", label: "Stories", blurb: "Media & news", image: "/images/pit-lane.jpg" },
  { href: "/god-speed-magazine", label: "Magazine", blurb: "GOD SPEED · Free", image: "/official/god-speed-magazine-september-2025.jpg" },
  { href: "/support", label: "Support", blurb: "Give · get involved · contact", image: "/images/chase-sunset.jpg" },
];

export const ministries = [
  {
    id: "miles-of-smiles",
    index: "01",
    name: "Miles of Smiles",
    kicker: "Hope at the track",
    summary:
      "We host youth groups, individuals, and families walking through difficult seasons and give them VIP experiences at racetrack events across the nation.",
    image: "/images/paddock-community.jpg",
    alt: "Illustrative image: a team member kneels to talk with children and their families in a racing paddock.",
  },
  {
    id: "ambassadors",
    index: "02",
    name: "Kingdom Racing Ambassadors",
    kicker: "Trackside evangelists",
    summary:
      "Volunteers who meet race fans where they are, offering Bible tracts and a personal invitation to begin a relationship with Jesus Christ.",
    image: "/images/sharing-the-word.jpg",
    alt: "Illustrative image: a small group reads Scripture together beside the pit lane at sunset.",
  },
  {
    id: "fan-festivals",
    index: "03",
    name: "Fan Festivals",
    kicker: "Praise at legendary circuits",
    summary:
      "Praise and worship gatherings held at legendary race circuits, including Indianapolis Motor Speedway and Texas Motor Speedway.",
    image: "/images/prayer-circle.jpg",
    alt: "Illustrative image: families and race fans bow their heads in prayer near the grandstands.",
  },
] as const;

export const milestones = [
  {
    key: "2007",
    title: "Green flag",
    text: "Kingdom Racing begins competing — a journey that grows to include IndyCar, sports cars, sprint cars, and other motorsports.",
  },
  {
    key: "2008",
    title: "History at Indianapolis",
    text: "Kingdom Racing becomes the first faith-vision team ever to compete in the Indianapolis 500 Mile Race.",
  },
  {
    key: "70+",
    title: "Races with purpose",
    text: "More than 70 IndyCar and other major-series races, each one an open door to share hope with the people around us.",
  },
  {
    key: "GOD SPEED",
    title: "The message in print",
    text: "The book God Speed and the launch of GOD SPEED Magazine carry the message beyond the racetrack and into people’s homes.",
  },
  {
    key: "20+",
    title: "Years at God Speed",
    text: "More than two decades of Christ-based ministry through motorsports, carried by a team staffed entirely by volunteers.",
  },
] as const;

export const stats = [
  { value: 20, suffix: "+", label: "Years of ministry", note: "Sharing God’s Word through motorsports" },
  { value: 70, suffix: "+", label: "Major-series races", note: "IndyCar and other major series" },
  { value: 100, suffix: "%", label: "Volunteer-staffed", note: "Every role is filled by volunteers" },
  { value: 2008, suffix: "", label: "Indianapolis 500", note: "First faith-vision team to compete", plain: true },
] as const;

export const goal = { value: 1000000, label: "Our vision: to reach 1,000,000 people for Jesus Christ." };

/** "Ministry Event Schedule 2026" exactly as published on kingdomracing.net/events. */
export const events2026 = [
  { dates: "Feb 27 – Mar 1", month: "FEB", name: "Grand Prix of St. Petersburg", place: "St. Petersburg, Florida", series: "INDYCAR" },
  { dates: "Mar 14", month: "MAR", name: "Road Atlanta", place: "Braselton, Georgia", series: "SVRA / TransAm" },
  { dates: "Mar 27 – 29", month: "MAR", name: "Barber Motorsports Park", place: "Birmingham, Alabama", series: "INDYCAR" },
  { dates: "Apr 17 – 19", month: "APR", name: "Grand Prix of Long Beach", place: "Long Beach, California", series: "INDYCAR" },
  { dates: "May 12 – 14", month: "MAY", name: "Indianapolis Motor Speedway", place: "Indianapolis, Indiana", series: "INDYCAR" },
  { dates: "Jun 6 – 7", month: "JUN", name: "WWT Raceway", place: "St. Louis", series: "INDYCAR" },
  { dates: "Jun 19 & 21", month: "JUN", name: "Road America", place: "Elkhart Lake, Wisconsin", series: "INDYCAR" },
  { dates: "Jul 3 – 5", month: "JUL", name: "Mid-Ohio", place: "Lexington, Ohio", series: "INDYCAR" },
  { dates: "Jul 18 – 19", month: "JUL", name: "Grand Prix at Nashville", place: "Nashville, Tennessee", series: "INDYCAR" },
  { dates: "Sep 4 – 6", month: "SEP", name: "Laguna Seca", place: "Monterey, California", series: "INDYCAR" },
] as const;

/** Published posts on kingdomracing.net/news. */
export const stories = [
  {
    title: "Racing Outreach",
    date: "April 11, 2025",
    category: "Outreach",
    image: "/images/sharing-the-word.jpg",
    video: "/media/chase.mp4",
    href: "https://kingdomracing.net/news",
  },
  {
    title: "2024 Miles of Smiles Season Review",
    date: "December 31, 2024",
    category: "Miles of Smiles",
    image: "/images/paddock-community.jpg",
    video: "/media/oval.mp4",
    href: "https://kingdomracing.net/news",
  },
  {
    title: "2023 Miles of Smiles Season Review",
    date: "December 31, 2023",
    category: "Miles of Smiles",
    excerpt: "The season started on the streets of St. Petersburg, Florida, with the IndyCar Series.",
    image: "/images/grandstands.jpg",
    video: "/media/hero-720.mp4",
    href: "https://kingdomracing.net/news",
  },
] as const;

export const drivers = [
  "Davey Hamilton",
  "Simon Pagenaud",
  "Sage Karam",
  "Townsend Bell",
  "Martin Plowman",
  "Sting Ray Robb",
  "Rafa Matos",
  "Nathan Byrd",
  "McKenna Haase",
] as const;

export const ministryPartners = [
  "Man in the Mirror",
  "Creation Museum",
  "Athletes in Action",
  "Fellowship of Christian Athletes",
  "IndyCar Ministry",
  "Campus Crusade for Christ",
] as const;

export const leadership = {
  founders: "George & Maricarmen Del Canto",
  board: [
    { name: "Randy Ford", role: "Advisory Board Chairman" },
    { name: "Patrick Morley", role: "Founder and CEO, Man in the Mirror" },
    { name: "Matthew Easterly", role: "Advisory Board" },
  ],
  memoriam: [
    { name: "Bill Edwards", role: "Founding Member" },
    { name: "Wallace Henley", role: "Advisory Board" },
  ],
} as const;

export const involvement = [
  {
    id: "pray",
    title: "Pray",
    text: "Pray for the drivers, teams, fans, and volunteers we meet at every event. Send us a prayer request — our team would be honored to pray with you.",
    cta: "Send a prayer request",
    href: "/support?topic=prayer#contact",
  },
  {
    id: "volunteer",
    title: "Volunteer",
    text: "Kingdom Racing is staffed 100% by volunteers. Serve trackside as an Ambassador, help host Miles of Smiles guests, or support a Fan Festival.",
    cta: "Explore volunteering",
    href: "/support?topic=volunteer#contact",
  },
  {
    id: "partner",
    title: "Partner",
    text: "Churches, ministries, and businesses can partner with us to carry the message further — at the track and beyond it.",
    cta: "Start a conversation",
    href: "/support?topic=partner#contact",
  },
  {
    id: "give",
    title: "Give",
    text: "Your gift fuels Miles of Smiles, KR Ambassadors, and Fan Festivals as we work toward reaching one million people for Jesus Christ.",
    cta: "Donate with PayPal",
    href: site.donateUrl,
    external: true,
  },
] as const;

export const scripture = {
  text: "Let us run with endurance the race that is set before us, looking to Jesus, the founder and perfecter of our faith.",
  ref: "Hebrews 12:1–2 (ESV)",
};

/**
 * GOD SPEED Magazine, the book, and the channel — from kingdomracing.net/godspeedchannel and
 * /contact (read 2026-10-29). The cover and book jacket are Kingdom Racing’s own published images;
 * everything listed under an edition is printed on that cover. Do not add issue numbers, article
 * summaries, authors, or editions that Kingdom Racing has not published.
 */
export const magazine = {
  name: "GOD SPEED Magazine",
  pageUrl: "https://www.kingdomracing.net/godspeedchannel",
  /** The official sign-up form on that page (email or mailing address). */
  signupUrl: "https://www.kingdomracing.net/godspeedchannel#frmContact",
  launch: "Kingdom Racing has launched a beautiful magazine rightfully named God Speed Magazine.",
  promise:
    "True, inspiring stories and testimonies of how God has powerfully changed the lives of many in and through motorsports families.",
  eachIssue:
    "Each issue features different stories of faith and perseverance in motorsports covered by Kingdom Racing’s ministry and outreach events.",
  free: "God Speed Magazine is 100% free.",
  signupHow: "Provide your email or the mailing address where you’d like to receive your magazines.",
  byEmail: "For free subscriptions, provide your name and full street address by email.",
  privacy: "All information will be kept confidential.",
  editions: [
    {
      id: "september-2025",
      date: "September 2025",
      cover: "/official/god-speed-magazine-september-2025.jpg",
      width: 514,
      height: 668,
      coverStory: { name: "Davey Hamilton", line: "A Racing Life!" },
      coverLines: ["Kingdom Music Video Spotlight", "Racer’s Bible Study", "Big Win at Indy"],
      credit: "Cover photo: Davey Hamilton Racing",
      alt: "Cover of GOD SPEED Magazine, September 2025: an orange, winged number 1 race car leads another car through a turn under the headline “Davey Hamilton — A Racing Life!”",
    },
  ],
} as const;

export const book = {
  title: "God Speed",
  subtitle: "Steering Through Triumph and Tragedy",
  byline: "Chad Bonham with Team Kingdom Racing",
  foreword: "Foreword by Al Unser Jr.",
  opening: "It started with a young boy’s dream.",
  text: "God Speed is the remarkable true story of how God uses ordinary people to accomplish extraordinary things for His Kingdom. But most importantly, it will inspire you to dare to dream and achieve God’s dream for your life!",
  cover: "/official/god-speed-book.jpg",
  width: 476,
  height: 750,
  orderUrl: "https://crosstrainingpublishing.com/products/god-speed",
  alt: "Cover of the book God Speed: Steering Through Triumph and Tragedy, by Chad Bonham with Team Kingdom Racing, foreword by Al Unser Jr.",
} as const;

export const channel = {
  name: "GOD SPEED Channel",
  url: site.channelUrl,
  text: "The latest videos from the Kingdom Racing community, on YouTube.",
} as const;

/** Builds the email a reader sends to request a free printed subscription. */
export const magazineMailto = `mailto:${site.email}?subject=${encodeURIComponent("Free GOD SPEED Magazine subscription")}&body=${encodeURIComponent(
  "Hello Kingdom Racing team,\n\nPlease send me a free subscription to GOD SPEED Magazine.\n\nName:\nStreet address:\nCity, State, ZIP:\n\nThank you!",
)}`;
