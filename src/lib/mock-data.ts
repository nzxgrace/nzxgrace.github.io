export type Status = "live" | "online" | "offline";

export type VTuber = {
  slug: string;
  name: string;
  handle: string;
  avatar: string;
  banner: string;
  bio: string;
  lore: string;
  agency: string | null;
  generation: string | null;
  status: Status;
  languages: string[];
  tags: string[];
  gender: "female" | "male" | "non-binary";
  modelType: "2D" | "3D";
  state: string;
  region: string;
  contentType: string[];
  debut: string;
  birthday: string;
  height: string;
  fanName: string;
  oshiMark: string;
  hashtag: string;
  followers: number;
  subscribers: number;
  verified: boolean;
  socials: {
    youtube?: string;
    twitch?: string;
    twitter?: string;
    instagram?: string;
    discord?: string;
  };
  color: string;
  liveInfo?: {
    title: string;
    game: string;
    platform: "YouTube" | "Twitch";
    viewers: number;
    startedAt: string;
    thumbnail: string;
  };
};

export type Agency = {
  slug: string;
  name: string;
  logo: string;
  tagline: string;
  founded: string;
  memberCount: number;
  generations: string[];
  color: string;
};

const avatar = (seed: string) =>
  `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(seed)}&backgroundType=gradientLinear&backgroundRotation=45`;

const banner = (seed: string, hue: number) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=1600&q=70&hue=${hue}`;

export const AGENCIES: Agency[] = [
  {
    slug: "aether-live",
    name: "Aether Live",
    logo: avatar("aether-live-agency"),
    tagline: "Where virtual idols are born.",
    founded: "2022",
    memberCount: 14,
    generations: ["Gen 0", "Gen 1", "Gen 2"],
    color: "oklch(0.7 0.22 305)",
  },
  {
    slug: "neo-desi",
    name: "Neo Desi Productions",
    logo: avatar("neo-desi-agency"),
    tagline: "The new wave of desi vtubing.",
    founded: "2023",
    memberCount: 9,
    generations: ["Wave 1", "Wave 2"],
    color: "oklch(0.78 0.2 350)",
  },
  {
    slug: "project-v",
    name: "Project V",
    logo: avatar("project-v-agency"),
    tagline: "Virtual creators, real dreams.",
    founded: "2021",
    memberCount: 22,
    generations: ["Alpha", "Beta", "Gamma"],
    color: "oklch(0.82 0.16 210)",
  },
  {
    slug: "lotus-studios",
    name: "Lotus Studios",
    logo: avatar("lotus-studios-agency"),
    tagline: "Blooming stars from the subcontinent.",
    founded: "2023",
    memberCount: 6,
    generations: ["Petal 1"],
    color: "oklch(0.75 0.2 60)",
  },
];

const NAMES = [
  ["Mira Nakamura", "female", "Aether Live", "Gen 1"],
  ["Aarya Ch.", "female", "Aether Live", "Gen 1"],
  ["Kavya Virtual", "female", null, null],
  ["Rudra Digital", "male", "Neo Desi Productions", "Wave 1"],
  ["Isha Priya", "female", null, null],
  ["Neon Kaira", "female", "Aether Live", "Gen 2"],
  ["Kiran Ito", "non-binary", "Project V", "Beta"],
  ["Saanvi Star", "female", "Lotus Studios", "Petal 1"],
  ["Vega Devraj", "male", null, null],
  ["Zephyr Bose", "non-binary", "Project V", "Gamma"],
  ["Mimi Chatterjee", "female", "Neo Desi Productions", "Wave 2"],
  ["Ronin Iyer", "male", "Aether Live", "Gen 2"],
  ["Tara Moonbeam", "female", null, null],
  ["Aksh Vira", "male", "Project V", "Alpha"],
  ["Luna Ambar", "female", "Lotus Studios", "Petal 1"],
  ["Yuki Sharma", "female", null, null],
  ["Riya Prism", "female", "Neo Desi Productions", "Wave 1"],
  ["Dev Cyber", "male", null, null],
  ["Chirp Menon", "non-binary", null, null],
  ["Ayla Hex", "female", "Aether Live", "Gen 0"],
] as const;

const LANGUAGES = ["Hindi", "English", "Tamil", "Telugu", "Bengali", "Marathi", "Malayalam", "Kannada", "Japanese"];
const STATES = ["Maharashtra", "Karnataka", "Delhi", "Tamil Nadu", "West Bengal", "Kerala", "Punjab", "Gujarat", "Telangana"];
const CONTENT = ["Gaming", "Singing", "Zatsudan", "ASMR", "Art", "Coding", "Just Chatting", "Minecraft", "Valorant", "Genshin"];
const OSHI = ["✧", "❀", "☾", "✦", "❁", "☆", "♡", "♪", "◈", "❃"];

function pick<T>(arr: readonly T[], n: number, seed: number): T[] {
  const out: T[] = [];
  for (let i = 0; i < n; i++) out.push(arr[(seed + i * 3) % arr.length]);
  return Array.from(new Set(out));
}

export const VTUBERS: VTuber[] = NAMES.map(([name, gender, agency, gen], i) => {
  const slug = String(name).toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const followers = Math.floor(500 + Math.abs(Math.sin(i * 3.7)) * 120000);
  const status: Status = i % 5 === 0 ? "live" : i % 3 === 0 ? "online" : "offline";
  const state = STATES[i % STATES.length];
  return {
    slug,
    name: String(name),
    handle: "@" + slug.replace(/-/g, "_"),
    avatar: avatar(slug),
    banner: `https://picsum.photos/seed/${slug}-banner/1600/500`,
    bio: `Virtual creator from ${state}. Streaming ${CONTENT[i % CONTENT.length]} and more. Nice to meet you!`,
    lore: `Once a stargazer from the ${state} highlands, ${String(name).split(" ")[0]} slipped through a broken pixel and now streams from the seam between worlds.`,
    agency: agency as string | null,
    generation: gen as string | null,
    status,
    languages: pick(LANGUAGES, 2 + (i % 2), i),
    tags: pick(CONTENT, 3, i + 2),
    gender: gender as VTuber["gender"],
    modelType: i % 4 === 0 ? "3D" : "2D",
    state,
    region: ["North", "South", "East", "West"][i % 4],
    contentType: pick(CONTENT, 2, i + 5),
    debut: `${2021 + (i % 4)}-${String(1 + (i % 12)).padStart(2, "0")}-15`,
    birthday: `${String(1 + (i % 12)).padStart(2, "0")}-${String(1 + (i % 27)).padStart(2, "0")}`,
    height: `${150 + (i % 30)} cm`,
    fanName: String(name).split(" ")[0] + "lings",
    oshiMark: OSHI[i % OSHI.length],
    hashtag: "#" + slug.replace(/-/g, ""),
    followers,
    subscribers: Math.floor(followers * 0.7),
    verified: i % 3 === 0,
    socials: {
      youtube: "https://youtube.com/@" + slug,
      twitch: i % 2 === 0 ? "https://twitch.tv/" + slug : undefined,
      twitter: "https://x.com/" + slug,
      instagram: i % 3 === 0 ? "https://instagram.com/" + slug : undefined,
      discord: i % 4 === 0 ? "https://discord.gg/" + slug : undefined,
    },
    color: ["oklch(0.7 0.22 305)", "oklch(0.78 0.2 350)", "oklch(0.82 0.16 210)", "oklch(0.75 0.2 60)"][i % 4],
    liveInfo:
      status === "live"
        ? {
            title: `${CONTENT[i % CONTENT.length]} with chat! come hang out ${OSHI[i % OSHI.length]}`,
            game: CONTENT[i % CONTENT.length],
            platform: i % 2 === 0 ? "YouTube" : "Twitch",
            viewers: Math.floor(50 + Math.abs(Math.cos(i)) * 3500),
            startedAt: new Date(Date.now() - (i + 1) * 15 * 60 * 1000).toISOString(),
            thumbnail: `https://picsum.photos/seed/${slug}-stream/640/360`,
          }
        : undefined,
  };
});

export const STATS = {
  total: VTUBERS.length,
  active: VTUBERS.filter((v) => v.status !== "offline").length,
  agencies: AGENCIES.length,
  indies: VTUBERS.filter((v) => !v.agency).length,
  languages: 8,
  totalFollowers: VTUBERS.reduce((s, v) => s + v.followers, 0),
};

export function getVTuber(slug: string) {
  return VTUBERS.find((v) => v.slug === slug);
}

export function formatNumber(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(n);
}
