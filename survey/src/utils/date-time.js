import Moment from 'moment';

Moment.locale('en');

var date_sort_asc = function (date1, date2) {
  // ASCENDING order.
  if (date1 > date2) return 1;
  if (date1 < date2) return -1;
  return 0;
};

var date_sort_desc = function (date1, date2) {
  // DESCENDING order.
  if (date1 > date2) return -1;
  if (date1 < date2) return 1;
  return 0;
};

export function converArrayStringToDate(arr) {
  if (arr.length < 0) {
    return []
  }
  var dates = [];
  arr.forEach(e => {
    dates.push(Moment(e));
  });

  return dates;
}

export function sortDate(array) {
  if (array.length < 0) {
    return []
  }
  var dates = converArrayStringToDate(array);

  dates = dates.sort(date_sort_asc);

  return dates;
}