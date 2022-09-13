export default function daysAgo(timestemp) {    
    const locales = {
        prefix: '',
        sufix:  'ago',

        seconds: 'less than 1m',
        minute:  '1m',
        minutes: '%dm',
        hour:    '1h',
        hours:   '%dh',
        day:     '1d',
        days:    '%dd',
        month:   '1m',
        months:  '%dm',
        year:    '1y',
        years:   '%dy'
    };
    
    let seconds = Math.floor((new Date() - parseInt(timestemp * 1000)) / 1000),
        separator = locales.separator || ' ',
        words = locales.prefix + separator,
        interval = 0,
        intervals = {
            year:   seconds / 31536000,
            month:  seconds / 2592000,
            day:    seconds / 86400,
            hour:   seconds / 3600,
            minute: seconds / 60
        };
    
    let distance = locales.seconds;
    
    for (let key in intervals) {
        interval = Math.floor(intervals[key]);
      
        if (interval > 1) {
            distance = locales[key + 's'];
            break;
        } else if (interval === 1) {
            distance = locales[key];
            break;
        }
    }
    
    distance = distance.replace(/%d/i, interval);
    words += distance + separator;
  
    return words.trim();
};
