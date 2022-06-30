import moment from 'moment';
const dateFormats = {
	short: 'YYYY-MM-DD',
	long: 'YYYY-MM-DD HH:mm',
	longT: 'YYYY-MM-DDTHH:mm',
	ru: 'DD-MM-YYYY HH:mm',
	fullDateFormat: 'DD-MM-YYYY HH:mm:ss',
	minutes: 'HH:mm:ss'
 }
 
 export const dateFromUTC = (date, format = 'minutes') => (date ? moment(date).format(dateFormats[format]) : '');
 
 export const dateToUTC = (date, format = 'minutes') => (date ? moment(date).format(dateFormats[format]) : '');
 
 export const getTodayStart = () => dateToUTC(moment().startOf('day'));
 
 export const getTodayEnd = () => dateToUTC(moment().endOf('day'));
 