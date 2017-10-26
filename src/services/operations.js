import moment from 'moment';

export const intersectionArrays = (ar1, ar2) => {
  let jStart = 0;
  return ar1.filter((el) => {
    for (let j = jStart; j < ar2.length; j += 1) {
      if (el === ar2[j]) {
        jStart = j;
        return true;
      }

      if (el < ar2[j]) {
        jStart = j;
        return false;
      }
    }
  });
};

export const validateUser = (el, { city, ageFrom, ageTo, sex }) => {
  const filterCity = !city || (el.city && (city === el.city.id));
  const filterSex = (!sex || sex === '0') || (sex.toString() === el.sex.toString());
  const age = moment().diff(moment(el.bdate, 'DD.MM.YYYY'), 'years');
  const isAgeFilter = (ageTo || ageFrom) && age;
  if (isAgeFilter) {
    ageTo = !ageTo ? 100 : ageTo;
    ageFrom = !ageFrom ? 0 : ageFrom;
  }
  const filterAge = (!ageTo && !ageFrom) || isAgeFilter && ((age <= ageTo) && (age >= ageFrom));
  return filterCity && filterSex && filterAge && !el.deactivated;
};
