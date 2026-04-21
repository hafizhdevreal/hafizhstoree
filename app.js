async function load() {

  const res = await fetch("/api/services");
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  (data.data || []).forEach(p => {

    list.innerHTML += `
      <div class="box">
        <b>${p.name}</b><br>
        <small>${p.code}</small><br>

        <input id="t-${p.code}" placeholder="nomor / id">
        <button onclick="buy('${p.code}')">Beli</button>
      </div>
    `;
  });
}

async function buy(code) {

  const target = document.getElementById("t-" + code).value;

  const res = await fetch("/api/order", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      service: code,
      target
    })
  });

  const data = await res.json();
  alert(data.message || "Sukses");
}
