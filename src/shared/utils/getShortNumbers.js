export default function getShortNumbers(num) {
    if(num >= 1000 && num < 1000000) {
        num = num / 1000;
        return num.toFixed(1) + ' K';
    } else if (num >= 1000000 && num < 1000000000) {
        num = num / 1000000;
        return num.toFixed(1) + ' M';
    } else return num;
}
