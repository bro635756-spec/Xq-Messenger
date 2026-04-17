// Spotify API Bağlantısı (music_on_spotify_search_play klasöründen beslenir)
const spotifyClientID = '1a5def3fab8142a79a1d48cd7c260751'; 

window.paylasHikaye = async function() {
    const durumMetni = document.getElementById('statusInput').value;
    const secilenMuzik = document.getElementById('spotifySearch').value;

    // Spotify'da müzik ara
    const response = await fetch(`https://api.spotify.com/v1/search?q=${secilenMuzik}&type=track`, {
        headers: { 'Authorization': 'Bearer ' + accessToken }
    });
    const data = await response.json();
    const trackUri = data.tracks.items[0].uri;

    // Firebase'e hikayeyi müzik linkiyle kaydet
    push(ref(db, 'stories'), {
        user: currentUserEmail,
        text: durumMetni,
        spotify_track: trackUri,
        timestamp: Date.now()
    });
    
    alert("Spotify müzikli XQ Durumu paylaşıldı!");
};
