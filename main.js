import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-database.js";

const firebaseConfig = { apiKey: "AIzaSyBQdsC8VuoBnFyOLWavV3C8GXomSzDXUzw", databaseURL: "https://des-store-c93e0-default-rtdb.europe-west1.firebasedatabase.app" };
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const RESEND_KEY = "re_29BPLbT4_CA6DrRuvHfAK2f7XJgiarAfR";

let generatedOTP = "";
const sendBtn = document.getElementById('sendBtn');
const acceptCheck = document.getElementById('accept');

// Sözleşmeyi Yükle
fetch('T.Canayasamaddekapsami.json').then(r => r.json()).then(data => {
    document.getElementById('legalText').innerText = data.sozlesme;
});

acceptCheck.onchange = () => sendBtn.disabled = !acceptCheck.checked;

sendBtn.onclick = async () => {
    const email = document.getElementById('email').value;
    generatedOTP = Math.floor(100000000 + Math.random() * 900000000).toString();
    
    // Resend üzerinden anlık gönderim
    await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            from: 'XQ-Auth <onboarding@resend.dev>',
            to: [email],
            subject: 'XQ Ultra Güvenlik Kodu',
            html: `Kodunuz: <b>${generatedOTP}</b>. Suç teşkil eden kullanımlar yasaktır.`
        })
    });
    
    document.getElementById('otpArea').style.display = 'block';
    alert("9 Haneli kod gönderildi!");
};
