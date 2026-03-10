function getReadableTime(unix) {
    console.log(unix);
    console.log(unix*1000)
    const date = new Date(unix*1000);

    // console.log(date.toLocaleString());
    return date.toLocaleString();
}

export {getReadableTime};