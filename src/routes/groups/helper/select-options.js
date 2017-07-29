export const createAgeOptions = (min, max, prefix, defaultValue) => {
  let options = [{label: defaultValue}];
  for(let i = min; i <= max; i++) {
    options.push({value: i, label: `${prefix}${i}`})
  }
  return options;
};
