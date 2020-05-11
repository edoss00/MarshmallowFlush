console.log("counter here!");

//document variables
const script_tag = document.getElementById("counter-script");
const counter = document.getElementById("counter");

//create count div to display actual numbers
const count_text = document.createElement('div');
count_text.id = "count_text";
counter.appendChild(count_text);
//create title div to display counter title
const title = document.createElement('div');
title.id = "title";
counter.appendChild(title);
title.innerHTML = "confirmed global cases to date.";

//get count:
var total = script_tag.getAttribute("count");


//counter div style:
counter.style.margin = "0 auto";
counter.style["max-width"] = "1000px";
// counter.style["background-color"] = "#B0B8B4FF";

//counter div text style:
counter.style.textAlign = "center";
counter.style.color = "#184A45FF";
// title.style.color = "#8E8D85";
title.style.color="#FC766AFF";
title.style.textAlign = "right";
counter.style.fontSize = "200%";
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
