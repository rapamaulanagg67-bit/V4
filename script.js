const ADMIN="6283817546555", DANA="083867468118";
const packages=[
  ["3 Hari","Rp2.000","Paket 3 hari",false],
  ["6 Hari","Rp4.000","Paket 6 hari",true],
  ["8 Hari","Rp5.000","Paket 8 hari",false],
  ["10 Hari","Rp7.000","Paket 10 hari",false],
  ["PERMANEN","Rp10.000","Akses permanen",true]
];
const digital=[
 ["APK BUG GOJO CRASHER V2 X RAT","Rp2.000"],
 ["APK AUTO SV","Rp2.000"],["PANEL UNLI","Rp10.000"],
 ["FILE AUTO HS 70%","-"],["JASA EDIT SPEK","Rp1.000"],
 ["JASA BUAT LOGO JB","Rp2.000"],["MURPUSH","Rp1.000"],
 ["NOKOS INDO","Rp6.000"],["FF KIPAS","Rp3.000"]
];
let selected=null;
const $=id=>document.getElementById(id);
function moneyNumber(v){return Number((v||"").replace(/[^\d]/g,""))||0}
function renderPackages(){
 $("packages").innerHTML=packages.map((p,i)=>`<article class="package ${p[3]?'hot':''}">
 ${p[3]?'<span class="tag">🔥 POPULER</span>':''}<h4>${p[0]}</h4><div class="price">${p[1]} <small>/ joki</small></div><p style="color:#74829b;font-size:11px">${p[2]}</p>
 <button class="primary" onclick="buyJoki(${i})">⚡ BUY SEKARANG</button></article>`).join("");
}
function renderDigital(){
 $("digitalList").innerHTML=digital.map((p,i)=>`<article class="package digital-card"><span class="pill">DIGITAL</span><h4>${p[0]}</h4><div class="price">${p[1]}</div><button class="primary" onclick="buyDigital(${i})">🛒 ORDER</button></article>`).join("");
}
function buyJoki(i){
 const p=packages[i]; selected={type:"Joki",name:p[0],price:p[1]};
 openPayment();
}
function buyDigital(i){
 const p=digital[i]; selected={type:"Digital",name:p[0],price:p[1]};
 openPayment();
}
function newId(){return "#RAFF"+Math.floor(100000+Math.random()*900000)}
function openPayment(){
 const id=newId(); selected.id=id;
 $("orderId").textContent=id;$("payPackage").textContent=selected.name;
 $("payPrice").textContent=selected.price;$("payTitle").textContent=selected.type+" • Pembayaran";
 $("paymentModal").classList.remove("hidden");
}
function closeModal(){$("paymentModal").classList.add("hidden")}
function copyDana(){navigator.clipboard?.writeText(DANA);showToast("Nomor DANA disalin ✓")}
function confirmPurchase(){
 if(!selected)return;
 const proof=$("proof").value.trim();
 const orders=JSON.parse(localStorage.getItem("raff_orders")||"[]");
 const item={...selected,proof,status:"MENUNGGU ADMIN",time:new Date().toLocaleString("id-ID")};
 orders.unshift(item);localStorage.setItem("raff_orders",JSON.stringify(orders.slice(0,20)));
 $("proof").value=""; closeModal(); renderHistory();
 showToast("Order tersimpan • Membuka WhatsApp Admin...");
 const text=`Halo Admin CEO RAFFSTR 👋%0A%0ASaya mau order:%0A• ${encodeURIComponent(selected.type)}: ${encodeURIComponent(selected.name)}%0A• Harga: ${encodeURIComponent(selected.price)}%0A• ID Order: ${selected.id}%0A%0ASaya sudah melakukan pembelian. Mohon dibantu diproses ya Admin.`;
 setTimeout(()=>{location.href=`https://wa.me/${ADMIN}?text=${text}`},500);
}
function renderHistory(){
 const orders=JSON.parse(localStorage.getItem("raff_orders")||"[]");
 $("orderCount").textContent=orders.length;
 $("lastOrder").textContent=orders[0]?.id||"-";
 $("history").innerHTML=orders.length?orders.map(o=>`<div class="history-item"><b>${o.name}</b><span>${o.id} • ${o.price} • ${o.status}<br>${o.time}</span></div>`).join(""):"<p style='color:#65738b;font-size:12px'>Belum ada order.</p>";
}
function changeName(){
 const n=prompt("Masukkan nama baru:",localStorage.getItem("raff_name")||"RAFFSTR");
 if(n?.trim()){localStorage.setItem("raff_name",n.trim());loadProfile();showToast("Nama diperbarui ✓")}
}
function loadProfile(){const n=localStorage.getItem("raff_name")||"RAFFSTR";$("profileName").textContent=n;$("avatar").textContent=n[0].toUpperCase()}
function showToast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove("show"),2200)}
document.querySelectorAll(".nav").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll(".nav").forEach(x=>x.classList.remove("active"));btn.classList.add("active");
 document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));$(btn.dataset.page).classList.add("active");window.scrollTo({top:0,behavior:"smooth"});
}));
renderPackages();renderDigital();renderHistory();loadProfile();
setTimeout(()=>{$("splash").classList.add("hidden");$("app").classList.remove("hidden")},850);
