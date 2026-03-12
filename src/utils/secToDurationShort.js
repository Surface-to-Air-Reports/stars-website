function secToDurationShort(time) {
    let sec = (time%60);
    let min = Math.floor((time%3600)/60);
    let hour = Math.floor(time/3600);

    if (hour !== 0) {
        return(hour+"h " + min + "m " + sec + "s");
    }

    if (min !== 0) {
        return(min+"m " + sec + "s");
    }

    return( sec + "s");

}

export {secToDurationShort};