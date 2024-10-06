//adding local storage so data is retained even after a page refresh

function update(newCount){
  localStorage.setItem("count",newCount);
}


function getCount(){
  return parseInt(localStorage.getItem("count") || 0);
}

var count=getCount();
document.getElementById("countLabel").innerHTML = getCount();




document.getElementsByClassName("dec-btn")[0].onclick = function () {
  count -= 1;
  update(count);

  document.getElementById("countLabel").innerHTML = getCount();
};

document.getElementsByClassName("reset-btn")[0].onclick = function () {
  count = 0;
  update(count);

  document.getElementById("countLabel").innerHTML = getCount();

};

document.getElementsByClassName("inc-btn")[0].onclick = function () {
  count += 1;
  update(count);

  document.getElementById("countLabel").innerHTML = getCount();
  
};

