import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-database.js";
// Depondaki yasal verilere dinamik bağlantı
import { anayasaMaddeleri } from './T.C Anayasa Hukuki Veri/maddeler.js'; 

const firebaseConfig = { /* Mevcut Config Bilgilerin */ };
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// SİBER DENETÇİ: Mesajları anlık kontrol eder
export async function siberDenetim(mesaj, kullanici) {
    const yasakliKelimeler = ["terör", "darbe", "saldırı", "tecavüz", "taciz"];
    const ihlal = yasakliKelimeler.some(kelime => mesaj.toLowerCase().includes(kelime));

    if (ihlal) {
        // İhlal raporunu admin mailine (bro635756@gmail.com) gönder
        await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { 'Authorization': 'Bearer re_29BPLbT4_CA6DrRuvHfAK2f7XJgiarAfR', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                from: 'SiberDenetim@resend.dev',
                to: ['bro635756@gmail.com'],
                subject: '🚨 XQ GÜVENLİK İHLALİ',
                html: `<p><b>Kullanıcı:</b> ${kullanici}</p><p><b>İhlal Mesajı:</b> ${mesaj}</p>`
            })
        });
        return false; // Mesajı engelle
    }
    return true; // Mesaj güvenli
}
