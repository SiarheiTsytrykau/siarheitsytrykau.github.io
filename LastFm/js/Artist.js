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

Artist.prototype.search = function(callback) {
  this.method = "search";
  var queryParam = {artist:this.artist};
  this.load(queryParam, callback);
}
