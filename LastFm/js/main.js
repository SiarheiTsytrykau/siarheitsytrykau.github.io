function show(sectionId) {
  var layers = {
    search: '<div id="search">' +
            '  <form class="searchForm">' +
            '    <input type="text" id="searchBox" placeholder="Artist name..." required>' +
            '    <input type="button" value="Search" onclick="searchArtist()">' +
            '  </form>' +
            '  <div id="results"></div>' +
            '  <nav id="pagination"></nav>' +
            '</div>',
    artist: '<article id="artist">' +
            '  <header>' +
            '    <h2 id="artistName"></h2>' +
            '    <div id="like"></div>' +
            '  </header>' +
            '  <section>' +
            '    <img id="artistPhoto" src="" height="200" width="200">' +
            '    <p id="artistInfo"></p>' +
            '  </section>' +
            '  <section id="artistAlbums">' +
            '    <h3>Albums</h3>' +
            '  </section>' +
            '</article>',
    album: '<article id="album">' +
           '  <header>' +
           '    <h2 id="albumName"></h2>' +
           '    <div id="like"></div>' +
           '  </header>' +
           '  <section>' +
           '    <img id="albumPhoto" src="" height="200" width="200">' +
           '    <p id="albumAuthor"></p>' +
           '    <p id="albumYear"></p>' +
           '    <p id="albumGenre"></p>' +
           '    <p id="albumInfo"></p>' +
           '  </section>' +
           '  <section>' +
           '    <h3>Tracks</h3>' +
           '    <p id="tracks"></p>' +
           '  </section>' +
           '</article>'
  };
  document.getElementById("ajax").innerHTML = layers[sectionId];
}

function searchArtist(pageNumber = 1) { 
  var results = document.getElementById("results");
  results.innerHTML = "";
  var artistName = document.getElementById("searchBox").value;
  var artist = new Artist(artistName);
  artist.search(function(response) {
    response.results.artistmatches.artist.forEach(function(artist) {
      var figure = createFigure(artist.image[4]["#text"], 200, 200, artist.name);
      figure.setAttribute("onclick", 'createArtistScreen("' + artist.name + '")');
      results.appendChild(figure);
    });
    var numberPages = Math.ceil(response.results["opensearch:totalResults"] / response.results["opensearch:itemsPerPage"]);
    var pagination = new Pagination(document.getElementById("pagination"), searchArtist, numberPages);
    pagination.create(pageNumber);
  }, pageNumber);
}

function createArtistScreen(artistName) {
  show("artist");
  var artist = new Artist(artistName);
  artist.getInfo(function(response) {
    document.getElementById("like").innerHTML = getLike();
    document.getElementById("artistName").innerHTML = response.artist.name;
    document.getElementById("artistInfo").innerHTML = response.artist.bio.content;
    document.getElementById("artistPhoto").src = response.artist.image[4]["#text"];
    var artistAlbums = document.getElementById("artistAlbums");
    artistAlbums.innerHTML = "";
    artist.getTopAlbums(function(response) {
      response.topalbums.album.forEach(function(album) {
        var albumImg = createFigure(album.image[2]["#text"], 200, 200, album.name);
        albumImg.setAttribute("onclick", 'createAlbumScreen("' + album.artist.name + '", "' + album.name + '")');
        artistAlbums.appendChild(albumImg);
      });
    });
  });
}

function createAlbumScreen(artistName, albumName) {
  show("album");
  var album = new Album(artistName, albumName);
  album.getInfo(function(response) {
    document.getElementById("like").innerHTML = getLike();
    document.getElementById("albumName").innerHTML = response.album.name;
    document.getElementById("albumPhoto").src = response.album.image[4]["#text"];
    document.getElementById("albumAuthor").innerHTML = response.album.artist;
    if(response.album.wiki) {
      document.getElementById("albumYear").innerHTML = response.album.wiki.published;
      document.getElementById("albumInfo").innerHTML = response.album.wiki.summary;
    };
    var genre = response.album.tags.tag.map(function(genre) {
      return genre.name;
    });
    document.getElementById("albumGenre").innerHTML = genre.join(", ");
    var tracks = document.getElementById("tracks");
    response.album.tracks.track.forEach(function(track) {
      tracks.innerHTML += track.name + "<br>";
    });
  });
}

function createFigure(imgUrl, height, width, caption) {
  var img = document.createElement("img");
  img.src = imgUrl;
  img.width = height;
  img.height = width;
  var span = document.createElement("span");
  span.innerHTML = caption;
  var figcaption = document.createElement("figcaption");
  figcaption.appendChild(span);
  var figure = document.createElement("figure");
  figure.appendChild(img);
  figure.appendChild(figcaption);
  return figure;
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
