#!/usr/bin/env node
             
const stream = require('stream');
const os = require('os');
const tty = require('tty');
const util = require('util');
const path = require('path');
const fs = require('fs');             
const aa = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
let ba = a => `${a}`.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), ca = a => 40 < `${a}`.length || -1 != `${a}`.indexOf("\n") || -1 !== `${a}`.indexOf("<");
const da = {};
function ea(a) {
  const b = {...a.attributes, children:a.children};
  a = a.nodeName.defaultProps;
  if (void 0 !== a) {
    for (let c in a) {
      void 0 === b[c] && (b[c] = a[c]);
    }
  }
  return b;
}
;const fa = (a, b, {allAttributes:c, xml:d, B:e, sort:g, l:f} = {}) => {
  let k;
  const n = Object.keys(a);
  g && n.sort();
  return {C:n.map(h => {
    var m = a[h];
    if ("children" != h && !h.match(/[\s\n\\/='"\0<>]/) && (c || !["key", "ref"].includes(h))) {
      if ("className" == h) {
        if (a.class) {
          return;
        }
        h = "class";
      } else {
        if ("htmlFor" == h) {
          if (a.for) {
            return;
          }
          h = "for";
        } else {
          if ("srcSet" == h) {
            if (a.srcset) {
              return;
            }
            h = "srcset";
          }
        }
      }
      e && h.match(/^xlink:?./) && (h = h.toLowerCase().replace(/^xlink:?/, "xlink:"));
      if ("style" == h && m && "object" == typeof m) {
        {
          let u = "";
          for (var y in m) {
            let C = m[y];
            null != C && (u && (u += " "), u += da[y] || (da[y] = y.replace(/([A-Z])/g, "-$1").toLowerCase()), u += ": ", u += C, "number" == typeof C && !1 === aa.test(y) && (u += "px"), u += ";");
          }
          m = u || void 0;
        }
      }
      if ("dangerouslySetInnerHTML" == h) {
        k = m && m.__html;
      } else {
        if ((m || 0 === m || "" === m) && "function" != typeof m) {
          if (!0 === m || "" === m) {
            if (m = h, !d) {
              return h;
            }
          }
          y = "";
          if ("value" == h) {
            if ("select" == b) {
              f = m;
              return;
            }
            "option" == b && f == m && (y = "selected ");
          }
          return `${y}${h}="${ba(m)}"`;
        }
      }
    }
  }).filter(Boolean), A:k, l:f};
};
const K = [], ha = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/, ia = /^(a|abbr|acronym|audio|b|bdi|bdo|big|br|button|canvas|cite|code|data|datalist|del|dfn|em|embed|i|iframe|img|input|ins|kbd|label|map|mark|meter|noscript|object|output|picture|progress|q|ruby|s|samp|slot|small|span|strong|sub|sup|svg|template|textarea|time|u|tt|var|video|wbr)$/, ja = (a, b = {}) => {
  const {addDoctype:c, pretty:d} = b;
  a = L(a, b, {});
  return c ? `<!doctype html>${d ? "\n" : ""}${a}` : a;
};
function L(a, b = {}, c = {}, d = !1, e = !1, g) {
  if (null == a || "boolean" == typeof a) {
    return "";
  }
  const {pretty:f = !1, shallow:k = !1, renderRootComponent:n = !1, shallowHighOrder:h = !1, sortAttributes:m, allAttributes:y, xml:u, initialPadding:C = 0, closeVoidTags:Y = !1} = b;
  let {lineLength:D = 40} = b;
  D -= C;
  let {nodeName:l, attributes:I = {}} = a;
  var w = ["textarea", "pre"].includes(l);
  const T = " ".repeat(C), z = "string" == typeof f ? f : `  ${T}`;
  if ("object" != typeof a && !l) {
    return ba(a);
  }
  if ("function" == typeof l) {
    if (!k || !d && n) {
      return w = ea(a), l.prototype && "function" == typeof l.prototype.render ? (a = new l(w, c), a._disable = a.__x = !0, a.props = w, a.context = c, l.getDerivedStateFromProps ? a.state = {...a.state, ...l.getDerivedStateFromProps(a.props, a.state)} : a.componentWillMount && a.componentWillMount(), w = a.render(a.props, a.state, a.context), a.getChildContext && (c = {...c, ...a.getChildContext()})) : w = l(w, c), L(w, b, c, h, e, g);
    }
    l = l.displayName || l !== Function && l.name || ka(l);
  }
  let p = "";
  ({C:H, A:d, l:g} = fa(I, l, {allAttributes:y, xml:u, B:e, sort:m, l:g}));
  if (f) {
    let B = `<${l}`.length;
    p = H.reduce((F, q) => {
      const v = B + 1 + q.length;
      if (v > D) {
        return B = z.length, `${F}\n${z}${q}`;
      }
      B = v;
      return `${F} ${q}`;
    }, "");
  } else {
    p = H.length ? " " + H.join(" ") : "";
  }
  p = `<${l}${p}>`;
  if (`${l}`.match(/[\s\n\\/='"\0<>]/)) {
    throw p;
  }
  var H = `${l}`.match(ha);
  Y && H && (p = p.replace(/>$/, " />"));
  let G = [];
  if (d) {
    !w && f && (ca(d) || d.length + la(p) > D) && (d = "\n" + z + `${d}`.replace(/(\n+)/g, "$1" + (z || "\t"))), p += d;
  } else {
    if (a.children) {
      let B = f && p.includes("\n");
      const F = [];
      G = a.children.map((q, v) => {
        if (null != q && !1 !== q) {
          var x = L(q, b, c, !0, "svg" == l ? !0 : "foreignObject" == l ? !1 : e, g);
          if (x) {
            f && x.length + la(p) > D && (B = !0);
            var r = x.replace(new RegExp(`</${q.nodeName}>$`), "");
            ma(q.nodeName, r) && (F[v] = x.length);
            return x;
          }
        }
      }).filter(Boolean);
      f && B && !w && (G = G.reduce((q, v, x) => {
        var r = (x = F[x - 1]) && /^<([\s\S]+?)>/.exec(v);
        r && ([, r] = r, r = !ia.test(r));
        if (x && !r) {
          r = /[^<]*?(\s)/y;
          var E;
          let O = !0, P;
          for (; null !== (E = r.exec(v));) {
            const [J] = E;
            [, P] = E;
            r.lastIndex + J.length - 1 > D - (O ? x : 0) && (E = v.slice(0, r.lastIndex - 1), v = v.slice(r.lastIndex), O ? (q.push(E), O = !1) : q.push("\n" + z + `${E}`.replace(/(\n+)/g, "$1" + (z || "\t"))), r.lastIndex = 0);
          }
          P && q.push(P);
          q.push(v);
        } else {
          q.push("\n" + z + `${v}`.replace(/(\n+)/g, "$1" + (z || "\t")));
        }
        return q;
      }, []));
    }
  }
  if (G.length) {
    p += G.join("");
  } else {
    if (u) {
      return p.substring(0, p.length - 1) + " />";
    }
  }
  H || (!ma(l, G[G.length - 1]) && !w && f && p.includes("\n") && (p += `\n${T}`), p += `</${l}>`);
  return p;
}
const ma = (a, b) => `${a}`.match(ia) && (b ? !/>$/.test(b) : !0);
function ka(a) {
  var b = (Function.prototype.toString.call(a).match(/^\s*function\s+([^( ]+)/) || "")[1];
  if (!b) {
    b = -1;
    for (let c = K.length; c--;) {
      if (K[c] === a) {
        b = c;
        break;
      }
    }
    0 > b && (b = K.push(a) - 1);
    b = `UnnamedComponent${b}`;
  }
  return b;
}
const la = a => {
  a = a.split("\n");
  return a[a.length - 1].length;
};
function na(a, b, c) {
  const d = [];
  b.replace(a, (e, ...g) => {
    e = g.slice(0, g.length - 2).reduce((f, k, n) => {
      n = c[n];
      if (!n || void 0 === k) {
        return f;
      }
      f[n] = k;
      return f;
    }, {});
    d.push(e);
  });
  return d;
}
;const oa = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), pa = new RegExp(`(?:\\s+((?:${oa.source}\\s*)*))`);
const ra = (a, b) => {
  a = (Array.isArray(a) ? a : [a]).join("|");
  return na(new RegExp(`<(${a})${pa.source}?(?:${/\s*\/>/.source}|${/>([\s\S]+?)?<\/\1>/.source})`, "g"), b, "t a v v1 v2 c".split(" ")).map(({t:c, a:d = "", c:e = ""}) => {
    d = d.replace(/\/$/, "").trim();
    d = qa(d);
    return {content:e, props:d, tag:c};
  });
}, qa = a => na(oa, a, ["key", "val", "def", "f"]).reduce((b, {key:c, val:d}) => {
  if (void 0 === d) {
    return b[c] = !0, b;
  }
  b[c] = "true" == d ? !0 : "false" == d ? !1 : /^\d+$/.test(d) ? parseInt(d, 10) : d;
  return b;
}, {});
var sa = stream;
const {Transform:ta, Writable:ua} = stream;
function va(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const {re:b, replacement:c} = a;
  a = b instanceof RegExp;
  const d = -1 != ["string", "function"].indexOf(typeof c);
  return a && d;
}
const wa = (a, b) => {
  if (!(b instanceof Error)) {
    throw b;
  }
  [, , a] = a.stack.split("\n", 3);
  a = b.stack.indexOf(a);
  if (-1 == a) {
    throw b;
  }
  a = b.stack.substr(0, a - 1);
  const c = a.lastIndexOf("\n");
  b.stack = a.substr(0, c);
  throw b;
};
const {homedir:xa} = os;
const ya = /\s+at.*(?:\(|\s)(.*)\)?/, za = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Ba = xa(), Q = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(za.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter(g => {
    g = g.match(ya);
    if (null === g || !g[1]) {
      return !0;
    }
    g = g[1];
    return g.includes(".app/Contents/Resources/electron.asar") || g.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(g);
  }).filter(g => g.trim()).map(g => b ? g.replace(ya, (f, k) => f.replace(k, k.replace(Ba, "~"))) : g).join("\n");
};
const Ca = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, Da = (a, b = !1) => Ca(a, 2 + (b ? 1 : 0)), Ea = a => {
  ({callee:{caller:a}} = a);
  return a;
};
function Fa(a, b, c = !1) {
  return function(d) {
    var e = Ea(arguments), {stack:g} = Error();
    const f = Ca(g, 2, !0), k = (g = d instanceof Error) ? d.message : d;
    e = [`Error: ${k}`, ...null !== e && a === e || c ? [b] : [f, b]].join("\n");
    e = Q(e);
    return Object.assign(g ? d : Error(), {message:k, stack:e});
  };
}
;function Ga(a) {
  var {stack:b} = Error();
  const c = Ea(arguments);
  b = Da(b, a);
  return Fa(c, b, a);
}
;const Ha = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class Ia extends ua {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {w:e = Ga(!0), proxyError:g} = a || {}, f = (k, n) => e(n);
    super(d);
    this.g = [];
    this.u = new Promise((k, n) => {
      this.on("finish", () => {
        let h;
        b ? h = Buffer.concat(this.g) : h = this.g.join("");
        k(h);
        this.g = [];
      });
      this.once("error", h => {
        if (-1 == h.stack.indexOf("\n")) {
          f`${h}`;
        } else {
          const m = Q(h.stack);
          h.stack = m;
          g && f`${h}`;
        }
        n(h);
      });
      c && Ha(this, c).pipe(this);
    });
  }
  _write(a, b, c) {
    this.g.push(a);
    c();
  }
  get i() {
    return this.u;
  }
}
const Ja = async a => {
  ({i:a} = new Ia({rs:a, w:Ga(!0)}));
  return await a;
};
async function Ka(a, b) {
  return La(a, b);
}
class Ma extends ta {
  constructor(a, b) {
    super(b);
    this.i = (Array.isArray(a) ? a : [a]).filter(va);
    this.g = !1;
    this.j = b;
  }
  async replace(a, b) {
    const c = new Ma(this.i, this.j);
    b && Object.assign(c, b);
    a = await Ka(c, a);
    c.g && this.brake();
    b && Object.keys(b).forEach(d => {
      b[d] = c[d];
    });
    return a;
  }
  brake() {
    this.g = !0;
  }
  async reduce(a) {
    return await this.i.reduce(async(b, {re:c, replacement:d}) => {
      b = await b;
      if (this.g) {
        return b;
      }
      if ("string" == typeof d) {
        b = b.replace(c, d);
      } else {
        const e = [];
        let g;
        const f = b.replace(c, (k, ...n) => {
          g = Error();
          try {
            if (this.g) {
              return e.length ? e.push(Promise.resolve(k)) : k;
            }
            const h = d.call(this, k, ...n);
            h instanceof Promise && e.push(h);
            return h;
          } catch (h) {
            wa(g, h);
          }
        });
        if (e.length) {
          try {
            const k = await Promise.all(e);
            b = b.replace(c, () => k.shift());
          } catch (k) {
            wa(g, k);
          }
        } else {
          b = f;
        }
      }
      return b;
    }, `${a}`);
  }
  async _transform(a, b, c) {
    try {
      const d = await this.reduce(a);
      this.push(d);
      c();
    } catch (d) {
      a = Q(d.stack), d.stack = a, c(d);
    }
  }
}
async function La(a, b) {
  b instanceof sa ? b.pipe(a) : a.end(b);
  return await Ja(a);
}
;const Na = a => {
  a = `(${a.join("|")})`;
  return new RegExp(`(\\n)?( *)(<${a}${"(?:\\s+(?!\\/>)[^>]*?)?"}(?:\\s*?/>|>[\\s\\S]*?<\\/\\4>))`, "gm");
};
var Oa = tty;
const {format:Pa, inspect:Qa} = util;
/*

 Copyright (c) 2016 Zeit, Inc.
 https://npmjs.org/ms
*/
function Ra(a) {
  var b = {}, c = typeof a;
  if ("string" == c && 0 < a.length) {
    return Sa(a);
  }
  if ("number" == c && isFinite(a)) {
    return b.F ? (b = Math.abs(a), a = 864E5 <= b ? U(a, b, 864E5, "day") : 36E5 <= b ? U(a, b, 36E5, "hour") : 6E4 <= b ? U(a, b, 6E4, "minute") : 1000 <= b ? U(a, b, 1000, "second") : a + " ms") : (b = Math.abs(a), a = 864E5 <= b ? Math.round(a / 864E5) + "d" : 36E5 <= b ? Math.round(a / 36E5) + "h" : 6E4 <= b ? Math.round(a / 6E4) + "m" : 1000 <= b ? Math.round(a / 1000) + "s" : a + "ms"), a;
  }
  throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(a));
}
function Sa(a) {
  a = String(a);
  if (!(100 < a.length) && (a = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(a))) {
    var b = parseFloat(a[1]);
    switch((a[2] || "ms").toLowerCase()) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return 315576E5 * b;
      case "weeks":
      case "week":
      case "w":
        return 6048E5 * b;
      case "days":
      case "day":
      case "d":
        return 864E5 * b;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return 36E5 * b;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return 6E4 * b;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return 1000 * b;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return b;
    }
  }
}
function U(a, b, c, d) {
  return Math.round(a / c) + " " + d + (b >= 1.5 * c ? "s" : "");
}
;/*
 bytes
 Copyright(c) 2012-2014 TJ Holowaychuk
 Copyright(c) 2015 Jed Watson
 MIT Licensed
*/
const Ta = /\B(?=(\d{3})+(?!\d))/g, Ua = /(?:\.0*|(\.[^0]+)0+)$/, V = {b:1, kb:1024, mb:1048576, gb:1073741824, tb:Math.pow(1024, 4), pb:Math.pow(1024, 5)};
function W(a, b) {
  if (!Number.isFinite(a)) {
    return null;
  }
  const c = Math.abs(a), d = b && b.G || "", e = b && b.I || "", g = b && void 0 !== b.v ? b.v : 2, f = !(!b || !b.D);
  (b = b && b.H || "") && V[b.toLowerCase()] || (b = c >= V.pb ? "PB" : c >= V.tb ? "TB" : c >= V.gb ? "GB" : c >= V.mb ? "MB" : c >= V.kb ? "KB" : "B");
  a = (a / V[b.toLowerCase()]).toFixed(g);
  f || (a = a.replace(Ua, "$1"));
  d && (a = a.replace(Ta, d));
  return a + e + b;
}
;/*
 diff package https://github.com/kpdecker/jsdiff
 BSD License
 Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>
*/
const Va = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90};
function X(a, b) {
  return (b = Va[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;var Wa = {f:W, ["fy"](a) {
  return X(W(a) || "", "yellow");
}, ["fr"](a) {
  return X(W(a) || "", "red");
}, ["fb"](a) {
  return X(W(a) || "", "blue");
}, ["fg"](a) {
  return X(W(a) || "", "green");
}, ["fc"](a) {
  return X(W(a) || "", "cyan");
}, ["fm"](a) {
  return X(W(a) || "", "magenta");
}};
const Z = Object.keys(process.env).filter(a => /^debug_/i.test(a)).reduce((a, b) => {
  const c = b.substring(6).toLowerCase().replace(/_([a-z])/g, (d, e) => e.toUpperCase());
  b = process.env[b];
  /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : "null" === b ? b = null : b = Number(b);
  a[c] = b;
  return a;
}, {}), Xa = {init:function(a) {
  a.inspectOpts = {...Z};
}, log:function(...a) {
  return process.stderr.write(Pa(...a) + "\n");
}, formatArgs:function(a) {
  const {namespace:b, useColors:c, color:d, diff:e} = this;
  if (c) {
    const g = "\u001b[3" + (8 > d ? d : "8;5;" + d), f = `  ${g};1m${b} \u001B[0m`;
    a[0] = f + a[0].split("\n").join("\n" + f);
    a.push(g + "m+" + Ra(e) + "\u001b[0m");
  } else {
    a[0] = (Z.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
  }
}, save:function(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}, load:function() {
  return process.env.DEBUG;
}, useColors:function() {
  return "colors" in Z ? !!Z.colors : Oa.isatty(process.stderr.fd);
}, colors:[6, 2, 3, 4, 5, 1], inspectOpts:Z, formatters:{o:function(a) {
  return Qa(a, {...this.inspectOpts, colors:this.useColors}).replace(/\s*\n\s*/g, " ");
}, O:function(a) {
  return Qa(a, {...this.inspectOpts, colors:this.useColors});
}, ...Wa}};
function Ya(a) {
  function b(...f) {
    if (b.enabled) {
      var k = Number(new Date);
      b.diff = k - (g || k);
      b.prev = g;
      g = b.curr = k;
      f[0] = Za(f[0]);
      "string" != typeof f[0] && f.unshift("%O");
      var n = 0;
      f[0] = f[0].replace(/%([a-zA-Z%]+)/g, (h, m) => {
        if ("%%" == h) {
          return h;
        }
        n++;
        if (m = c[m]) {
          h = m.call(b, f[n]), f.splice(n, 1), n--;
        }
        return h;
      });
      d.call(b, f);
      (b.log || e).apply(b, f);
    }
  }
  const c = a.formatters, d = a.formatArgs, e = a.log;
  let g;
  return b;
}
function $a(a) {
  const b = Ya(a);
  "function" == typeof a.init && a.init(b);
  a.g.push(b);
  return b;
}
function ab(a, b) {
  let c = 0;
  for (let d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d), c |= 0;
  }
  return a.colors[Math.abs(c) % a.colors.length];
}
function bb(a) {
  var b = Xa.load();
  a.save(b);
  a.i = [];
  a.j = [];
  let c;
  const d = ("string" == typeof b ? b : "").split(/[\s,]+/), e = d.length;
  for (c = 0; c < e; c++) {
    d[c] && (b = d[c].replace(/\*/g, ".*?"), "-" == b[0] ? a.j.push(new RegExp("^" + b.substr(1) + "$")) : a.i.push(new RegExp("^" + b + "$")));
  }
  for (c = 0; c < a.g.length; c++) {
    b = a.g[c], b.enabled = a.enabled(b.namespace);
  }
}
class cb {
  constructor(a) {
    this.colors = a.colors;
    this.formatArgs = a.formatArgs;
    this.inspectOpts = a.inspectOpts;
    this.log = a.log;
    this.save = a.save;
    this.init = a.init;
    this.formatters = a.formatters || {};
    this.g = [];
    this.i = [];
    this.j = [];
  }
  destroy(a) {
    a = this.g.indexOf(a);
    return -1 !== a ? (this.g.splice(a, 1), !0) : !1;
  }
  enabled(a) {
    if ("*" == a[a.length - 1]) {
      return !0;
    }
    let b, c;
    b = 0;
    for (c = this.j.length; b < c; b++) {
      if (this.j[b].test(a)) {
        return !1;
      }
    }
    b = 0;
    for (c = this.i.length; b < c; b++) {
      if (this.i[b].test(a)) {
        return !0;
      }
    }
    return !1;
  }
}
function Za(a) {
  return a instanceof Error ? a.stack || a.message : a;
}
;const {createWriteStream:db} = fs;
async function eb(a) {
  var b = `export ${fb.toString()}

export ${gb.toString()}

export ${hb.toString()}`;
  if (!a) {
    throw Error("No path is given.");
  }
  const c = Ga(!0), d = db(a);
  await new Promise((e, g) => {
    d.on("error", f => {
      f = c(f);
      g(f);
    }).on("close", e).end(b);
  });
}
;const {join:ib} = path;
const jb = a => {
  const b = Object.keys(a);
  return `{
  ${b.map(c => `${/-/.test(c) ? `'${c}'` : c}: '${`${a[c]}`.replace(/'/g, "\\'")}'`).join(",\n  ")}${b.length ? "," : ""}
}`;
}, kb = a => {
  const b = [];
  b.push(`key: '${a.key}'`);
  b.push(`id: '${a.id}'`);
  Object.keys(a.props).length && b.push(`props: ${jb(a.props)}`);
  a.children.filter(Boolean).length && b.push(`children: ${JSON.stringify(a.children)}`);
  return `{
${b.map(c => c.replace(/^/mg, "  ")).join(",\n") + ","}
}`;
}, lb = a => `/** @type {!Array<!preact.PreactProps>} */
const meta = [${a.map(b => kb(b)).join(",\n")}]`, mb = (a = !0) => a ? `const io = makeIo(${"boolean" != typeof a ? JSON.stringify(a).replace(/([^\\])"([^"]+?)":/g, (b, c, d) => `${"," == c ? ", " : c}${d}: `).replace(/^{/, "{ ").replace(/}$/, " }") : ""})` : "", nb = a => a.replace(/(?:^|-)(.)/g, (b, c) => c.toUpperCase()), ob = a => `const __components = {\n  ${a.map(({key:b}) => `'${b}': ${nb(b)}`).filter((b, c, d) => d.indexOf(b) == c).join(",\n  ")},\n}`, qb = (a, b) => {
  const c = {};
  a.reduce((d, {key:e}) => {
    if (d.includes(e)) {
      return d;
    }
    d.push(e);
    return d;
  }, []).forEach(d => {
    Object.entries(b).forEach(([e, g]) => {
      g = g.indexOf(d);
      0 > g || (c[e] || (c[e] = []), c[e][g] = d);
    });
  });
  return Object.entries(c).map(([d, e]) => pb(e, d));
}, pb = (a, b, c = !0) => {
  let [d, ...e] = a;
  e = e.filter(Boolean);
  a = "import ";
  d && (a += c ? nb(d) : d);
  e.length && (a = a + (d ? ", " : "") + `{ ${(c ? e.map(nb) : e).join(", ")} }`);
  return a + ` from '${b}'`;
}, fb = require("./init"), gb = require("./make-io"), hb = require("./start");
var rb;
rb = function() {
  const a = new cb(Xa);
  return function(b) {
    const c = $a(a);
    c.namespace = b;
    c.useColors = Xa.useColors();
    c.enabled = a.enabled(b);
    c.color = ab(a, b);
    c.destroy = function() {
      a.destroy(this);
    };
    c.extend = function(d, e) {
      d = this.namespace + (void 0 === e ? ":" : e) + d;
      d.log = this.log;
      return d;
    };
    bb(a);
    return c;
  };
}()("competent");
const sb = (a, b) => {
  let c;
  "string" == typeof a ? c = a : Array.isArray(a) ? c = a.map(d => "string" == typeof d ? d : ja(d, b)).join("\n") : c = ja(a, b);
  return c;
}, ub = async({getReplacements:a, key:b, s:c, re:d, replacement:e, getContext:g, m:f, position:k, body:n}) => {
  let h;
  a ? h = a(b, c) : c ? h = {re:tb(d, b), replacement:e} : h = {re:d, replacement:e};
  a = new Ma(h);
  g && (b = g(f, {position:k, key:b}), Object.assign(a, b));
  return await Ka(a, n);
}, tb = (a, b) => new RegExp(a.source.replace(new RegExp(`([|(])${b}([|)])`), (c, d, e) => "|" == d && "|" == e ? "|" : ")" == e ? e : "(" == d ? d : ""), a.flags);
/*

 Competent: Render tags HTML as JSX components.

 Copyright (C) 2019 Art Deco

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
module.exports = {_competent:(a, b = {}) => {
  async function c(u, C, Y, D, l, I, w) {
    rb("render %s", l);
    const T = Error("Skip render");
    try {
      const z = a[l], p = w.slice(0, I), H = w.slice(I + u.length);
      if (/\x3c!--\s*$/.test(p) && /^\s*--\x3e/.test(H)) {
        return u;
      }
      const [{content:G = "", props:B}] = ra(l, D);
      D = [G];
      let F = !1, q = !0, v = !1;
      const x = {pretty:void 0, lineLength:void 0};
      let r, E, O, P;
      const J = e.call(this, {...B, children:D}, {export(t = !0, A) {
        F = t;
        A && (P = Object.entries(A).reduce((M, [N, Aa]) => {
          if (void 0 === Aa) {
            return M;
          }
          M[N] = Aa;
          return M;
        }, {}));
      }, setPretty(t, A) {
        x.pretty = t;
        A && (x.lineLength = A);
      }, renderAgain(t = !0, A = !1) {
        q = t;
        v = A;
      }, setChildContext(t) {
        E = t;
      }, removeLine(t = !0) {
        O = t;
      }, skipRender() {
        throw T;
      }}, l, I, w);
      let R;
      try {
        const t = z.call(this, J);
        R = t instanceof Promise ? await t : t;
      } catch (t) {
        if (!t.message.startsWith("Class constructor")) {
          throw t;
        }
        const A = new z, M = A.serverRender ? A.serverRender(J) : A.render(J);
        R = M instanceof Promise ? await M : M;
        if (A.fileRender) {
          let N = await A.render(J);
          N = sb(N, x);
          q && (N = await ub({getContext:h.bind(this), getReplacements:m.bind(this), key:l, s:v, re:y, replacement:c, m:E, body:N}));
          await A.fileRender(N, J);
        }
      }
      if (F) {
        const t = Array.isArray(R) ? R[0] : R;
        r = t.attributes.id;
        r || (r = d.call(this), t.attributes.id = r);
      }
      let S = sb(R, x);
      if (!S && O) {
        return f && f.call(this, l, B), "";
      }
      S = (C || "") + S.replace(/^/gm, Y);
      q && (S = await ub({getContext:h ? h.bind(this) : void 0, getReplacements:m ? m.bind(this) : void 0, key:l, s:v, re:y, replacement:c, m:E, body:S, position:I}));
      F && g.call(this, l, r, P || B, D);
      f && f.call(this, l, B);
      return S;
    } catch (z) {
      if (z === T) {
        return u;
      }
      k && k.call(this, l, z, I, w);
      return n ? "" : u;
    }
  }
  const {getId:d, getProps:e = (u, C) => ({...u, ...C}), markExported:g, onSuccess:f, onFail:k, removeOnError:n = !1, getContext:h, getReplacements:m} = b, y = Na(Object.keys(a));
  return {re:y, replacement:c};
}, _makeComponentsScript:function(a, b) {
  if ("object" != typeof b) {
    throw Error("Options are required with at least a map.");
  }
  const {map:c, io:d = !1, includeH:e = !1, props:g = {}} = b;
  ({externalAssets:b = !1} = b);
  if (!c) {
    throw Error("The map of where to import components from is required.");
  }
  !0 === b && (b = ".");
  var f = [pb([null, "Component", "render", ...e ? ["h"] : []], "preact", !1), ...b ? [pb([null, ...d ? ["makeIo"] : [], "init", "start"], `${b}/__competent-lib`, !1)] : [], ...qb(a, c)].join("\n");
  const k = Object.keys(g).map(m => `props.${m} = ${g[m]}`).join("\n"), n = d ? "el.render = () => {\n    start(Comp, el, parent, props, children, { render, Component, h })\n  }\n  el.render.meta = { key, id }\n  io.observe(el)" : "start(Comp, el, parent, props, children, { render, Component, h })";
  f += "\n\n";
  const h = ob(a);
  f += h + "\n\n";
  b || (f += fb.toString() + "\n\n", f += hb.toString() + "\n\n", d && (f += gb.toString() + "\n\n"));
  d && (f += mb(d) + "\n\n");
  f += lb(a);
  return f + `
meta.forEach(({ key, id, props = {}, children = [] }) => {
  const { parent, el } = init(id, key)
  const Comp = __components[key]
${k ? `  ${k}` : ""}
  ${n}
})
`;
}, _writeAssets:async a => {
  await eb(ib(a, "./__competent-lib.js"));
}};


//# sourceMappingURL=competent.js.map