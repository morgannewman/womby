import fecha from 'fecha';
// const fecha = require('fecha');

/**
 * A higher-order function to compose different date formats
 * @param {String} format - a shorthand string denoting the output format
 * @returns {String} a formatted date
 */
const parser = (format = null) => gmtString => {
  // Configure parsing format
  // https://github.com/taylorhakes/fecha
  switch (format.toLowerCase()) {
    default:
      format = 'dddd MMMM Do, YYYY';
      break;
    case 'long':
      format = 'dddd, MMMM Do, YYYY';
      break;
    case 'short':
      format = 'M/D/YY';
      break;
  }
  // Localize time
  const date = new Date(gmtString);
  // Format date based on config
  return fecha.format(date, format);
};

/**
 * An interface to localize and parse GMT time strings
 */
export const parseDate = {
  /**
   * Generates a LONG localized date string from a GMT date string.
   * @param {String} gmtString - a GMT date string
   * @returns {String} date - a formatted date
   */
  long: parser('long'),
  /**
   * Generates a localized SHORT date string from a GMT date string.
   * @param {String} gmtString - a GMT date string
   * @returns {String} date - a formatted date
   */
  short: parser('short'),
};

// const MOCK_DATA = '2018-10-17T14:37:09.142Z';
// console.log(parseTime.short(MOCK_DATA));
