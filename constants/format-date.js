// TODO: YYYY/MM/DD
export const getNowDate = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return year + '/' + (month < 9 ? '0' + month : month) + '/' + (day <= 9 ? '0' + day : day);
}

export default {
    getNowDate
};
