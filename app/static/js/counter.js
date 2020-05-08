console.log("counter here!");
//get count:
const script_tag = document.getElementById("counter-script");
var total = script_tag.getAttribute("count");

const counter = document.getElementById("counter");

//counter div style:
counter.style.border = "1px solid blue";
counter.style.margin = "0 auto";
counter.style["max-width"] = "300px";

//counter div title text:
var title = document.createTextNode("Global Counter");
var br = document.createElement("br");
counter.appendChild(title);
counter.appendChild(br);
counter.style.fontSize = "200%";
counter.style.textAlign = "center";
//counter div count text
var count = document.createTextNode(total);
counter.appendChild(count);

const count_up = function(total) {
  var i = 0;
  while (i<100) {
    count = ""+i;
    counter.appendChild(count);
  }
}

count_up(total);
