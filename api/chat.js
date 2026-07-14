// api/chat.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    const { messages } = req.body;
    const apiKey = process.env.UPSTAGE_API_KEY;
  
    if (!apiKey) {
      return res.status(500).json({ error: 'Upstage API Key가 서버에 설정되지 않았습니다.' });
    }
  
    try {
      const response = await fetch("https://api.upstage.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "solar-pro3",
          messages: messages
        })
      });
  
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }