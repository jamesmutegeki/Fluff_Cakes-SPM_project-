import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('order_enquiries')
        .select('*')
        .order('id', { ascending: false })
        .limit(50);
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const { name, occasion, item, flavour, date, guests, method, notes, message } = req.body || {};
      if (!name || !String(name).trim()) {
        return res.status(400).json({ error: 'Your first name is required so we know who the cake is for.' });
      }

      const { count, error: countError } = await supabase
        .from('order_enquiries')
        .select('*', { count: 'exact', head: true });
      if (countError) throw countError;
      const ref = `FC-${String((count ?? 0) + 1).padStart(4, '0')}`;

      const { data, error } = await supabase
        .from('order_enquiries')
        .insert({
          ref,
          name: String(name).trim(),
          occasion: occasion || null,
          item: item || null,
          flavour: flavour || null,
          needed_date: date || null,
          guests: guests ? String(guests) : null,
          method: method || null,
          notes: notes || null,
          message: message || null,
        })
        .select()
        .single();
      if (error) throw error;
      return res.status(201).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: err.message });
  }
}
