
// Converts Latex to HTML
function tex2html(node) {
  var div = document.createElement('div');
  div.setAttribute('class', 'MathJax_Text');
  node.parentNode.insertBefore(div, node);

  var text = node.innerHTML.trim();
  typejax.parser.load(text, 0, text, function(outdiv){  
    if(!outdiv || outdiv.length == 0) {
        return;
    }
    var output = "",
        shouldUpdateTOC = false;

    if(outdiv[0].name == "preamble") {
        div.classList.add('document');
    }
    for (let i = 0; i < outdiv.length; i++) {
      var data = outdiv[i];
      if(data.name == "tableofcontents") {
          shouldUpdateTOC = true;
      }
      if(data.html) {
          var style = data.style || [];
          if(data.reset) {
            style.push("counter-reset:" + data.reset);
          }        
          output += "<div class='envblock " + data.name + "'" +
                        (style.length ? "style='" + style.join(";") + "'" : "") + ">"
                        + data.html
                  + "</div>";
      }
    }
    div.innerHTML = output;

    if(shouldUpdateTOC) {
        updateTOC(div);
    }
  });
}

function updateTOC(div) {
  var tocstr = "",
      style  = "",
      subcounters = typejax.parser.latex.subcounters;

  tocstr = "<div class='contentname'><b>Contents</b></div>";
  for (i = 0; i < typejax.innersect.length; i++) {
    var sectdata = typejax.innersect[i],
        sectname = sectdata[1];;

    if (subcounters["-toc-" + sectname]) {
        style = " style='counter-reset:" + subcounters["-toc-" + sectname] + ";'";
    } else {
        style = "";
    }
    tocstr += "<div class='toc-" + sectname + "'" + style + ">"
                + "<a href='#" + sectdata[3] + "'>"
                  + "<span class='the-toc-" + sectname + "'></span>"
                  + sectdata[2]
                + "</a>"
              + "</div>";
  }
  var tocdivs = div.getElementsByClassName("toc");
  for(var i = 0; i < tocdivs.length; i++) {
    tocdivs[i].innerHTML = tocstr;
  }
}

// For all <script type="document/tex"> : convert Latex
var nodes = document.querySelectorAll('script[type="document/tex"]');
for(let i = 0; i<nodes.length; i++) {
  tex2html(nodes[i]);
}
