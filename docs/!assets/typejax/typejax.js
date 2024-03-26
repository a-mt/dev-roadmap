
/* JaxEdit: online LaTeX editor with live preview
 * Copyright (c) 2011-2017 JaxEdit project
 * License: The MIT License
 * Source:  https://github.com/zohooo/jaxedit
 */

if (!window.console) console = {log : function() {}};

window.typejax = (function($){
  function log() {
    //console.log.apply(console, arguments);
  }

  var typejax = {
    totaltext : "",
    totalsize : 0,
    raw: "",
    rawsize: 0,
    totaldata : [],
    totalsect : [],
    innersect : []
  };

  typejax.updater = {
    typemode : "full",
    thequeue : [],
    thehooks : {},
    isRunning : false,
    showarea : null,

    init : function(newtext, newsize, showarea) {
      this.thequeue = [];
      MathJax.Hub.Queue([typejax, function(){
        this.totaltext = "";
        this.totalsize = 0;
        this.totaldata = [];
        this.totalsect = [];
        showarea.innerHTML = "";
        this.updater.putTask(0, 0, "", newtext, newsize, showarea);
      }]);
    },

    initMode : function(mode) {
      var that = typejax;
      this.typemode = mode;
      var config = MathJax.Hub.config;
      if (mode == "tiny") {
        config.tex2jax = {
          inlineMath: [['$','$'], ['\(','\)']],
          processEnvironments: false
        };
      } else {
        config.tex2jax = {
          inlineMath: [['\(','\)']],
          processEnvironments: true
        };
      }
      this.init(that.totaltext, that.totalsize, this.showarea);
    },

    inQueue : function(delstart, delend, deltext, instext, newsize, showarea) {
      MathJax.Hub.Queue([typejax, function(){
        this.updater.putTask(delstart, delend, deltext, instext, newsize, showarea);
      }]);
    },

    putTask : function(delstart, delend, deltext, instext, newsize, showarea) {
      if (deltext == "" && instext == "") return;
      this.showarea = showarea;
      this.thequeue.push([delstart, delend, deltext, instext, newsize]);
      if (!this.isRunning) {
        this.isRunning = true;
        this.getTask();
      }
    },

    getTask : function() {
      var localtext = typejax.totaltext, localsize = typejax.totalsize;
      var task = [];
      var delstart, delend, deltext, instext, newsize;
      var localhead = localsize, localtail = localsize;
      var oldsize = localsize;
      while (this.thequeue.length > 0) {
        task = this.thequeue.shift();
        delstart = task[0]; delend = task[1]; deltext = task[2]; instext = task[3]; newsize = task[4];
        if (deltext != localtext.substring(delstart,delend)) alert("text content is wrong!");
        localhead = (delstart < localhead) ? delstart : localhead;
        localtail = (localsize - delend < localtail) ? localsize - delend : localtail;
        localtext = localtext.substring(0,delstart) + instext + localtext.substring(delend,localsize);
        localsize = newsize;
        delstart = localhead;
        delend = oldsize - localtail;
        instext = localtext.substring(localhead, localsize - localtail);
        if (localsize != localtext.length) alert("text size is wrong!");
      }
      //log("delstart:", delstart, "delend:", delend, "inssize:", instext.length, "newsize:", newsize);
      typejax.totaltext = localtext; typejax.totalsize = localsize;
      this.runTask(delstart, delend, instext.length);
    },

    runTask : function(delstart, delend, inssize) {
      var bridge = typejax.bridge;
      if (this.typemode == "tiny") {
        bridge.typeTiny(delstart, delend, inssize);
      } else {
        var r = bridge.expandMacros(delstart, delend, inssize);
        bridge.typeFull(r.delStart, r.delEnd, r.insSize);
      }
    },

    addHook: function(type, scope, fn) {
      var hooks = this.thehooks[type], back = [scope, fn];
      if (hooks) {
        hooks.push(back);
      } else {
        this.thehooks[type] = [back];
      }
    },

    runHooks: function(type) {
      var hooks = this.thehooks[type], args = [].slice.call(arguments, 1, arguments.length);
      if (!hooks) return;
      for (var i = 0; i < hooks.length; i++) {
        MathJax.Hub.Queue(hooks[i].concat(args));
      }
    },

    updateTiny : function(output, isAll) {
      var showarea = this.showarea;
      showarea.innerHTML = output;
      MathJax.Hub.Queue(["Typeset", MathJax.Hub, showarea]); // Process or Typeset
      this.runHooks("After Typeset Tiny", isAll);
      MathJax.Hub.Queue(["afterTypeset", typejax.updater]);
    },

    updateFull : function(change) {
      var that = this, showarea = this.showarea,
          olddiv = change.olddiv, newdiv = change.newdiv, start = change.start, end = change.end;

      if (olddiv.length && newdiv.length) compareDiv(); else changeAll();

      MathJax.Hub.Queue(["Process", MathJax.Hub, showarea]);
      that.runHooks("After Typeset Full", start, end, newdiv);
      MathJax.Hub.Queue(["afterTypeset", typejax.updater]);

      function compareDiv() {
        var modsize = newdiv[newdiv.length - 1].to - olddiv[olddiv.length - 1].to;
        // log(olddiv.length, newdiv.length, modsize);
        var idx = start, exist, ndiv, odiv, nFrom, nTo, oFrom, oTo,
            min, max, i, k, a = 0, b = 0;
        for (i = 0; i < newdiv.length; i++) {
          ndiv = newdiv[i]; nFrom = ndiv.from; nTo = ndiv.to; exist = false;
          for (k = a = b; k < olddiv.length; k++) {
            odiv = olddiv[k]; oFrom = odiv.from; oTo = odiv.to;
            min = oFrom + Math.min(0, modsize); max = oTo + Math.max(0, modsize);
            if (max < nTo) continue; if (min > nFrom) break;
            if (oTo - oFrom == nTo - nFrom && odiv.name == ndiv.name && odiv.html == ndiv.html) {
              b = k; exist = true; break;
            }
          }
          if (!exist) {
            for (k = a; k < olddiv.length; k++) {
              odiv = olddiv[k]; oFrom = odiv.from; oTo = odiv.to;
              if (oTo + modsize <= nTo) b++; else if (oFrom + modsize > nTo) break;
            }
          }
          for (k = a; k < b; k++) {
            typejax.message.log("update", "\t\t", "delete", k);
            removeDiv(idx);
          }
          if (exist) {
            typejax.message.log("update", "\t\t", "omit", b);
            typejax.message.log("update", "remain", i);
            b++; idx++;
          } else {
            typejax.message.log("update", "insert", i);
            insertDiv(idx++, i);
          }
        }
      }

      function removeDiv(idx) {
        showarea.removeChild(showarea.childNodes[idx]);
      }

      function insertDiv(idx, i) {
        node = document.createElement("div"); data = newdiv[i];
        node.className = "envblock " + data.name;
        if (data.reset) node.style.cssText = "counter-reset:" + data.reset + ";";
        node.innerHTML = data.html;
        showarea.insertBefore(node, showarea.childNodes[idx] || null);
      }

      function changeAll() {
        var output = "", data = "", style;
        for (var i = 0; i < newdiv.length; i++) {
          data = newdiv[i];
          style = data.reset ? " style='counter-reset:" + data.reset + ";'" : "";
          output += "<div class='envblock " + data.name + "'" + style + ">" + data.html + "</div>";
        }
        showarea.innerHTML = output;
      }
    },

    afterTypeset: function() {
      if (this.thequeue.length > 0) this.getTask();
      this.isRunning = false;
    }
  };

  typejax.bridge = {
    macros: {},

    expandMacros: function(delStart, delEnd, insSize) {
      function nestBrackets(level) {
        var level = level || 5, re = c = "(?:[^\\r\\n\\{\\}]|\\\\[\\{\\}]|\\r?\\n(?!\\r?\\n))*?";
        while (level--) re = c + "(?:\\{" + re + "\}" + c + ")*?";
        return " *(\\{" + re + "\\}|[^\\{])";
      }

      function getRegExp(name, macro) {
        var num = macro.num, def = macro.def, re = "";
        while (num--) re += nestBrackets();
        re = "\\" + name + "(?![a-zA-Z\\}])" + re;
        return new RegExp(re, "g");
      }

      function trimString(s) {
        return s.replace(/^ +| +$/g, '').replace(/^\{|\}$/g, "");
      }

      function mergeMaps(map, mapx) {
        var itemx, item, n, k;
        for (n = 0; n < mapx.length; n++) {
          itemx = mapx[n], k = 0;
          while (item = map[k]) {
            if (item[0] < itemx[0]) {
              itemx[0] -= item[2] - item[1]; k++;
            } else {
              break;
            }
          }
        }
        $.each(mapx, function(k, v){
          if (v[3]) v[3].idx = v[0];
          v.length = 3;
        });
        map = map.concat(mapx).sort(function(a,b){return a[0]-b[0];});
        //log(map);
        return map;
      }

      function updateSizes(start, minus, plus, macro) {
        var end = start + minus, size = plus - minus;
        mapx.push([start, minus, plus, macro]);
        if (changed) return;
        typejax.message.log("macro", "head", head, "tail", tail, "start", start, "end", end);
        if (end < insStart) {
          size1 += size;
        } else if (insEnd < start) {
          size2 += size;
        } else {
          //log("shrink head or tail");
          head = Math.min(head, start);
          tail = Math.min(tail, raw.length - end);
        }
      }

      function doReplace(re, replacer) {
        mapx = [];
        if (!changed) {
          insStart = head, insEnd = raw.length - tail, size1 = size2 = 0;
        }
        raw = raw.replace(re, replacer);
        if (!changed) {
          head += size1; tail += size2;
          typejax.message.log("macro", "head", head, "tail", tail);
        }
        map = mergeMaps(map, mapx);
      }

      function checkMacros() {
        changed = false;
        $.each(that.macros, function(name, m) {
          var start = m.idx, end = start + m.len;
          if (!(end < delStart || delEnd < start)) {
            changed = true;
            //break;
          }
        });
        if (changed) head = tail = 0;
      }

      function updateMacros() {
        $.each(macros, function(name){
          if (!that.macros[name]) {
            changed = true;
            head = tail = 0;
          }
        });
        that.macros = macros;
      }

      function extractMacros() {
        var cs = "\\\\\\w+", re;
        // \def, \gdef, \edef and \xdef
        re = new RegExp("\\\\[gex]?def\\*? *(" + cs + ") *(#\\d)*" + nestBrackets(), "g");
        doReplace(re, function(match){
          var m = arguments, start = m[m.length - 2], end = start + match.length;
          var macro = {
            idx:  start,
            len:  m[0].length,
            num:  m[2] ? Math.min(m[2].length / 2, 9) : 0,
            def:  trimString(m[3])
          };
          macros[trimString(m[1])] = macro;
          updateSizes(start, match.length, 0, macro);
          return "";
        });
        // \newcommand, \newcommand*, \renewcommand and \renewcommand*
        re = new RegExp("\\\\(?:re)?newcommand\\*? *(" + cs + "|\\{" + cs + "\}) *(\\[(\\d)\\])?"
                        + nestBrackets(), "g");
        doReplace(re, function(match){
          var m = arguments, start = m[m.length - 2], end = start + match.length;
          var macro = {
            idx:  start,
            len:  m[0].length,
            num:  m[3] || 0,
            def:  trimString(m[4])
          };
          macros[trimString(m[1])] = macro;
          updateSizes(start, match.length, 0, macro);
          return "";
        });
        // \DeclareMathOperator and \DeclareMathOperator* inside amsmath
        re = new RegExp("\\\\DeclareMathOperator(\\*?) *(" + cs + "|\\{" + cs + "\}) *"
                       + nestBrackets(), "g");
        doReplace(re, function(match){
          var m = arguments, start = m[m.length - 2], end = start + match.length;
          var macro = {
            idx:  start,
            len:  m[0].length,
            num:  0,
            def:  "\\operatorname" + m[1] + "{" + trimString(m[3]) + "}"
          };
          macros[trimString(m[2])] = macro;
          updateSizes(start, match.length, 0, macro);
          return "";
        });
      }

      function replaceMacros() {
        var i = 0, m, re, num;
        $.each(macros, function(name, m){
          re = getRegExp(name, m), num = m.num;
          //log(re);
          doReplace(re, function(match){
            //log(arguments);
            var start = arguments[arguments.length - 2], end = start + match.length,
                args = [], result = m.def, k;
            for (k = 1; k <= num; k++) {
              args[k] = trimString(arguments[k]);
            }
            //log(args);
            for (k = 1; k <= num; k++) {
              result = result.replace(new RegExp("#" + k, "g"), args[k]);
            }
            updateSizes(start, match.length, result.length);
            return result;
          });
        });
      }

      var raw = tex = typejax.totaltext, oldraw = typejax.raw, size = tex.length,
          modSize = insSize - (delEnd - delStart), oldSize = size - modSize,
          head = delStart, tail = oldSize - delEnd, insStart, insEnd, size1, size2,
          that = this, macros = {}, changed, map = [], mapx = [];
      log("tex:", "delStart", delStart, "delEnd", delEnd, "+", insSize, "=", size);

      checkMacros();
      extractMacros();
      updateMacros();
      replaceMacros();

      delStart = head; delEnd = oldraw.length - tail; insSize = raw.length - head - tail;
      log("raw:", "delStart", delStart, "delEnd", delEnd, "+", insSize, "=", raw.length);
      //log(raw);
      typejax.raw = raw; typejax.rawsize = raw.length;
      return {delStart: delStart, delEnd: delEnd, insSize: insSize};
    },

    typeTiny : function(delstart, delend, inssize) {
      var that = this, updater = typejax.updater;
      var text = typejax.totaltext, size = typejax.totalsize;

      function parseAll() {
        var output = typejax.tinyParser(text, 0, size);
        typejax.totaldata = output[0];
        updater.updateTiny(output[1], isAll);
      }

      function parseSome() {
        var modinfo = that.markData(delstart, delend, inssize), output;
        output = typejax.tinyParser(text, modinfo[0], modinfo[1] + modinfo[2]);
        that.updateData(modinfo[3], modinfo[4], modinfo[2], output[0]);
        updater.updateTiny(output[1], isAll);
      }

      var isAll = false;
      if (typejax.totalsize == inssize) {
        parseAll();
        isAll = true;
      } else {
        parseSome();
      }
      if (window.jaxedit) {
        log("size: " + typejax.totalsize + "; change: " + delstart + " to " + delend);
      }
    },

    typeFull : function(delstart, delend, inssize) {
      var that = this, updater = typejax.updater,
          totaldata = typejax.totaldata, olddata, divstart, divend;

      function parseAll() {
        // generate all preview at first time
        // or clear all text content in textarea
        divstart = 0; // for scrollIntoView after mathjax typeset
        divend = totaldata.length; // for updateHeight function
        typejax.parser.load(typejax.raw, 0, typejax.raw.length, function(outdiv){
          if (!outdiv) return parseAll();
          olddata = totaldata;
          typejax.totaldata = outdiv;
          updater.updateFull({start: divstart, end: divend, olddiv: olddata, newdiv: outdiv});
          typejax.totalsect = typejax.innersect;
          that.updateTOC();
        });
      }

      function parseSome() {
        var modinfo = that.markData(delstart, delend, inssize), modsize = modinfo[2];
        divstart = modinfo[3]; divend = modinfo[4];
        typejax.parser.load(typejax.raw, modinfo[0], modinfo[1] + modsize, function(outdiv){
          if (!outdiv) return parseAll();
          var up = that.updateData(divstart, divend, modsize, outdiv);
          divend = up.divend; olddata = up.olddata;
          updater.updateFull({start: divstart, end: divend, olddiv: olddata, newdiv: outdiv});
          that.updateSections(divstart, divend, outdiv.length);
          that.updateTOC();
        });
      }

      if (typejax.raw.length == inssize) {
        parseAll();
      } else {
        parseSome();
      }
      if (window.jaxedit) {
        jaxedit.childs.rbot.innerHTML = "size: " + typejax.totalsize + "; change: " + delstart + " to " + delend;
      }
    },

    markData : function(delstart, delend, inssize) {
      // determine which top level dom elements to refresh
      var divstart = -1, divend = -1, dividx = -1, modstart = 0, modend = 0, pdata, i;
      for (i = 0; i < typejax.totaldata.length; i++) {
        pdata = typejax.totaldata[i];
        dividx += 1;
        if (pdata.from <= delstart && pdata.to >= delstart && divstart < 0) {
          modstart = pdata.from;
          divstart = dividx;
        }
        if (pdata.from <= delend && pdata.to >= delend) {
          modend = pdata.to;
          divend = dividx+1;
        }
        if (pdata.from > delend) break;
      }
      // handle the case when two paragraphs were merged as one
      if (divstart > 0) {
        var data1 = typejax.totaldata[divstart-1], data2 = typejax.totaldata[divstart],
            re = /^\n *\n/, str = typejax.totaltext.slice(data2.from, data2.to);
        if (str.charAt(0) == "\n" && !re.test(str) && data1.name == "par") {
          divstart = divstart - 1;
          modstart = data1.from;
        }
      }

      var modsize = inssize - (delend - delstart);
      log("div:",divstart,divend,"modify:",modstart,modend + modsize);
      //var modtext = typejax.totaltext.substring(modstart,modend + modsize);
      //log("modtext:", modtext);
      return [modstart, modend, modsize, divstart, divend];
    },

    updateData: function(divstart, divend, modsize, out) {
      var data = typejax.totaldata, olddata, to = out[out.length-1].to, n = 0, i;
      olddata = data.splice(divstart, divend - divstart);
      for (i = divstart; i < data.length; i++) {
        data[i].from += modsize;
        data[i].to += modsize;
        if (data[i].to <= to) n++;
      }
      if (n) olddata.concat(data.splice(divstart, n));
      for (i = 0; i < out.length; i++) {
        data.splice(divstart + i, 0, out[i]);
      }
      divend += n;
      //log("olddata:", olddata);
      return {divend: divend, olddata: olddata};
    },
    
    updateSections : function(divstart, divend, datalength) {
      var sectdata, from = 0, to = 0, i = 0;
      for (i = 0; i < typejax.totalsect.length; i++) {
        sectdata = typejax.totalsect[i];
        if (sectdata[0] < divstart) {
          from += 1; to += 1;
        } else if (sectdata[0] >= divstart && sectdata[0] < divend) {
          to += 1;
        } else {
          break;
        }
      }
      for (i = to; i < typejax.totalsect.length; i++) {
        typejax.totalsect[i][0] += datalength - (divend - divstart);
      }
      typejax.totalsect.splice(from, to - from);
      for (i = 0; i < typejax.innersect.length; i++) {
        sectdata = typejax.innersect[i];
        typejax.totalsect.splice(from + i, 0, [sectdata[0] + divstart, sectdata[1], sectdata[2], sectdata[3]]);
      }
    },
    
    updateTOC : function() {
      var sectdata, numstr, tocstr, tocdiv, anchor;
      var subcounters = typejax.parser.latex.subcounters, style = "";
      tocstr = "<div class='contentname'><b>Contents</b></div>";
      for (i = 0; i < typejax.totalsect.length; i++) {
        sectdata = typejax.totalsect[i];
        sectname = sectdata[1];
        numstr = "<span class='the-toc-" + sectname + "'></span>";
        anchor = sectdata[3];
        if (subcounters["-toc-" + sectname]) style = " style='counter-reset:" + subcounters["-toc-" + sectname] + ";'";
        tocstr += "<div class='toc-" + sectname + "'" + style + "><a href='#" + anchor + "'>" + numstr + sectdata[2] + "</a></div>";
      }
      tocdivs = showarea.getElementsByClassName("toc");
      for(var i = 0; i < tocdivs.length; i++) {
        tocdiv[i].innerHTML = tocstr;
      }
    }
  };

  typejax.tinyParser = function(input, modstart, modend) {
    var data = [], text = input.slice(modstart, modend);
    var re = /(\n|\r\n){2,}/g, i = modstart;
    while (re.exec(text) != null) {
      data.push({from: i, to: (i = modstart + re.lastIndex)});
    }
    if (i < modend) data.push({from: i, to: modend});

    var dmaths = ["equation", "equation*", "eqnarray", "eqnarray*", "gather", "gather*",
                  "align", "align*", "alignat", "alignat*", "multline", "multline*"];
    var imaths = ["gathered", "aligned", "alignedat", "split", "array", "smallmatrix", "subarray",
                  "cases", "matrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix"];
    var re = /(?:\n|\r\n)?\\begin\{([\w\*]+)\}([\w\W]*?)\\end\{\1\}(?:\n|\r\n)?/g;
    text = text.replace(re, function(match, p1, p2, offset){
      if ($.inArray(p1, dmaths) != -1) {
        return "$$" + "\\begin{" + p1 + "}" + p2 + "\\end{" + p1 + "}$$";
      } else {
        return "\\begin{" + p1 + "}" + p2.replace(re, arguments.callee) + "\\end{" + p1 + "}";
      }
    });
    text = $.escapeText(text);
    text = text.replace(/(\n|\r\n)*$/, "");
    text = text.replace(/\n|\r\n/g, "<br>");
    return [data, text];
  };

  typejax.parser = (function(that){
    var input, modstart, modend, callback, done, time, base = $.findScript("typejax.js");

    var lexer = {
      snippet : "", // content of the source input
      length : 0,   // length of the source input
      index : 0,    // current position in the input
      modend : 0,   // current modend in the input
      ended : false,

      initialize : function(input, modstart, modend) {
        this.snippet = input;
        this.length = input.length;
        this.index = modstart;
        this.modend = modend;
        this.ended = false;
      },

      atLast : function() {
        return (this.index >= this.length || this.ended == true) ? true : false;
      },

      atEnding : function() {
        return (this.index >= this.modend) ? true : false;
      },

      newEnding : function() {
        for (var i = 0; i < typejax.totaldata.length; i++) {
          if (typejax.totaldata[i][0] == this.modend) {
            this.modend = typejax.totaldata[i][1];
            log("newEnding:",this.modend);
            break;
          }
        }
      },

      nextToken : function() { // find next token
        //log(length,index);
        var type = "", value = "", place = this.index;
        if (this.atLast()) return { type: "", value: "", place: this.length};
        if (this.atEnding()) {
          var d = syner.nodearray;
          if (d.length > 0 && d[0].from < this.modend && d[0].name != "par") {
            this.newEnding();
          } else {
            this.ended = true;
            return { type: "", value: "", place: this.modend};
          }
        }

        var curchar = this.snippet.charAt(this.index);
        var nextchar = "", nextcode = 0, i = 0;

        if ( curchar == "\\") {
          type = "escape";
          value = "\\";
        } else if (curchar == "%") {
          type = "comment";
          value = "%";
        } else if (curchar == " ") {
          type = "space";
          value = " ";
        } else if (curchar == "\n") {
          type = "space";
          value = "\n";
        } else if (curchar == "\r") {
          nextchar = this.snippet.charAt(this.index+1);
          if (nextchar == "\n") { // \r\n in ie
            type = "space";
            value = "\n";
            this.index += 1;
          } else {
            type = "space";
            value = "\n";
          }
        } else if (/[\!-\$&-\/\:-@\[-`\{-~]/.test(curchar)) {
          type = "special";
          value = curchar;
        } else if (/[a-zA-Z]/.test(curchar)) {
          i = this.index;
          do {
            i += 1;
            nextchar = this.snippet.charAt(i);
          } while (/[a-zA-Z]/.test(nextchar));
          type = "alphabet";
          value = this.snippet.substring(this.index,i);
          this.index = i - 1;
        } else if (/[0-9]/.test(curchar)) {
          i = this.index;
          do {
            i += 1;
            nextchar = this.snippet.charAt(i);
          } while (/[0-9]/.test(nextchar));
          type = "number";
          value = this.snippet.substring(this.index,i);
          this.index = i - 1;
        } else {
          i = this.index;
          do {
            i += 1;
            nextcode = this.snippet.charCodeAt(i);
          } while (nextcode > 127);
          type = "unicode";
          value = this.snippet.substring(this.index,i);
          this.index = i - 1;
        }

        this.index += 1;
        //log(type, value);
        return {type: type, value: value, place: place};
      },

      goBack : function(i) {
        this.index -= i;
      }
    };

    // Text mode accents : http://mirrors.ircam.fr/pub/CTAN/info/symbols/comprehensive/symbols-a4.pdf#section*.21
    var accents = {
      list: {
        "'" : "acute",
        "`" : "grave",
        "^" : "circumflex",
        "\"": "umlaut",
        "." : "overdot",
        "=" : "macron",
        "b" : "underbar",
        "c" : "cedilla",
        "d" : "underdot",
        "H" : "dbl_acute",
        "r" : "overring",
        "t" : "inv_breve",
        "u" : "breve",
        "v" : "caron",
        "~" : "tilde"
      },
      acute: function(char) { return char + "&#769;"; },
      grave: function(char) { return char + "&#768;"; },
      circumflex: function(char) { return char + "&#770;"; },
      umlaut: function(char) { return char + "&#776;"; },
      overdot: function(char) { return char + "&#775;"; },
      macron: function(char) { return char + "&#772;"; },
      underbar: function(char) { return char + "&#817;"; },
      cedilla: function(char) { return char + "&#807;"; },
      underdot: function(char) { return char + "&#803;"; },
      dbl_acute: function(char) { return char + "&#779;"; },
      overring: function(char) { return char + "&#778;"; },
      inv_breve: function(char) { return char + "&#785;"; },
      breve: function(char) { return char + "&#774;"; },
      caron: function(char) { return char + "&#780;"; },
      tilde: function(char) { return char + "&#771;"; }
    };

    var chars = {
      list: {
        "oe": "oelig",
        "OE": "OELIG",
        "ae": "aelig",
        "AE": "AELIG",
        "aa": "aring",
        "AA": "ARING",
        "o" : "oslash",
        "O" : "OSLASH",
        "l" : "lstrok",
        "L" : "LSTROK",
        "ss": "szlig",
        "i" : "dotless_i",
        "j" : "dotless_j",
        "P" : "para",
        "S" : "sect"
      },
      get: function(name) {
        return this[this.list[name]]();
      },
      oelig: function() { return "&oelig;"; },
      OELIG: function() { return "&OElig;"; },
      aelig: function() { return "&aelig;"; },
      AELIG: function() { return "&AElig;"; },
      aring: function() { return "&aring;"; },
      ARING: function() { return "&Aring;"; },
      oslash: function() { return "&oslash;"; },
      OSLASH: function() { return "&Oslash;"; },
      lstrok: function() { return "&lstrok;"; },
      LSTROK: function() { return "&Lstrok;"; },
      szlig: function() { return "&szlig;"; },
      dotless_i: function() { return "&imath;"; },
      dotless_j: function() { return "&#567;"; },
      para: function() { return "&para;"; },
      sect: function() { return "&sect;"; }
    };

    var sizes = {
      "tiny": "tiny",
      "scriptsize": "scriptsize",
      "footnotesize": "footnotesize",
      "small": "small",
      "normalsize": "normalsize",
      "large": "large",
      "Large": "Large",
      "LARGE": "LARGE",
      "huge": "huge",
      "Huge": "Huge",
    };

    var syner = {
      innertree : {},
      type : "",
      value : "",
      place : -1,
      mathenv : "",
      omitspace : false,
      intabular : false,
      tdnum: 0,
      trnum: 0,
      hlines: {},
      clines: {},
      rowcolor: {},
      cellcolor: {}, // fin vars intabular

      analysis : function(input, modstart, modend) {
        //log("initialize lexer");
        lexer.initialize(input, modstart, modend);

        this.initTree();
        this.mathenv = "";
        this.omitspace = false;
        typejax.innersect = [];

        this.packages = packages;
        this.cmdvalues = latex.cmdvalues;
        this.counters = latex.counters;
        this.theorems = latex.theorems;

        this.openNewGroup("env", "par", modstart);

        while ( !lexer.atLast() ) {
          var token = lexer.nextToken();
          //alert(this.token.type, token.value);
          this.type = token.type;
          this.value = token.value;
          this.place = token.place;
          this.mainLoop();
        }

        this.closeOldMath(lexer.modend);
        while (this.nodelevel > 0) {
          this.closeOldGroup(lexer.modend);
        }
      },

      mainLoop : function() {
        switch (this.type) {
          case "escape":
            this.tokenEscape();
            break;
          case "comment":
            this.tokenComment();
            break;
          case "space":
            this.tokenSpace();
            break;
          case "special":
            this.tokenSpecial();
            break;
          case "alphabet":
            this.tokenAlphabet();
            break;
          case "number":
            this.tokenNumber();
            break;
          case "unicode":
            this.tokenUnicode();
            break;
        }
      },

      tokenEscape : function() {
        this.closeEmptyArg(this.place);
        this.omitspace = false;
        var token = lexer.nextToken();
        this.type = token.type;
        this.value = token.value;
        this.place = token.place;

        if (this.type == "") {
          this.addText("\\", this.place - 1);
          return;
        }

        // Accents \^{e} and chars \oe
        if(this.value.length <= 2) {
          if(accents.list[this.value]) {
            var node      = this.openChild("cmd", "_accent", this.place - 1);
                node.func = accents.list[this.value];
            return;
          }
          if(chars.list[this.value]) {
            this.addText(chars.get(this.value), this.place - 1);
            return;
          }
        }

        switch (this.type) {
          case "escape":
            if (this.mathenv != "") {
                this.addText("\\\\", this.place - 1);
            } else if (this.intabular) {
              this.trnum++;
              this.tdnum = 0;
              this.addText("</td></tr><tr><td>", this.place - 1);
            } else {
              this.addText("<br>", this.place - 1);
            }
            break;
          case "comment":
            this.addText("%", this.place - 1);
            break;
          case "space":
            this.addText(" ", this.place - 1);
            break;
          case "unicode":
            this.addText(this.value, this.place - 1);
            break;
          case "special":
            switch (this.value) {
              case "#":
              case "&":
              case "$":
              case "_":
              case "{":
              case "}":
                if (this.mathenv != "") {
                  this.addText("\\" + this.value, this.place - 1);
                } else {
                  this.addText(this.value, this.place - 1);
                }
                break;
              case ";":
                if (this.mathenv != "") {
                  this.addText("\\" + this.value, this.place - 1);
                } else {
                  this.addText("<span class='thickspace'></span>", this.place - 1);
                }
                break;
              case ":":
                if (this.mathenv != "") {
                  this.addText("\\" + this.value, this.place - 1);
                } else {
                  this.addText("<span class='medspace'></span>", this.place - 1);
                }
                break;
              case ",":
                if (this.mathenv != "") {
                  this.addText("\\" + this.value, this.place - 1);
                } else {
                  this.addText("<span class='thinspace'></span>", this.place - 1);
                }
                break;
              case "!":
                if (this.mathenv != "") {
                  this.addText("\\" + this.value, this.place - 1);
                } else {
                  this.addText("<span class='negthinspace'></span>", this.place - 1);
                }
                break;
              case "(":
                if (this.mathenv != "") {
                  this.closeOldGroup(this.place - 1);
                }
                this.openNewGroup("env", "imath", this.place - 1);
                this.mathenv = "()";
                break;
              case ")":
                if (this.mathenv == "()") {
                  this.closeOldGroup(this.place + 1);
                } else if (this.mathenv != "") {
                  this.closeOldGroup(this.place + 1);
                  this.addText("\\)", this.place - 1);
                } else {
                  this.addText("\\)", this.place - 1);
                }
                this.mathenv = "";
                break;
              case "[":
                if (this.mathenv != "") {
                  this.closeOldGroup(this.place - 1);
                }
                this.openNewGroup("env", "bmath", this.place - 1);
                this.mathenv = "[]";
                break;
              case "]":
                if (this.mathenv == "[]") {
                  this.closeOldGroup("env", "bmath", this.place + 1);
                } else if (this.mathenv != "") {
                  this.closeOldGroup("env", "bmath", this.place + 1);
                  this.addText("\\]", this.place - 1);
                } else {
                  this.addText("\\]", this.place - 1);
                }
                this.mathenv = "";
                break;
              default:
                this.addText("\\" + this.value, this.place - 1);
              }
            break;
          case "alphabet":
            var csname = this.value;
            token = lexer.nextToken();
            if (token.value == "*") {
              csname += "*";
            } else {
              lexer.goBack(token.value.length);
            }
            if (this.mathenv == "") {
              this.omitspace = true;
            }
            switch (csname) {
              case "begin":
              case "end":
                this.cmdsSimple(csname, this.place - 1);
                break;
              case "documentclass":
                this.closeOldMath(this.place - 1);
                this.closeOldCmds(this.place - 1);
                this.beginGroup("env", "preamble", this.place - 1, this.place - 1);
                this.beginGroup("cmd", "documentclass", this.place - 1, this.place + csname.length);
                break;
              case "item":
                this.beginGroup("env", "item", this.place - 1, this.place + 4);
                break;
              case "maketitle":
              case "titlepage":
                this.closeOldMath(this.place - 1);
                this.closeOldCmds(this.place - 1);
                this.beginGroup("cmd", csname, this.place - 1, this.place - 1);
                this.endGroup("cmd", csname, this.place + csname.length, this.place + csname.length);
                break;
              case "tableofcontents":
                this.closeOldMath(this.place - 1);
                this.closeOldCmds(this.place - 1);
                this.beginGroup("cmd", csname, this.place - 1, this.place + csname.length);
                break;
              case "par":
                this.closeOldMath(this.place - 1);
                this.beginGroup("env", "par", this.place - 1, this.place + 3);
                break;
              case "paragraph":
              case "paragraph*":
              case "subparagraph":
              case "subparagraph*":
                this.closeOldMath(this.place - 1);
                this.beginGroup("env", "par", this.place - 1, this.place -1);
                this.beginGroup("cmd", csname, this.place - 1, this.place + csname.length);
                break;
              case "color":
                this.closeOldMath(this.place - 1);

                var node = this.nodeplace;
                if(node.name != "group" || node.mode != "inline" || node.childs.length > 0) {
                  this.openChild("cmd", "group", this.place - 1);
                }
                this.beginGroup("cmd", csname, this.place - 1, this.place + csname.length);
                break;
              default:
                var argtype = this.getArgsType("cmd", csname);
                if (argtype.length > 0) {
                  this.closeOldMath(this.place - 1);
                  this.beginGroup("cmd", csname, this.place - 1, this.place + csname.length);
                } else {
                  this.doSimple(csname);
                }
            }
            break;
          default:
            this.addText("\\" + csname, this.place - 1);
        }
      },

      tokenComment : function() {
        this.omitspace = false;
        var token = lexer.nextToken();
        this.type = token.type;
        this.value = token.value;
        this.place = token.place;
        while ( this.value != "" && this.value != "\n" ) {
          token = lexer.nextToken();
          this.type = token.type;
          this.value = token.value;
          this.place = token.place;
        }
      },

      tokenSpace : function() {
        if (this.omitspace) return;
        switch (this.value) {
          case " ":
            this.addText(this.value, this.place);
            break;
          case "\n":
            var p = this.place, token;
            do {
              token = lexer.nextToken();
              this.type = token.type;
              this.value = token.value;
            } while (this.value == " ")
            if (this.type == "space" && this.value == "\n") {
              this.closeOldMath(p);
              this.beginGroup("env", "par", p, this.place);
              this.omitspace = true;
            } else {
              this.addText(" ", this.place);
              lexer.goBack(this.value.length);
            }
            break;
        }
      },

      tokenSpecial : function() {
        this.omitspace = false;
        switch (this.value) {
          case "{":
          case "}":
          case "[":
          case "]":
          case "<":
          case ">":
            if (this.mathenv != "") {
              this.addText(this.value, this.place);
              break;
            }
            this.addBracket(this.value, this.place);
            break;
          case "$":
            this.getMathDollar(this.place);
            break;
          case "&":
            if (this.mathenv != "") {
              this.addText(this.value, this.place);
            } else if (this.intabular) {
              this.tdnum++;
              this.addText("</td><td>", this.place);
            } else {
              this.addText(this.value, this.place);
            }
            break;
          case "`":
            if (this.mathenv != "") {
              this.addText(this.value, this.place);
            } else {
              var token = lexer.nextToken();
              if (token.value == "`") {
                this.addText("&ldquo;", this.place);
              } else {
                this.addText("&lsquo;", this.place);
                lexer.goBack(token.value.length);
              }
            }
            break;
          case "'":
            if (this.mathenv != "") {
              this.addText(this.value, this.place);
            } else {
              var token = lexer.nextToken();
              if (token.value == "'") {
                this.addText("&rdquo;", this.place);
              } else {
                this.addText("&rsquo;", this.place);
                lexer.goBack(token.value.length);
              }
            }
            break;
          default:
            this.addText(this.value, this.place);
        }
      },

      tokenAlphabet : function() {
        this.omitspace = false;
        this.addText(this.value, this.place);
      },

      tokenNumber : function() {
        this.omitspace = false;
        this.addText(this.value, this.place);
      },

      tokenUnicode : function() {
        this.omitspace = false;
        this.addText(this.value, this.place);
      },

      cmdHline: function() {
        if(!this.intabular) {
          return;
        }
        this.hlines[this.trnum] = (this.hlines[this.trnum] ? this.hlines[this.trnum] + 1 : 1);
      },

      doSimple: function(name) {

        // {\huge Lorem ipsum}
        if(sizes[name]) {
          this.doSize(name);
          return;
        }

        var same = name.charAt(0).toUpperCase() + name.slice(1),
            work = this.renderers.find("cmd", same);

        // \textbf{Lorem ipsum}
        if (work) {
          work.call(this);
          return;
        }

        // ??
        if (this["cmd" + same]) {
          this["cmd" + same].call(this);
          return;
        }

        //inside text or math
        this.addText("\\" + name, this.place - 1);
      },

      doCommand : function(node) {
        var name = node.name, same = this.getGroupSame(name);
        var work = this.renderers.find("cmd", same);
        if (work) {
          work.call(this, node);
        }
      },

      doSize: function(size) {
        var parent = this.nodeplace;

        if(parent.name != "group" || parent.mode != "inline" || parent.childs.length > 0) {
          this.openChild("cmd", "group", this.place - 1);
        }
        this.setClassname(size);
      },

      cmdsSimple : function(csname, where) { // with single parameter
        var token = lexer.nextToken();
        this.type = token.type;
        this.value = token.value;
        this.place = token.place;
        if (this.type == "special" && this.value == "{") {
          token = lexer.nextToken();
          this.type = token.type;
          this.value = token.value;
          this.place = token.place;
          if (this.type == "alphabet") {
            var envname = token.value;
            token = lexer.nextToken();
            this.type = token.type;
            this.value = token.value;
            this.place = token.place;
            if (this.type == "special" && this.value == "}") {
              this.cmdsBeginEnd(csname, envname, where);
            } else if (this.type == "special" && this.value == "*") {
              envname += "*";
              token = lexer.nextToken();
              this.type = token.type;
              this.value = token.value;
              this.place = token.place;
              if (this.type == "special" && this.value == "}") {
                this.cmdsBeginEnd(csname, envname, where);
              } else {
                this.addText("\\" + csname + "{" + envname, where);
                lexer.goBack(this.value.length);
              }
            } else {
              this.addText("\\" + csname + "{" + envname, where);
              lexer.goBack(this.value.length);
            }
          } else {
            this.addText("\\" + csname + "{", where);
            lexer.goBack(this.value.length);
          }
        } else {
          this.addText("\\" + csname, where);
          lexer.goBack(this.value.length);
        }
      },

      cmdsBeginEnd : function(csname, envname, where) {
        var mathmode = "bmath", mathdelim = true;
        switch (envname) {
          // toplevel math environments
          case "math":
            mathmode = "imath"; // don't break!
          case "displaymath":
            mathdelim = false;  // don't break!
          case "equation":
          case "equation*":
          case "eqnarray":
          case "eqnarray*":
          case "gather":
          case "gather*":
          case "align":
          case "align*":
          case "alignat":
          case "alignat*":
          case "multline":
          case "multline*":
            if (csname == "begin") {
              if (this.mathenv != "") {
                this.closeOldGroup(where);
              }
              this.beginGroup("env", mathmode, where, where + 8 + envname.length);
              this.setClassname(envname);
              if (mathdelim) {
                this.addText("\\begin{" + envname + "}", where + 8 + envname.length);
              }
              this.mathenv = envname;
            } else {
              if (this.mathenv != "") {
                if (mathdelim) {
                  this.addText("\\end{" + envname + "}", where);
                }
                this.endGroup("env", mathmode, where, where + 6 + envname.length);
              } else {
                this.addText("\\end{" + envname + "}", where);
              }
              this.mathenv = "";
            }
            break;
          // environments inside math
          case "gathered":
          case "aligned":
          case "alignedat":
          case "split":
          case "array":
          case "smallmatrix":
          case "subarray":
          case "cases":
          case "matrix":
          case "pmatrix":
          case "bmatrix":
          case "Bmatrix":
          case "vmatrix":
          case "Vmatrix":
            if (csname == "begin") {
              if (this.mathenv == "") {
                this.beginGroup("env", mathmode, where, where + 8 + envname.length);
                this.addText("\\begin{" + envname + "}", where);
                this.mathenv = envname;
              } else {
                this.addText("\\begin{" + envname + "}", where);
              }
            } else {
              if (this.mathenv == envname) {
                this.addText("\\end{" + envname + "}", where);
                this.endGroup("env", mathmode, where, where + 6 + envname.length);
                this.mathenv = "";
              } else {
                this.addText("\\end{" + envname + "}", where);
              }
            }
            break;
          // text environments
          case "CJK":
          case "CJK*":
            this.addText("\\" + csname + "{" + envname + "}");
            break;
          case "document":
            this.closeOldCmds(where);
            if (csname == "begin") {
              this.endGroup("env", "preamble", where, where + 8 + "document".length);
            } else {
              this.beginGroup("env", "par", where);
            }
            break;
          case "tabular":
            this.closeOldMath(where);
            if (csname == "begin") {
              this.beginGroup("env", envname, where, where + 8 + envname.length);
              this.intabular = true;
              this.trnum = 0;
              this.tdnum = 0;
            } else {
              this.endGroup("env", envname, where, where + 6 + envname.length);
            }
            break;
          case "Verbatim":
          case "verbatim":
            this.closeOldMath(where);
            if (csname == "begin") {
              this.beginGroup("env", envname, where, where + 8 + envname.length);
              this.getVerbatim(envname);
              this.endGroup("env", envname, this.place - 5 - envname.length, this.place + 1);
            } else {
              this.addText("\\" + csname + "{" + envname + "}", where);
            }
            break;
          case "abstract":
            this.closeOldMath(where);
              if (csname == "begin") {
                this.beginGroup("env", envname, where, where + 8 + envname.length);
                this.addLabel("Abstract");
              } else {
                this.endGroup("env", envname, where, where + 6 + envname.length);
              }
              break;
          default:
            if (this.definitions.find("environment", envname)) {
              this.closeOldMath(where);
              if (csname == "begin") {
                this.beginGroup("env", envname, where, where + 8 + envname.length);
              } else {
                this.endGroup("env", envname, where, where + 6 + envname.length);
              }
            } else { // unknown environment, could be a math or text environment
              this.addText("\\" + csname + "{" + envname + "}", where);
            }
        }
      },
      
      doEnvironment : function(node) {
        var name = node.name, same = this.getGroupSame(name);
        var work = this.renderers.find("env", same);
        if (work) {
          work.call(this, node);
        } else {
          if (this.theorems[name]) {
            this.envTheorem(node);
          }
        }
      },

      getMathDollar : function(position) {

        // Closing last mathenv
        if (this.mathenv == "$") {
          this.closeOldGroup(position + 1);
          this.mathenv = "";
          return;
        }
        if (this.mathenv == "$$") {
          var token = lexer.nextToken();
          if (token.value == "$") {
            this.closeOldGroup("env", "bmath", position + 2);
          } else {
            this.closeOldGroup("env", "bmath", position + 1);
            this.type = token.type;
            this.value = token.value;
            this.place = token.place;
            lexer.goBack(this.value.length);
          }
          this.mathenv = "";
          return;
        }
        if (this.mathenv) return; // different math type

        // Opening new mathenv
        this.closeEmptyArg(position);
        var token = lexer.nextToken();
        this.value = token.value;

        // display math
        if (this.value == "$") {
          this.openNewGroup("env", "bmath", position);
          token = lexer.nextToken();
          this.type = token.type;
          this.value = token.value;
          this.place = token.place;
          this.mathenv = "$$";
          lexer.goBack(this.value.length);

        // inline math
        } else {
          this.openNewGroup("env", "imath", position);
          this.mathenv = "$";
          this.addText(this.value, position + 1);
          /*
          token = lexer.nextToken();
          this.type = token.type;
          this.value = token.value;
          this.place = token.place;      
          lexer.goBack(this.value.length);
          */
        }
      },

      getVerbatim : function(envname) {
        //log("verbatim");       
        var t1 = lexer.nextToken();
        if (t1.value == "\n" || t1.value == " ") {
          t1 = lexer.nextToken();        
        }
        var t2 = lexer.nextToken();
        var t3 = lexer.nextToken();
        var t4 = lexer.nextToken();
        var t5 = lexer.nextToken();      
        while (t1.type != "escape" || t2.type != "alphabet" || t2.value != "end" || t3.type != "special" || t3.value != "{" || t4.type != "alphabet" || t4.value != envname || t5.type != "special" || t5.value != "}") {
          switch (t1.value) {
            case "\n":
              this.addText("<br>", t1.place);
              break;
            case "<":
              this.addText("&lt;", t1.place);
              break;
            case ">":
              this.addText("&gt;", t1.place);
              break;            
            default:
              this.addText(t1.value, t1.place);
          }
          t1 = t2;
          t2 = t3;
          t3 = t4;
          t4 = t5;
          t5 = lexer.nextToken();
          this.place = t5.place;
          if ( t5.value == "") break;
        }  
      },

      beginGroup : function(type, name, thispos, nextpos) {
        while (this.nodelevel > 0 && !this.includeGroup(this.nodeplace.name, name)) {
          this.closeOldGroup(thispos);
        }
        this.openNewGroup(type, name, thispos);
        var mode = this.getGroupMode(name);
        if (mode == "main" && this.nodeplace.argtype[0] == "||") {
          // if argtype is not ["||"], we open new par in addBracket() or addText()
          this.openNewGroup("env", "par", nextpos);
        }
      },
      
      endGroup : function(type, name, thispos, nextpos) {
        var mode = this.getGroupMode(name);
        if (type == "env") {
          var match = -1;
          for (i = this.nodelevel - 1; i >= 0; i--) {
            if (this.nodearray[i].name == name) {
              match = i;
              break;
            }
          }
          if (match == -1) {
            this.addText("\\end{" + name + "}", thispos);
          } else {
            for (i = this.nodelevel - 1; i > match; i--) {
              this.closeOldGroup(thispos);
            }
            this.closeOldGroup(nextpos);
            if (mode == "main" || mode == "block") {
              this.openNewGroup("env", "par", nextpos);
            }
          }
        } else { // "cmd"
          this.closeOldGroup(nextpos);
          if (mode == "main" || mode == "block") {
            this.openNewGroup("env", "par", nextpos);
          }
        }
      },
      
      closeOldGroup : function(position) {
        //log("close:", position);
        var node = this.nodeplace, argtype = node.argtype;
        for (var j = node.argarray.length; j < argtype.length; j++) {  
          if (argtype[j] == "{}") {
            this.openChild("env", "{}", position, true);
          } else if (argtype[j] == "||") {
            node.argarray[j] == node;
          } else {
            node.argarray[j] = null;
          }
        }
        node.to = position;
        this.doThisGroup();
        //log("close:", node.name, node.argtype);
        //log("close:", this.nodearray);
      },
      
      openNewGroup : function(type, name, position) {
        //log("open: ", type, name, position);
        var args = this.getArgsType(type, name);
        if (type == "env") {
          if (args.length == 1) {
            this.openChild("env", name, position);
          } else {
            this.openChild("env", name, position);
          }
        } else { // "cmd"
          this.openChild("cmd", name, position);
        }
        //log("open: ", this.nodeplace.name, this.nodeplace.argtype);
        //log("open: ", this.nodearray);
      },

      closeOldMath : function(position) {
        if (this.mathenv != "") {
          this.closeOldGroup(position);
          this.mathenv = "";
        }
      },
      
      closeOldCmds : function(position) {
        var node;
        while (this.nodelevel > 0) {
          node = this.nodeplace;
          if (node.type != "cmd") {
            break;
          } else {
            this.closeOldGroup(position);
          }       
        }
      },

      closeEmptyArg : function(position) {
        if (this.nodelevel > 0) {
          var node = this.nodeplace;
        } else {
          return;
        }
        if (node.type == "cmd" && node.argarray.length == 0) {
          this.closeOldGroup(position);
          if (node.mode == "main" || node.mode == "block") {
            this.openNewGroup("env", "par", this.place);
          }
        } else if (node.type == "env") {
          for (var j = node.argarray.length; j < node.argtype.length - 1; j++) {
            if (node.argtype[j] == "{}") {
              node.argarray[j] = this.openChild("env", "{}", position);
            } else {
              node.argarray[j] = null;
            }
          }
          if (node.mode == "main") {
            this.openNewGroup("env", "par", this.place);
          }
        }
      },
      
      doThisGroup : function() {
        var node = this.nodeplace;
        this.closeChild(node.to);
        //log("doThisGroup: ", node);
        if (node.to > node.from) {
          if (node.type == "env") {
            this.doEnvironment(node);
          } else {
            this.doCommand(node);
          }
        }
        if (this.nodelevel == 0) {
          if (!node.to) log("doThisGroup: node.to is empty!");
        }
        //log("doThisGroup: ", node.name, node.argtype);
        //log("doThisGroup: ", this.nodearray);
      },
      
      initTree : function() {
        this.innertree = { // top level
          mode : "main",
          name : "tree",
          from : 0,
          to : null,
          value : "",
          argarray: [],
          parent : null,
          childs : []};
        this.nodeplace = this.innertree;
        this.nodelevel = 0;
        this.nodearray = [];
      },

      setClassname: function(classname) {
        this.nodeplace.classname = classname;
      },

      openChild : function(type, name, from, mark) {
        var parent = this.nodeplace;
        if (!parent) {
          typejax.message.log("node", "openChild: wrong nodeplace!");
          return;
        }
        typejax.message.log("node", "OpenChild: ", type, name, from);
        var node = {
          type: type,                            // env, cmd
          name: name,                            // par, math...
          mode: this.getGroupMode(name),         // inline, block
          from: from,                            // position
          value: "",
          argtype: this.getArgsType(type, name), // ["{}", "[]"]...
          argarray: [],
          parent: parent,
          childs: []
        };
        parent.childs.push(node);

        this.nodeplace = node;
        this.nodelevel += 1;
        this.nodearray.push(node);

        if (node.argtype.length == 1 && node.argtype[0] == "||") {
          node.argarray.push(node);
        } else if (node.name == "group") {
          node.argarray.push(node);
        }
        if (mark) {
          parent.argarray.push(node);
        } else if (parent.argtype && parent.argtype[parent.argarray.length] === "||") {
          parent.argarray.push(parent);
        }

        typejax.message.log("node", "nodelevel:", this.nodelevel, "arglength:", node.argarray.length);
        //this.printTree(this.innertree);
        return node;
      },
      
      closeChild : function(position) {
        var node = this.nodeplace;
        node.to = position;
        if (!node) {
          typejax.message.log("node", "closeChild: wrong nodeplace!");
          return;
        }
        typejax.message.log("node", "CloseChild:", node.type, node.name, node.to);
        if (node.from >= node.to) {
          //log("closeChild: empty group " + node.name);
          node.parent.childs.pop();
        }
        this.nodeplace = this.nodeplace.parent;
        this.nodelevel -= 1;
        this.nodearray.pop();
        
        if (node.mode == "inline" || node.name == "bmath") {
          if (node.name != "{}" && node.name != "[]" && node.name != "{]" && node.name != "<>") {
            var textnode = {
              type: "env",
              name: "itext",
              mode: "inline",
              from: node.to,
              to: -1,
              value: "",
              parent: node.parent,
              childs: []
            };
            node.parent.childs.push(textnode);
          } 
        } else if (node.mode == "block" && node.name != "bmath") {
          /*node.childs[node.childs.length -1].to = node.to;*/
        }
        typejax.message.log("node", "nodelevel:", this.nodelevel);
        //this.printTree(this.innertree);
      },
      
      travelDown : function() {
        this.nodeplace = this.nodeplace.childs[0];
        this.nodelevel += 1;
      },
      
      travelUp : function() {
        this.nodeplace = this.nodeplace.parent;
        this.nodelevel -= 1;
      },
      
      printTree : function(tree, spaces) {
        if (!spaces) spaces = "";
        that.message.log("tree", "|" + spaces + tree.mode, tree.name, tree.from, tree.to, tree.value);
        for (var i = 0; i < tree.childs.length; i++) {
          this.printTree(tree.childs[i], spaces + "--"); 
        }
      },
      
      createTextNode: function(node) {
        if (node.mode != "main" && node.name != "bmath" && node.name != "imath") {
          var textnode = {
            type: "env",
            name: "itext",
            mode: "inline",
            from: node.from,
            to: -1,
            value: "",
            parent: node,
            childs: []
          };
          node.childs.push(textnode);
        }
      },
      
      appendArgsValue : function(index, value) {
        var node = this.nodeplace;
      },
      
      appendValue : function(node, value, position) {
        if (!node) {
          log("appendValue: wrong node!");
          return;
        }
        //log("appendValue:", node.name);
        if (node.childs.length == 0) {
          this.createTextNode(node);
        }
        if (node.name == "bmath" || node.name == "imath") {
          node.value += value;
        } else if (node.mode == "block" || node.mode == "inline") {
          node.childs[node.childs.length - 1].value += value;
        }
      },
      
      appendText : function(value, position) {
        var node = this.nodeplace;
        //log("appendText:", node.mode, value);
        this.appendValue(node, value, position);
      },
      
      addBracket : function(bracket, position) {
        var parent, node, i;
        switch (bracket) {
          case "{":
            if (this.nodelevel > 0) {
              parent = this.nodeplace;
              //log("bracket:", node.name, node.argtype);
              if (parent.argarray.length < parent.argtype.length) {
                for (i = parent.argarray.length; i < parent.argtype.length; i++) {
                  if (parent.argtype[i] == "[]" || parent.argtype[i] == "<>") {
                    parent.argarray.push(null);
                  } else break;
                }
                i = parent.argarray.length;
                if (parent.argtype[i] == "{}" || parent.argtype[i] == "{]") {
                  this.openChild("env", "{}", position, true);
                  //log("bracket:", this.value, this.nodearray);
                } else { // "||" for environment content
                  if (parent.mode == "main") {
                    this.openNewGroup("env", "par", position);
                  }
                  this.openChild("cmd", "group", position);
                }
                //log("bracket:", this.value, this.nodearray);
                break;
              }
            }
            this.openChild("cmd", "group", position);
            break;
          case "}":
            if (this.nodelevel > 0) {
              node = this.nodeplace, parent = node.parent;
              if (node.name == "{}") {
                node.to = position + 1;
                this.closeChild(position + 1);
                if (parent.argtype[parent.argarray.length] === "||") {
                  if (parent.mode == "main") {
                    this.openNewGroup("env", "par", position + 1);
                  } else {
                    this.createTextNode(parent);
                  }
                  //log("bracket:", this.value, this.nodearray);
                } else {
                  node.to = position + 1;
                  //log("bracket:", this.value, this.nodearray);
                  if (parent.argarray.length == parent.argtype.length) {
                    parent.to = position + 1;
                    this.endGroup(parent.type, parent.name, parent.from, parent.to);
                  }
                }
                break;
              } else if (node.name == "group") {
                node.to = position + 1;
                this.closeChild(position + 1);
                break;
              }
            }
            this.addText(this.value, position);
            break;
          case "[":
            if (this.nodelevel > 0) {
              parent = this.nodeplace;
              if (!this.intabular && parent.argarray.length < parent.argtype.length) {
                for (i = parent.argarray.length; i < parent.argtype.length; i++) {
                  if (parent.argtype[i] == "{]" || parent.argtype[i] == "<>") {
                    parent.argarray.push(null);
                  } else break;
                }
                i = parent.argarray.length;
                if (parent.argtype[i] == "[]") {
                  this.openChild("env", "[]", position, true);
                  //log(this.value, this.nodearray);
                } else if (parent.argtype[i] == "||") {
                  if (parent.mode == "main") {
                    this.openNewGroup("env", "par", position);
                  }
                  //log(this.value, this.nodearray);
                } else if (parent.argtype[i] == "{}") {
                  this.openChild("env", "{}", position, true);
                  this.appendText("[", position);
                  node.from = position + 1;
                  //log(this.value, this.nodearray);
                  if (parent.argarray.length == parent.argtype.length) {
                    this.endGroup(parent.type, parent.name, parent.from, parent.to);
                  }
                }
                break;
              }
            }
            this.addText(this.value, position);
            break;
          case "]":
            if (this.nodelevel > 0) {
              node = this.nodeplace, parent = node.parent;
              if (node.name == "[]") {
                node.to = position + 1;
                this.closeChild(position + 1);
                if (parent.argtype[node.argarray.length] === "||") {
                  if (parent.mode == "main") {
                    this.openNewGroup("env", "par", position + 1);
                  } else {
                    this.createTextNode(parent);
                  }
                  //log(this.value, this.nodearray);
                } else {
                  node.to = position + 1;
                  //log(this.value, this.nodearray);
                  if (parent.argarray.length == parent.argtype.length) {
                    parent.to = position + 1;
                    this.endGroup(parent.type, parent.name, parent.from, parent.to);
                  }
                }
                break;
              }
            }
            this.addText(this.value, position);
            break;
          case "<":
            if (this.nodelevel > 0) {
              parent = this.nodeplace;
              if (parent.argarray.length < parent.argtype.length) {
                for (i = parent.argarray.length; i < parent.argtype.length; i++) {
                  if (parent.argtype[i] == "{]" || parent.argtype[i] == "[]") {
                    parent.argarray.push(null);
                  } else break;
                }
                i = parent.argarray.length;
                if (parent.argtype[i] == "<>") {
                  this.openChild("env", "<>", position, true);
                } else if (parent.argtype[i] == "||") {
                  if (parent.mode == "main") {
                    this.openNewGroup("env", "par", position);
                  }
                } else if (parent.argtype[i] == "{}") {
                  this.openChild("env", "{}", position, true);
                  this.appendText("<", position);
                  parent.to = posiiton + 1;
                  if (parent.argarray.length == parent.argtype.length) {
                    this.endGroup(parent.type, parent.name, parent.from, parent.to);
                  }
                }
              break;
              }
            }
            this.addText("&iexcl;", position);
            break;
          case ">":
            if (this.nodelevel > 0) {
              node = this.nodeplace, parent = node.parent;
              if (node.name == "<>") {
                node.to = position + 1;
                if (node.argtype[node.argarray.length] === "||") {
                  if (node.mode == "main") {
                    this.openNewGroup("env", "par", position + 1);
                  } else {
                    this.createTextNode(parent);
                  }
                } else {
                  node.to = position + 1;
                  if (node.argarray.length == node.argtype.length) {
                    parent.to = position + 1;
                    this.endGroup(node.type, node.name, node.from, node.to);
                  }
                }
                break;
              }
            }
            this.addText("&iquest;", position);
            break;
        }
      },

      addLabel: function(value) {
        var node = this.nodeplace;
        var textnode = {
          type: "env",
          name: "label",
          mode: "inline",
          from: node.from,
          to: -1,
          value: value,
          parent: node,
          childs: []
        };
        node.childs.push(textnode);
        this.createTextNode(node);
      },

      addText : function(value, position) {
        //if (arguments.length == 1) log("no position for " + value);
        //log("addtext: start for", this.nodeplace.name, this.nodeplace.argtype, value);
        if (this.nodelevel > 0) {
          var n = value.length;
          var node = this.nodeplace;
          if (node.argarray.length == node.argtype.length) {
            this.appendText(value, position);
          } else {
            var i = node.argarray.length;
            while (i < node.argtype.length && value) {
              //log("addtext:", node.name);
              //log("addtext:", node.argtype[i]);
              if (node.argtype[i] == "||") {
                if (node.mode == "main") {
                  this.openNewGroup("env", "par", position + n - value.length);
                }
                this.appendText(value, position + n - value.length);
                value = "";
                return;
              } else if (node.argtype[i] == "{}") {
                this.openChild("env", "{}", position + n - value.length, true);
                this.appendText(value.charAt(0), position + n - value.length);
                value = value.substring(1);
              } else {
                node.argarray.push(null);
              }
              i++;
            }
            //log("addtext:", node.name);
            node.to = position + n - value.length;
            if (node.argarray.length == node.argtype.length) {
              this.endGroup(node.type, node.mode, node.from, node.to);
              if (value) {
                this.addText(value, node.to);
              }
            } else if (value) {
              log("addText: value is not empty!");
              this.addText(value, position + n - value.length);
            }
          }
        } else {
          log("addText: nodelevel is zero!");
          this.addText(value, position);
        }
      },

      // test if group1 could include group2
      includeGroup : function(name1, name2) {
        var same1, same2, mode1, mode2;
        same1 = this.getGroupSame(name1); same2 = this.getGroupSame(name2);
        mode1 = this.getGroupMode(same1); mode2 = this.getGroupMode(same2);
        if (same2 == "section") return false;
        if ((same1 == "enumerate" || same1 == "itemize" || same1 == "description") && same2 == "item") return true;
        if (same1 == "tabular" || mode2 == "inline") return true;
        if (same1 == "item" && same2 == "item") return false;
        if (mode1 == "block" && same2 == "bmath") return true;
        if ((mode1 == "block" && mode2 != "inline") || (mode1 == "inline")) {
          log("includeGroup:", name1, name2, false);
          return false;
        }
        var out = this.getGroupOuts(same2);
        if (out) {
          for (i = 0; i < out.length; i++) {
            if (out[i] == same1) return false;
          }
        }
        return true;
      },
      
      getArgsType : function(type, name) {
        var same = this.getGroupSame(name), group, args;
        if (type == "env") {
          group = this.definitions.find("environment", same);
          args = (group && ("args" in group)) ? group.args : ["||"];
        } else {
          group = this.definitions.find("command", same);
          args = (group && ("args" in group)) ? group.args : [];
        }
        return args;
      },

      getGroupOuts: function(same) {
        var group = this.definitions.find("environment", same) || this.definitions.find("command", same);
        if (group) return group.outs;
      },

      getGroupMode : function(name) {
        var same = this.getGroupSame(name);
        var group = this.definitions.find("environment", same) || this.definitions.find("command", same);
        var mode = group ? group.mode : "inline";
        return mode;
      },

      getGroupSame: function(name) {
        var same = this.definitions.find("environment", name) || this.definitions.find("command", name);
        if (typeof same == "string") return same;
        return name;
      },

      readParameters: function(node) {
        var arg = node.argarray, result = [], a, v;
        for (var i = 0; i < arg.length; i++) {
          a = arg[i];
          if (a && a.childs.length) {
            v = a.childs[0].value;
          } else {
            v = null;
          }
          result.push(v);
        }
        return result;
      },

      addPackage: function(pkg) {
        var info = packages.info, list = packages.list, used = list.used,
            current = list.current, missing = list.missing, existing = list.existing;
        for (var j = 0; j < current.length; j++) {
          if (pkg[0] == current[j][0]) return;
        }

        var getfiles = function(that, pkgs) {
          var i, p, f;
          for (i = 0; i < pkgs.length; i++) {
            p = pkgs[i];
            if (typeof p == "string") p = [p];
            f = info[p[0]].file;
            if (f) that.addPackage([f].concat(p))
          }
        }

        var name = pkg[1], pre = info[name].pre;
        if (pre) pre = getfiles(this, pre);

        current.push(pkg);
        for (j = 0; j < used.length; j++) {
          if (pkg[0] == used[j][0]) break;
        }
        if (j < used.length) {
          existing.push(j);
        } else {
          missing.push(pkg);
        }

        var post = info[name].post;
        if (post) post = getfiles(this, post);
      },

      buildCounters: function() {
        var subcounters = latex.subcounters = {}, parent, reset = "", incre = "";
        $.each(latex.counters, function(name, value){
          if (parent = value.parent) {
            subcounters[parent] = subcounters[parent] || "";
            subcounters[parent] += (" " + name);
          }
        });
        $.each(latex.counters, function(name, value){
          reset += " " + name;
          incre += ".the" + name + " {counter-increment: " + name + ";}\n";
          incre += ".the" + name + ":before {content: " + value.content + ";}\n";
        });
        reset = "\nbody {counter-reset:" + reset + ";}\n"
        $.addStyles(reset + incre, "typejax-counter");
      },

      newCounter: function(name, parent) {
        var value = {parent: parent, content: "'\\0000a0' counter(" + name + ") '\\0000a0'"};
        latex.counters[name] = value;
        this.buildCounters(name, value);
      },

      makeTheorem: function(node) {
        if (node.childs.length == 0) return; //fix for empty content in theorems
        var envname = node.name, theorem = this.theorems[envname]; if (!theorem) return;
        var cname = (envname.slice(-1) == '*') ? envname.slice(0, -1) : envname,
            thmhead = thmname = theorem.thmname,
            counter = theorem.counter, star = theorem.star;
        if (counter) {
          thmhead += "<span class='the" + counter + "'></span>";
        } else if (!star) {
          thmhead += "<span class='the" + cname + "'></span>";
        }
        if (node.argarray[0]) {
          thmhead += " (" + node.argarray[0].childs[0].value + ")";
          node.childs.splice(0, 1);
        }
        var textnode = {
          type: "env",
          name: "thmhead",
          mode: "inline",
          from: node.childs[0].from,
          value: "<span>" + thmhead + " </span>",
          parent: node.childs[0],
          childs: []
        };
        node.childs[0].childs.splice(0, 0, textnode);
        node.name = "theorem";
      },

      definitions: {
        cache: {environment: {}, command: {}},
        clear: function() { this.cache = {environment: {}, command: {}}; },
        find: function(type, name) {
          var result = this.cache[type][name];
          if (result) return result;
          var used = packages.list.used;
          for (var i = used.length - 1; i >= 0; i--) {
            var pkgname = used[i][0];
            if (result = latex[pkgname]["definitions"][type][name]) break;
          }
          this.cache[type][name] = result = result || latex["article"]["definitions"][type][name];
          return result;
        }
      },

      renderers: {
        cache: {env: {}, cmd: {}},
        clear: function() { this.cache = {env: {}, cmd: {}}; },
        find: function(type, name) {
          if (name.slice(-1) == "*") name = name.slice(0, -1);
          var result = this.cache[type][name];
          if (result) return result;
          var used = packages.list.used;
          var func = type + name.charAt(0).toUpperCase() + name.slice(1);
          for (var i = used.length - 1; i >=0; i--) {
            var pkgname = used[i][0];
            if (result = latex[pkgname]["renderers"][func]) break;
          }
          this.cache[type][name] = result = result || latex["article"]["renderers"][func];
          return result;
        }
      }
    };

    var latex = {
      cmdvalues : {
        documentclass: "article"
      },
      counters : {
        theorem: {content: "'\\0000a0' counter(theorem) '\\0000a0'"}
      },
      subcounters: {},
      theorems : {
        theorem: {thmname: "Theorem", counter: "theorem"}
      },
      identifier: 0
    };

    var extend = function(pkgfile, definitions, renderers, styles, counters) {
      latex[pkgfile] = {
        definitions: definitions,
        renderers: renderers
      }
      if (styles) {
        var content = "";
        $.each(styles, function(selector, style) {
          content += selector + " {\n";
            $.each(style, function(property, value) {
              content += "  " + property + ": " + value + ";\n"
            });
          content += "}\n";
        });
        $.addStyles(content, "typejax-package-" + pkgfile.replace(/\//g, "-"));
      }
      if (counters) {
        $.each(counters, function(key, value){
          latex.counters[key] = value;
        });
        syner.buildCounters();
      }
    };

    var footnotes = [];

    /* group.mode
     * main group could include main and block groups
     * block group cuuld include inline groups and bmath elements
     * inline group could include inline commands and itext/imath elements
     * bmath element should include display math directly
     * imath element should include inline math directly
     */
    // group.outs: list of groups which could not include it

    (function() {
      var definitions = {
        command: {
          "_accent":                  {mode: "inline", args: ["{}"]},
          "author":                   {mode: "inline", args: ["[]", "{}"]},
          "cellcolor":                {mode: "inline", args:["{}"]},
          "chapter":                  "section",
          "chapter*":                 "section",
          "cline":                    {mode: "inline", args: ["{}"]},
          "color":                    {mode: "inline", args: ["{}"]},
          "date":                     {mode: "inline", args: ["{}"]},
          "documentclass":            {mode: "inline", args: ["[]", "{}"]},
          "footnote":                 {mode: "inline", args: ["{}"]},
          "group":                    {mode: "inline", args: ["{}"]},
          "includegraphics":          {mode: "inline", args: ["[]", "{}"]},
          "maketitle":                {mode: "block", args: []},
          "multicolumn":              {mode: "inline", args: ["{}", "{}", "{}"]},
          "newcounter":               {mode: "inline", args: ["{}", "[]"]},
          "newtheorem":               {mode: "inline", args: ["{}", "[]", "{}", "[]"]},
          "newtheorem*":              {mode: "inline", args: ["{}", "{}"]},
          "paragraph":                {mode: "inline", args: ["[]", "{}"]},
          "paragraph*":               "paragraph",
          "part":                     "section",
          "part*":                    "section",
          "raisebox":                 {mode: "inline", args:["{}", "{}"]},
          "rowcolor":                 {mode: "inline", args:["{}"]},
          "rule":                     {mode: "inline", args: ["{}"]},
          "section":                  {mode: "block", args: ["[]", "{}"]},
          "section*":                 "section",
          "subparagraph":             "paragraph",
          "subparagraph*":            "paragraph",
          "subsection":               "section",
          "subsection*":              "section",
          "subsubsection":            "section",
          "subsubsection*":           "section",
          "tableofcontents":          {mode: "block", args: ["[]"], outs: ["par"]},
          "textbf":                   {mode: "inline", args: ["{}"]},
          "textit":                   {mode: "inline", args: ["{}"]},
          "textsl":                   {mode: "inline", args: ["{}"]},
          "textup":                   {mode: "inline", args: ["{}"]},
          "textmd":                   {mode: "inline", args: ["{}"]},
          "textsc":                   {mode: "inline", args: ["{}"]},
          "textrm":                   {mode: "inline", args: ["{}"]},
          "textsf":                   {mode: "inline", args: ["{}"]},
          "texttt":                   {mode: "inline", args: ["{}"]},
          "underline":                {mode: "inline", args: ["{}"]},
          "emph":                     {mode: "inline", args: ["{}"]},
          "thanks":                   {mode: "inline", args: ["{}"]},
          "title":                    {mode: "inline", args: ["[]", "{}"]},
          "usepackage":               {mode: "inline", args: ["[]", "{}"]}
        },
        environment: {
          "abstract":                 {mode: "block", args: ["||"], outs: ["par"]},
          "bmath":                    {mode: "block"},
          "center":                   {mode: "main", args: ["||"], outs: ["par", "center"]},
          "flushleft":                {mode: "main", args: ["||"], outs: ["par", "flushleft"]},
          "flushright":               {mode: "main", args: ["||"], outs: ["par", "flushright"]},
          "enumerate":                {mode: "block", args: ["[]", "||"]},
          "description":              {mode: "block", args: ["[]", "||"]},
          "item":                     {mode: "main", args: ["[]", "<>", "||"]},
          "itemize":                  {mode: "block", args: ["[]", "||"]},
          "mdframed":                 {mode: "block", args: ["[]", "||"]},
          "par":                      {mode: "block", args: ["||"], outs: ["par", "section"]},
          "preamble":                 {mode: "main", args: ["||"]},
          "tabular":                  {mode: "inline", args: ["{}", "||"]},
          "theorem":                  {mode: "main", args: ["[]", "||"], outs: ["par", "theorem"]},
          "verbatim":                 {mode: "block", args: ["||"], outs: ["par"]},
          "Verbatim":                 {mode: "block", args: ["||"], outs: ["par"]},
          "quote":                    {mode: "main", args: ["||"], outs: ["par"]},
          "quotation":                {mode: "main", args: ["||"], outs: ["par"]},
          "verse":                    {mode: "main", args: ["||"], outs: ["par"]}
        }
      };

      var renderers = {
        cmd_accent: function(node) {
          var chr = " ", tail = "";

          if(node.argarray[0].childs[0]) {
            var text = node.argarray[0].childs[0].value;

            chr  = text.substring(0,1);
            tail = text.substring(1);
          }
          node.value  = accents[node.func](chr);
          node.childs = [];
        },
        cmdAuthor: function(node) {
          this.renderers.find("cmd", "title").call(this, node);
        },

        cmdRowcolor: function(node) {
          if(!this.intabular || !node.childs[0].childs.length) {
            return;
          }
          this.rowcolor[this.trnum] = node.childs[0].childs[0].value;
        },

        cmdCellcolor: function(node) {
          if(!this.intabular || !node.childs[0].childs.length) {
            return;
          }
          if(!this.cellcolor[this.trnum]) {
            this.cellcolor[this.trnum] = {};
          }
          this.cellcolor[this.trnum][this.tdnum] = node.childs[0].childs[0].value;
        },

        cmdCline: function(node) {
          if(!this.intabular || !node.childs[0].childs.length) {
            return;
          }
          var val = node.childs[0].childs[0].value.split("-");
          if(val.length != 2) {
            return;
          }
          this.clines[this.trnum] = val;
        },

        cmdColor: function(node) {
          if(node.argarray[0].childs[0]) {
            if(!node.parent.style) {
              node.parent.style = [];
            }
            node.parent.style.push('color: ' + node.argarray[0].childs[0].value);
          }
        },

        cmdFootnote: function(node) {
          if(node.argarray[0].childs[0]) {
            var k    = footnotes.length + 1,
                html = '<div class="footnote-desc">'
                        + '<span class="footnote">' + k + '</span>'
                        + that.builder(node.argarray[0].childs[0], true)
                     + '</div>';

            footnotes.push([].concat(html));
            node.childs = [];
            node.value = k;
          }
        },

        cmdDate: function(node) {
          this.renderers.find("cmd", "title").call(this, node);
        },

        cmdDocumentclass: function(node) {
          var parameters = this.readParameters(node),
              info = packages.info, list = packages.list,
              docoptn = parameters[0] ? parameters[0].split(/ *, */) : [],
              docname = parameters[1], docinfo;
          list.current = [], list.missing = [], list.existing = [];
          if (docname && (docinfo = info[docname])) {
            this.addPackage([docinfo.file, docname].concat(docoptn));
          } else {
            docname = "article";
          }
          latex.cmdvalues["documentclass"] = docname;

          if (window.jaxedit) {
            var display = (docname == "beamer") ? "inline-block" : "none";
            jaxedit.childs.presbtn.style.display = display;
          }
        },

        cmdIncludegraphics: function(node) {
          var style = {},
              href  = "",
              index = 0;

          node.style = [];
          for(var i=0; i<node.childs.length; i++) {

            if(node.childs[i].name == "{}") {
              href  = node.childs[i].childs[0].value;
              index = i;

            } else {
              var props = node.childs[i].childs[0].value.split(",");

              for(var j=0; j<props.length; j++) {
                var css = props[j].split("="),
                    prop = css[0],
                    val  = css[1].trim();

                switch(prop) {
                  case "scale":
                    prop = "transform";
                    if(val > 1) {
                      node.style.push("padding: " + (parseFloat(val) + 1) + "%");
                    }
                    val  = "scale(" + val + ")";
                    break;

                  case "angle":
                    prop = "transform";
                    val  = "rotate(" + val + "deg)";
                    break;

                  case "cfbox":
                    prop = "border"; val = val.replace(/^(\w+)(?: (\d+)pt)*/, function(m, color, width){
                      return (width ? parseInt(width) + 1 : 1) + "px solid " + color;
                    });
                    style.padding = "1px";
                    break;
                }
                if(typeof style[prop] != "undefined") {
                  style[prop] += " " + val;
                } else {
                  style[prop]  = val;
                }
              }
            }
          }

          var css = Object.keys(style).map(function(k) {
            return k + ":" + style[k];
          }).join(";");

          node.childs[index].value = '<img src="' + href + '" alt=""' + (css ? ' style="' + css + '"' : '') + ' />';
          node.childs[index].childs = [];
        },

        // \multicolumn{2}{|l|}{text}
        cmdMulticolumn: function(node) {
          var colspan = node.childs[0].childs[0].value,
              rules   = node.childs[1].childs[0].value,
              text    = node.childs[2].childs[0].value;

          if(isNaN(parseInt(colspan))) {
            colspan = 1;
          }
          this.addText("<td colspan='" + colspan + "' rules='" + rules + "'>" + text, this.place -1);
        },

        cmdMaketitle: function(node) {
          if (typeof this.cmdvalues["title"] == "undefined") return;
          var result = "<h1>" + this.cmdvalues["title"] + "</h1>";

          if (typeof this.cmdvalues["author"] == "undefined") {
            this.cmdvalues["author"] = "";
          }
          result += "<div class='author'>" + this.cmdvalues["author"] + "</div>";
          if (typeof this.cmdvalues["institute"] != "undefined") {
            result += "<div class='institute'>" + this.cmdvalues["institute"] + "</div>";
          }
          if (typeof this.cmdvalues["date"] == "undefined") {
            result += "<div class='date'>" + (new Date()).toLocaleDateString() + "</div>";
          } else {
            result += "<div class='date'>" + this.cmdvalues["date"] + "</div>";
          }

          if (node.name == "maketitle" && this.cmdvalues["documentclass"] == "beamer") {
            result = "<div class='envblock frame'>" + result + "</div>";
          }

          node.childs = [];
          node.value = result;
        },

        cmdNewcounter: function(node) {
          var parameters = this.readParameters(node),
              name = parameters[0], parent = parameters[1] || null;
          if (name) {
            this.newCounter(name, parent);
          }
        },

        cmdNewline: function() {
          this.addText("<br>", this.place - 1);
        },

        cmdNewtheorem: function(node) {
          // \newtheorem{envname}{thmname}[numberby]
          // \newtheorem{envname}[counter]{thmname}
          // \newtheorem*{envname}{thmname}
          var csname = node.name, parameters = this.readParameters(node);
          var envname = parameters[0]; if (!envname) return;
          var thmname, numberby, counter, theorem;
          if (csname == "newtheorem") {
            counter = parameters[1]; thmname = parameters[2]; numberby = parameters[3];
            if (thmname) {
              theorem = this.theorems[envname];
              if (!theorem || theorem.thmname != thmname) delayReload();
              this.theorems[envname] = {thmname: thmname};
              if (envname != "theorem") {
                latex["article"]["definitions"]["environment"][envname] = "theorem";
              }
              if (numberby) {
                this.newCounter(envname, numberby);
              } else if (counter) {
                this.theorems[envname].counter = counter;
              } else {
                this.newCounter(envname, null);
              }
            }
          } else { // newtheorem*
            thmname = parameters[1];
            if (thmname) {
              theorem = this.theorems[envname];
              if (!theorem || theorem.thmname != thmname) delayReload();
              this.theorems[envname] = {thmname: thmname, star: true};
              if (envname != "theorem") {
                latex["article"]["definitions"]["environment"][envname] = "theorem";
              }
            }
          }
        },

        cmdParagraph: function(node) {
          var csname = node.name, argarray = node.argarray;
          switch (csname) {
            case "paragraph":
            case "paragraph*":
              node.value = "<b>" + node.value + "</b>&nbsp;&nbsp;";
              break;
            case "subparagraph":
            case "subparagraph*":
              node.value = "&nbsp;&nbsp;&nbsp;<b>" + node.value + "</b>&nbsp;&nbsp;";
              break;
          }
        },

        cmdQquad: function() {
          if (this.mathenv != "") {
            this.addText("\\" + this.value, this.place - 1);
          } else {
            this.addText("<span class='qquad'></span>", this.place - 1);
          }
        },

        cmdQuad: function() {
          if (this.mathenv != "") {
            this.addText("\\" + this.value, this.place - 1);
          } else {
            this.addText("<span class='quad'></span>", this.place -1);
          }
        },

        cmdRaisebox: function(node) {
          var pos  = node.childs[0].childs.length ? node.childs[0].childs[0].value : "",
              text = node.childs[1].childs.length ? node.childs[1].childs[0].value : "";
          if(!text || isNaN(parseFloat(pos))) {
            return;
          }
          this.addText("<span style='position: relative; top:-" + pos + "'>" + text + "</span>");
        },

        cmdRule: function(node) {
          if(node.argarray[0].childs[0]) {
            if(!node.style) {
              node.style = [];
            }
            var width = node.argarray[0].childs[0].value;
            if(width != '\\textwidth') {
              node.style.push('width:' + width);
            }
          }
        },

        cmdSection: function(node) {
          var csname = node.name, argarray = node.argarray;
          var sectintoc, anchor;
          var value1 = typejax.builder(argarray[1], false),
              value0 = argarray[0] ? typejax.builder(argarray[0], false) : "";
          if (csname.slice(-1) == "*") {
            node.name = csname.slice(0, -1) + "-s";
            node.value = "<span>" + value1 + "</span>";
          } else {
            sectintoc = value0 ? value0 : value1;
            anchor = "typejax-identifier-" + (++latex.identifier);
            typejax.innersect.push([syner.innertree.childs.length, csname, sectintoc, anchor]);
            node.value = "<span class='the" + csname + "' id='" + anchor + "'></span><span>" + value1 + "</span>";
            node.reset = latex.subcounters[csname] || undefined;
          }
          node.childs = [];
        },

        cmdTableofcontents: function(node) {
          node.childs = [];
          node.value = "<div class='toc'></div>";
        },

        cmdTextbackslash: function() {
          this.addText("\\", this.place - 1);
        },

        cmdTextbar: function() {
          this.addText("|", this.place - 1);
        },

        cmdTextit: function(node) { renderers._cmdText(node, "<em>${value}</em>"); },
        cmdTextsl: function(node) { renderers._cmdText(node, "<span style='font-style: oblique'>${value}</span>"); },
        cmdTextup: function(node) { renderers._cmdText(node, "<span style='font-style: normal'>${value}</span>"); },
        cmdTextmd: function(node) { renderers._cmdText(node, "<span style='font-weight: normal'>${value}</span>"); },
        cmdTextsc: function(node) { renderers._cmdText(node, "<span style='font-variant: small-caps'>${value}</span>"); },
        cmdTextrm: function(node) { renderers._cmdText(node, "<span style='font-family: MathJax_Main'>${value}</span>"); },
        cmdTextsf: function(node) { renderers._cmdText(node, "<span style='font-family: MathJax_SansSerif'>${value}</span>"); },
        cmdTexttt: function(node) { renderers._cmdText(node, "<span style='font-family: MathJax_Typewriter'>${value}</span>"); },
        cmdTextbf: function(node) { renderers._cmdText(node, "<b>${value}</b>"); },
        cmdUnderline: function(node) { renderers._cmdText(node, "<u>${value}</u>"); },
        cmdEmph: function(node) { renderers._cmdText(node, "<em>${value}</em>"); },

        _cmdText: function(node, tpl) {
          var children = node.argarray[0].childs;

          if (children.length) {
            var value = "";
            for(var i = 0; i < children.length; i++) {
              value += children[i].value;
            }
            node.value = tpl.replace('${value}', value);
            node.childs = [];
          }
        },

        cmdTextgreater: function() {
          this.addText("&gt;", this.place - 1);
        },

        cmdTextless: function() {
          this.addText("&lt;", this.place - 1);
        },

        // Text mode commands : http://mirrors.ircam.fr/pub/CTAN/info/symbols/comprehensive/symbols-a4.pdf#section*.4
        cmdTextasciicircum     : function() { this.addText("&Hat;", this.place - 1); },
        cmdTextasciitilde      : function() { this.addText("&tilde;", this.place - 1); },
        cmdTextasteriskcentered: function() { this.addText("&lowast;", this.place - 1); },
        cmdTextbardbl          : function() { this.addText("&Vert;", this.place - 1); },
        cmdTextbigcircle       : function() { this.addText("&#09675;", this.place - 1); },
        cmdTextbraceleft       : function() { this.addText("&lbrace;", this.place - 1); },
        cmdTextbraceright      : function() { this.addText("&rbrace;", this.place - 1); },
        cmdTextbullet          : function() { this.addText("&bull;", this.place - 1); },
        cmdTextcopyright       : function() { this.addText("&copy;", this.place - 1); },
        cmdTextdagger          : function() { this.addText("&dagger;", this.place - 1); },
        cmdTextdaggerdbl       : function() { this.addText("&Dagger;", this.place - 1); },
        cmdTextdollar          : function() { this.addText("&dollar;", this.place - 1); },
        cmdTextellipsis        : function() { this.addText("&period;&period;&period;", this.place - 1); },
        cmdTextemdash          : function() { this.addText("&mdash;", this.place - 1); },
        cmdTextendash          : function() { this.addText("&ndash;", this.place - 1); },
        cmdTextexclamdown      : function() { this.addText("&iexcl;", this.place - 1); },
        cmdTextordfeminine     : function() { this.addText("&ordf;", this.place - 1); },
        cmdTextordmasculine    : function() { this.addText("&ordm;", this.place - 1); },
        cmdTextparagraph       : function() { this.addText("&para;", this.place - 1); },
        cmdTextperiodcentered  : function() { this.addText("&mdash;", this.place - 1); },
        cmdTextpertenthousand  : function() { this.addText("&pertenk;", this.place - 1); },
        cmdTextperthousand     : function() { this.addText("&permil;", this.place - 1); },
        cmdTextquestiondown    : function() { this.addText("&iquest;", this.place - 1); },
        cmdTextquotedblleft    : function() { this.addText("&#10077;", this.place - 1); },
        cmdTextquotedblright   : function() { this.addText("&#10078;", this.place - 1); },
        cmdTextquoteleft       : function() { this.addText("&#10075;", this.place - 1); },
        cmdTextquoteright      : function() { this.addText("&#10076;", this.place - 1); },
        cmdTextregistered      : function() { this.addText("&reg;", this.place - 1); },
        cmdTextsection         : function() { this.addText("&sect;", this.place - 1); },
        cmdTextsterling        : function() { this.addText("&pound;", this.place - 1); },
        cmdTexttrademark       : function() { this.addText("&trade;", this.place - 1); },
        cmdTextunderscore      : function() { this.addText("&lowbar;", this.place - 1); },
        cmdTextvisiblespace    : function() { this.addText("&#x2423;", this.place - 1); },

        cmdTitle: function(node) {
          var csname = node.name, argarray = node.argarray;
          var argnode, child, i, value = "";
          switch (csname) {
            case "title":
            case "author":
              argnode = argarray[1];
              break;
            default:
              argnode = argarray[0];
          }
          for (i = 0; i < argnode.childs.length; i++) {
            child = argnode.childs[i];
            if (child.name == "imath") {
              value += typejax.builder(child, true);
            } else {
              value += child.value;
            }
          }
          this.cmdvalues[csname] = value;
          node.childs = [];
        },

        cmdUsepackage: function(node) {
          var parameters = this.readParameters(node),
              pkgoptn = parameters[0] ? parameters[0].split(/ *, */) : [],
              pkgname = parameters[1], pkginfo;
          if (pkgname) {
            pkgname = pkgname.split(/ *, */);
            for (var i = 0; i < pkgname.length; i++) {
              if (pkginfo = packages.info[pkgname[i]])
                this.addPackage([pkginfo.file, pkgname[i]].concat(pkgoptn));
            }
          }
        },

        envEnumerate: function(node) {
          this.renderers.find("env", "itemize").call(this, node);
        },
        envDescription: function(node) {
          this.renderers.find("env", "itemize").call(this, node);
        },

        envItemize: function(node) {
          // itemize, enumerate
          if (node.childs.length == 0) return; //fix for empty content in lists
          if (node.childs[0].mode == "inline") node.childs.shift();
        },

        envMdframed: function(node) {

          function getValue(node) {
            var res = "";
            for(var i=0; i<node.childs.length; i++) {
              var child = node.childs[i];

              if(child.type == "env") {
                res += child.value;
              } else if(child.childs.length) {

                if(child.type == "cmd") {
                  res += "{" + getValue(child) + "}";
                } else {
                  res += getValue(child);
                }
              }
            }
            return res;
          }

          var style = [],
              props = getValue(node.childs[0]).split(","),
              title = {
                type: "env",
                name: "title",
                mode: "block",
                from: node.childs[0].from,
                to: node.childs[0].to,
                value: "",
                argtype: [],
                argarray: [],
                parent: node,
                childs: [],
                style: []
              };

          for(var i=0; i<props.length; i++) {
            var css  = props[i].split("="),
                prop = css[0].trim();
                val  = css[1];
            if(!val) continue;

            switch(prop) {
              case "backgroundcolor":   prop = "background-color"; break;
              case "linecolor":         prop = "border"; val  = "1px solid " + val; break;
              case "roundcorner":       prop = "border-radius"; break;
              case "outerlinewidth":    prop = "border-width"; val  = (isNaN(parseInt(val)) ? val : 1 + parseInt(val)*2) + "px"; break;
              case "leftmargin":        prop = "margin-left"; val += "px"; break;
              case "rightmargin":       prop = "margin-right"; val += "px"; break;
              case "innerleftmargin":   prop = "padding-left"; val += "px"; break;
              case "innerrightmargin":  prop = "padding-right"; val += "px"; break;
              case "innertopmargin":    prop = "padding-top"; val += "px"; break;
              case "innerbottommargin": prop = "padding-bottom"; val += "px"; break;

              case "frametitle":
                prop = "";
                title.value = val.replace(/^{|}$/g, '')
                                 .replace(/\\space/g, "&nbsp;")
                                 .replace(/\\colorbox{([^}]+)}{([^}]+)}/, function(m, color, text) {
                                    return '<span style="background-color: '+ color +'">' + text + '</span>';
                                  });
                break;

              case "frametitleaboveskip":
                prop = "";
                title.style.push("top:" + val.replace('\\ht\\strutbox', "1.5em"));
                break;

              case "frametitlealignment":
                prop = "";
                if(val == '\\center') {
                  title.style.push("left: 50%");
                  title.style.push("transform: translateX(-50%)");
                }
                break;
            }
            if(prop) {
              style.push(prop + ":" + val);
            }
          }
          node.childs[0].childs = [];
          if(title.value) {

            if(title.style.length) {
              title.style.push("position: absolute");
            }
            node.childs[0] = title;
          }
          node.style = style;
        },

        envPreamble: function(node) {
          var list = packages.list, used = list.used,
              current = list.current, missing = list.missing, existing = list.existing;
          var pending = missing.length;
          if (pending) {
            stop();
            for (i = 0; i < pending; i++) {
              $.loadScript(base + "package/" + missing[i][0] + ".js", function(){
                pending--;
                if (!pending) {
                  updatePackages(this);
                  reload();
                }
              }, this);
            }
          } else if (existing.length < used.length) {
            stop();
            setTimeout(updatePackages, 0, this);
            setTimeout(reload, 0);
          }

          function updatePackages(that) {
            for (var j = 0; j < used.length; j++) {
              if ($.inArray(j, existing) == -1) {
                var p = used[j][0];
                delete latex[p];
                $.removeStyles("typejax-package-" + p.replace(/\//g, "-"));
              }
            }
            list.used = current;
            log("usepackages", list.used);
            that.definitions.clear(); that.renderers.clear();
          }
        },

        envTabular: function(node) {
          var hlines    = this.hlines,
              clines    = this.clines,
              cellcolor = this.cellcolor,
              rowcolor  = this.rowcolor;

          /**
           * Get alignement and border instructions
           * @param string specs - |c|
           * @return array       - [border-left: 1px solid black, text-align: center, border-right: 1px solid black]
           */
          function getCSSRules(specs) {

            // Convert rules to CSS
            var rules  = [], border = 0;
            for(var j = 0; j < specs.length; j++) {
              var val = specs[j];

              if(val == "|") {
                border++;
                continue;
              }
              switch(val) {
                case "l": rules.push({"text-align":"left"}); break;
                case "c": rules.push({"text-align":"center"}); break;
                case "r": rules.push({"text-align":"right"}); break;
                case "p": rules.push({"text-align":"justify"}); break;
              }
              if(border) {
                rules[rules.length-1]["border-left"] = border + 'px solid black';
              }
              border = 0;
            }
            if(border && rules) {
              rules[rules.length-1]["border-right"] = border + 'px solid black';
            }
            return rules;
          }

          /*
           * Update node's value to add CSS to tds (given tabular specs like |c|)
           * @param Object node
           */
          function updateCSSRules(node) {

            // Get given specs
            var specs = "";
            for(i = 0; i < node.argarray[0].childs.length; i++) {
              var child  = node.argarray[0].childs[i];

              if(child.name == "itext") {
                specs += child.value;
              }
            }
            var rules  = getCSSRules(specs),
                posTop = false;

            // Get list of tr & td
            var td = 0,
                tr = 0;

            node.value = node.value.replace(/(<tr>)<td> \[(-?\d+)pt\]|(<tr>)|(<td>) <td colspan='(\d+)' rules='([^']+)'>|(<td>) ?/g,
              function(match,
                isTr, padSpecs,
                isTr2,
                isTd, colspan, specs,
                isTd2){
                var pad = "";

              // Count TR
              if(isTr || isTr2) {
                td = 0;
                tr++;

                // [8pt]
                if(padSpecs) {
                  pad = '<tr style="height: ' + padSpecs + 'px"></tr><tr data-row="' + tr + '">';
                } else {
                  return '<tr data-row="' + tr + '">';
                }
              }
              td++;

              // TD : add CSS
              var _rules = (specs ? getCSSRules(specs)[0] : rules[td-1]), // \multicolumn defines its own style
                  style  = "";

              // Alignment + vertical border
              for(var k in _rules) {
                style += k + ":" + _rules[k] + "; ";
              }

              // Horizontal border
              if(hlines[tr-1]) {
                if(hlines[tr-1] > 1) {
                  style += "border-top: 3px double black; ";
                } else {
                  style += "border-top: 1px solid black; ";
                }
              } else if(clines[tr-1] && td >= clines[tr-1][0] && td <= clines[tr-1][1]) {
                style += "border-top: 1px solid black; ";
              }

              // Background color
              if(cellcolor[tr-1] && cellcolor[tr-1][td-1]) {
                style += "background-color: " + cellcolor[tr-1][td-1] + "; ";
              } else if(rowcolor[tr-1]) {
                style += "background-color: " + rowcolor[tr-1] + "; ";
              }

              return pad + '<td ' + (colspan && colspan > 1 ? 'colspan="' + colspan + '"' : '')
                            + 'style="' + style + '"'
                      + '>';
            });

            if(hlines[tr]) {
              node.value = node.value.replace(
                new RegExp('<tr data-row="' + tr + '"(?: style="([^"]+)")?>'),
                function(match, style) {
                  if(!style) {
                    style = "";
                  }
                  return '<tr data-row="' + tr + '" style="' + style + 'border-bottom:1px solid black;">';
                }
              );
            }
          }

          var o = "", i, child;
          node.childs.shift();
          for (i = 0; i < node.childs.length; i++) {
            child = node.childs[i];
            if (child.name == "imath" || child.name == "group") {
              o += typejax.builder(child, true);
            } else {
              o += child.value;
            }
          }
          node.childs = [];
          while (o.charAt(o.length-1) == ' ') {
            o = o.substring(0, o.length-1);
          }
          if (o.substring(o.length-8, o.length) == "<tr><td>") {
            o = "<table><tbody><tr><td>" + o.substring(0, o.length-8) + "</tbody></table>";
          } else {
            o = "<table><tbody><tr><td>" + o + "</td></tr></tbody></table>";
          }
          node.value = "<span class='" + node.name + "' style='display:inline-block;'>" + o + "</span>";
          updateCSSRules(node);

          this.intabular = false;
          this.hlines    = {};
          this.clines    = {};
          this.rowcolor  = {};
          this.cellcolor = {};
        },

        envTheorem: function(node) {
          this.makeTheorem(node);
        }
      };

      var counters = {
        "part":               {content: "'Part ' counter(part, upper-roman) '\\0000a0\\0000a0'"},
        "chapter":            {content: "'Chapter ' counter(chapter) '\\0000a0\\0000a0'"},
        "section":            {parent: "chapter", content: "counter(section) '\\0000a0'"},
        "subsection":         {parent: "section", content: "counter(section) '.' counter(subsection) '\\0000a0'"},
        "subsubsection":      {parent: "subsection", content: "counter(section) '.' counter(subsection) '.' counter(subsubsection) '\\0000a0'"},
        "-toc-part":          {content: "'Part ' counter(-toc-part, upper-roman) '\\0000a0\\0000a0'"},
        "-toc-chapter":       {content: "'Chapter ' counter(-toc-chapter) '\\0000a0\\0000a0'"},
        "-toc-section":       {parent: "-toc-chapter", content: "counter(-toc-section) '\\0000a0'"},
        "-toc-subsection":    {parent: "-toc-section", content: "counter(-toc-section) '.' counter(-toc-subsection) '\\0000a0'"},
        "-toc-subsubsection": {parent: "-toc-subsection", content: "counter(-toc-section) '.' counter(-toc-subsection) '.' counter(-toc-subsubsection) '\\0000a0'"}
      };

      extend("article", definitions, renderers, null, counters);
    })();

    var packages = {
      info: {
        amsart: {file: "amscls/amscls"},
        amsbook: {file: "amscls/amscls"},
        beamer: {file: "beamer/beamer", pre: ["hyperref"], post: ["beamerthemedefault"]},
        beamercolorthemebeaver:    {file: "beamer/color/beaver"},
        beamercolorthemedefault:   {file: "beamer/color/default"},
        beamercolorthemelily:      {file: "beamer/color/lily"},
        beamercolorthemeorchid:    {file: "beamer/color/orchid"},
        beamercolorthemerose:      {file: "beamer/color/rose"},
        beamercolorthemewhale:     {file: "beamer/color/whale"},
        beamercolorthemewolverine: {file: "beamer/color/wolverine"},
        beamerfontthemedefault:                 {file: "beamer/font/default"},
        beamerfontthemeserif:                   {file: "beamer/font/serif"},
        beamerfontthemestructurebold:           {file: "beamer/font/structurebold"},
        beamerfontthemestructureitalicserif:    {file: "beamer/font/structureitalicserif"},
        beamerfontthemestructuresmallcapsserif: {file: "beamer/font/structuresmallcapsserif"},
        beamerinnerthemecircles:    {file: "beamer/inner/circles"},
        beamerinnerthemedefault:    {file: "beamer/inner/default"},
        beamerinnerthemerectangles: {file: "beamer/inner/rectangles"},
        beamerinnerthemerounded:    {file: "beamer/inner/rounded"},
        beamerouterthemedefault:   {file: "beamer/outer/default"},
        beamerouterthemeinfolines: {file: "beamer/outer/infolines"},
        beamerthemeboxes: {
          file: "beamer/theme/boxes"
        },
        beamerthemedefault: {
          file: "beamer/theme/default",
          pre: ["beamerinnerthemedefault", "beamercolorthemedefault", "beamerfontthemedefault", "beamerouterthemedefault"]
        },
        beamerthemeepyt: {file: "beamer/theme/epyt"},
        beamerthemeAnnArbor: {
          file: "beamer/theme/AnnArbor",
          pre: ["beamerinnerthemerounded", "beamercolorthemewolverine", "beamerouterthemeinfolines"]
        },
        beamerthemeBoadilla: {
          file: "beamer/theme/Boadilla",
          pre: ["beamerinnerthemerounded", "beamercolorthemerose", "beamerouterthemeinfolines"]
        },
        beamerthemeCambridgeUS: {
          file: "beamer/theme/CambridgeUS",
          pre: ["beamerinnerthemerounded", "beamercolorthemebeaver", "beamerouterthemeinfolines"]
        },
        beamerthemeMadrid: {
          file: "beamer/theme/Madrid",
          pre: ["beamerinnerthemerounded", "beamercolorthemeorchid", "beamercolorthemewhale", "beamerouterthemeinfolines"]
        },
        beamerthemePittsburgh: {
          file: "beamer/theme/Pittsburgh"
        },
        beamerthemeRochester: {
          file: "beamer/theme/Rochester",
          pre: ["beamerinnerthemerectangles", "beamercolorthemeorchid", "beamercolorthemewhale"]
        },
        ctex: {file: "ctex/ctex"},
        ctexart: {file: "ctex/ctex"},
        ctexbook: {file: "ctex/ctex"},
        ctexcap: {file: "ctex/ctex"},
        hyperref: {file: "hyperref/hyperref"}
      },
      list: {used: [], current: [], missing: [], existing: []}
    };

    function start() {
      log("---------------- start parser ----------------");
      syner.analysis(input, modstart, modend);
      syner.printTree(syner.innertree);
      var childs = syner.innertree.childs,
          out = [],
          child, i;
      for (i = 0; i < childs.length; i++) {
        child = childs[i];
        that.builder.reset = "";
        out.push({
          from:  child.from,
          to:    child.to,
          name:  child.name,
          style: child.style || [],
          html:  that.builder(child, false),
          reset: that.builder.reset
        });
      }
      if(footnotes.length > 0) {
        out.push({
          name: 'footnotes',
          html: footnotes.join("\n")
        });
        footnotes = [];
      }
      log("output:", out);
      return out;
    }

    function stop() {
      log("---------------- stop parser ----------------");
      lexer.ended = true;
      done = false;
    }

    function load(input1, modstart1, modend1, callback1) {
      input = input1; modstart = modstart1; modend = modend1; callback = callback1;
      if (time && ((new Date).getTime() - time) > 2000) {
        time = null;
        return callback(null);
      }
      done = true;
      var out = start();
      if (done) {
        callback(out);
      }
    }

    function reload() {
      callback(null);
    };

    function delayReload() {
      time = (new Date).getTime();
    }

    return { latex: latex, load: load, extend: extend };
  })(typejax);

  typejax.builder = function(tree, flag){
    var open, close, html = "";
    if (tree.reset) this.builder.reset += tree.reset;
    if (flag) {
      if (tree.mode == "inline") {
        open = "<span class='" + tree.name + (tree.classname ? " " + tree.classname : "") + "'" +
                  (tree.style ? " style='" + tree.style.join(";") + "'" : "") +
                ">",
        close = "</span>";

        if (tree.name == "imath") {
          open += "<span class='MathJax_Preview'>" + $.escapeText(tree.value) + "</span>";
          open += "<script type='math/tex'>", close = "</script>" + close; 
        }
      } else {
        open = "<div class='envblock " + tree.name + (tree.classname ? " " + tree.classname : "") + "'" + 
                  (tree.style ? " style='" + tree.style.join(";") + "'" : "") +
                ">",
        close = "</div>";
        switch (tree.name) {
          case "bmath":
            open += "<div class='MathJax_Preview'>" + $.escapeText(tree.value) + "</div>";
            open += "<script type='math/tex; mode=display'>", close = "</script>" + close;
            break;
          case "enumerate":
            open += "<ol class='enumerate'>", close = "</ol>" + close;
            break;
          case "description":
            open += "<ul class='description'>", close = "</ul>" + close;
            break;
          case "itemize":
            open += "<ul class='itemize'>", close = "</ul>" + close;
            break;
          case "item":
            open = "<li" + (tree.argarray[0] ? ' class="hasLabel"' : '') + ">", close = "</li>";
            break;
        }
      }
    } else {
      switch (tree.name) {
        case "bmath":
          open = "<div class='MathJax_Preview'>" + $.escapeText(tree.value) + "</div>";
          open += "<script type='math/tex; mode=display'>", close = "</script>";
          break;
        case "enumerate":
          open = "<div><ol class='enumerate'>", close = "</ol></div>";
          break;
        case "description":
          open = "<div><ul class='description'>", close = "</ul></div>";
          break;
        case "itemize":
          open = "<div><ul class='itemize'>", close = "</ul></div>";
          break;
        case "item":
          open = "<li" + (tree.argarray[0] ? ' class="hasLabel"' : '') + ">", close = "</li>";
          break;
        default:
          open = "", close = "";
      }
      flag = true;
    }
    if (tree.childs.length > 0) {
      for (var i = 0; i < tree.childs.length; i++) {
        html += this.builder(tree.childs[i], flag); 
      }
    } else {
      html = tree.value;
    }
    if (tree.mode == "inline" && tree.childs.length == 0 && tree.value == "") {
      return "";
    } else {
      return open + html + close;
    }
  };

  typejax.message = {
    debug: "none",

    log: function(type) {
      var msg = Array.prototype.slice.call(arguments, 1).join(" ");
      var sto = this.storage;
      sto[type] = sto[type] ? sto[type] + "\n" + msg : msg;
      if (this.debug == "all" || this.debug.indexOf(type) > -1) log(msg);
    },

    get: function(type) {
      return (this.storage[type] || "");
    },

    print: function(type) {
      log(this.storage[type] || "");
    },

    clear: function(type) {
      delete this.storage[type];
    },

    storage: {}
  };

  return typejax;

})(inliner);

