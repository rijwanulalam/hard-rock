const searchSongs = async() =>{
    const getInput = document.getElementById('search-songs').value;
    const url = `https://api.lyrics.ovh/suggest/:${getInput}`;
    try{
        const res = await fetch (url);
        const data = await res.json();
        displaySongs(data.data);
    }
    catch(error){
        displayError('Sorry Something Went Wrong!! Try again later.')
    }
    
}

const displaySongs = songs =>{
    const songsContainer = document.getElementById('songs-container');
    songsContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = `single-result row align-items-center my-3 p-3`
        songDiv.innerHTML = `<div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author-lead">Album by <span>${song.artist.name}</span></p>
                        <audio controls>
                            <source src="${song.preview}" type="audio/mpeg">
                        </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick = "getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>`;
        songsContainer.appendChild(songDiv);
    });
}

const getLyric = async(artist, title) =>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    catch(error){
        displayError('Sorry Something Went Wrong!! Try again later.');
    }
}

const displayLyrics = songLyrics => {
    const getLyric = document.getElementById('getLyric');
    getLyric.innerText = songLyrics;
}

const displayError = error =>{
    const warningText = document.getElementById('error-message');
    warningText.innerText = error;
}