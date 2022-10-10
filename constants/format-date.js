// TODO: YYYY/MM/DD
export const getNowDate = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return year + '/' + (month < 9 ? '0' + month : month) + '/' + (day <= 9 ? '0' + day : day);
}

export const displayLocalDate = (date) => {
    let year = date[0];
    let month = date[1] < 9 ? '0' + date[1] : date[1];
    let day = date[2] < 9 ? '0' + date[2] : date[2]
    return year + '/' + month + '/' + day;
}

export const displayLocalDate_DDMMYYYY = (date) =>{
    let year = date[0];
    let month = date[1] < 9 ? '0' + date[1] : date[1];
    let day = date[2] < 9 ? '0' + date[2] : date[2]
    return day + '/' + month + '/' + year;
}

export default {
    getNowDate,
    displayLocalDate,
    displayLocalDate_DDMMYYYY
};
