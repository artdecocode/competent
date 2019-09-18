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
;const fa = (a, b, {allAttributes:c, xml:d, w:e, sort:f, l:g} = {}) => {
  let k;
  const p = Object.keys(a);
  f && p.sort();
  return {A:p.map(h => {
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
            null != D && (t && (t += " "), t += da[w] || (da[w] = w.replace(/([A-Z])/g, "-$1").toLowerCase()), t += ": ", t += D, "number" == typeof D && !1 === aa.test(w) && (t += "px"), t += ";");
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
  }).filter(Boolean), v:k, l:g};
};
const K = [], ha = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/, ia = /^(a|abbr|acronym|audio|b|bdi|bdo|big|br|button|canvas|cite|code|data|datalist|del|dfn|em|embed|i|iframe|img|input|ins|kbd|label|map|mark|meter|noscript|object|output|picture|progress|q|ruby|s|samp|slot|small|span|strong|sub|sup|svg|template|textarea|time|u|tt|var|video|wbr)$/, ja = (a, b = {}) => {
  const {addDoctype:c, pretty:d} = b;
  a = L(a, b, {});
  return c ? `<!doctype html>${d ? "\n" : ""}${a}` : a;
};
function L(a, b = {}, c = {}, d = !1, e = !1, f) {
  if (null == a || "boolean" == typeof a) {
    return "";
  }
  const {pretty:g = !1, shallow:k = !1, renderRootComponent:p = !1, shallowHighOrder:h = !1, sortAttributes:m, allAttributes:w, xml:t, initialPadding:D = 0, closeVoidTags:X = !1} = b;
  let {lineLength:E = 40} = b;
  E -= D;
  let {nodeName:l, attributes:P = {}} = a;
  var x = ["textarea", "pre"].includes(l);
  const Q = " ".repeat(D), y = "string" == typeof g ? g : `  ${Q}`;
  if ("object" != typeof a && !l) {
    return ba(a);
  }
  if ("function" == typeof l) {
    if (!k || !d && p) {
      return x = ea(a), l.prototype && "function" == typeof l.prototype.render ? (a = new l(x, c), a._disable = a.__x = !0, a.props = x, a.context = c, l.getDerivedStateFromProps ? a.state = {...a.state, ...l.getDerivedStateFromProps(a.props, a.state)} : a.componentWillMount && a.componentWillMount(), x = a.render(a.props, a.state, a.context), a.getChildContext && (c = {...c, ...a.getChildContext()})) : x = l(x, c), L(x, b, c, h, e, f);
    }
    l = l.displayName || l !== Function && l.name || ka(l);
  }
  let q = "";
  ({A:J, v:d, l:f} = fa(P, l, {allAttributes:w, xml:t, w:e, sort:m, l:f}));
  if (g) {
    let A = `<${l}`.length;
    q = J.reduce((G, r) => {
      const v = A + 1 + r.length;
      if (v > E) {
        return A = y.length, `${G}\n${y}${r}`;
      }
      A = v;
      return `${G} ${r}`;
    }, "");
  } else {
    q = J.length ? " " + J.join(" ") : "";
  }
  q = `<${l}${q}>`;
  if (`${l}`.match(/[\s\n\\/='"\0<>]/)) {
    throw q;
  }
  var J = `${l}`.match(ha);
  X && J && (q = q.replace(/>$/, " />"));
  let H = [];
  if (d) {
    !x && g && (ca(d) || d.length + la(q) > E) && (d = "\n" + y + `${d}`.replace(/(\n+)/g, "$1" + (y || "\t"))), q += d;
  } else {
    if (a.children) {
      let A = g && q.includes("\n");
      const G = [];
      H = a.children.map((r, v) => {
        if (null != r && !1 !== r) {
          var z = L(r, b, c, !0, "svg" == l ? !0 : "foreignObject" == l ? !1 : e, f);
          if (z) {
            g && z.length + la(q) > E && (A = !0);
            var u = z.replace(new RegExp(`</${r.nodeName}>$`), "");
            ma(r.nodeName, u) && (G[v] = z.length);
            return z;
          }
        }
      }).filter(Boolean);
      g && A && !x && (H = H.reduce((r, v, z) => {
        var u = (z = G[z - 1]) && /^<([\s\S]+?)>/.exec(v);
        u && ([, u] = u, u = !ia.test(u));
        if (z && !u) {
          u = /[^<]*?(\s)/y;
          var B;
          let M = !0, N;
          for (; null !== (B = u.exec(v));) {
            const [R] = B;
            [, N] = B;
            u.lastIndex + R.length - 1 > E - (M ? z : 0) && (B = v.slice(0, u.lastIndex - 1), v = v.slice(u.lastIndex), M ? (r.push(B), M = !1) : r.push("\n" + y + `${B}`.replace(/(\n+)/g, "$1" + (y || "\t"))), u.lastIndex = 0);
          }
          N && r.push(N);
          r.push(v);
        } else {
          r.push("\n" + y + `${v}`.replace(/(\n+)/g, "$1" + (y || "\t")));
        }
        return r;
      }, []));
    }
  }
  if (H.length) {
    q += H.join("");
  } else {
    if (t) {
      return q.substring(0, q.length - 1) + " />";
    }
  }
  J || (!ma(l, H[H.length - 1]) && !x && g && q.includes("\n") && (q += `\n${Q}`), q += `</${l}>`);
  return q;
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
  b.replace(a, (e, ...f) => {
    e = f.slice(0, f.length - 2).reduce((g, k, p) => {
      p = c[p];
      if (!p || void 0 === k) {
        return g;
      }
      g[p] = k;
      return g;
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
const za = /\s+at.*(?:\(|\s)(.*)\)?/, Aa = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Ba = ya(), O = a => {
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
    e = O(e);
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
class Ha extends ua {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {u:e = S(!0), proxyError:f} = a || {}, g = (k, p) => e(p);
    super(d);
    this.g = [];
    this.m = new Promise((k, p) => {
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
          const m = O(h.stack);
          h.stack = m;
          f && g`${h}`;
        }
        p(h);
      });
      c && Ga(this, c).pipe(this);
    });
  }
  _write(a, b, c) {
    this.g.push(a);
    c();
  }
  get i() {
    return this.m;
  }
}
const Ia = async a => {
  ({i:a} = new Ha({rs:a, u:S(!0)}));
  return await a;
};
async function Ja(a, b) {
  return Ka(a, b);
}
class La extends ta {
  constructor(a, b) {
    super(b);
    this.i = (Array.isArray(a) ? a : [a]).filter(va);
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
        const g = b.replace(c, (k, ...p) => {
          f = Error();
          try {
            if (this.g) {
              return e.length ? e.push(Promise.resolve(k)) : k;
            }
            const h = d.call(this, k, ...p);
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
      a = O(d.stack), d.stack = a, c(d);
    }
  }
}
async function Ka(a, b) {
  b instanceof sa ? b.pipe(a) : a.end(b);
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
    return b.C ? (b = Math.abs(a), a = 864E5 <= b ? U(a, b, 864E5, "day") : 36E5 <= b ? U(a, b, 36E5, "hour") : 6E4 <= b ? U(a, b, 6E4, "minute") : 1000 <= b ? U(a, b, 1000, "second") : a + " ms") : (b = Math.abs(a), a = 864E5 <= b ? Math.round(a / 864E5) + "d" : 36E5 <= b ? Math.round(a / 36E5) + "h" : 6E4 <= b ? Math.round(a / 6E4) + "m" : 1000 <= b ? Math.round(a / 1000) + "s" : a + "ms"), a;
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
  const c = Math.abs(a), d = b && b.D || "", e = b && b.G || "", f = b && void 0 !== b.s ? b.s : 2, g = !(!b || !b.B);
  (b = b && b.F || "") && V[b.toLowerCase()] || (b = c >= V.pb ? "PB" : c >= V.tb ? "TB" : c >= V.gb ? "GB" : c >= V.mb ? "MB" : c >= V.kb ? "KB" : "B");
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
      var p = 0;
      g[0] = g[0].replace(/%([a-zA-Z%]+)/g, (h, m) => {
        if ("%%" == h) {
          return h;
        }
        p++;
        if (m = c[m]) {
          h = m.call(b, g[p]), g.splice(p, 1), p--;
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
const qb = (a, b) => new RegExp(a.source.replace(new RegExp(`([|(])${b}([|)])`), (c, d, e) => "|" == d && "|" == e ? "|" : ")" == e ? e : "(" == d ? d : ""), a.flags);
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
  async function c(t, D, X, E, l, P, x) {
    pb("render %s", l);
    const Q = Error("Skip render");
    try {
      const y = a[l], q = x.slice(0, P), J = x.slice(P + t.length);
      if (/\x3c!--\s*$/.test(q) && /^\s*--\x3e/.test(J)) {
        return t;
      }
      const [{content:H = "", props:A}] = ra(l, E);
      E = [H];
      let G = !1, r = !0, v = !1, z, u, B, M, N;
      const R = e.call(this, {...A, children:E}, {export(n = !0) {
        G = n;
      }, setPretty(n, C) {
        z = n;
        C && (u = C);
      }, renderAgain(n = !0, C = !1) {
        r = n;
        v = C;
      }, setChildContext(n) {
        M = n;
      }, removeLine(n = !0) {
        N = n;
      }, skipRender() {
        throw Q;
      }}, l);
      let F;
      try {
        const n = y.call(this, R);
        F = n instanceof Promise ? await n : n;
      } catch (n) {
        if (!n.message.startsWith("Class constructor")) {
          throw n;
        }
        const C = new y, T = C.serverRender ? C.serverRender(R) : C.render(R);
        F = T instanceof Promise ? await T : T;
      }
      if (G) {
        const n = Array.isArray(F) ? F[0] : F;
        n.attributes.id ? B = n.attributes.id : (B = d.call(this), n.attributes.id = B);
      }
      const wa = {pretty:z, lineLength:u};
      let I;
      "string" == typeof F ? I = F : Array.isArray(F) ? I = F.map(n => "string" == typeof n ? n : ja(n, wa)).join("\n") : I = ja(F, wa);
      if (!I && N) {
        return g && g.call(this, l, A), "";
      }
      I = (D || "") + I.replace(/^/gm, X);
      if (r) {
        let n;
        m ? n = m.call(this, l, v) : v ? n = {re:qb(w, l), replacement:c} : n = {re:w, replacement:c};
        const C = new La(n);
        if (h) {
          const T = h.call(this, M);
          Object.assign(C, T);
        }
        I = await Ja(C, I);
      }
      G && f.call(this, l, B, A, E);
      g && g.call(this, l, A);
      return I;
    } catch (y) {
      if (y === Q) {
        return t;
      }
      k && k.call(this, l, y, P, x);
      return p ? "" : t;
    }
  }
  const {getId:d, getProps:e = (t, D) => ({...t, ...D}), markExported:f, onSuccess:g, onFail:k, removeOnError:p = !1, getContext:h, getReplacements:m} = b, w = Ma(Object.keys(a));
  return {re:w, replacement:c};
}, _makeComponentsScript:function(a, b) {
  if ("object" != typeof b) {
    throw Error("Options are required with at least a map.");
  }
  const {map:c, externalAssets:d = !1, io:e = !1, includeH:f = !1, props:g = {}} = b;
  if (!c) {
    throw Error("The map of where to import components from is required.");
  }
  var k = [nb([null, "render", ...f ? ["h"] : []], "preact", !1), ...d ? [nb([null, ...e ? ["makeIo"] : [], "init"], "./__competent-lib", !1)] : [], ...ob(a, c)].join("\n");
  b = Object.keys(g).map(m => `props.${m} = ${g[m]}`).join("\n");
  const p = e ? "el.render = () => {\n    if (Comp.load) {\n      Comp.load((err, data) => {\n        if (data) Object.assign(props, data)\n        if (!err) render(h(Comp, props, children), parent, el)\n      }, el, props)\n    } else render(h(Comp, props, children), parent, el)\n  }\n  el.render.meta = { key, id }\n  io.observe(el)" : "if (Comp.load) {\n      Comp.load((err, data) => {\n        if (data) Object.assign(props, data)\n        if (!err) render(h(Comp, props, children), parent, el)\n      }, el, props)\n    } else render(h(Comp, props, children), parent, el)";
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
  ${p}
})
`;
}, _writeAssets:async a => {
  await db(gb(a, "./__competent-lib.js"));
}};


//# sourceMappingURL=competent.js.map