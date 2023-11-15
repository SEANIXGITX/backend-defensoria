// export const toTitleCase = (str: string) => str.replace(/(^\w|\s\w)(\S*)/g, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase());
// export const toTitleCase = (str: string) => str.toLowerCase().replace(/(^|\b(?!(a?|e?|o|u|y|la|el|las|los|de|desde|pero|para|por)\b))\w+/g, s => s[0].toUpperCase() + s.slice(1));
const regex = /(^|\b(?!(a|e|o|u|y|la|el|lo|al|las|los|de|en|un|una|unas|unos|es|desde|pero|para|por|se|ha|con|como|son|que)\b))\w+/g;
export const toTitleCase = (str: string) => str.toLowerCase().replace(regex, s => s[0].toUpperCase() + s.slice(1));

export const unaccent = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const getIfIncludes = (array: string[], textPartial: string) => array.find((field: string) => field.includes(textPartial));

export const toCamelCase = (str: string) => {
  return str.replace(/([-_][a-z])/gi, $1 => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};
