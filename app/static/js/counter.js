console.log("counter here!");

//document variables
const script_tag = document.getElementById("counter-script");
const counter = document.getElementById("counter");
//create title div to display counter title
const title = document.createElement('div');
title.id = "title";
counter.appendChild(title);
title.innerHTML = "Global Counter";
//create count div to display actual numbers
const count_text = document.createElement('div');
count_text.id = "count_text";
counter.appendChild(count_text);

//get count:
var total = script_tag.getAttribute("count");


//counter div style:
counter.style.border = "1px solid blue";
counter.style.margin = "0 auto";
counter.style["max-width"] = "400px";

//counter div text style:
counter.style.fontSize = "200%";
counter.style.textAlign = "center";
title.style.color = "red";
count_text.style.fontSize = "300%";
var timer = 0;

const count_up = function() {
  //console.log(cur, parseInt(total));
  count_text.innerHTML = cur;
  cur += add;
  timer += 10;
  if (cur >= total) {
      console.log("counter done");
      clearInterval(step);
      count_text.innerHTML = total;
  }
}

//timer for count_up function (executes over 3 secs)
var step = setInterval(count_up, 10);
var add = Math.floor(parseInt(total) / 300);
var cur = 0;
