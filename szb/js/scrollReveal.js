window.scrollReveal = (function(d) {
	var c = 1;
	var b = (function() {
		return d.requestAnimationFrame || d.webkitRequestAnimationFrame || d.mozRequestAnimationFrame
	}());

	function a(e) {
		this.options = this.extend(this.defaults, e);
		this.docElem = this.options.elem;
		this.styleBank = {};
		if (this.options.init == true) {
			this.init()
		}
	}
	a.prototype = {
		defaults: {
			after: "0s",
			enter: "bottom",
			move: "24px",
			over: "0.66s",
			easing: "ease-in-out",
			opacity: 0,
			complete: function() {},
			viewportFactor: 0.33,
			reset: false,
			init: true,
			elem: d.document.documentElement
		},
		init: function() {
			this.scrolled = false;
			var e = this;
			this.elems = Array.prototype.slice.call(this.docElem.querySelectorAll("[data-scroll-reveal]"));
			this.elems.forEach(function(j, h) {
				var k = j.getAttribute("data-scroll-reveal-id");
				if (!k) {
					k = c++;
					j.setAttribute("data-scroll-reveal-id", k)
				}
				if (!e.styleBank[k]) {
					e.styleBank[k] = j.getAttribute("style")
				}
				e.update(j)
			});
			var g = function(h) {
				if (!e.scrolled) {
					e.scrolled = true;
					b(function() {
						e._scrollPage()
					})
				}
			};
			var f = function() {
				if (e.resizeTimeout) {
					clearTimeout(e.resizeTimeout)
				}

				function h() {
					e._scrollPage();
					e.resizeTimeout = null
				}
				e.resizeTimeout = setTimeout(h, 200)
			};
			if (this.docElem == d.document.documentElement) {
				d.addEventListener("scroll", g, false);
				d.addEventListener("resize", f, false)
			} else {
				this.docElem.addEventListener("scroll", g, false)
			}
		},
		_scrollPage: function() {
			var e = this;
			this.elems.forEach(function(g, f) {
				e.update(g)
			});
			this.scrolled = false
		},
		parseLanguage: function(g) {
			var h = g.getAttribute("data-scroll-reveal").split(/[, ]+/),
				e = {};

			function f(k) {
				var j = [],
					i = ["from", "the", "and", "then", "but", "with"];
				k.forEach(function(m, l) {
					if (i.indexOf(m) > -1) {
						return
					}
					j.push(m)
				});
				return j
			}
			h = f(h);
			h.forEach(function(k, j) {
				switch (k) {
					case "enter":
						e.enter = h[j + 1];
						return;
					case "after":
						e.after = h[j + 1];
						return;
					case "wait":
						e.after = h[j + 1];
						return;
					case "move":
						e.move = h[j + 1];
						return;
					case "ease":
						e.move = h[j + 1];
						e.ease = "ease";
						return;
					case "ease-in":
						e.move = h[j + 1];
						e.easing = "ease-in";
						return;
					case "ease-in-out":
						e.move = h[j + 1];
						e.easing = "ease-in-out";
						return;
					case "ease-out":
						e.move = h[j + 1];
						e.easing = "ease-out";
						return;
					case "over":
						e.over = h[j + 1];
						return;
					default:
						return
				}
			});
			return e
		},
		update: function(g) {
			var h = this;
			var e = this.genCSS(g);
			var f = this.styleBank[g.getAttribute("data-scroll-reveal-id")];
			if (f != null) {
				f += ";"
			} else {
				f = ""
			}
			if (!g.getAttribute("data-scroll-reveal-initialized")) {
				g.setAttribute("style", f + e.initial);
				g.setAttribute("data-scroll-reveal-initialized", true)
			}
			if (!this.isElementInViewport(g, this.options.viewportFactor)) {
				if (this.options.reset) {
					g.setAttribute("style", f + e.initial + e.reset)
				}
				return
			}
			if (g.getAttribute("data-scroll-reveal-complete")) {
				return
			}
			if (this.isElementInViewport(g, this.options.viewportFactor)) {
				g.setAttribute("style", f + e.target + e.transition);
				if (!this.options.reset) {
					setTimeout(function() {
						if (f != "") {
							g.setAttribute("style", f)
						} else {
							g.removeAttribute("style")
						}
						g.setAttribute("data-scroll-reveal-complete", true);
						h.options.complete(g)
					}, e.totalDuration)
				}
				return
			}
		},
		genCSS: function(f) {
			var q = this.parseLanguage(f),
				o, g;
			if (q.enter) {
				if (q.enter == "top" || q.enter == "bottom") {
					o = q.enter;
					g = "y"
				}
				if (q.enter == "left" || q.enter == "right") {
					o = q.enter;
					g = "x"
				}
			} else {
				if (this.options.enter == "top" || this.options.enter == "bottom") {
					o = this.options.enter;
					g = "y"
				}
				if (this.options.enter == "left" || this.options.enter == "right") {
					o = this.options.enter;
					g = "x"
				}
			}
			if (o == "top" || o == "left") {
				if (q.move) {
					q.move = "-" + q.move
				} else {
					q.move = "-" + this.options.move
				}
			}
			var p = q.move || this.options.move,
				e = q.over || this.options.over,
				h = q.after || this.options.after,
				n = q.easing || this.options.easing,
				j = q.opacity || this.options.opacity;
			var m = "-webkit-transition: -webkit-transform " + e + " " + n + " " + h + ",  opacity " + e + " " + n + " " + h + ";" + "transition: transform " + e + " " + n + " " + h + ", opacity " + e + " " + n + " " + h + ";" + "-webkit-perspective: 1000;" + "-webkit-backface-visibility: hidden;";
			var i = "-webkit-transition: -webkit-transform " + e + " " + n + " 0s,  opacity " + e + " " + n + " " + h + ";" + "transition: transform " + e + " " + n + " 0s,  opacity " + e + " " + n + " " + h + ";" + "-webkit-perspective: 1000;" + "-webkit-backface-visibility: hidden;";
			var l = "-webkit-transform: translate" + g + "(" + p + ");" + "transform: translate" + g + "(" + p + ");" + "opacity: " + j + ";";
			var k = "-webkit-transform: translate" + g + "(0);" + "transform: translate" + g + "(0);" + "opacity: 1;";
			return {
				transition: m,
				initial: l,
				target: k,
				reset: i,
				totalDuration: ((parseFloat(e) + parseFloat(h)) * 1000)
			}
		},
		getViewportH: function() {
			var e = this.docElem["clientHeight"],
				f = d["innerHeight"];
			if (this.docElem == d.document.documentElement) {
				return (e < f) ? f : e
			} else {
				return e
			}
		},
		getOffset: function(f) {
			var e = 0,
				g = 0;
			do {
				if (!isNaN(f.offsetTop)) {
					e += f.offsetTop
				}
				if (!isNaN(f.offsetLeft)) {
					g += f.offsetLeft
				}
			} while (f = f.offsetParent);
			return {
				top: e,
				left: g
			}
		},
		isElementInViewport: function(l, k) {
			var j = this.docElem.scrollTop + this.docElem.offsetTop;
			if (this.docElem == d.document.documentElement) {
				j = d.pageYOffset
			}
			var f = j + this.getViewportH(),
				i = l.offsetHeight,
				e = this.getOffset(l).top,
				g = e + i,
				k = k || 0;
			return (e + i * k) <= f && (g) >= j || (l.currentStyle ? l.currentStyle : d.getComputedStyle(l, null)).position == "fixed"
		},
		extend: function(f, e) {
			for (var g in e) {
				if (e.hasOwnProperty(g)) {
					f[g] = e[g]
				}
			}
			return f
		}
	};
	return a
})(window);