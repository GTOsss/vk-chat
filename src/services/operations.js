import moment from 'moment'

export const intersectionArrays = (ar1, ar2) => {
  return ar1.filter((el) => ar2.indexOf(el) !== -1);
};

export const validateUser = (el, {city, ageFrom, ageTo, sex}) => {
  let filterCity = !city || (el.city && (city === el.city.id));
  let filterSex = (!sex || sex === '0') || (sex.toString() === el.sex.toString());
  let age = moment().diff(moment(el.bdate, 'DD.MM.YYYY'), 'years');
  let isAgeFilter = (ageTo || ageFrom) && age;
  if(isAgeFilter) {
    ageTo = !ageTo ? 100 : ageTo;
    ageFrom = !ageFrom ? 0 : ageFrom;
  }
  let filterAge = (!ageTo && !ageFrom) || isAgeFilter && ((age <= ageTo) && (age >= ageFrom));
  return filterCity && filterSex && filterAge && !el.deactivated
};