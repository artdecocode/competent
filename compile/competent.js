#!/usr/bin/env node
             
const stream = require('stream');
const os = require('os');
const tty = require('tty');
const util = require('util');
const path = require('path');
const fs = require('fs');             
const aa = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
let F = a => `${a}`.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), ba = a => 40 < `${a}`.length || -1 != `${a}`.indexOf("\n") || -1 !== `${a}`.indexOf("<");
const G = {};
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
;const da = (a, b, {allAttributes:c, xml:d, w:e, sort:f, l:g} = {}) => {
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
          for (var u in m) {
            let z = m[u];
            null != z && (t && (t += " "), t += G[u] || (G[u] = u.replace(/([A-Z])/g, "-$1").toLowerCase()), t += ": ", t += z, "number" == typeof z && !1 === aa.test(u) && (t += "px"), t += ";");
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
          u = "";
          if ("value" == h) {
            if ("select" == b) {
              g = m;
              return;
            }
            "option" == b && g == m && (u = "selected ");
          }
          return `${u}${h}="${F(m)}"`;
        }
      }
    }
  }).filter(Boolean), v:k, l:g};
};
const K = [], ea = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/, fa = /^(a|abbr|acronym|audio|b|bdi|bdo|big|br|button|canvas|cite|code|data|datalist|del|dfn|em|embed|i|iframe|img|input|ins|kbd|label|map|mark|meter|noscript|object|output|picture|progress|q|ruby|s|samp|slot|small|span|strong|sub|sup|svg|template|textarea|time|u|tt|var|video|wbr)$/, N = (a, b = {}) => {
  const {addDoctype:c, pretty:d} = b;
  a = M(a, b, {});
  return c ? `<!doctype html>${d ? "\n" : ""}${a}` : a;
};
function M(a, b = {}, c = {}, d = !1, e = !1, f) {
  if (null == a || "boolean" == typeof a) {
    return "";
  }
  const {pretty:g = !1, shallow:k = !1, renderRootComponent:p = !1, shallowHighOrder:h = !1, sortAttributes:m, allAttributes:u, xml:t, initialPadding:z = 0, closeVoidTags:Q = !1} = b;
  let {lineLength:C = 40} = b;
  C -= z;
  let {nodeName:l, attributes:L = {}} = a;
  var q = ["textarea", "pre"].includes(l), w = " ".repeat(z);
  const x = "string" == typeof g ? g : `  ${w}`;
  if ("object" != typeof a && !l) {
    return F(a);
  }
  if ("function" == typeof l) {
    if (!k || !d && p) {
      return w = ca(a), l.prototype && "function" == typeof l.prototype.render ? (q = new l(w, c), q._disable = q.__x = !0, q.props = w, q.context = c, l.getDerivedStateFromProps ? q.state = {...q.state, ...l.getDerivedStateFromProps(q.props, q.state)} : q.componentWillMount && q.componentWillMount(), w = q.render(q.props, q.state, q.context), q.getChildContext && (c = {...c, ...q.getChildContext()})) : w = l(w, c), M(w, b, c, h, e, f);
    }
    l = l.displayName || l !== Function && l.name || ha(l);
  }
  let r = "";
  ({A:E, v:d, l:f} = da(L, l, {allAttributes:u, xml:t, w:e, sort:m, l:f}));
  if (g) {
    let y = `<${l}`.length;
    r = E.reduce((v, I) => {
      const J = y + 1 + I.length;
      if (J > C) {
        return y = x.length, `${v}\n${x}${I}`;
      }
      y = J;
      return `${v} ${I}`;
    }, "");
  } else {
    r = E.length ? " " + E.join(" ") : "";
  }
  r = `<${l}${r}>`;
  if (`${l}`.match(/[\s\n\\/='"\0<>]/)) {
    throw r;
  }
  var E = `${l}`.match(ea);
  Q && E && (r = r.replace(/>$/, " />"));
  let A = [];
  if (d) {
    !q && g && (ba(d) || d.length + O(r) > C) && (d = "\n" + x + `${d}`.replace(/(\n+)/g, "$1" + (x || "\t"))), r += d;
  } else {
    if (a.children) {
      let y = g && r.includes("\n");
      A = a.children.map(v => {
        if (null != v && !1 !== v && (v = M(v, b, c, !0, "svg" == l ? !0 : "foreignObject" == l ? !1 : e, f))) {
          return g && v.length + O(r) > C && (y = !0), v;
        }
      }).filter(Boolean);
      if (g && y && !q) {
        for (a = A.length; a--;) {
          A[a] = "\n" + x + `${A[a]}`.replace(/(\n+)/g, "$1" + (x || "\t"));
        }
      }
    }
  }
  if (A.length) {
    r += A.join("");
  } else {
    if (t) {
      return r.substring(0, r.length - 1) + " />";
    }
  }
  E || (a = A[A.length - 1], `${l}`.match(fa) && (a ? !/>$/.test(a) : 1) || q || !g || !r.includes("\n") || (r += `\n${w}`), r += `</${l}>`);
  return r;
}
function ha(a) {
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
const O = a => {
  a = a.split("\n");
  return a[a.length - 1].length;
};
function ia(a, b, c) {
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
var ua = stream;
const {Transform:va, Writable:wa} = stream;
function xa(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const {re:b, replacement:c} = a;
  a = b instanceof RegExp;
  const d = -1 != ["string", "function"].indexOf(typeof c);
  return a && d;
}
const ya = (a, b) => {
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
const {homedir:za} = os;
const Aa = /\s+at.*(?:\(|\s)(.*)\)?/, Ba = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Ca = za(), P = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(Ba.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(Aa);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => b ? f.replace(Aa, (g, k) => g.replace(k, k.replace(Ca, "~"))) : f).join("\n");
};
const Da = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, Ea = (a, b = !1) => Da(a, 2 + (b ? 1 : 0)), Fa = a => {
  ({callee:{caller:a}} = a);
  return a;
};
function Ga(a, b, c = !1) {
  return function(d) {
    var e = Fa(arguments), {stack:f} = Error();
    const g = Da(f, 2, !0), k = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${k}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = P(e);
    return Object.assign(f ? d : Error(), {message:k, stack:e});
  };
}
;function R(a) {
  var {stack:b} = Error();
  const c = Fa(arguments);
  b = Ea(b, a);
  return Ga(c, b, a);
}
;const Ha = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class Ia extends wa {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {u:e = R(!0), proxyError:f} = a || {}, g = (k, p) => e(p);
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
          const m = P(h.stack);
          h.stack = m;
          f && g`${h}`;
        }
        p(h);
      });
      c && Ha(this, c).pipe(this);
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
const Ja = async a => {
  ({i:a} = new Ia({rs:a, u:R(!0)}));
  return await a;
};
async function Ka(a, b) {
  return La(a, b);
}
class Ma extends va {
  constructor(a, b) {
    super(b);
    this.i = (Array.isArray(a) ? a : [a]).filter(xa);
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
            ya(f, h);
          }
        });
        if (e.length) {
          try {
            const k = await Promise.all(e);
            b = b.replace(c, () => k.shift());
          } catch (k) {
            ya(f, k);
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
      a = P(d.stack), d.stack = a, c(d);
    }
  }
}
async function La(a, b) {
  b instanceof ua ? b.pipe(a) : a.end(b);
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
    return b.C ? (b = Math.abs(a), a = 864E5 <= b ? S(a, b, 864E5, "day") : 36E5 <= b ? S(a, b, 36E5, "hour") : 6E4 <= b ? S(a, b, 6E4, "minute") : 1000 <= b ? S(a, b, 1000, "second") : a + " ms") : (b = Math.abs(a), a = 864E5 <= b ? Math.round(a / 864E5) + "d" : 36E5 <= b ? Math.round(a / 36E5) + "h" : 6E4 <= b ? Math.round(a / 6E4) + "m" : 1000 <= b ? Math.round(a / 1000) + "s" : a + "ms"), a;
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
function S(a, b, c, d) {
  return Math.round(a / c) + " " + d + (b >= 1.5 * c ? "s" : "");
}
;/*
 bytes
 Copyright(c) 2012-2014 TJ Holowaychuk
 Copyright(c) 2015 Jed Watson
 MIT Licensed
*/
const Ta = /\B(?=(\d{3})+(?!\d))/g, Ua = /(?:\.0*|(\.[^0]+)0+)$/, T = {b:1, kb:1024, mb:1048576, gb:1073741824, tb:Math.pow(1024, 4), pb:Math.pow(1024, 5)};
function U(a, b) {
  if (!Number.isFinite(a)) {
    return null;
  }
  const c = Math.abs(a), d = b && b.D || "", e = b && b.G || "", f = b && void 0 !== b.s ? b.s : 2, g = !(!b || !b.B);
  (b = b && b.F || "") && T[b.toLowerCase()] || (b = c >= T.pb ? "PB" : c >= T.tb ? "TB" : c >= T.gb ? "GB" : c >= T.mb ? "MB" : c >= T.kb ? "KB" : "B");
  a = (a / T[b.toLowerCase()]).toFixed(f);
  g || (a = a.replace(Ua, "$1"));
  d && (a = a.replace(Ta, d));
  return a + e + b;
}
;/*
 diff package https://github.com/kpdecker/jsdiff
 BSD License
 Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>
*/
const Va = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90};
function V(a, b) {
  return (b = Va[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;var Wa = {f:U, ["fy"](a) {
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
  return process.stderr.write(Pa(...a) + "\n");
}, formatArgs:function(a) {
  const {namespace:b, useColors:c, color:d, diff:e} = this;
  if (c) {
    const f = "\u001b[3" + (8 > d ? d : "8;5;" + d), g = `  ${f};1m${b} \u001B[0m`;
    a[0] = g + a[0].split("\n").join("\n" + g);
    a.push(f + "m+" + Ra(e) + "\u001b[0m");
  } else {
    a[0] = (W.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
  }
}, save:function(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}, load:function() {
  return process.env.DEBUG;
}, useColors:function() {
  return "colors" in W ? !!W.colors : Oa.isatty(process.stderr.fd);
}, colors:[6, 2, 3, 4, 5, 1], inspectOpts:W, formatters:{o:function(a) {
  return Qa(a, {...this.inspectOpts, colors:this.useColors}).replace(/\s*\n\s*/g, " ");
}, O:function(a) {
  return Qa(a, {...this.inspectOpts, colors:this.useColors});
}, ...Wa}};
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
  const c = R(!0), d = cb(a);
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
    ${b.map(c => `${/-/.test(c) ? `'${c}'` : c}: '${a[c]}'`).join(",\n")}${b.length ? "," : ""}
  }`;
}, ib = a => {
  const b = [];
  b.push(`key: '${a.key}'`);
  b.push(`id: '${a.id}'`);
  Object.keys(a.props).length && b.push(`props: ${hb(a.props)}`);
  a.children.filter(Boolean).length && b.push(`children: ${JSON.stringify(a.children)}`);
  return `{
${b.map(c => `  ${c}`).join(",\n") + ","}
}`;
}, jb = a => `/** @type {!Array<!preact.PreactProps>} */
const meta = [${a.map(b => ib(b)).join(",\n")}]`, kb = (a = !0) => a ? `const io = makeIo(${"boolean" != typeof a ? JSON.stringify(a).replace(/([^\\])"([^"]+?)":/g, (b, c, d) => `${"," == c ? ", " : c}${d}: `).replace(/^{/, "{ ").replace(/}$/, " }") : ""})` : "", Y = a => a.replace(/(?:^|-)(.)/g, (b, c) => c.toUpperCase()), lb = a => `const __components = {\n  ${a.map(({key:b}) => `'${b}': ${Y(b)}`).filter((b, c, d) => d.indexOf(b) == c).join(",\n  ")},\n}`, mb = (a, b) => {
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
  let [d, ...e] = a;
  e = e.filter(Boolean);
  a = "import ";
  d && (a += c ? Y(d) : d);
  e.length && (a = a + (d ? ", " : "") + `{ ${(c ? e.map(Y) : e).join(", ")} }`);
  return a + ` from '${b}'`;
}, eb = require("./init"), fb = require("./make-io");
var nb;
nb = function() {
  const a = new bb(X);
  return function(b) {
    const c = Za(a);
    c.namespace = b;
    c.useColors = X.useColors();
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
const ob = (a, b) => new RegExp(a.source.replace(new RegExp(`([|(])${b}([|)])`), (c, d, e) => "|" == d && "|" == e ? "|" : ")" == e ? e : "(" == d ? d : ""), a.flags);
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
  async function c(t, z, Q, C, l, L, q) {
    nb("render %s", l);
    const w = Error("Skip render");
    try {
      const x = a[l], r = q.slice(0, L), E = q.slice(L + t.length);
      if (/\x3c!--\s*$/.test(r) && /^\s*--\x3e/.test(E)) {
        return t;
      }
      const [{content:A = "", props:y}] = ma(l, C);
      C = [A];
      let v = !1, I = !0, J = !1, na, oa, pa, qa, ra;
      const sa = e.call(this, {...y, children:C}, {export(n = !0) {
        v = n;
      }, setPretty(n, H) {
        na = n;
        H && (oa = H);
      }, renderAgain(n = !0, H = !1) {
        I = n;
        J = H;
      }, setChildContext(n) {
        qa = n;
      }, removeLine(n = !0) {
        ra = n;
      }, skipRender() {
        throw w;
      }}, l);
      let B;
      try {
        const n = x.call(this, sa);
        B = n instanceof Promise ? await n : n;
      } catch (n) {
        if (!n.message.startsWith("Class constructor")) {
          throw n;
        }
        B = (new x).render(sa);
      }
      v && !B.attributes.id && (pa = d.call(this), B.attributes.id = pa);
      const ta = {pretty:na, lineLength:oa};
      let D;
      "string" == typeof B ? D = B : Array.isArray(B) ? D = B.map(n => "string" == typeof n ? n : N(n, ta)).join("\n") : D = N(B, ta);
      if (!D && ra) {
        return g && g.call(this, l, y), "";
      }
      D = (z || "") + D.replace(/^/gm, Q);
      if (I) {
        let n;
        m ? n = m.call(this, l, J) : J ? n = {re:ob(u, l), replacement:c} : n = {re:u, replacement:c};
        const H = new Ma(n);
        if (h) {
          const pb = h.call(this, qa);
          Object.assign(H, pb);
        }
        D = await Ka(H, D);
      }
      v && f.call(this, l, B.attributes.id, y, C);
      g && g.call(this, l, y);
      return D;
    } catch (x) {
      if (x === w) {
        return t;
      }
      k && k.call(this, l, x, L, q);
      return p ? "" : t;
    }
  }
  const {getId:d, getProps:e = (t, z) => ({...t, ...z}), markExported:f, onSuccess:g, onFail:k, removeOnError:p = !1, getContext:h, getReplacements:m} = b, u = Na(Object.keys(a));
  return {re:u, replacement:c};
}, _makeComponentsScript:function(a, b) {
  if ("object" != typeof b) {
    throw Error("Options are required with at least a map.");
  }
  const {map:c, externalAssets:d = !1, io:e = !1, includeH:f = !1, props:g = {}} = b;
  if (!c) {
    throw Error("The map of where to import components from is required.");
  }
  var k = [Z([null, "render", ...f ? ["h"] : []], "preact", !1), ...d ? [Z([null, ...e ? ["makeIo"] : [], "init"], "./__competent-lib", !1)] : [], ...mb(a, c)].join("\n");
  b = Object.keys(g).map(m => `props.${m} = ${g[m]}`).join("\n");
  const p = e ? "el.render = () => {\n    render(h(Comp, props, children), parent, el)\n  }\n  el.render.meta = { key, id }\n  io.observe(el)" : "render(h(Comp, props, children), parent, el)";
  k += "\n\n";
  const h = lb(a);
  k += h + "\n\n";
  d || (k += eb.toString() + "\n\n", e && (k += fb.toString() + "\n\n"));
  e && (k += kb(e) + "\n\n");
  k += jb(a);
  return k + `
meta.forEach(({ key, id, props = {}, children }) => {
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