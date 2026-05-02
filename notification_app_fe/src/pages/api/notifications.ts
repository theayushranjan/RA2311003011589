import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const authHeader = req.headers.authorization;
      const queryString = new URLSearchParams(req.query as Record<string, string>).toString();
      const response = await fetch(`http://20.244.56.144/evaluation-service/notifications?${queryString}`, {
        method: "GET",
        headers: {
          ...(authHeader ? { Authorization: authHeader } : {}),
        },
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("External API error:", response.status, data);
      }
      return res.status(response.status).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
  return res.status(405).end();
}
