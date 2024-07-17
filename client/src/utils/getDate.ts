const getDate = (date: string): string => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();

    let day: string | number = newDate.getDate();
    if (day < 10) day = `0${day}`;

    let month: string | number = newDate.getMonth() + 1;
    if (month < 10) month = `0${month}`;

    let hours: string | number = newDate.getHours();
    if (hours < 10) hours = `0${hours}`;

    let minutes: string | number = newDate.getMinutes();
    if (minutes < 10) minutes = `0${minutes}`;

    const time = `${hours}:${minutes}`;
    
    const createdDate = `${day}.${month}.${year} ${time}`;
    return createdDate;
}

export default getDate;