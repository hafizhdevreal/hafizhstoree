export default async function handler(req, res) {

  const { service, target } = req.body;

  const API_ID = process.env.API_ID;
  const API_KEY = process.env.API_KEY;

  const crypto = require("crypto");
  const sign = crypto.createHash("md5")
    .update(API_ID + API_KEY)
    .digest("hex");

  const response = await fetch("https://vip-reseller.co.id/api/prepaid", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      key: API_KEY,
      sign,
      type: "order",
      service,
      data_no: target
    })
  });

  const data = await response.json();

  res.status(200).json({
    message: data.message || "Transaksi diproses",
    raw: data
  });
}
