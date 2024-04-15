export function addComma(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatPhoneNum(value, parensStyle = false) {
  value = value.toString().replace(/\D/g, '');
  let formattedPhone;
  if (parensStyle) {
    formattedPhone = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  } else {
    formattedPhone = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }
  return formattedPhone;
}
