// Simple Sanity fetch helper using the public API endpoint (no client lib required)
// Expects the following env vars to be set in .env.local (for production/preview):
// SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION (e.g. '2023-10-01'), SANITY_TOKEN (optional for private datasets)

const PROJECT_ID = process.env.SANITY_PROJECT_ID;
const DATASET = process.env.SANITY_DATASET || 'production';
const API_VERSION = process.env.SANITY_API_VERSION || '2023-10-01';
const TOKEN = process.env.SANITY_TOKEN;

async function fetchSanity(query) {
  if (!PROJECT_ID) return null;
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`;
  const headers = { 'Content-Type': 'application/json' };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

  const res = await fetch(url, { headers });
  if (!res.ok) return null;
  const body = await res.json();
  return body.result;
}

export async function getProjectsFromSanity() {
  const q = `*[_type == "project"]{title, "slug": slug.current, "cover": mainImage.asset->url, tags, description, githubLink, liveLink, "images": images[].asset->url}`;
  const data = await fetchSanity(q);
  return data || null;
}

export async function getProjectBySlug(slug) {
  if (!slug) return null;
  const q = `*[_type == "project" && slug.current == "${slug}"][0]{title, "slug": slug.current, "cover": mainImage.asset->url, tags, description, githubLink, liveLink, "images": images[].asset->url}`;
  const data = await fetchSanity(q);
  return data || null;
}

export async function getSkillsFromSanity() {
  const q = `*[_type == "skill"]{name, percentage, icon}`;
  const data = await fetchSanity(q);
  return data || null;
}

export async function getPageInfoFromSanity() {
  // include vCard file url if uploaded in Sanity as vCardFile
  const q = `*[_type == "pageInfo"][0]{aboutMeText, profileBio, contactEmail, phoneNumber, "vCard": vCardFile.asset->url}`;
  const data = await fetchSanity(q);
  return data || null;
}

const Sanity = { fetchSanity, getProjectsFromSanity, getProjectBySlug, getSkillsFromSanity, getPageInfoFromSanity };
export default Sanity;
