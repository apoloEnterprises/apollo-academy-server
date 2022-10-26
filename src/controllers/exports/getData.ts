const months = new Array(12);
months[0] = "Jnaeiro";
months[1] = "Fevereiro";
months[2] = "Março";
months[3] = "Abril";
months[4] = "Maio";
months[5] = "Junho";
months[6] = "Julho";
months[7] = "Agosto";
months[8] = "Setembro";
months[9] = "Outubro";
months[10] = "Novembro";
months[11] = "Dezembro";

const current_date = new Date();
current_date.setDate(current_date.getDate());
const month_value = current_date.getMonth();
const day_value = current_date.getDate();
const year_value = current_date.getFullYear();

export const nowDate = day_value + " de " + months[month_value] + ", " + year_value;
console.log(nowDate);
