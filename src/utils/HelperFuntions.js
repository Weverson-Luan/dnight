export default function HelperFunctions(type) {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var hours = new Date().getHours();
  var min = new Date().getMinutes();

  if (type == "all") {
    return (
      date.toString() +
      month.toString() +
      year.toString() +
      "_" +
      hours.toString() +
      min.toString()
    );
  } else if (type == "date") {
    return date + "/" + month + "/" + year;
  } else if (type == "time") {
    return hours + ":" + min;
  }
}
