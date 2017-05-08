var cher = new Artist("cher");
cher.getInfo(function(response) {
  console.log(response.artist);
});
cher.search(function(response) {
  console.log(response.results);
});

var cherBelive = new Album("cher", "Believe");
cherBelive.getInfo(function(response) {
  console.log(response.album);
});

var topArtist = new Chart();
topArtist.getTopArtists(function(response) {
  console.log("TOP ARTISTS:");
  response.artists.artist.forEach(function(item, i) {
    console.log(i + ": ", item);
  });
});
