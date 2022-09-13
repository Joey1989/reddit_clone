export default function parseTitle(str) {
    const strArr = str.split(' ');
    return strArr.join('_');
}
