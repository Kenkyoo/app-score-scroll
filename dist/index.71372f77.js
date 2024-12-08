/*! Tabby v11.2.0 | (c) 2016 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/tabby */ !function(t, e) {
    "function" == typeof define && define.amd ? define([], e(t)) : "object" == typeof exports ? module.exports = e(t) : t.tabby = e(t);
}("undefined" != typeof global ? global : this.window || this.global, function(t) {
    "use strict";
    var e, o, n = {}, a = "querySelector" in document && "addEventListener" in t && "classList" in document.createElement("_") && "onhashchange" in t, r = {
        selectorToggle: "[data-tab]",
        selectorToggleGroup: "[data-tabs]",
        selectorContent: "[data-tabs-pane]",
        selectorContentGroup: "[data-tabs-content]",
        toggleActiveClass: "active",
        contentActiveClass: "active",
        initClass: "js-tabby",
        stopVideo: !0,
        callback: function() {}
    }, c = function(t, e, o) {
        if ("[object Object]" === Object.prototype.toString.call(t)) for(var n in t)Object.prototype.hasOwnProperty.call(t, n) && e.call(o, t[n], n, t);
        else for(var a = 0, r = t.length; a < r; a++)e.call(o, t[a], a, t);
    }, s = function() {
        var t = {}, e = !1, o = 0, n = arguments.length;
        "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (e = arguments[0], o++);
        for(var a = function(o) {
            for(var n in o)Object.prototype.hasOwnProperty.call(o, n) && (e && "[object Object]" === Object.prototype.toString.call(o[n]) ? t[n] = s(!0, t[n], o[n]) : t[n] = o[n]);
        }; o < n; o++){
            var r = arguments[o];
            a(r);
        }
        return t;
    }, i = function(t, e) {
        for(Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(t) {
            for(var e = (this.document || this.ownerDocument).querySelectorAll(t), o = e.length; --o >= 0 && e.item(o) !== this;);
            return o > -1;
        }); t && t !== document; t = t.parentNode)if (t.matches(e)) return t;
        return null;
    }, l = function(t) {
        "#" === t.charAt(0) && (t = t.substr(1));
        for(var e, o = String(t), n = o.length, a = -1, r = "", c = o.charCodeAt(0); ++a < n;){
            if (e = o.charCodeAt(a), 0 === e) throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
            r += e >= 1 && e <= 31 || 127 == e || 0 === a && e >= 48 && e <= 57 || 1 === a && e >= 48 && e <= 57 && 45 === c ? "\\" + e.toString(16) + " " : e >= 128 || 45 === e || 95 === e || e >= 48 && e <= 57 || e >= 65 && e <= 90 || e >= 97 && e <= 122 ? o.charAt(a) : "\\" + o.charAt(a);
        }
        return "#" + r;
    }, u = function(t, e) {
        if (e.stopVideo && !t.classList.contains(e.contentActiveClass)) {
            var o = t.querySelector("iframe"), n = t.querySelector("video");
            if (o) {
                var a = o.src;
                o.src = a;
            }
            n && n.pause();
        }
    }, d = function(e, o) {
        if (!e.hasAttribute("data-tab-no-focus")) {
            if (!e.classList.contains(o.contentActiveClass)) return void (e.hasAttribute("data-tab-focused") && e.removeAttribute("tabindex"));
            var n = {
                x: t.pageXOffset,
                y: t.pageYOffset
            };
            e.focus(), document.activeElement.id !== e.id && (e.setAttribute("tabindex", "-1"), e.setAttribute("data-tab-focused", !0), e.focus()), t.scrollTo(n.x, n.y);
        }
    }, f = function(t, e) {
        var o = i(t, e.selectorToggleGroup);
        if (o) {
            var n, a = o.querySelectorAll(e.selectorToggle);
            c(a, function(o) {
                return o.hash === t.hash ? (o.classList.add(e.toggleActiveClass), n = i(o, "li"), void (n && n.classList.add(e.toggleActiveClass))) : (o.classList.remove(e.toggleActiveClass), n = i(o, "li"), void (n && n.classList.remove(e.toggleActiveClass)));
            });
        }
    }, v = function(t, e) {
        var o = document.querySelector(l(t));
        if (o) {
            var n = i(o, e.selectorContentGroup);
            if (n) {
                var a = n.querySelectorAll(e.selectorContent);
                c(a, function(o) {
                    return o.id === t.substring(1) ? (o.classList.add(e.contentActiveClass), void d(o, e)) : (o.classList.remove(e.contentActiveClass), u(o, e), void d(o, e));
                });
            }
        }
    };
    n.toggleTab = function(t, o, n) {
        var a = s(e || r, n || {}), c = document.querySelectorAll(l(t));
        v(t, a), o && f(o, a), a.callback(c, o);
    };
    var h = function(a) {
        var r = t.location.hash;
        if (o && (o.id = o.getAttribute("data-tab-id"), o = null), r) {
            var c = document.querySelector(e.selectorToggle + '[href*="' + r + '"]');
            n.toggleTab(r, c);
        }
    }, b = function(n) {
        if (0 === n.button && !n.metaKey && !n.ctrlKey) {
            var a = i(n.target, e.selectorToggle);
            if (a && a.hash) {
                if (a.hash === t.location.hash) return void n.preventDefault();
                o = document.querySelector(a.hash), o && (o.setAttribute("data-tab-id", o.id), o.id = "");
            }
        }
    }, m = function(t) {
        if (o = i(t.target, e.selectorContent), o && !o.classList.contains(e.contentActiveClass)) {
            var n = o.id;
            o.setAttribute("data-tab-id", n), o.setAttribute("data-tab-no-focus", !0), o.id = "", location.hash = n;
        }
    };
    return n.destroy = function() {
        e && (document.documentElement.classList.remove(e.initClass), document.removeEventListener("click", b, !1), document.removeEventListener("focus", m, !0), t.removeEventListener("hashchange", h, !1), e = null, o = null);
    }, n.init = function(o) {
        a && (n.destroy(), e = s(r, o || {}), document.documentElement.classList.add(e.initClass), document.addEventListener("click", b, !1), document.addEventListener("focus", m, !0), t.addEventListener("hashchange", h, !1), h());
    }, n;
});

//# sourceMappingURL=index.71372f77.js.map
