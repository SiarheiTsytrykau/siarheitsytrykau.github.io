document.getElementById("ajax").innerHTML = createMainScreen();
document.querySelector("body > header").onclick = function() {
  document.getElementById("ajax").innerHTML = createMainScreen();
}

function createMainScreen() {
  var chart = new Chart();
  chart.getTopArtists(function(response) {
    document.getElementById("ajax").innerHTML = Template.search();
    document.getElementById("results").innerHTML = response.artists.artist.map(Template.artistFigure).join("");
  });
}

function searchArtist(pageNumber = 1) { 
  var artistName = document.getElementById("searchBox").value;
  var artist = new Artist(artistName);
  artist.search(function(response) {
    document.getElementById("results").innerHTML = response.results.artistmatches.artist.map(Template.artistFigure).join("");
    var numberPages = Math.ceil(response.results["opensearch:totalResults"] / response.results["opensearch:itemsPerPage"]);
    var pagination = new Pagination(document.getElementById("pagination"), searchArtist, numberPages);
    pagination.create(pageNumber);
  }, pageNumber);
}

function createArtistScreen(artistName) {
  var artist = new Artist(artistName);
  artist.getInfo(function(info) {
    artist.getTopAlbums(function(albums) {
      document.getElementById("ajax").innerHTML = Template.artist(info.artist, albums.topalbums.album);
    });
  });
}

function createAlbumScreen(artistName, albumName) {
  var album = new Album(artistName, albumName);
  album.getInfo(function(response) {
    if(!response.album.wiki) {
      response.album.wiki = {};
      response.album.wiki.published = "";
      response.album.wiki.summary = "";
    };
    document.getElementById("ajax").innerHTML = Template.album(response.album);
  });
}

function getLike() {
  var maxLike = 5;
  var likeHTML = "";
  var numberLike = random(maxLike);
  for (let i = 0; i < maxLike; i++) {
    if (i < numberLike) {
      likeHTML += '<div class="heart"></div>';
    } else {
      likeHTML += '<div class="heartDislike"></div>';
    }
  };
  return likeHTML;
}

function random(max) {
  var rand = Math.random() * (max + 1);
  return Math.floor(rand);
}
