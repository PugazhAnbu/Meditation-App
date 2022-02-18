const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    //outline of the play symbol circle

    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    //Time display
    const timeDisplay = document.querySelector('.time-display');

    const timeSelect = document.querySelectorAll('.time-select button');


    //Get the length of the outline
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength)

    //duration time to meditate

    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //pick different sounds
    sounds.forEach(sound => {
        //console.log(sound)
        sound.addEventListener('click', (e)=>{
            console.log(sound)
            song.src = sound.getAttribute('data-sound');
            video.src = sound.getAttribute('data-video');
            console.log(song.src)
            checkplaying(song);
        })
    })

    //play sound

    play.addEventListener('click', () => {
        checkplaying(song)
    });

    // select sound

    timeSelect.forEach(option => {
        option.addEventListener('click', function() {
            fakeDuration = this.getAttribute('data-time')
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
        })
        
    });

    // create a function specific to stop and play the sounds
    const checkplaying = (song) => {
        if(song.paused){
            song.play();
            video.play();
            play.src = './meditation-app-master/svg/pause.svg'
        }
        else{
            song.pause();
            video.pause();
            play.src = 'meditation-app-master/svg/play.svg'
        }
    };

    //we can animated the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime
        //console.log(currentTime)
        let elapsed = fakeDuration -currentTime
       // console.log(elapsed)

        let seconds = ~~(elapsed % 60);
        //console.log(seconds)
        let minutes = ~~(elapsed / 60);

        //Animate the circle

        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //animate the text

        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeDuration){
            song.pause();
            song.currentTime = 0;
            play.src = 'meditation-app-master/svg/play.svg';
            video.pause();
        }
    }

   
}

app();