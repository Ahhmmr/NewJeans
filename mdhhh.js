const image= document.getElementById('cover'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-artist'),
currentTime = document.getElementById('current-time'),
durrat= document.getElementById('duration'),
progrs= document.getElementById('progres'),
playerprogs= document.getElementById('player-progres'),
prevBtn=document.getElementById('Previous'),
nekBtn=document.getElementById('Next'),
plyBtn=document.getElementById('Play');
const music = new Audio();
const songs = [
    {
        path: 'audio/newjeans.mp3',
        displayName: 'New Jeans',
        cover: 'image/dde8c6f16d2ea837488f1f9e3538b468.jpg',
        artist: 'NewJeans',
    },
    {
        path: 'audio/eta.mp3',
        displayName: 'ETA',
        cover: 'image/dde8c6f16d2ea837488f1f9e3538b468.jpg',
        artist: 'NewJeans',
    },
    {
        path: 'audio/omg.mp3',
        displayName: 'OMG',
        cover: 'image/9c516ec794baedbef35be7277dd630f2.jpg',
        artist: 'NewJeans',
    },
    {
        path: 'audio/ditto.mp3',
        displayName: 'Ditto',
        cover: 'image/16e2bf06b8883a791c40dd59e1d8fed3.jpg',
        artist: 'NewJeans',
    }
];
let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic(){
    isPlaying=true;
    plyBtn.classList.replace('bi-play-fill', 'bi-pause-fill');
    plyBtn.setAttribute('title', 'Pause');
    music.play();
}
function pauseMusic(){
    isPlaying=false;
    plyBtn.classList.replace('bi-pause-fill', 'bi-play-fill');
    plyBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(songs){
    music.src = songs.path;
    title.textContent = songs.displayName;
    artist.textContent = songs.artist;
    image.src = songs.cover;

}
function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
    
}
function updateProgressBar(){
    const { duration, currentTime} = music;
    const progressPercent = (currentTime / duration) * 100;
    progrs.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math,floor(time)).padStart(2, '0');
    durrat.textContent=`${formatTime(duration/60)}:${formatTime(duration % 60)}`;
    currentTime.textContent= `${formatTime(currentTime/60)}:${formatTime(currentTime % 60)}`;

}

function setProgressBar(e){
    const width = playerprogs.clientWidth
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}
plyBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nekBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerprogs.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);