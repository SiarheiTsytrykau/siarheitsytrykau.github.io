function Chart() {
  LastFm.apply(this, arguments);
  this.package = "chart";
}

Chart.prototype = Object.create(LastFm.prototype);
Chart.prototype.constructor = Chart;

Chart.prototype.getTopArtists = function(callback) {
  this.method = "gettopartists";
  this.load({}, callback);
}
