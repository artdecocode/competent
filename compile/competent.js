#!/usr/bin/env node
             
const stream = require('stream');
const os = require('os');
const tty = require('tty');
const util = require('util');
const path = require('path');
const fs = require('fs');             
const aa = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
let G = a => `${a}`.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), ba = a => 40 < `${a}`.length || -1 != `${a}`.indexOf("\n") || -1 !== `${a}`.indexOf("<");
const H = {};
function ca(a) {
  const b = {...a.attributes, children:a.children};
  a = a.nodeName.defaultProps;
  if (void 0 !== a) {
    for (let c in a) {
      void 0 === b[c] && (b[c] = a[c]);
    }
  }
  return b;
}
;const da = (a, b, {allAttributes:c, xml:d, w:e, sort:f, l:h} = {}) => {
  let k;
  const n = Object.keys(a);
  f && n.sort();
  return {A:n.map(g => {
    var m = a[g];
    if ("children" != g && !g.match(/[\s\n\\/='"\0<>]/) && (c || !["key", "ref"].includes(g))) {
      if ("className" == g) {
        if (a.class) {
          return;
        }
        g = "class";
      } else {
        if ("htmlFor" == g) {
          if (a.for) {
            return;
          }
          g = "for";
        } else {
          if ("srcSet" == g) {
            if (a.srcset) {
              return;
            }
            g = "srcset";
          }
        }
      }
      e && g.match(/^xlink:?./) && (g = g.toLowerCase().replace(/^xlink:?/, "xlink:"));
      if ("style" == g && m && "object" == typeof m) {
        {
          let r = "";
          for (var u in m) {
            let y = m[u];
            null != y && (r && (r += " "), r += H[u] || (H[u] = u.replace(/([A-Z])/g, "-$1").toLowerCase()), r += ": ", r += y, "number" == typeof y && !1 === aa.test(u) && (r += "px"), r += ";");
          }
          m = r || void 0;
        }
      }
      if ("dangerouslySetInnerHTML" == g) {
        k = m && m.__html;
      } else {
        if ((m || 0 === m || "" === m) && "function" != typeof m) {
          if (!0 === m || "" === m) {
            if (m = g, !d) {
              return g;
            }
          }
          u = "";
          if ("value" == g) {
            if ("select" == b) {
              h = m;
              return;
            }
            "option" == b && h == m && (u = "selected ");
          }
          return `${u}${g}="${G(m)}"`;
        }
      }
    }
  }).filter(Boolean), v:k, l:h};
};
const J = [], ea = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/, fa = /^(a|abbr|acronym|audio|b|bdi|bdo|big|br|button|canvas|cite|code|data|datalist|del|dfn|em|embed|i|iframe|img|input|ins|kbd|label|map|mark|meter|noscript|object|output|picture|progress|q|ruby|s|samp|slot|small|span|strong|sub|sup|svg|template|textarea|time|u|tt|var|video|wbr)$/, N = (a, b = {}) => {
  const {addDoctype:c, pretty:d} = b;
  a = M(a, b, {});
  return c ? `<!doctype html>${d ? "\n" : ""}${a}` : a;
};
function M(a, b = {}, c = {}, d = !1, e = !1, f) {
  if (null == a || "boolean" == typeof a) {
    return "";
  }
  const {pretty:h = !1, shallow:k = !1, renderRootComponent:n = !1, shallowHighOrder:g = !1, sortAttributes:m, allAttributes:u, xml:r, initialPadding:y = 0, closeVoidTags:R = !1} = b;
  let {lineLength:B = 40} = b;
  B -= y;
  let {nodeName:l, attributes:K = {}} = a;
  var q = ["textarea", "pre"].includes(l), v = " ".repeat(y);
  const D = "string" == typeof h ? h : `  ${v}`;
  if ("object" != typeof a && !l) {
    return G(a);
  }
  if ("function" == typeof l) {
    if (!k || !d && n) {
      return v = ca(a), l.prototype && "function" == typeof l.prototype.render ? (q = new l(v, c), q._disable = q.__x = !0, q.props = v, q.context = c, l.getDerivedStateFromProps ? q.state = {...q.state, ...l.getDerivedStateFromProps(q.props, q.state)} : q.componentWillMount && q.componentWillMount(), v = q.render(q.props, q.state, q.context), q.getChildContext && (c = {...c, ...q.getChildContext()})) : v = l(v, c), M(v, b, c, g, e, f);
    }
    l = l.displayName || l !== Function && l.name || ha(l);
  }
  let t = "";
  ({A:E, v:d, l:f} = da(K, l, {allAttributes:u, xml:r, w:e, sort:m, l:f}));
  if (h) {
    let z = `<${l}`.length;
    t = E.reduce((w, F) => {
      const L = z + 1 + F.length;
      if (L > B) {
        return z = D.length, `${w}\n${D}${F}`;
      }
      z = L;
      return `${w} ${F}`;
    }, "");
  } else {
    t = E.length ? " " + E.join(" ") : "";
  }
  t = `<${l}${t}>`;
  if (`${l}`.match(/[\s\n\\/='"\0<>]/)) {
    throw t;
  }
  var E = `${l}`.match(ea);
  R && E && (t = t.replace(/>$/, " />"));
  let x = [];
  if (d) {
    !q && h && (ba(d) || d.length + O(t) > B) && (d = "\n" + D + `${d}`.replace(/(\n+)/g, "$1" + (D || "\t"))), t += d;
  } else {
    if (a.children) {
      let z = h && t.includes("\n");
      x = a.children.map(w => {
        if (null != w && !1 !== w && (w = M(w, b, c, !0, "svg" == l ? !0 : "foreignObject" == l ? !1 : e, f))) {
          return h && w.length + O(t) > B && (z = !0), w;
        }
      }).filter(Boolean);
      if (h && z && !q) {
        for (a = x.length; a--;) {
          x[a] = "\n" + D + `${x[a]}`.replace(/(\n+)/g, "$1" + (D || "\t"));
        }
      }
    }
  }
  if (x.length) {
    t += x.join("");
  } else {
    if (r) {
      return t.substring(0, t.length - 1) + " />";
    }
  }
  E || (a = x[x.length - 1], `${l}`.match(fa) && (a ? !/>$/.test(a) : 1) || q || !h || !t.includes("\n") || (t += `\n${v}`), t += `</${l}>`);
  return t;
}
function ha(a) {
  var b = (Function.prototype.toString.call(a).match(/^\s*function\s+([^( ]+)/) || "")[1];
  if (!b) {
    b = -1;
    for (let c = J.length; c--;) {
      if (J[c] === a) {
        b = c;
        break;
      }
    }
    0 > b && (b = J.push(a) - 1);
    b = `UnnamedComponent${b}`;
  }
  return b;
}
const O = a => {
  a = a.split("\n");
  return a[a.length - 1].length;
};
function ia(a, b, c) {
  const d = [];
  b.replace(a, (e, ...f) => {
    e = f.slice(0, f.length - 2).reduce((h, k, n) => {
      n = c[n];
      if (!n || void 0 === k) {
        return h;
      }
      h[n] = k;
      return h;
    }, {});
    d.push(e);
  });
  return d;
}
;const ja = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), ka = new RegExp(`(?:\\s+((?:${ja.source}\\s*)*))`);
const ma = (a, b) => {
  a = (Array.isArray(a) ? a : [a]).join("|");
  return ia(new RegExp(`<(${a})${ka.source}?(?:${/\s*\/>/.source}|${/>([\s\S]+?)?<\/\1>/.source})`, "g"), b, "t a v v1 v2 c".split(" ")).map(({t:c, a:d = "", c:e = ""}) => {
    d = d.replace(/\/$/, "").trim();
    d = la(d);
    return {content:e, props:d, tag:c};
  });
}, la = a => ia(ja, a, ["key", "val", "def", "f"]).reduce((b, {key:c, val:d}) => {
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
const za = /\s+at.*(?:\(|\s)(.*)\)?/, Aa = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Ba = ya(), P = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(Aa.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(za);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => b ? f.replace(za, (h, k) => h.replace(k, k.replace(Ba, "~"))) : f).join("\n");
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
    const h = Ca(f, 2, !0), k = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${k}`, ...null !== e && a === e || c ? [b] : [h, b]].join("\n");
    e = P(e);
    return Object.assign(f ? d : Error(), {message:k, stack:e});
  };
}
;function Q(a) {
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
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {u:e = Q(!0), proxyError:f} = a || {}, h = (k, n) => e(n);
    super(d);
    this.g = [];
    this.m = new Promise((k, n) => {
      this.on("finish", () => {
        let g;
        b ? g = Buffer.concat(this.g) : g = this.g.join("");
        k(g);
        this.g = [];
      });
      this.once("error", g => {
        if (-1 == g.stack.indexOf("\n")) {
          h`${g}`;
        } else {
          const m = P(g.stack);
          g.stack = m;
          f && h`${g}`;
        }
        n(g);
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
  ({i:a} = new Ha({rs:a, u:Q(!0)}));
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
        const h = b.replace(c, (k, ...n) => {
          f = Error();
          try {
            if (this.g) {
              return e.length ? e.push(Promise.resolve(k)) : k;
            }
            const g = d.call(this, k, ...n);
            g instanceof Promise && e.push(g);
            return g;
          } catch (g) {
            xa(f, g);
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
          b = h;
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
      a = P(d.stack), d.stack = a, c(d);
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
    return b.C ? (b = Math.abs(a), a = 864E5 <= b ? S(a, b, 864E5, "day") : 36E5 <= b ? S(a, b, 36E5, "hour") : 6E4 <= b ? S(a, b, 6E4, "minute") : 1000 <= b ? S(a, b, 1000, "second") : a + " ms") : (b = Math.abs(a), a = 864E5 <= b ? Math.round(a / 864E5) + "d" : 36E5 <= b ? Math.round(a / 36E5) + "h" : 6E4 <= b ? Math.round(a / 6E4) + "m" : 1000 <= b ? Math.round(a / 1000) + "s" : a + "ms"), a;
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
function S(a, b, c, d) {
  return Math.round(a / c) + " " + d + (b >= 1.5 * c ? "s" : "");
}
;/*
 bytes
 Copyright(c) 2012-2014 TJ Holowaychuk
 Copyright(c) 2015 Jed Watson
 MIT Licensed
*/
const Sa = /\B(?=(\d{3})+(?!\d))/g, Ta = /(?:\.0*|(\.[^0]+)0+)$/, T = {b:1, kb:1024, mb:1048576, gb:1073741824, tb:Math.pow(1024, 4), pb:Math.pow(1024, 5)};
function U(a, b) {
  if (!Number.isFinite(a)) {
    return null;
  }
  const c = Math.abs(a), d = b && b.D || "", e = b && b.G || "", f = b && void 0 !== b.s ? b.s : 2, h = !(!b || !b.B);
  (b = b && b.F || "") && T[b.toLowerCase()] || (b = c >= T.pb ? "PB" : c >= T.tb ? "TB" : c >= T.gb ? "GB" : c >= T.mb ? "MB" : c >= T.kb ? "KB" : "B");
  a = (a / T[b.toLowerCase()]).toFixed(f);
  h || (a = a.replace(Ta, "$1"));
  d && (a = a.replace(Sa, d));
  return a + e + b;
}
;/*
 diff package https://github.com/kpdecker/jsdiff
 BSD License
 Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>
*/
const Ua = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90};
function V(a, b) {
  return (b = Ua[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;var Va = {f:U, ["fy"](a) {
  return V(U(a) || "", "yellow");
}, ["fr"](a) {
  return V(U(a) || "", "red");
}, ["fb"](a) {
  return V(U(a) || "", "blue");
}, ["fg"](a) {
  return V(U(a) || "", "green");
}, ["fc"](a) {
  return V(U(a) || "", "cyan");
}, ["fm"](a) {
  return V(U(a) || "", "magenta");
}};
const W = Object.keys(process.env).filter(a => /^debug_/i.test(a)).reduce((a, b) => {
  const c = b.substring(6).toLowerCase().replace(/_([a-z])/g, (d, e) => e.toUpperCase());
  b = process.env[b];
  /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : "null" === b ? b = null : b = Number(b);
  a[c] = b;
  return a;
}, {}), X = {init:function(a) {
  a.inspectOpts = {...W};
}, log:function(...a) {
  return process.stderr.write(Oa(...a) + "\n");
}, formatArgs:function(a) {
  const {namespace:b, useColors:c, color:d, diff:e} = this;
  if (c) {
    const f = "\u001b[3" + (8 > d ? d : "8;5;" + d), h = `  ${f};1m${b} \u001B[0m`;
    a[0] = h + a[0].split("\n").join("\n" + h);
    a.push(f + "m+" + Qa(e) + "\u001b[0m");
  } else {
    a[0] = (W.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
  }
}, save:function(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}, load:function() {
  return process.env.DEBUG;
}, useColors:function() {
  return "colors" in W ? !!W.colors : Na.isatty(process.stderr.fd);
}, colors:[6, 2, 3, 4, 5, 1], inspectOpts:W, formatters:{o:function(a) {
  return Pa(a, {...this.inspectOpts, colors:this.useColors}).replace(/\s*\n\s*/g, " ");
}, O:function(a) {
  return Pa(a, {...this.inspectOpts, colors:this.useColors});
}, ...Va}};
function Wa(a) {
  function b(...h) {
    if (b.enabled) {
      var k = Number(new Date);
      b.diff = k - (f || k);
      b.prev = f;
      f = b.curr = k;
      h[0] = Xa(h[0]);
      "string" != typeof h[0] && h.unshift("%O");
      var n = 0;
      h[0] = h[0].replace(/%([a-zA-Z%]+)/g, (g, m) => {
        if ("%%" == g) {
          return g;
        }
        n++;
        if (m = c[m]) {
          g = m.call(b, h[n]), h.splice(n, 1), n--;
        }
        return g;
      });
      d.call(b, h);
      (b.log || e).apply(b, h);
    }
  }
  const c = a.formatters, d = a.formatArgs, e = a.log;
  let f;
  return b;
}
function Ya(a) {
  const b = Wa(a);
  "function" == typeof a.init && a.init(b);
  a.g.push(b);
  return b;
}
function Za(a, b) {
  let c = 0;
  for (let d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d), c |= 0;
  }
  return a.colors[Math.abs(c) % a.colors.length];
}
function $a(a) {
  var b = X.load();
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
class ab {
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
function Xa(a) {
  return a instanceof Error ? a.stack || a.message : a;
}
;const {createWriteStream:bb} = fs;
async function cb(a, b) {
  if (!a) {
    throw Error("No path is given.");
  }
  const c = Q(!0), d = bb(a);
  await new Promise((e, f) => {
    d.on("error", h => {
      h = c(h);
      f(h);
    }).on("close", e).end(b);
  });
}
;const {join:db} = path;
const eb = a => {
  const b = Object.keys(a);
  return `{
    ${b.map(c => `${/-/.test(c) ? `'${c}'` : c}: '${a[c]}'`).join(",\n")}${b.length ? "," : ""}
  }`;
}, fb = a => {
  const b = [];
  b.push(`key: '${a.key}'`);
  b.push(`id: '${a.id}'`);
  Object.keys(a.props).length && b.push(`props: ${eb(a.props)}`);
  a.children.filter(Boolean).length && b.push(`children: ${JSON.stringify(a.children)}`);
  return `{
${b.map(c => `  ${c}`).join(",\n") + ","}
}`;
}, gb = a => "[" + a.map(b => fb(b)).join(",\n") + "]", hb = (a = !0) => a ? `const io = makeIo(${"boolean" != typeof a ? JSON.stringify(a).replace(/(,?)"(.+?)":/g, (b, c, d) => `${c ? ", " : ""}${d}: `).replace(/^{/, "{ ").replace(/}$/, " }") : ""});` : "", Y = a => a.replace(/(?:^|-)(.)/g, (b, c) => c.toUpperCase()), ib = a => `const Components = {\n  ${a.map(({key:b}) => `'${b}': ${Y(b)}`).filter((b, c, d) => d.indexOf(b) == c).join(",\n  ")},\n}`, jb = (a, b) => {
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
  return Object.entries(c).map(([d, e]) => Z(e, d));
}, Z = (a, b, c = !0) => {
  const [d, ...e] = a;
  a = "import ";
  d && (a += c ? Y(d) : d);
  e.length && (a = a + (d ? ", " : "") + `{ ${(c ? e.map(Y) : e).join(", ")} }`);
  return a + ` from '${b}'`;
};
var kb;
kb = function() {
  const a = new ab(X);
  return function(b) {
    const c = Ya(a);
    c.namespace = b;
    c.useColors = X.useColors();
    c.enabled = a.enabled(b);
    c.color = Za(a, b);
    c.destroy = function() {
      a.destroy(this);
    };
    c.extend = function(d, e) {
      d = this.namespace + (void 0 === e ? ":" : e) + d;
      d.log = this.log;
      return d;
    };
    $a(a);
    return c;
  };
}()("competent");
const lb = (a, b) => new RegExp(a.source.replace(new RegExp(`([|(])${b}([|)])`), (c, d, e) => "|" == d && "|" == e ? "|" : ")" == e ? e : "(" == d ? d : ""), a.flags);
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
  async function c(r, y, R, B, l, K, q) {
    kb("render %s", l);
    try {
      const v = a[l], D = q.slice(0, K), t = q.slice(K + r.length);
      if (/\x3c!--\s*$/.test(D) && /^\s*--\x3e/.test(t)) {
        return r;
      }
      const [{content:E = "", props:x}] = ma(l, B);
      B = [E];
      let z = !1, w = !0, F = !1, L, na, oa, pa, qa;
      const ra = e.call(this, {...x, children:B}, {export(p = !0) {
        z = p;
      }, setPretty(p, I) {
        L = p;
        I && (na = I);
      }, renderAgain(p = !0, I = !1) {
        w = p;
        F = I;
      }, setChildContext(p) {
        pa = p;
      }, removeLine(p = !0) {
        qa = p;
      }}, l);
      let A;
      try {
        const p = v.call(this, ra);
        A = p instanceof Promise ? await p : p;
      } catch (p) {
        if (!p.message.startsWith("Class constructor")) {
          throw p;
        }
        A = (new v).render(ra);
      }
      z && !A.attributes.id && (oa = d.call(this), A.attributes.id = oa);
      const sa = {pretty:L, lineLength:na};
      let C;
      "string" == typeof A ? C = A : Array.isArray(A) ? C = A.map(p => "string" == typeof p ? p : N(p, sa)).join("\n") : C = N(A, sa);
      if (!C && qa) {
        return h && h.call(this, l), "";
      }
      C = (y || "") + C.replace(/^/gm, R);
      if (w) {
        let p;
        m ? p = m.call(this, l, F) : F ? p = {re:lb(u, l), replacement:c} : p = {re:u, replacement:c};
        const I = new La(p);
        if (g) {
          const mb = g.call(this, pa);
          Object.assign(I, mb);
        }
        C = await Ja(I, C);
      }
      z && f.call(this, l, A.attributes.id, x, B);
      h && h.call(this, l);
      return C;
    } catch (v) {
      return k && k.call(this, l, v, K, q), n ? "" : r;
    }
  }
  const {getId:d, getProps:e = (r, y) => ({...r, ...y}), markExported:f, onSuccess:h, onFail:k, removeOnError:n = !1, getContext:g, getReplacements:m} = b, u = Ma(Object.keys(a));
  return {re:u, replacement:c};
}, _makeComponentsScript:async function(a, b) {
  if ("object" != typeof b) {
    throw Error("Options are required with at least a map.");
  }
  const {map:c, assetsPath:d, io:e = !1, includeH:f = !1, props:h = {}} = b;
  if (!c) {
    throw Error("The map of where to import components from is required.");
  }
  b = require("./init");
  const k = require("./make-io"), n = ib(a);
  d && (await cb(db(d, "./init"), `${n}

  export default${b.toString()}`), await cb(db(d, "./make-io"), `export default ${k.toString()}`));
  var g = [Z([null, "render", ...f ? ["h"] : []], "preact", !1), ...d ? [...e ? [Z(["makeIo"], "./make-io", !1)] : [], Z(["init"], "./init", !1)] : [], ...jb(a, c)].join("\n");
  const m = Object.keys(h).map(r => `props.${r} = ${h[r]}`).join("\n"), u = e ? "el.render = () => {\n      render(h(Comp, props, children), parent, el)\n    }\n    el.render.meta = { key, id }\n    io.observe(el)" : "render(h(Comp, props, children), parent, el)";
  g += "\n\n";
  d || (g = g + (n + "\n\n") + (b.toString() + "\n\n"), e && (g += k.toString() + "\n\n"));
  e && (g += hb(e) + "\n\n");
  g += gb(a);
  return g + `
  .map(({ key, id, props = {}, children }) => {
    const { Comp, parent, el } = init(id, key)
    if (!Comp) return
${m ? `    ${m}` : ""}
    ${u}
  })
`;
}};


//# sourceMappingURL=competent.js.map