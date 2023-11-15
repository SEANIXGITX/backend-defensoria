export const extremeDayOfWeek = (date: Date) => {
  date = new Date(date.toISOString().slice(0, 10));
  const first = date.getDate() - date.getDay();
  const firstDay = new Date(date.setDate(first));

  const tempFirstDay = new Date(firstDay);
  const last = tempFirstDay.getDate() + 6;
  let lastDay = new Date(tempFirstDay.setDate(last));
  lastDay = new Date(`${lastDay.toISOString().slice(0, 10)}T23:59:59Z`);

  return { lunes: firstDay, domingo: lastDay };
};

export const now = () => new Date();

export const nowFormat = () => {
  const date = new Date();
  //date.setUTCHours(date.getUTCHours() - 4);
  return date;
};

export const nowStart = () => new Date(new Date().toISOString().slice(0, 10));

export const nowEnd = () => new Date(`${new Date().toISOString().slice(0, 10)}T23:59:59Z`);

export const shortDate = (date: Date) => date.toISOString().slice(0, 10);

export const horaDate = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const ageInYear = (initialDate: Date) => {
  const fechaActual = new Date();
  const diferenciaEnMilisegundos = fechaActual.getTime() - initialDate.getTime();
  const diferenciaEnAnios = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24 * 365);
  return diferenciaEnAnios;
};
