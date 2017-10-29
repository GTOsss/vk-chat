const createAgeOptions = (min, max, prefix, defaultValue) => {
  const options = [{ label: defaultValue }];
  for (let i = min; i <= max; i += 1) {
    options.push({ value: i, label: `${prefix}${i}` });
  }
  return options;
};

export default createAgeOptions;
