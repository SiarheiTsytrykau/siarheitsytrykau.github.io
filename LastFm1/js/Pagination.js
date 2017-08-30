function Pagination(paginationElement, clickFunction, size, delta, activeClass) {
  this._initialPage = 1;
  this.size = size || 1;
  this.delta = delta || 3;
  this.activeClass = activeClass || 'active';
  this.paginationElement = paginationElement;
  Pagination.clickFunction = clickFunction;
};

Pagination.prototype._first = function(start) {
  if (start !== this._initialPage) {
    this.paginationElement.innerHTML += '<a>1</a><span>...</span>';
  }
};

Pagination.prototype._middle = function(start, finish) {
  for (let i = start; i <= finish; i++) {
    this.paginationElement.innerHTML += `<a>${i}</a>`;
  }
};

Pagination.prototype._last = function(finish) {
  if (finish !== this.size) {
    this.paginationElement.innerHTML += `<span>...</span><a>${this.size}</a>`;
  }
};

Pagination.prototype._build = function(start, finish) {
  this.paginationElement.innerHTML = '';
  start = (start < this._initialPage) ? this._initialPage : start;
  finish = (finish > this.size) ? this.size : finish;
  if ((start - this._initialPage) < this.delta) {
    start = this._initialPage;
  }
  if ((this.size - finish) < this.delta) {
    finish = this.size;
  }
  this._first(start);
  this._middle(start, finish);
  this._last(finish);
};

Pagination.prototype._click = function() {
  Pagination.clickFunction(+this.innerHTML);
};

Pagination.prototype.create = function(currentPage) {
  this._build(currentPage - this.delta, currentPage + this.delta);
  var a = this.paginationElement.getElementsByTagName('a');
  for (let i = 0; i < a.length; i++) {
    if (+a[i].innerHTML === currentPage) {
      a[i].className = this.activeClass;
    } else {
      a[i].addEventListener('click', this._click, false);
    }
  }
};
