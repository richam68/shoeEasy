export  const shortenBrandNameString = (str, desiredLength) => {
  if (str.length > desiredLength) {
    return str.slice(0, desiredLength) + "...";
  } else {
    return str;
  }
};