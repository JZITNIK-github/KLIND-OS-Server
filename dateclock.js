setInterval(() => {
  let adsa = new Date();
  let asdasd = adsa.getDate();
  let asdads = ["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"];
  let asdsad = asdads[adsa.getMonth()];
  let adsas = adsa.getFullYear();
  let day = adsa.getDay();
  const tyden = new Array("Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota");
  let sadsdsdhua = tyden[day] + " " + asdasd + ". " + asdsad + " " + adsas + " ";
  document.getElementById("dateclock").textContent = sadsdsdhua;
}, 1000);
