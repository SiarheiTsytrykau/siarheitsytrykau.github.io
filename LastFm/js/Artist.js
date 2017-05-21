function Artist(artist) {
  LastFm.apply(this, arguments);
  this.package = "artist";
  this.artist = artist;
}

Artist.prototype = Object.create(LastFm.prototype);
Artist.prototype.constructor = Artist;

Artist.prototype.getInfo = function(callback) {
  this.method = "getInfo";
  var queryParam = {artist:this.artist};
  this.load(queryParam, callback);
}

Artist.prototype.search = function(callback, pageNumber) {
  this.method = "search";
  this.page = pageNumber || 1;
  var queryParam = {artist:this.artist, page:this.page};
  this.load(queryParam, callback);
}

Artist.prototype.getTopAlbums = function(callback) {
  this.method = "gettopalbums";
  var queryParam = {artist:this.artist};
  this.load(queryParam, callback);
}
