import React, { useState, useEffect } from "react";
import styled from 'styled-components';

const useAudio = (url) => {
    const [audio, setAudio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);


    const toggle = () => setPlaying(prev => !prev);

    useEffect(() => {
    audio.pause();
    const newAudio = new Audio(url);
    setAudio(newAudio);

    if (playing) {
      newAudio.play();
    }
  }, [url]);


  // changes for progressbar/ Time
  useEffect(() => {
    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
      setProgress((audio.currentTime / audio.duration) * 100);
    };
  
    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [audio]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing]);

    useEffect(() => {
        audio.addEventListener("ended", () => setPlaying(false));
        return () => {
            audio.removeEventListener("ended", () => setPlaying(false));
        };
    }, [audio]);

    const seek = (e) => {
      const newTime = (e.nativeEvent.offsetX / e.target.clientWidth) * audio.duration;
      audio.currentTime = newTime;
    };
  
    return [playing, toggle, progress, seek, formatTime, currentTime, duration];

};
  

const songs = [
  "music/Besharam_rang.mp3",
  "music/Pathan_them.mp3",
  "music/Night_Driver.mp3",
  "music/OvO.mp3",
  "music/Regrets.mp3",
  "music/The_Woogie.mp3",
  "music/Opened_Eyes_Woke.mp3",
];

const Player = () => {
    const [songIndex, setSongIndex] = useState(1)
    const [songName, setSongName] = useState('')

     // Update songName whenever songIndex changes
  useEffect(() => {
    setSongName(songs[songIndex].split("/").pop().replace(".mp3", ""));
  }, [songIndex]);
    // Next song
    const handleNext = ()=>{
        setSongIndex((prev) => (prev + 1) % songs.length);
        setSongName(songs[songIndex])
    }
    
    // prev song
    const handlePrev = ()=>{
        setSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
        setSongName(songs[songIndex])

    }
    // let url = `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${songIndex}.mp3`
    let url = songs[songIndex]

    const [playing, toggle, progress, seek, formatTime, currentTime, duration] = useAudio(url);

  return (
    <div>
      {/* <button onClick={toggle}>{playing ? "Pause" : "Play"}</button> */}
      <StyledWrapper>
      <div className="card">
        <button className="card__btn card__btn-menu">
          <svg fill="none" height={18} viewBox="0 0 24 18" width={24} xmlns="http://www.w3.org/2000/svg"><path d="m0 0h24v3h-12-12zm0 7.5h24v3h-24zm0 7.5h24v3h-24z" fill="#fff" /></svg>
        </button>
        <div className="card__img">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><circle r={60} fill="#ffd8c9" cy={64} cx={64} /><circle r={48} opacity=".3" fill="#fff" cy={64} cx={64} /><path fill="#393c54" d="m64 14a31 31 0 0 1 31 31v41.07a9.93 9.93 0 0 1 -9.93 9.93h-42.14a9.93 9.93 0 0 1 -9.93-9.93v-41.07a31 31 0 0 1 31-31z" /><circle r={7} fill="#fbc0aa" cy={60} cx={89} /><path fill="#00adfe" d="m64 124a59.7 59.7 0 0 0 34.7-11.07l-3.33-10.29a10 10 0 0 0 -9.37-6.64h-43.95a10 10 0 0 0 -9.42 6.64l-3.33 10.29a59.7 59.7 0 0 0 34.7 11.07z" /><path fill="#ff8475" d="m46.54 121.45a59.93 59.93 0 0 0 34.92 0l-2.46-25.45h-30z" /><path fill="#f85565" d="m48.13 105h31.74l-.39-4h-30.96z" /><path fill="#ffd8c9" d="m76 96a12 12 0 0 1 -24 0z" /><path strokeWidth={14} strokeLinejoin="round" strokeLinecap="round" stroke="#fbc0aa" fill="none" d="m64 83v12" /><circle r={7} fill="#fbc0aa" cy={60} cx={39} /><path fill="#ffd8c9" d="m64 90a25 25 0 0 1 -25-25v-16.48a25 25 0 1 1 50 0v16.48a25 25 0 0 1 -25 25z" /><path strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" stroke="#fbc0aa" fill="none" d="m64 64.75v6.5" /><path fill="#515570" d="m64.83 18.35a27.51 27.51 0 0 0 -28.32 27.47v4.76a2 2 0 0 0 2 2h.58a1 1 0 0 0 .86-.49l4.05-7.09 2.48 4.13a1 1 0 0 0 1.71 0l2.48-4.13 2.47 4.13a1 1 0 0 0 1.72 0l2.47-4.13 2.48 4.13a1 1 0 0 0 1.71 0l2.48-4.13 2.48 4.13a1 1 0 0 0 1.71 0l2.48-4.13 2.47 4.13a1 1 0 0 0 1.72 0l2.47-4.13 2.48 4.13a1 1 0 0 0 1.71 0l2.48-4.13 4 7.09a1 1 0 0 0 .86.49h.58a2 2 0 0 0 2-2v-4.18c.05-14.95-11.66-27.61-26.61-28.05z" /><path fill="#f85565" d="m47.35 113h33.29l-.38-4h-32.52z" /><path fill="#f85565" d="m46.58 121h34.84l-.39-4h-34.06z" /><path opacity=".7" fill="#ff8475" d="m58.52 79.39c0-.84 11-.84 11 0 0 1.79-2.45 3.25-5.48 3.25s-5.52-1.46-5.52-3.25z" /><path opacity=".7" fill="#f85565" d="m69.48 79.29c0 .78-11 .78-11 0 .04-1.79 2.52-3.29 5.52-3.29s5.48 1.5 5.48 3.29z" /><circle r={3} fill="#515570" cy="58.75" cx="76.25" /><path strokeLinejoin="round" strokeLinecap="round" stroke="#515570" fill="none" d="m70.75 59.84a6.61 6.61 0 0 1 11.5-1.31" /><path style={{fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round', stroke: '#515570', strokeWidth: 2, opacity: '.2'}} d="m72.11 51.46 5.68-.4a4.62 4.62 0 0 1 4.21 2.1l.77 1.21" /><circle r={3} fill="#515570" cy="58.75" cx="51.75" /><g strokeLinecap="round" fill="none"><path strokeLinejoin="round" stroke="#515570" d="m57.25 59.84a6.61 6.61 0 0 0 -11.5-1.31" /><path strokeWidth={2} strokeLinejoin="round" stroke="#515570" opacity=".2" d="m55.89 51.45-5.68-.39a4.59 4.59 0 0 0 -4.21 2.11l-.77 1.21" /><path strokeMiterlimit={10} stroke="#f85565" d="m57.25 78.76a17.4 17.4 0 0 0 6.75 1.12 17.4 17.4 0 0 0 6.75-1.12" /></g></svg>
        </div>
        <div className="card__title">{songName}</div>
        <div className="card__wrapper">
        <div className="card__time">{formatTime(currentTime || 0)}</div>
        <div className="card__timeline" onClick={seek}>
          <progress value={progress} max={100} />
        </div>
        <div className="card__time">{formatTime(isNaN(duration) ? 0 : duration)}</div>
      </div>

        <div className="card__wrapper">
          <button className="card__btn"><svg fill="none" height={12} viewBox="0 0 20 12" width={20} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><clipPath id="a"><path d="m0 0h20v12h-20z" /></clipPath><g><path d="m17 1c0-.265216-.1054-.51957-.2929-.707107-.1875-.187536-.4419-.292893-.7071-.292893h-8v2h7v5h-3l3.969 5 4.031-5h-3zm-14 10c0 .2652.10536.5196.29289.7071.18754.1875.44189.2929.70711.2929h8v-2h-7v-5h3l-4-5-4 5h3z" fill="#fff" /></g></svg></button>
          <button className="card__btn" onClick={handlePrev}><svg width={23} height={16} viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 8V0L0 8L11.5 16V8ZM23 0L11.5 8L23 16V0Z" fill="#fff" /></svg></button>
          <button className="card__btn card__btn-play" onClick={toggle}>{playing? (
              <svg fill="none" height={22} viewBox="0 0 18 22" width={18} xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h6v22H0zM12 0h6v22h-6z" fill="#000" />
              </svg>
            ) : (
              <svg fill="none" height={22} viewBox="0 0 18 22" width={18} xmlns="http://www.w3.org/2000/svg">
                <path d="m0 0v22l18-11z" fill="#000" />
              </svg>
            )}</button>
          <button className="card__btn" onClick={handleNext}><svg width={23} height={16} viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 8V0L23 8L11.5 16V8ZM0 0L11.5 8L0 16V0Z" fill="#fff" /></svg></button>
          <button className="card__btn"><svg fill="#fff" height={20} viewBox="0 0 20 20" width={20} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><clipPath id="a"><path d="m0 .5h20v19h-20z" /></clipPath><g fill="#fff"><path d="m15 14.5h-1.559l-9.7-10.673c-.09376-.10305-.20802-.18536-.33545-.24168-.12744-.05631-.26523-.08537-.40455-.08532h-3.001v2h2.559l4.09 4.5-4.09 4.501h-2.559v2h3.001c.13932 0 .27711-.029.40455-.0853.12743-.0563.24169-.1387.33545-.2417l4.259-4.687 4.259 4.686c.0938.103.208.1854.3355.2417.1274.0563.2652.0853.4045.0853h2.001v3l5-4-5-4z" /><path d="m13.4406 5.5h1.559v3l5-3.938-5-4.062v3h-2.001c-.1393-.00005-.2771.02901-.4045.08532-.1275.05632-.2417.13863-.3355.24168l-3.36798 3.707 1.47998 1.346z" /></g></svg></button>
        </div>
      </div>
    </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  .card {
    --main-color: #fff;
    --bg-color: #090909;
    --sub-main-color: #B9B9B9;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    width: 360px;
    height: 478px;
    background-image: linear-gradient(rgb(186, 66, 255) 35%,rgb(0, 225, 255));
    border-radius: 20px;
    padding: 30px;
  }

  .card__menu {
    cursor: pointer;
  }

  .card__img {
    height: 224px;
    width: 224px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-inline: auto;
    background: #131313;
    border-radius: 100%;
  }

  .card__img svg {
    width: 154px;
    height: 154px;
    border-radius: 100%;
  }

  .card__title {
    font-weight: 500;
    font-size: 28px;
    color: var(--main-color);
    text-align: center;
    margin-bottom: 10px;
  }

  .card__subtitle {
    font-weight: 400;
    font-size: 16px;
    color: var(--sub-main-color);
    text-align: center;
    cursor: pointer;
  }

  .card__wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }

  .card__time {
    font-weight: 400;
    font-size: 12px;
    color: var(--main-color);
  }

  .card__timeline {
    width: 100%;
    height: 4px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .card__timeline progress {
    width: 100%;
    height: 100%;
    border-radius: 100px;
  }

  .card__timeline progress::-webkit-progress-bar {
    background-color: #424242;
    border-radius: 100px;
  }

  .card__timeline progress::-webkit-progress-value {
    background-color: #fff;
    border-radius: 100px;
  }

  .card__btn {
    border: none;
    background: transparent;
    cursor: pointer;
  }

  .card__btn path {
    fill: var(--main-color);
  }

  .card__btn-play {
    width: 60px;
    height: 60px;
    background: var(--main-color);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card__btn-play path {
    fill: var(--bg-color);
  }`;

// export default Card;


export default Player;