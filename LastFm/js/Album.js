function Album(artist, album) {
  Artist.apply(this, arguments);
  this.package = "album";
  this.album = album;
}

Album.prototype = Object.create(Artist.prototype);
Album.prototype.constructor = Album;

Album.prototype.getInfo = function(callback) {
  var method = "getInfo";
  this.load(method + "&artist=" + this.artist + "&album=" + this.album, callback);
}
