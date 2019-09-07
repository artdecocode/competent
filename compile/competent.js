#!/usr/bin/env node
             
const stream = require('stream');
const os = require('os');
const tty = require('tty');
const util = require('util');             
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
;const da = (a, b, {allAttributes:c, xml:d, w:e, sort:h, l:f} = {}) => {
  let l;
  const p = Object.keys(a);
  h && p.sort();
  return {A:p.map(g => {
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
          let t = "";
          for (var u in m) {
            let y = m[u];
            null != y && (t && (t += " "), t += H[u] || (H[u] = u.replace(/([A-Z])/g, "-$1").toLowerCase()), t += ": ", t += y, "number" == typeof y && !1 === aa.test(u) && (t += "px"), t += ";");
          }
          m = t || void 0;
        }
      }
      if ("dangerouslySetInnerHTML" == g) {
        l = m && m.__html;
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
              f = m;
              return;
            }
            "option" == b && f == m && (u = "selected ");
          }
          return `${u}${g}="${G(m)}"`;
        }
      }
    }
  }).filter(Boolean), v:l, l:f};
};
const J = [], ea = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/, fa = /^(a|abbr|acronym|audio|b|bdi|bdo|big|br|button|canvas|cite|code|data|datalist|del|dfn|em|embed|i|iframe|img|input|ins|kbd|label|map|mark|meter|noscript|object|output|picture|progress|q|ruby|s|samp|slot|small|span|strong|sub|sup|svg|template|textarea|time|u|tt|var|video|wbr)$/, N = (a, b = {}) => {
  const {addDoctype:c, pretty:d} = b;
  a = M(a, b, {});
  return c ? `<!doctype html>${d ? "\n" : ""}${a}` : a;
};
function M(a, b = {}, c = {}, d = !1, e = !1, h) {
  if (null == a || "boolean" == typeof a) {
    return "";
  }
  const {pretty:f = !1, shallow:l = !1, renderRootComponent:p = !1, shallowHighOrder:g = !1, sortAttributes:m, allAttributes:u, xml:t, initialPadding:y = 0, closeVoidTags:Q = !1} = b;
  let {lineLength:B = 40} = b;
  B -= y;
  let {nodeName:k, attributes:K = {}} = a;
  var q = ["textarea", "pre"].includes(k), v = " ".repeat(y);
  const D = "string" == typeof f ? f : `  ${v}`;
  if ("object" != typeof a && !k) {
    return G(a);
  }
  if ("function" == typeof k) {
    if (!l || !d && p) {
      return v = ca(a), k.prototype && "function" == typeof k.prototype.render ? (q = new k(v, c), q._disable = q.__x = !0, q.props = v, q.context = c, k.getDerivedStateFromProps ? q.state = {...q.state, ...k.getDerivedStateFromProps(q.props, q.state)} : q.componentWillMount && q.componentWillMount(), v = q.render(q.props, q.state, q.context), q.getChildContext && (c = {...c, ...q.getChildContext()})) : v = k(v, c), M(v, b, c, g, e, h);
    }
    k = k.displayName || k !== Function && k.name || ha(k);
  }
  let r = "";
  ({A:E, v:d, l:h} = da(K, k, {allAttributes:u, xml:t, w:e, sort:m, l:h}));
  if (f) {
    let z = `<${k}`.length;
    r = E.reduce((w, F) => {
      const L = z + 1 + F.length;
      if (L > B) {
        return z = D.length, `${w}\n${D}${F}`;
      }
      z = L;
      return `${w} ${F}`;
    }, "");
  } else {
    r = E.length ? " " + E.join(" ") : "";
  }
  r = `<${k}${r}>`;
  if (`${k}`.match(/[\s\n\\/='"\0<>]/)) {
    throw r;
  }
  var E = `${k}`.match(ea);
  Q && E && (r = r.replace(/>$/, " />"));
  let x = [];
  if (d) {
    !q && f && (ba(d) || d.length + O(r) > B) && (d = "\n" + D + `${d}`.replace(/(\n+)/g, "$1" + (D || "\t"))), r += d;
  } else {
    if (a.children) {
      let z = f && r.includes("\n");
      x = a.children.map(w => {
        if (null != w && !1 !== w && (w = M(w, b, c, !0, "svg" == k ? !0 : "foreignObject" == k ? !1 : e, h))) {
          return f && w.length + O(r) > B && (z = !0), w;
        }
      }).filter(Boolean);
      if (f && z && !q) {
        for (a = x.length; a--;) {
          x[a] = "\n" + D + `${x[a]}`.replace(/(\n+)/g, "$1" + (D || "\t"));
        }
      }
    }
  }
  if (x.length) {
    r += x.join("");
  } else {
    if (t) {
      return r.substring(0, r.length - 1) + " />";
    }
  }
  E || (a = x[x.length - 1], `${k}`.match(fa) && (a ? !/>$/.test(a) : 1) || q || !f || !r.includes("\n") || (r += `\n${v}`), r += `</${k}>`);
  return r;
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
function P(a, b, c) {
  const d = [];
  b.replace(a, (e, ...h) => {
    e = h.slice(0, h.length - 2).reduce((f, l, p) => {
      p = c[p];
      if (!p || void 0 === l) {
        return f;
      }
      f[p] = l;
      return f;
    }, {});
    d.push(e);
  });
  return d;
}
;const R = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), ia = new RegExp(`(?:\\s+((?:${R.source}\\s*)*))`);
const qa = (a, b) => {
  a = (Array.isArray(a) ? a : [a]).join("|");
  return P(new RegExp(`<(${a})${ia.source}?(?:${/\s*\/>/.source}|${/>([\s\S]+?)?<\/\1>/.source})`, "g"), b, "t a v v1 v2 c".split(" ")).map(({t:c, a:d = "", c:e = ""}) => {
    d = d.replace(/\/$/, "").trim();
    d = ja(d);
    return {content:e, props:d, tag:c};
  });
}, ja = a => P(R, a, ["key", "val", "def", "f"]).reduce((b, {key:c, val:d}) => {
  if (void 0 === d) {
    return b[c] = !0, b;
  }
  b[c] = "true" == d ? !0 : "false" == d ? !1 : /^\d+$/.test(d) ? parseInt(d, 10) : d;
  return b;
}, {});
var ra = stream;
const {Transform:sa, Writable:ta} = stream;
function ua(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const {re:b, replacement:c} = a;
  a = b instanceof RegExp;
  const d = -1 != ["string", "function"].indexOf(typeof c);
  return a && d;
}
const va = (a, b) => {
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
const {homedir:wa} = os;
const xa = /\s+at.*(?:\(|\s)(.*)\)?/, ya = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, za = wa(), S = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = new RegExp(ya.source.replace("IGNORED_MODULES", c.join("|")));
  return a.replace(/\\/g, "/").split("\n").filter(e => {
    e = e.match(xa);
    if (null === e || !e[1]) {
      return !0;
    }
    e = e[1];
    return e.includes(".app/Contents/Resources/electron.asar") || e.includes(".app/Contents/Resources/default_app.asar") ? !1 : !d.test(e);
  }).filter(e => e.trim()).map(e => b ? e.replace(xa, (h, f) => h.replace(f, f.replace(za, "~"))) : e).join("\n");
};
const Aa = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, Ba = (a, b = !1) => Aa(a, 2 + (b ? 1 : 0)), Ca = a => {
  ({callee:{caller:a}} = a);
  return a;
};
function Da(a, b, c = !1) {
  return function(d) {
    var e = Ca(arguments), {stack:h} = Error();
    const f = Aa(h, 2, !0), l = (h = d instanceof Error) ? d.message : d;
    e = [`Error: ${l}`, ...null !== e && a === e || c ? [b] : [f, b]].join("\n");
    e = S(e);
    return Object.assign(h ? d : Error(), {message:l, stack:e});
  };
}
;function Ea(a) {
  var {stack:b} = Error();
  const c = Ca(arguments);
  b = Ba(b, a);
  return Da(c, b, a);
}
;const Fa = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class Ga extends ta {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {u:e = Ea(!0), proxyError:h} = a || {}, f = (l, p) => e(p);
    super(d);
    this.g = [];
    this.m = new Promise((l, p) => {
      this.on("finish", () => {
        let g;
        b ? g = Buffer.concat(this.g) : g = this.g.join("");
        l(g);
        this.g = [];
      });
      this.once("error", g => {
        if (-1 == g.stack.indexOf("\n")) {
          f`${g}`;
        } else {
          const m = S(g.stack);
          g.stack = m;
          h && f`${g}`;
        }
        p(g);
      });
      c && Fa(this, c).pipe(this);
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
const Ha = async a => {
  ({i:a} = new Ga({rs:a, u:Ea(!0)}));
  return await a;
};
async function Ia(a, b) {
  return Ja(a, b);
}
class Ka extends sa {
  constructor(a, b) {
    super(b);
    this.i = (Array.isArray(a) ? a : [a]).filter(ua);
    this.g = !1;
    this.j = b;
  }
  async replace(a, b) {
    const c = new Ka(this.i, this.j);
    b && Object.assign(c, b);
    a = await Ia(c, a);
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
        let h;
        const f = b.replace(c, (l, ...p) => {
          h = Error();
          try {
            if (this.g) {
              return e.length ? e.push(Promise.resolve(l)) : l;
            }
            const g = d.call(this, l, ...p);
            g instanceof Promise && e.push(g);
            return g;
          } catch (g) {
            va(h, g);
          }
        });
        if (e.length) {
          try {
            const l = await Promise.all(e);
            b = b.replace(c, () => l.shift());
          } catch (l) {
            va(h, l);
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
      a = S(d.stack), d.stack = a, c(d);
    }
  }
}
async function Ja(a, b) {
  b instanceof ra ? b.pipe(a) : a.end(b);
  return await Ha(a);
}
;var La = tty;
const {format:Ma, inspect:Na} = util;
/*

 Copyright (c) 2016 Zeit, Inc.
 https://npmjs.org/ms
*/
function Oa(a) {
  var b = {}, c = typeof a;
  if ("string" == c && 0 < a.length) {
    return Pa(a);
  }
  if ("number" == c && isFinite(a)) {
    return b.C ? (b = Math.abs(a), a = 864E5 <= b ? T(a, b, 864E5, "day") : 36E5 <= b ? T(a, b, 36E5, "hour") : 6E4 <= b ? T(a, b, 6E4, "minute") : 1000 <= b ? T(a, b, 1000, "second") : a + " ms") : (b = Math.abs(a), a = 864E5 <= b ? Math.round(a / 864E5) + "d" : 36E5 <= b ? Math.round(a / 36E5) + "h" : 6E4 <= b ? Math.round(a / 6E4) + "m" : 1000 <= b ? Math.round(a / 1000) + "s" : a + "ms"), a;
  }
  throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(a));
}
function Pa(a) {
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
function T(a, b, c, d) {
  return Math.round(a / c) + " " + d + (b >= 1.5 * c ? "s" : "");
}
;/*
 bytes
 Copyright(c) 2012-2014 TJ Holowaychuk
 Copyright(c) 2015 Jed Watson
 MIT Licensed
*/
const Qa = /\B(?=(\d{3})+(?!\d))/g, Ra = /(?:\.0*|(\.[^0]+)0+)$/, U = {b:1, kb:1024, mb:1048576, gb:1073741824, tb:Math.pow(1024, 4), pb:Math.pow(1024, 5)};
function V(a, b) {
  if (!Number.isFinite(a)) {
    return null;
  }
  const c = Math.abs(a), d = b && b.D || "", e = b && b.G || "", h = b && void 0 !== b.s ? b.s : 2, f = !(!b || !b.B);
  (b = b && b.F || "") && U[b.toLowerCase()] || (b = c >= U.pb ? "PB" : c >= U.tb ? "TB" : c >= U.gb ? "GB" : c >= U.mb ? "MB" : c >= U.kb ? "KB" : "B");
  a = (a / U[b.toLowerCase()]).toFixed(h);
  f || (a = a.replace(Ra, "$1"));
  d && (a = a.replace(Qa, d));
  return a + e + b;
}
;/*
 diff package https://github.com/kpdecker/jsdiff
 BSD License
 Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>
*/
const Sa = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90};
function W(a, b) {
  return (b = Sa[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;var Ta = {f:V, ["fy"](a) {
  return W(V(a) || "", "yellow");
}, ["fr"](a) {
  return W(V(a) || "", "red");
}, ["fb"](a) {
  return W(V(a) || "", "blue");
}, ["fg"](a) {
  return W(V(a) || "", "green");
}, ["fc"](a) {
  return W(V(a) || "", "cyan");
}, ["fm"](a) {
  return W(V(a) || "", "magenta");
}};
const X = Object.keys(process.env).filter(a => /^debug_/i.test(a)).reduce((a, b) => {
  const c = b.substring(6).toLowerCase().replace(/_([a-z])/g, (d, e) => e.toUpperCase());
  b = process.env[b];
  /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : "null" === b ? b = null : b = Number(b);
  a[c] = b;
  return a;
}, {}), Y = {init:function(a) {
  a.inspectOpts = {...X};
}, log:function(...a) {
  return process.stderr.write(Ma(...a) + "\n");
}, formatArgs:function(a) {
  const {namespace:b, useColors:c, color:d, diff:e} = this;
  if (c) {
    const h = "\u001b[3" + (8 > d ? d : "8;5;" + d), f = `  ${h};1m${b} \u001B[0m`;
    a[0] = f + a[0].split("\n").join("\n" + f);
    a.push(h + "m+" + Oa(e) + "\u001b[0m");
  } else {
    a[0] = (X.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
  }
}, save:function(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}, load:function() {
  return process.env.DEBUG;
}, useColors:function() {
  return "colors" in X ? !!X.colors : La.isatty(process.stderr.fd);
}, colors:[6, 2, 3, 4, 5, 1], inspectOpts:X, formatters:{o:function(a) {
  return Na(a, {...this.inspectOpts, colors:this.useColors}).replace(/\s*\n\s*/g, " ");
}, O:function(a) {
  return Na(a, {...this.inspectOpts, colors:this.useColors});
}, ...Ta}};
function Ua(a) {
  function b(...f) {
    if (b.enabled) {
      var l = Number(new Date);
      b.diff = l - (h || l);
      b.prev = h;
      h = b.curr = l;
      f[0] = Va(f[0]);
      "string" != typeof f[0] && f.unshift("%O");
      var p = 0;
      f[0] = f[0].replace(/%([a-zA-Z%]+)/g, (g, m) => {
        if ("%%" == g) {
          return g;
        }
        p++;
        if (m = c[m]) {
          g = m.call(b, f[p]), f.splice(p, 1), p--;
        }
        return g;
      });
      d.call(b, f);
      (b.log || e).apply(b, f);
    }
  }
  const c = a.formatters, d = a.formatArgs, e = a.log;
  let h;
  return b;
}
function Wa(a) {
  const b = Ua(a);
  "function" == typeof a.init && a.init(b);
  a.g.push(b);
  return b;
}
function Xa(a, b) {
  let c = 0;
  for (let d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d), c |= 0;
  }
  return a.colors[Math.abs(c) % a.colors.length];
}
function Ya(a) {
  var b = Y.load();
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
class Za {
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
function Va(a) {
  return a instanceof Error ? a.stack || a.message : a;
}
;const $a = a => {
  const b = Object.keys(a);
  return `{
    ${b.map(c => `${/-/.test(c) ? `'${c}'` : c}: '${a[c]}'`).join(",\n")}${b.length ? "," : ""}
  }`;
}, ab = a => {
  const b = [];
  b.push(`key: '${a.key}'`);
  b.push(`id: '${a.id}'`);
  Object.keys(a.props).length && b.push(`props: ${$a(a.props)}`);
  a.children.filter(Boolean).length && b.push(`children: ${JSON.stringify(a.children)}`);
  return `{
${b.map(c => `  ${c}`).join(",\n") + ","}
}`;
}, bb = a => "[" + a.map(b => ab(b)).join(",\n") + "]", cb = (a = !0, b = !1) => a ? `${b ? "" : "function makeIo(rootMargin = '0px 0px 76px 0px') {\n  const io = new IntersectionObserver((entries) => {\n    entries.forEach(({ target, isIntersecting }) => {\n      if (isIntersecting) {\n        if (target.render) {\n          console.warn('rendering component %s into the element %s ',\n            target.render.meta.key, target.render.meta.id)\n          target.render()\n          io.unobserve(target)\n        }\n      }\n    })\n  }, { rootMargin })\n  return io\n}\n"}const io = makeIo(${"string" == 
typeof a ? `'${a}'` : ""});
` : "", Z = a => a.replace(/(?:^|-)(.)/g, (b, c) => c.toUpperCase()), db = a => `const Components = {\n  ${a.map(({key:b}) => `'${b}': ${Z(b)}`).filter((b, c, d) => d.indexOf(b) == c).join(",\n  ")},\n}`, eb = (a, b) => {
  const c = {};
  a.reduce((d, {key:e}) => {
    if (d.includes(e)) {
      return d;
    }
    d.push(e);
    return d;
  }, []).forEach(d => {
    Object.entries(b).forEach(([e, h]) => {
      h = h.indexOf(d);
      0 > h || (c[e] || (c[e] = []), c[e][h] = d);
    });
  });
  return Object.entries(c).map(([d, e]) => {
    {
      const [h, ...f] = e;
      e = "import ";
      h && (e += Z(h));
      f.length && (e = e + (h ? ", " : "") + `{ ${f.map(Z).join(", ")} }`);
      d = e += ` from '${d}'`;
    }
    return d;
  }).join("\n");
};
var fb;
fb = function() {
  const a = new Za(Y);
  return function(b) {
    const c = Wa(a);
    c.namespace = b;
    c.useColors = Y.useColors();
    c.enabled = a.enabled(b);
    c.color = Xa(a, b);
    c.destroy = function() {
      a.destroy(this);
    };
    c.extend = function(d, e) {
      d = this.namespace + (void 0 === e ? ":" : e) + d;
      d.log = this.log;
      return d;
    };
    Ya(a);
    return c;
  };
}()("competent");
const gb = (a, b) => new RegExp(a.source.replace(new RegExp(`([|(])${b}([|)])`), (c, d, e) => "|" == d && "|" == e ? "|" : ")" == e ? e : "(" == d ? d : ""), a.flags);
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
  async function c(t, y, Q, B, k, K, q) {
    fb("render %s", k);
    try {
      const v = a[k], D = q.slice(0, K), r = q.slice(K + t.length);
      if (/\x3c!--\s*$/.test(D) && /^\s*--\x3e/.test(r)) {
        return t;
      }
      const [{content:E = "", props:x}] = qa(k, B);
      B = [E];
      let z = !1, w = !0, F = !1, L, ka, la, ma, na;
      const oa = e.call(this, {...x, children:B}, {export(n = !0) {
        z = n;
      }, setPretty(n, I) {
        L = n;
        I && (ka = I);
      }, renderAgain(n = !0, I = !1) {
        w = n;
        F = I;
      }, setChildContext(n) {
        ma = n;
      }, removeLine(n = !0) {
        na = n;
      }}, k);
      let A;
      try {
        const n = v.call(this, oa);
        A = n instanceof Promise ? await n : n;
      } catch (n) {
        if (!n.message.startsWith("Class constructor")) {
          throw n;
        }
        A = (new v).render(oa);
      }
      z && !A.attributes.id && (la = d.call(this), A.attributes.id = la);
      const pa = {pretty:L, lineLength:ka};
      let C;
      "string" == typeof A ? C = A : Array.isArray(A) ? C = A.map(n => "string" == typeof n ? n : N(n, pa)).join("\n") : C = N(A, pa);
      if (!C && na) {
        return f && f.call(this, k), "";
      }
      C = (y || "") + C.replace(/^/gm, Q);
      if (w) {
        let n;
        m ? n = m.call(this, k, F) : F ? n = {re:gb(u, k), replacement:c} : n = {re:u, replacement:c};
        const I = new Ka(n);
        if (g) {
          const hb = g.call(this, ma);
          Object.assign(I, hb);
        }
        C = await Ia(I, C);
      }
      z && h.call(this, k, A.attributes.id, x, B);
      f && f.call(this, k);
      return C;
    } catch (v) {
      return l && l.call(this, k, v, K, q), p ? "" : t;
    }
  }
  const {getId:d, getProps:e = (t, y) => ({...t, ...y}), markExported:h, onSuccess:f, onFail:l, removeOnError:p = !1, getContext:g, getReplacements:m} = b, u = new RegExp(`(\\n)?( *)(<${`(${Object.keys(a).join("|")})`}${"(?:\\s+(?!\\/>)[^>]*?)?"}(?:\\s*?/>|>[\\s\\S]*?<\\/\\4>))`, "gm");
  return {re:u, replacement:c};
}, _makeComponentsScript:(a, b, c = !1, d = {}, e = !1, h = {}) => {
  const {map:f, fileIo:l = !1} = h;
  b = f ? eb(a, f) : `import Components from '${b}'`;
  h = Object.keys(d).map(g => `props.${g} = ${d[g]}`).join("\n");
  const p = e ? "el.render = () => {\n      render(h(Comp, props, children), parent, el)\n    }\n    el.render.meta = { key, id }\n    io.observe(el)" : "render(h(Comp, props, children), parent, el)";
  return `import { render${c ? ", h" : ""} } from 'preact'
${b}${l ? "\n" + `import makeIo from '${"string" == typeof l ? l : "competent/make-io"}'` : ""}
${f ? `
${db(a)}
` : ""}
${cb(e, l)}${bb(a)}
  .map(({ key, id, props = {}, children }) => {
    const el = document.getElementById(id)
    if (!el) {
      console.warn('Parent element for component %s with id %s not found', key, id)
      return
    }
    const parent = el.parentElement
    if (!parent) {
      console.warn('Parent of element for component %s with id %s not found', key, id)
      return
    }
    const Comp = Components[key]
    if (!Comp) {
      console.warn('Component with key %s was not found.', key)
      return
    }
${h ? `    ${h}` : ""}
    ${p}
  })
`;
}};


//# sourceMappingURL=competent.js.map