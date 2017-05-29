function Artist(artist) {
  LastFm.apply(this, arguments);
  this.package = "artist";
  this.artist = artist;
}

Artist.prototype = Object.create(LastFm.prototype);
Artist.prototype.constructor = Artist;

Artist.prototype.getInfo = function(callback) {
  var queryParam = {method:"getInfo", params:{artist:this.artist}};
  this.load(queryParam, callback);
}

Artist.prototype.search = function(callback, pageNumber = 1) {
  var queryParam = {method:"search", params:{artist:this.artist, page:pageNumber}};
  this.load(queryParam, callback);
}

Artist.prototype.getTopAlbums = function(callback) {
  var queryParam = {method:"gettopalbums", params:{artist:this.artist}};
  this.load(queryParam, callback);
}
