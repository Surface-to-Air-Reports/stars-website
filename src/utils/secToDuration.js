function secToDuration(time) {
    let sec = (time%60).toString().padStart(2, "0");
    let min = Math.floor((time%3600)/60).toString().padStart(2, "0");
    let hour = Math.floor(time/3600);

    return(hour+":" + min+":" + sec);
}

export {secToDuration};