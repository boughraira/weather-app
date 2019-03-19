window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription =document.querySelector('.temperature-description');
  let temperatureDegree=document.querySelector('.temperature-degree');
  let locationTimezone =document.querySelector('.location-timezone');
  let temperatureSection =document.querySelector('.temperature');
  const temperatureSpan=document.querySelector('.temperature span');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/b94e6f9416aa459cf7a00f68544899a6/${lat},${long}`;
      fetch(api)
        .then(responce => {
          return responce.json();
        })
        .then(data => {
         
          const {temperature,summary,icon }= data.currently;
          temperatureDegree.textContent=temperature;
          temperatureDescription.textContent=summary;
          locationTimezone.textContent=data.timezone;
          let celsius = (temperature - 32) * (5/9);
          setIcons(icon,document.querySelector(".icon"));
          temperatureSection.addEventListener('click',()=>{
            if(temperatureSpan.textContent==="F"){
              temperatureSpan.textContent="C";
              temperatureDegree.textContent=Math.floor(celsius);
            }else {
              temperatureSpan.textContent="F";
              temperatureDegree.textContent=temperature;

            }
          });



        }); 
    });

  }
function setIcons(icone,iconeId){
  const skycons= new Skycons({ color : "white"});
  const currentIcon=icone.replace(/-/g,"_").toUpperCase();
  skycons.play();
  return skycons.set(iconeId,Skycons[currentIcon]);

}
});