export default function decodeHtmlEntity(str) {
    if(str) {
        return str.replace(/&amp;/g, '&');
    }

    return '';
};