export function formatNull(num, append = 0, check = 'N/A') {
  if (num === null || num === check) {
    return append;
  }
  return num;
}

export function compareJSON(array1 = [], array2 = []) {
  return JSON.stringify(array1) === JSON.stringify(array2);
}

export function containsStrings(string1 = '', string2 = '') {
  return string1
    .toString()
    .toLowerCase()
    .includes(string2.toString().toLowerCase());
}

export function handleSearchFilter(props) {
  const { rows, settings, search_input } = props;
  const { search_key } = settings;
  if (search_key) {
    return rows.filter(row => containsStrings(row[search_key], search_input));
  }
  return rows;
}

export function handleSortingFilter(props) {
  const { rows, sort_key, sort } = props;
  if (!sort_key) {
    return rows;
  }
  if (sort === 'desc') {
    return rows.sort((a, b) =>
      formatNull(a[sort_key])
        .toString()
        .toLowerCase() <
      formatNull(b[sort_key])
        .toString()
        .toLowerCase()
        ? 1
        : -1,
    );
  }
  if (sort === 'asc') {
    return rows.sort((a, b) =>
      formatNull(a[sort_key])
        .toString()
        .toLowerCase() >
      formatNull(b[sort_key])
        .toString()
        .toLowerCase()
        ? 1
        : -1,
    );
  }
  return rows;
}

export function handleKeywordFilter(props) {
  const { rows, settings, keywords } = props;
  const { keyword_key } = settings;

  if (keyword_key) {
    return rows.filter(row =>
      keywords.every(key => {
        const key_check = formatNull(key);
        const keyword_check = formatNull(row[keyword_key]);
        return containsStrings(keyword_check, key_check);
      }),
    );
  }
  return rows;
}

export function handleEquity(equity) {
  return Math.round((equity.balance * equity.price_conversion) / 100);
}

export function handlePercent(next, acc) {
  const difference = next - acc;
  return ((difference / acc) * 100).toFixed(2);
}

export function handleSettings(settings) {
  let { footer_height } = settings;
  if (settings.footer) {
    footer_height = 45;
  }
  return {
    ...settings,
    footer_height: footer_height || 0,
  };
}

export function isObject(obj) {
  const type = typeof obj;
  return type === 'function' || (type === 'object' && !!obj);
}
