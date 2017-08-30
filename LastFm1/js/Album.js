function Album(artist, album) {
  Artist.apply(this, arguments);
  this.package = "album";
  this.album = album;
}

Album.prototype = Object.create(Artist.prototype);
Album.prototype.constructor = Album;

Album.prototype.getInfo = function(callback) {
  var queryParam = {method:"getInfo", params:{artist:this.artist, album:this.album}};
  this.load(queryParam, callback);
}
