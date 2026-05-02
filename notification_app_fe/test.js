const axios = require('axios');
const API_BASE = "http://20.207.122.201/evaluation-service";

async function test() {
  const auth = await axios.post(`${API_BASE}/auth`, {
      email: "ar1493@srmist.edu.in",
      name: "ayush ranjan",
      rollNo: "ra2311003011589",
      accessCode: "QkbpxH",
      clientID: "0251ecd7-a954-445a-a159-3896f073bd85",
      clientSecret: "TfnYCJXZpNfMtxWg",
  });
  const token = auth.data.access_token;
  console.log("Token acquired.");
  
  try {
    const res = await axios.get(`${API_BASE}/notifications?limit=50&page=1`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("Success: received", res.data.notifications.length, "items.");
  } catch (e) {
    console.log("Error:", e.response?.status, e.response?.data);
  }
}
test();
