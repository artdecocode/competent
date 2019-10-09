#!/usr/bin/env node
             
const stream = require('stream');
const os = require('os');
const tty = require('tty');
const util = require('util');
const path = require('path');
const fs = require('fs');             
const aa = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
let ba = a => `${a}`.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), ca = a => 40 < `${a}`.length || -1 != `${a}`.indexOf("\n") || -1 !== `${a}`.indexOf("<");
const ea = {};
function fa(a) {
  const b = {...a.attributes, children:a.children};
  a = a.nodeName.defaultProps;
  if (void 0 !== a) {
    for (let c in a) {
      void 0 === b[c] && (b[c] = a[c]);
    }
  }
  return b;
}
;const ha = (a, b, {allAttributes:c, xml:d, B:e, sort:f, l:g} = {}) => {
  let k;
  const n = Object.keys(a);
  f && n.sort();
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
          let t = "";
          for (var w in m) {
            let D = m[w];
            null != D && (t && (t += " "), t += ea[w] || (ea[w] = w.replace(/([A-Z])/g, "-$1").toLowerCase()), t += ": ", t += D, "number" == typeof D && !1 === aa.test(w) && (t += "px"), t += ";");
          }
          m = t || void 0;
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
          w = "";
          if ("value" == h) {
            if ("select" == b) {
              g = m;
              return;
            }
            "option" == b && g == m && (w = "selected ");
          }
          return `${w}${h}="${ba(m)}"`;
        }
      }
    }
  }).filter(Boolean), A:k, l:g};
};
const K = [], ia = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/, ja = /^(a|abbr|acronym|audio|b|bdi|bdo|big|br|button|canvas|cite|code|data|datalist|del|dfn|em|embed|i|iframe|img|input|ins|kbd|label|map|mark|meter|noscript|object|output|picture|progress|q|ruby|s|samp|slot|small|span|strong|sub|sup|svg|template|textarea|time|u|tt|var|video|wbr)$/, ka = (a, b = {}) => {
  const {addDoctype:c, pretty:d} = b;
  a = L(a, b, {});
  return c ? `<!doctype html>${d ? "\n" : ""}${a}` : a;
};
function L(a, b = {}, c = {}, d = !1, e = !1, f) {
  if (null == a || "boolean" == typeof a) {
    return "";
  }
  const {pretty:g = !1, shallow:k = !1, renderRootComponent:n = !1, shallowHighOrder:h = !1, sortAttributes:m, allAttributes:w, xml:t, initialPadding:D = 0, closeVoidTags:X = !1} = b;
  let {lineLength:E = 40} = b;
  E -= D;
  let {nodeName:l, attributes:Q = {}} = a;
  var x = ["textarea", "pre"].includes(l);
  const R = " ".repeat(D), y = "string" == typeof g ? g : `  ${R}`;
  if ("object" != typeof a && !l) {
    return ba(a);
  }
  if ("function" == typeof l) {
    if (!k || !d && n) {
      return x = fa(a), l.prototype && "function" == typeof l.prototype.render ? (a = new l(x, c), a._disable = a.__x = !0, a.props = x, a.context = c, l.getDerivedStateFromProps ? a.state = {...a.state, ...l.getDerivedStateFromProps(a.props, a.state)} : a.componentWillMount && a.componentWillMount(), x = a.render(a.props, a.state, a.context), a.getChildContext && (c = {...c, ...a.getChildContext()})) : x = l(x, c), L(x, b, c, h, e, f);
    }
    l = l.displayName || l !== Function && l.name || la(l);
  }
  let p = "";
  ({C:H, A:d, l:f} = ha(Q, l, {allAttributes:w, xml:t, B:e, sort:m, l:f}));
  if (g) {
    let B = `<${l}`.length;
    p = H.reduce((F, q) => {
      const v = B + 1 + q.length;
      if (v > E) {
        return B = y.length, `${F}\n${y}${q}`;
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
  var H = `${l}`.match(ia);
  X && H && (p = p.replace(/>$/, " />"));
  let G = [];
  if (d) {
    !x && g && (ca(d) || d.length + ma(p) > E) && (d = "\n" + y + `${d}`.replace(/(\n+)/g, "$1" + (y || "\t"))), p += d;
  } else {
    if (a.children) {
      let B = g && p.includes("\n");
      const F = [];
      G = a.children.map((q, v) => {
        if (null != q && !1 !== q) {
          var z = L(q, b, c, !0, "svg" == l ? !0 : "foreignObject" == l ? !1 : e, f);
          if (z) {
            g && z.length + ma(p) > E && (B = !0);
            var u = z.replace(new RegExp(`</${q.nodeName}>$`), "");
            na(q.nodeName, u) && (F[v] = z.length);
            return z;
          }
        }
      }).filter(Boolean);
      g && B && !x && (G = G.reduce((q, v, z) => {
        var u = (z = F[z - 1]) && /^<([\s\S]+?)>/.exec(v);
        u && ([, u] = u, u = !ja.test(u));
        if (z && !u) {
          u = /[^<]*?(\s)/y;
          var A;
          let I = !0, M;
          for (; null !== (A = u.exec(v));) {
            const [J] = A;
            [, M] = A;
            u.lastIndex + J.length - 1 > E - (I ? z : 0) && (A = v.slice(0, u.lastIndex - 1), v = v.slice(u.lastIndex), I ? (q.push(A), I = !1) : q.push("\n" + y + `${A}`.replace(/(\n+)/g, "$1" + (y || "\t"))), u.lastIndex = 0);
          }
          M && q.push(M);
          q.push(v);
        } else {
          q.push("\n" + y + `${v}`.replace(/(\n+)/g, "$1" + (y || "\t")));
        }
        return q;
      }, []));
    }
  }
  if (G.length) {
    p += G.join("");
  } else {
    if (t) {
      return p.substring(0, p.length - 1) + " />";
    }
  }
  H || (!na(l, G[G.length - 1]) && !x && g && p.includes("\n") && (p += `\n${R}`), p += `</${l}>`);
  return p;
}
const na = (a, b) => `${a}`.match(ja) && (b ? !/>$/.test(b) : !0);
function la(a) {
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
const ma = a => {
  a = a.split("\n");
  return a[a.length - 1].length;
};
function oa(a, b, c) {
  const d = [];
  b.replace(a, (e, ...f) => {
    e = f.slice(0, f.length - 2).reduce((g, k, n) => {
      n = c[n];
      if (!n || void 0 === k) {
        return g;
      }
      g[n] = k;
      return g;
    }, {});
    d.push(e);
  });
  return d;
}
;const pa = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), qa = new RegExp(`(?:\\s+((?:${pa.source}\\s*)*))`);
const sa = (a, b) => {
  a = (Array.isArray(a) ? a : [a]).join("|");
  return oa(new RegExp(`<(${a})${qa.source}?(?:${/\s*\/>/.source}|${/>([\s\S]+?)?<\/\1>/.source})`, "g"), b, "t a v v1 v2 c".split(" ")).map(({t:c, a:d = "", c:e = ""}) => {
    d = d.replace(/\/$/, "").trim();
    d = ra(d);
    return {content:e, props:d, tag:c};
  });
}, ra = a => oa(pa, a, ["key", "val", "def", "f"]).reduce((b, {key:c, val:d}) => {
  if (void 0 === d) {
    return b[c] = !0, b;
  }
  b[c] = "true" == d ? !0 : "false" == d ? !1 : /^\d+$/.test(d) ? parseInt(d, 10) : d;
  return b;
}, {});
var ta = stream;
const {Transform:ua, Writable:va} = stream;
function wa(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const {re:b, replacement:c} = a;
  a = b instanceof RegExp;
  const d = -1 != ["string", "function"].indexOf(typeof c);
  return a && d;
}
const xa = (a, b) => {
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
const {homedir:ya} = os;
const za = /\s+at.*(?:\(|\s)(.*)\)?/, Aa = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Ba = ya(), N = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(Aa.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(za);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => b ? f.replace(za, (g, k) => g.replace(k, k.replace(Ba, "~"))) : f).join("\n");
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
    var e = Ea(arguments), {stack:f} = Error();
    const g = Ca(f, 2, !0), k = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${k}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = N(e);
    return Object.assign(f ? d : Error(), {message:k, stack:e});
  };
}
;function S(a) {
  var {stack:b} = Error();
  const c = Ea(arguments);
  b = Da(b, a);
  return Fa(c, b, a);
}
;const Ga = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class Ha extends va {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {w:e = S(!0), proxyError:f} = a || {}, g = (k, n) => e(n);
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
          g`${h}`;
        } else {
          const m = N(h.stack);
          h.stack = m;
          f && g`${h}`;
        }
        n(h);
      });
      c && Ga(this, c).pipe(this);
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
const Ia = async a => {
  ({i:a} = new Ha({rs:a, w:S(!0)}));
  return await a;
};
async function Ja(a, b) {
  return Ka(a, b);
}
class La extends ua {
  constructor(a, b) {
    super(b);
    this.i = (Array.isArray(a) ? a : [a]).filter(wa);
    this.g = !1;
    this.j = b;
  }
  async replace(a, b) {
    const c = new La(this.i, this.j);
    b && Object.assign(c, b);
    a = await Ja(c, a);
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
        let f;
        const g = b.replace(c, (k, ...n) => {
          f = Error();
          try {
            if (this.g) {
              return e.length ? e.push(Promise.resolve(k)) : k;
            }
            const h = d.call(this, k, ...n);
            h instanceof Promise && e.push(h);
            return h;
          } catch (h) {
            xa(f, h);
          }
        });
        if (e.length) {
          try {
            const k = await Promise.all(e);
            b = b.replace(c, () => k.shift());
          } catch (k) {
            xa(f, k);
          }
        } else {
          b = g;
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
      a = N(d.stack), d.stack = a, c(d);
    }
  }
}
async function Ka(a, b) {
  b instanceof ta ? b.pipe(a) : a.end(b);
  return await Ia(a);
}
;const Ma = a => {
  a = `(${a.join("|")})`;
  return new RegExp(`(\\n)?( *)(<${a}${"(?:\\s+(?!\\/>)[^>]*?)?"}(?:\\s*?/>|>[\\s\\S]*?<\\/\\4>))`, "gm");
};
var Na = tty;
const {format:Oa, inspect:Pa} = util;
/*

 Copyright (c) 2016 Zeit, Inc.
 https://npmjs.org/ms
*/
function Qa(a) {
  var b = {}, c = typeof a;
  if ("string" == c && 0 < a.length) {
    return Ra(a);
  }
  if ("number" == c && isFinite(a)) {
    return b.F ? (b = Math.abs(a), a = 864E5 <= b ? U(a, b, 864E5, "day") : 36E5 <= b ? U(a, b, 36E5, "hour") : 6E4 <= b ? U(a, b, 6E4, "minute") : 1000 <= b ? U(a, b, 1000, "second") : a + " ms") : (b = Math.abs(a), a = 864E5 <= b ? Math.round(a / 864E5) + "d" : 36E5 <= b ? Math.round(a / 36E5) + "h" : 6E4 <= b ? Math.round(a / 6E4) + "m" : 1000 <= b ? Math.round(a / 1000) + "s" : a + "ms"), a;
  }
  throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(a));
}
function Ra(a) {
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
const Sa = /\B(?=(\d{3})+(?!\d))/g, Ta = /(?:\.0*|(\.[^0]+)0+)$/, V = {b:1, kb:1024, mb:1048576, gb:1073741824, tb:Math.pow(1024, 4), pb:Math.pow(1024, 5)};
function W(a, b) {
  if (!Number.isFinite(a)) {
    return null;
  }
  const c = Math.abs(a), d = b && b.G || "", e = b && b.I || "", f = b && void 0 !== b.v ? b.v : 2, g = !(!b || !b.D);
  (b = b && b.H || "") && V[b.toLowerCase()] || (b = c >= V.pb ? "PB" : c >= V.tb ? "TB" : c >= V.gb ? "GB" : c >= V.mb ? "MB" : c >= V.kb ? "KB" : "B");
  a = (a / V[b.toLowerCase()]).toFixed(f);
  g || (a = a.replace(Ta, "$1"));
  d && (a = a.replace(Sa, d));
  return a + e + b;
}
;/*
 diff package https://github.com/kpdecker/jsdiff
 BSD License
 Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>
*/
const Ua = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90};
function Y(a, b) {
  return (b = Ua[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;var Va = {f:W, ["fy"](a) {
  return Y(W(a) || "", "yellow");
}, ["fr"](a) {
  return Y(W(a) || "", "red");
}, ["fb"](a) {
  return Y(W(a) || "", "blue");
}, ["fg"](a) {
  return Y(W(a) || "", "green");
}, ["fc"](a) {
  return Y(W(a) || "", "cyan");
}, ["fm"](a) {
  return Y(W(a) || "", "magenta");
}};
const Z = Object.keys(process.env).filter(a => /^debug_/i.test(a)).reduce((a, b) => {
  const c = b.substring(6).toLowerCase().replace(/_([a-z])/g, (d, e) => e.toUpperCase());
  b = process.env[b];
  /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : "null" === b ? b = null : b = Number(b);
  a[c] = b;
  return a;
}, {}), Wa = {init:function(a) {
  a.inspectOpts = {...Z};
}, log:function(...a) {
  return process.stderr.write(Oa(...a) + "\n");
}, formatArgs:function(a) {
  const {namespace:b, useColors:c, color:d, diff:e} = this;
  if (c) {
    const f = "\u001b[3" + (8 > d ? d : "8;5;" + d), g = `  ${f};1m${b} \u001B[0m`;
    a[0] = g + a[0].split("\n").join("\n" + g);
    a.push(f + "m+" + Qa(e) + "\u001b[0m");
  } else {
    a[0] = (Z.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
  }
}, save:function(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}, load:function() {
  return process.env.DEBUG;
}, useColors:function() {
  return "colors" in Z ? !!Z.colors : Na.isatty(process.stderr.fd);
}, colors:[6, 2, 3, 4, 5, 1], inspectOpts:Z, formatters:{o:function(a) {
  return Pa(a, {...this.inspectOpts, colors:this.useColors}).replace(/\s*\n\s*/g, " ");
}, O:function(a) {
  return Pa(a, {...this.inspectOpts, colors:this.useColors});
}, ...Va}};
function Xa(a) {
  function b(...g) {
    if (b.enabled) {
      var k = Number(new Date);
      b.diff = k - (f || k);
      b.prev = f;
      f = b.curr = k;
      g[0] = Ya(g[0]);
      "string" != typeof g[0] && g.unshift("%O");
      var n = 0;
      g[0] = g[0].replace(/%([a-zA-Z%]+)/g, (h, m) => {
        if ("%%" == h) {
          return h;
        }
        n++;
        if (m = c[m]) {
          h = m.call(b, g[n]), g.splice(n, 1), n--;
        }
        return h;
      });
      d.call(b, g);
      (b.log || e).apply(b, g);
    }
  }
  const c = a.formatters, d = a.formatArgs, e = a.log;
  let f;
  return b;
}
function Za(a) {
  const b = Xa(a);
  "function" == typeof a.init && a.init(b);
  a.g.push(b);
  return b;
}
function $a(a, b) {
  let c = 0;
  for (let d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d), c |= 0;
  }
  return a.colors[Math.abs(c) % a.colors.length];
}
function ab(a) {
  var b = Wa.load();
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
class bb {
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
function Ya(a) {
  return a instanceof Error ? a.stack || a.message : a;
}
;const {createWriteStream:cb} = fs;
async function db(a) {
  var b = `export ${eb.toString()}

export ${fb.toString()}`;
  if (!a) {
    throw Error("No path is given.");
  }
  const c = S(!0), d = cb(a);
  await new Promise((e, f) => {
    d.on("error", g => {
      g = c(g);
      f(g);
    }).on("close", e).end(b);
  });
}
;const {join:gb} = path;
const hb = a => {
  const b = Object.keys(a);
  return `{
  ${b.map(c => `${/-/.test(c) ? `'${c}'` : c}: '${`${a[c]}`.replace(/'/g, "\\'")}'`).join(",\n  ")}${b.length ? "," : ""}
}`;
}, ib = a => {
  const b = [];
  b.push(`key: '${a.key}'`);
  b.push(`id: '${a.id}'`);
  Object.keys(a.props).length && b.push(`props: ${hb(a.props)}`);
  a.children.filter(Boolean).length && b.push(`children: ${JSON.stringify(a.children)}`);
  return `{
${b.map(c => c.replace(/^/mg, "  ")).join(",\n") + ","}
}`;
}, jb = a => `/** @type {!Array<!preact.PreactProps>} */
const meta = [${a.map(b => ib(b)).join(",\n")}]`, kb = (a = !0) => a ? `const io = makeIo(${"boolean" != typeof a ? JSON.stringify(a).replace(/([^\\])"([^"]+?)":/g, (b, c, d) => `${"," == c ? ", " : c}${d}: `).replace(/^{/, "{ ").replace(/}$/, " }") : ""})` : "", lb = a => a.replace(/(?:^|-)(.)/g, (b, c) => c.toUpperCase()), mb = a => `const __components = {\n  ${a.map(({key:b}) => `'${b}': ${lb(b)}`).filter((b, c, d) => d.indexOf(b) == c).join(",\n  ")},\n}`, ob = (a, b) => {
  const c = {};
  a.reduce((d, {key:e}) => {
    if (d.includes(e)) {
      return d;
    }
    d.push(e);
    return d;
  }, []).forEach(d => {
    Object.entries(b).forEach(([e, f]) => {
      f = f.indexOf(d);
      0 > f || (c[e] || (c[e] = []), c[e][f] = d);
    });
  });
  return Object.entries(c).map(([d, e]) => nb(e, d));
}, nb = (a, b, c = !0) => {
  let [d, ...e] = a;
  e = e.filter(Boolean);
  a = "import ";
  d && (a += c ? lb(d) : d);
  e.length && (a = a + (d ? ", " : "") + `{ ${(c ? e.map(lb) : e).join(", ")} }`);
  return a + ` from '${b}'`;
}, eb = require("./init"), fb = require("./make-io");
var pb;
pb = function() {
  const a = new bb(Wa);
  return function(b) {
    const c = Za(a);
    c.namespace = b;
    c.useColors = Wa.useColors();
    c.enabled = a.enabled(b);
    c.color = $a(a, b);
    c.destroy = function() {
      a.destroy(this);
    };
    c.extend = function(d, e) {
      d = this.namespace + (void 0 === e ? ":" : e) + d;
      d.log = this.log;
      return d;
    };
    ab(a);
    return c;
  };
}()("competent");
const qb = (a, b) => {
  let c;
  "string" == typeof a ? c = a : Array.isArray(a) ? c = a.map(d => "string" == typeof d ? d : ka(d, b)).join("\n") : c = ka(a, b);
  return c;
}, sb = async({getReplacements:a, key:b, s:c, re:d, replacement:e, getContext:f, m:g, body:k}) => {
  let n;
  a ? n = a(b, c) : c ? n = {re:rb(d, b), replacement:e} : n = {re:d, replacement:e};
  a = new La(n);
  f && (f = f(g), Object.assign(a, f));
  return await Ja(a, k);
}, rb = (a, b) => new RegExp(a.source.replace(new RegExp(`([|(])${b}([|)])`), (c, d, e) => "|" == d && "|" == e ? "|" : ")" == e ? e : "(" == d ? d : ""), a.flags);
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
  async function c(t, D, X, E, l, Q, x) {
    pb("render %s", l);
    const R = Error("Skip render");
    try {
      const p = a[l];
      var y = x.slice(0, Q);
      const H = x.slice(Q + t.length);
      if (/\x3c!--\s*$/.test(y) && /^\s*--\x3e/.test(H)) {
        return t;
      }
      const [{content:G = "", props:B}] = sa(l, E);
      E = [G];
      let F = !1, q = !0, v = !1, z, u, A, I, M;
      const J = e.call(this, {...B, children:E}, {export(r = !0) {
        F = r;
      }, setPretty(r, C) {
        z = r;
        C && (u = C);
      }, renderAgain(r = !0, C = !1) {
        q = r;
        v = C;
      }, setChildContext(r) {
        I = r;
      }, removeLine(r = !0) {
        M = r;
      }, skipRender() {
        throw R;
      }}, l);
      y = {pretty:z, lineLength:u};
      let O;
      try {
        const r = p.call(this, J);
        O = r instanceof Promise ? await r : r;
      } catch (r) {
        if (!r.message.startsWith("Class constructor")) {
          throw r;
        }
        const C = new p, da = C.serverRender ? C.serverRender(J) : C.render(J);
        O = da instanceof Promise ? await da : da;
        if (C.fileRender) {
          let T = await C.render(J);
          T = qb(T, y);
          q && (T = await sb({getContext:h.bind(this), getReplacements:m.bind(this), key:l, s:v, re:w, replacement:c, m:I, body:T}));
          await C.fileRender(T, J);
        }
      }
      if (F) {
        const r = Array.isArray(O) ? O[0] : O;
        A = r.attributes.id;
        A || (A = d.call(this), r.attributes.id = A);
      }
      let P = qb(O, y);
      if (!P && M) {
        return g && g.call(this, l, B), "";
      }
      P = (D || "") + P.replace(/^/gm, X);
      q && (P = await sb({getContext:h ? h.bind(this) : void 0, getReplacements:m ? m.bind(this) : void 0, key:l, s:v, re:w, replacement:c, m:I, body:P}));
      F && f.call(this, l, A, B, E);
      g && g.call(this, l, B);
      return P;
    } catch (p) {
      if (p === R) {
        return t;
      }
      k && k.call(this, l, p, Q, x);
      return n ? "" : t;
    }
  }
  const {getId:d, getProps:e = (t, D) => ({...t, ...D}), markExported:f, onSuccess:g, onFail:k, removeOnError:n = !1, getContext:h, getReplacements:m} = b, w = Ma(Object.keys(a));
  return {re:w, replacement:c};
}, _makeComponentsScript:function(a, b) {
  if ("object" != typeof b) {
    throw Error("Options are required with at least a map.");
  }
  const {map:c, externalAssets:d = !1, io:e = !1, includeH:f = !1, props:g = {}} = b;
  if (!c) {
    throw Error("The map of where to import components from is required.");
  }
  var k = [nb([null, "Component", "render", ...f ? ["h"] : []], "preact", !1), ...d ? [nb([null, ...e ? ["makeIo"] : [], "init"], "./__competent-lib", !1)] : [], ...ob(a, c)].join("\n");
  b = Object.keys(g).map(m => `props.${m} = ${g[m]}`).join("\n");
  const n = e ? "el.render = () => {\n    const r = () => {\n      if (!Component.isPrototypeOf(Comp)) {\n        const comp = new Comp(el, parent)\n        comp.render({ ...props, children })\n      } else render(h(Comp, props, children), parent, el)\n    }\n    if (Comp.load) {\n      Comp.load((err, data) => {\n        if (data) Object.assign(props, data)\n        if (!err) r()\n      }, el, props)\n    } else r()\n  }\n  el.render.meta = { key, id }\n  io.observe(el)" : "const r = () => {\n      if (!Component.isPrototypeOf(Comp)) {\n        const comp = new Comp(el, parent)\n        comp.render({ ...props, children })\n      } else render(h(Comp, props, children), parent, el)\n    }\n    if (Comp.load) {\n      Comp.load((err, data) => {\n        if (data) Object.assign(props, data)\n        if (!err) r()\n      }, el, props)\n    } else r()";
  k += "\n\n";
  const h = mb(a);
  k += h + "\n\n";
  d || (k += eb.toString() + "\n\n", e && (k += fb.toString() + "\n\n"));
  e && (k += kb(e) + "\n\n");
  k += jb(a);
  return k + `
meta.forEach(({ key, id, props = {}, children = [] }) => {
  const { parent, el } = init(id, key)
  const Comp = __components[key]
${b ? `  ${b}` : ""}
  ${n}
})
`;
}, _writeAssets:async a => {
  await db(gb(a, "./__competent-lib.js"));
}};


//# sourceMappingURL=competent.js.map