makeSwitchers(document.getElementById("banner"));

function makeSwitchers(banner) {
  var slides = banner.getElementsByTagName("figure");
  var switchers = document.createElement("div");
  var htmlSwitch = new Array(slides.length).fill('<div class="switch"></div>');
  switchers.className = "switchers";
  switchers.innerHTML = htmlSwitch.join('');
  banner.appendChild(switchers);

  var indexChecked = 0;
  showSlide(indexChecked);

  Array.prototype.forEach.call(
    switchers.getElementsByClassName("switch"),
    function(currentSwitch, index) {
      currentSwitch.addEventListener("click", function() {
        showSlide(index);
      });
    }
  );

  function showSlide(index) {
    var firstSlide = slides[0];
    var stepMargin = -100;
    firstSlide.style.marginLeft = index * stepMargin + "%";
    uncheck(indexChecked);
    check(index);
  }

  function check(index) {
    switchers.getElementsByClassName("switch")[index].classList.add("check");
    indexChecked = index;
  }

  function uncheck(index) {
    switchers.getElementsByClassName("switch")[index].classList.remove("check");
  }
}
