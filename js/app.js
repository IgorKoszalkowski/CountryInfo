function countries() {

  // Pobiera wszytkie kraje
  $.get("https://restcountries.eu/rest/v2/all", function(data) {
    $.each(data, function(index, value) {
      var countryName = data[index].name;
      var alpha2Code = data[index].alpha2Code;
      $("#countries").append("<option value=" + alpha2Code + ">" + countryName + "</option>");
    });
  });

  //Tooltip
  $("select").hover(function() {
         $(this).css('cursor','pointer').attr('title', 'Click und press a letter key to seach some stuff.');
     }, function() {
         $(this).css('cursor','auto');
     });

  // Pobiera więcej informacji o krajach
  $("#countries").change(function() {
    var selectedAlphaCode = $("#countries option:selected").val();
    $.get("https://restcountries.eu/rest/v2/alpha/" + selectedAlphaCode, function(data) {

      $("#output").empty();
      $("#output").append("Name : "+ data.name +"<br/>")
      $("#output").append("Capital : " + data.capital + "<br />");
      $("#output").append("Region : " + data.region + "<br />");
      $("#output").append("Subregion : " + data.subregion + "<br />");
      $("#output").append("Population : " + data.population + "<br />");
      $("#output").append("Area : " + data.area + " km<sup>2</sup>" + "<br />");
      $("#img").empty()
      $("#img").append('<img src="'+ data.flag +'">');

      //Lokalizacja na mapie
      var map;
      $(document).ready(function(){
      map = new GMaps({
      el: '#map',
      lat: data.latlng[0],
      lng: data.latlng[1],
      zoom: 6,
      zoomControl: true,
      zoomControlOpt: {
          style : 'SMALL',
          position: 'TOP_LEFT'
      },
      panControl : true,
      streetViewControl : true,
      mapTypeControl: true,
      overviewMapControl: true,
          });
          map.addMarker({
            lat: data.latlng[0],
            lng: data.latlng[1],
            title: data.name,
        });
      });
    });
  });
}


$(function(){
  countries()

});
