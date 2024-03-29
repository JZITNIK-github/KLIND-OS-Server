function listAllEventListeners() {
  const allElements = Array.prototype.slice.call(document.querySelectorAll("*"));
  allElements.push(document);
  allElements.push(window);

  const types = [];

  for (let ev in window) {
    if (/^on/.test(ev)) types[types.length] = ev;
  }

  let elements = [];
  for (let i = 0; i < allElements.length; i++) {
    const currentElement = allElements[i];
    for (let j = 0; j < types.length; j++) {
      if (typeof currentElement[types[j]] === "function") {
        elements.push({
          "node": currentElement,
          "type": types[j],
          "func": currentElement[types[j]],
        });
      }
    }
  }

  return elements.sort(function (a, b) {
    return a.type.localeCompare(b.type);
  });
}

var Procesy = {
  intervals: [],
  iframes: [],
  events: [],
  analyze: (win) => {
    var el = document.body.appendChild(document.createElement("div"));
    el.style.width = "100vw";
    el.style.height = "100vh";
    el.style.position = "absolute";
    el.style.zIndex = "54616215615645";
    el.style.backgroundColor = "black";
    el.style.top = "0";
    el.style.left = "0";

    var con = win.querySelector(".procesyContent");
    con.innerHTML = "";
    for (var i = 0; i < Procesy.intervals.length; i++) {
      var p = document.createElement("p");
      p.textContent = "Interval: " + Procesy.intervals[i][0] + " ";

      var open = document.createElement("span");
      open.textContent = "Open code ";
      open.style.color = "blue";
      open.setAttribute("ss", i);
      open.onclick = (e) => {
        Procesy.openIn(e.target.getAttribute("ss"));
      };

      var end = document.createElement("span");
      end.textContent = "End process";
      end.style.color = "blue";
      end.setAttribute("ss", i);
      end.onclick = (e) => {
        Procesy.end(e.target);
      };

      p.appendChild(open);
      p.appendChild(end);
      con.appendChild(p);
    }

    Procesy.events = [];
    var eventListeners = listAllEventListeners();
    for (const event of eventListeners) {
      Procesy.events.push(event);
      var p = document.createElement("p");
      p.textContent = `Element: ${event.node.tagName} Type: ${event.type}`;

      var open = document.createElement("span");
      open.textContent = "Open code ";
      open.style.color = "blue";
      open.setAttribute("ss", Procesy.events.length - 1);
      open.onclick = (e) => {
        Procesy.openEvent(e.target.getAttribute("ss"));
      };

      p.appendChild(open);
      con.appendChild(p);
    }

    setTimeout(() => {
      el.remove();
    }, 2000);
  },
  openIn: (i) => {
    try { windows.open("viewtext", { text: Procesy.intervals[i][1].toString(), title: "Zobrazení procesu." }); } catch (e) { }
  },
  openEvent: (i) => {
    try {
      windows.open("viewtext", { text: Procesy.events[i].func.toString(), title: "Zobrazení eventu:" });
    } catch (e) { }
  },
  end: (e) => {
    try { clearInterval(Procesy.intervals[e.getAttribute("ss")][0]); } catch (e) { }
    e.parentElement.remove();
  }
};

const originalSetInterval = window.setInterval;
window.setInterval = function (callback, delay) {
  const intervalId = originalSetInterval(callback, delay);
  Procesy.intervals.push([intervalId, callback]);
  return intervalId;
};
const originalClearInterval = window.clearInterval;
window.clearInterval = function (id) {
  var ne = new Array();
  for (var i = 0; i < Procesy.intervals.length; i++) {
    if (Procesy.intervals[i][0] != id) {
      ne.push(Procesy.intervals[i]);
    }
  }
  Procesy.intervals = ne;
  originalClearInterval(id);
};



setInterval(() => {
  Procesy.iframes = new Array();
  var iframes = document.querySelectorAll("iframe");
  for (var i = 0; i < iframes.length; i++) {
    Procesy.iframes.push(iframes[i]);
  }
}, 5000);