import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { stack, level, package: pkg, message, token } = req.body;
    try {
      await fetch("http://20.207.122.201/evaluation-service/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ stack, level, package: pkg, message }),
      });
    } catch {
      // silent fail
    }
    return res.status(200).json({ success: true });
  }
  return res.status(405).end();
}
