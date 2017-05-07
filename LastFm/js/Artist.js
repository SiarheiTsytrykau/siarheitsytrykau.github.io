function Artist(artist) {
  LastFm.apply(this, arguments);
  this.package = "artist";
  this.artist = artist;
}

Artist.prototype = Object.create(LastFm.prototype);
Artist.prototype.constructor = Artist;

Artist.prototype.getInfo = function(callback) {
  var method = "getInfo";
  this.load(method + "&artist=" + this.artist, callback);
}

Artist.prototype.search = function(callback) {
  var method = "search";
  this.load(method + "&artist=" + this.artist, callback);
}
