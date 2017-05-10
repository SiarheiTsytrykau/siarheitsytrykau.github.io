function Album(artist, album) {
  Artist.apply(this, arguments);
  this.package = "album";
  this.album = album;
}

Album.prototype = Object.create(Artist.prototype);
Album.prototype.constructor = Album;

Album.prototype.getInfo = function(callback) {
  this.method = "getInfo";
  var queryParam = {artist:this.artist, album:this.album};
  this.load(queryParam, callback);
}
