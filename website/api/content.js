import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const [cakes, packages, addons, flavours, faqs, testimonials, site] = await Promise.all([
      supabase.from('cakes').select('*').order('sort', { ascending: true }),
      supabase.from('packages').select('*').order('sort', { ascending: true }),
      supabase.from('addons').select('*').order('sort', { ascending: true }),
      supabase.from('flavours').select('*').order('sort', { ascending: true }),
      supabase.from('faqs').select('*').order('sort', { ascending: true }),
      supabase.from('testimonials').select('*').order('sort', { ascending: true }),
      supabase.from('site_content').select('*'),
    ]);

    for (const result of [cakes, packages, addons, flavours, faqs, testimonials, site]) {
      if (result.error) throw result.error;
    }

    const content = {};
    for (const row of site.data) content[row.key] = row.data;

    return res.status(200).json({
      cakes: cakes.data,
      packages: packages.data,
      addons: addons.data,
      flavours: flavours.data,
      faqs: faqs.data,
      testimonials: testimonials.data,
      ...content,
    });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: err.message });
  }
}
