#!/usr/bin/env node
             
const stream = require('stream');
const os = require('os');
const tty = require('tty');
const util = require('util');             
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
;const da = (a, b, {allAttributes:c, xml:d, w:e, sort:h, l:f} = {}) => {
  let k;
  const q = Object.keys(a);
  h && q.sort();
  return {A:q.map(g => {
    var l = a[g];
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
      if ("style" == g && l && "object" == typeof l) {
        {
          let t = "";
          for (var u in l) {
            let z = l[u];
            null != z && (t && (t += " "), t += G[u] || (G[u] = u.replace(/([A-Z])/g, "-$1").toLowerCase()), t += ": ", t += z, "number" == typeof z && !1 === aa.test(u) && (t += "px"), t += ";");
          }
          l = t || void 0;
        }
      }
      if ("dangerouslySetInnerHTML" == g) {
        k = l && l.__html;
      } else {
        if ((l || 0 === l || "" === l) && "function" != typeof l) {
          if (!0 === l || "" === l) {
            if (l = g, !d) {
              return g;
            }
          }
          u = "";
          if ("value" == g) {
            if ("select" == b) {
              f = l;
              return;
            }
            "option" == b && f == l && (u = "selected ");
          }
          return `${u}${g}="${F(l)}"`;
        }
      }
    }
  }).filter(Boolean), v:k, l:f};
};
const K = [], ea = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/, fa = /^(a|abbr|acronym|audio|b|bdi|bdo|big|br|button|canvas|cite|code|data|datalist|del|dfn|em|embed|i|iframe|img|input|ins|kbd|label|map|mark|meter|noscript|object|output|picture|progress|q|ruby|s|samp|slot|small|span|strong|sub|sup|svg|template|textarea|time|u|tt|var|video|wbr)$/, O = (a, b = {}) => {
  const {addDoctype:c, pretty:d} = b;
  a = N(a, b, {});
  return c ? `<!doctype html>${d ? "\n" : ""}${a}` : a;
};
function N(a, b = {}, c = {}, d = !1, e = !1, h) {
  if (null == a || "boolean" == typeof a) {
    return "";
  }
  const {pretty:f = !1, shallow:k = !1, renderRootComponent:q = !1, shallowHighOrder:g = !1, sortAttributes:l, allAttributes:u, xml:t, initialPadding:z = 0, closeVoidTags:I = !1} = b;
  let {lineLength:v = 40} = b;
  v -= z;
  let {nodeName:m, attributes:L = {}} = a;
  var n = ["textarea", "pre"].includes(m), y = " ".repeat(z);
  const D = "string" == typeof f ? f : `  ${y}`;
  if ("object" != typeof a && !m) {
    return F(a);
  }
  if ("function" == typeof m) {
    if (!k || !d && q) {
      return y = ca(a), m.prototype && "function" == typeof m.prototype.render ? (n = new m(y, c), n._disable = n.__x = !0, n.props = y, n.context = c, m.getDerivedStateFromProps ? n.state = {...n.state, ...m.getDerivedStateFromProps(n.props, n.state)} : n.componentWillMount && n.componentWillMount(), y = n.render(n.props, n.state, n.context), n.getChildContext && (c = {...c, ...n.getChildContext()})) : y = m(y, c), N(y, b, c, g, e, h);
    }
    m = m.displayName || m !== Function && m.name || ha(m);
  }
  let r = "";
  ({A:B, v:d, l:h} = da(L, m, {allAttributes:u, xml:t, w:e, sort:l, l:h}));
  if (f) {
    let C = `<${m}`.length;
    r = B.reduce((w, J) => {
      const M = C + 1 + J.length;
      if (M > v) {
        return C = D.length, `${w}\n${D}${J}`;
      }
      C = M;
      return `${w} ${J}`;
    }, "");
  } else {
    r = B.length ? " " + B.join(" ") : "";
  }
  r = `<${m}${r}>`;
  if (`${m}`.match(/[\s\n\\/='"\0<>]/)) {
    throw r;
  }
  var B = `${m}`.match(ea);
  I && B && (r = r.replace(/>$/, " />"));
  let x = [];
  if (d) {
    !n && f && (ba(d) || d.length + P(r) > v) && (d = "\n" + D + `${d}`.replace(/(\n+)/g, "$1" + (D || "\t"))), r += d;
  } else {
    if (a.children) {
      let C = f && r.includes("\n");
      x = a.children.map(w => {
        if (null != w && !1 !== w && (w = N(w, b, c, !0, "svg" == m ? !0 : "foreignObject" == m ? !1 : e, h))) {
          return f && w.length + P(r) > v && (C = !0), w;
        }
      }).filter(Boolean);
      if (f && C && !n) {
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
  B || (a = x[x.length - 1], `${m}`.match(fa) && (a ? !/>$/.test(a) : 1) || n || !f || !r.includes("\n") || (r += `\n${y}`), r += `</${m}>`);
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
const P = a => {
  a = a.split("\n");
  return a[a.length - 1].length;
};
function Q(a, b, c) {
  const d = [];
  b.replace(a, (e, ...h) => {
    e = h.slice(0, h.length - 2).reduce((f, k, q) => {
      q = c[q];
      if (!q || void 0 === k) {
        return f;
      }
      f[q] = k;
      return f;
    }, {});
    d.push(e);
  });
  return d;
}
;const R = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), ia = new RegExp(`(?:\\s+((?:${R.source}\\s*)*))`);
const pa = (a, b) => {
  a = (Array.isArray(a) ? a : [a]).join("|");
  return Q(new RegExp(`<(${a})${ia.source}?(?:${/\s*\/>/.source}|${/>([\s\S]+?)?<\/\1>/.source})`, "g"), b, "t a v v1 v2 c".split(" ")).map(({t:c, a:d = "", c:e = ""}) => {
    d = d.replace(/\/$/, "").trim();
    d = oa(d);
    return {content:e, props:d, tag:c};
  });
}, oa = a => Q(R, a, ["key", "val", "def", "f"]).reduce((b, {key:c, val:d}) => {
  if (void 0 === d) {
    return b[c] = !0, b;
  }
  b[c] = "true" == d ? !0 : "false" == d ? !1 : /^\d+$/.test(d) ? parseInt(d, 10) : d;
  return b;
}, {});
var qa = stream;
const {Transform:ra, Writable:sa} = stream;
function ta(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const {re:b, replacement:c} = a;
  a = b instanceof RegExp;
  const d = -1 != ["string", "function"].indexOf(typeof c);
  return a && d;
}
const S = (a, b) => {
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
const {homedir:ua} = os;
const va = /\s+at.*(?:\(|\s)(.*)\)?/, wa = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, xa = ua(), T = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = new RegExp(wa.source.replace("IGNORED_MODULES", c.join("|")));
  return a.replace(/\\/g, "/").split("\n").filter(e => {
    e = e.match(va);
    if (null === e || !e[1]) {
      return !0;
    }
    e = e[1];
    return e.includes(".app/Contents/Resources/electron.asar") || e.includes(".app/Contents/Resources/default_app.asar") ? !1 : !d.test(e);
  }).filter(e => e.trim()).map(e => b ? e.replace(va, (h, f) => h.replace(f, f.replace(xa, "~"))) : e).join("\n");
};
const ya = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, za = (a, b = !1) => ya(a, 2 + (b ? 1 : 0)), Aa = a => {
  ({callee:{caller:a}} = a);
  return a;
};
function Ba(a, b, c = !1) {
  return function(d) {
    var e = Aa(arguments), {stack:h} = Error();
    const f = ya(h, 2, !0), k = (h = d instanceof Error) ? d.message : d;
    e = [`Error: ${k}`, ...null !== e && a === e || c ? [b] : [f, b]].join("\n");
    e = T(e);
    return Object.assign(h ? d : Error(), {message:k, stack:e});
  };
}
;function Ca(a) {
  var {stack:b} = Error();
  const c = Aa(arguments);
  b = za(b, a);
  return Ba(c, b, a);
}
;const Da = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class Ea extends sa {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {u:e = Ca(!0), proxyError:h} = a || {}, f = (k, q) => e(q);
    super(d);
    this.g = [];
    this.m = new Promise((k, q) => {
      this.on("finish", () => {
        let g;
        b ? g = Buffer.concat(this.g) : g = this.g.join("");
        k(g);
        this.g = [];
      });
      this.once("error", g => {
        if (-1 == g.stack.indexOf("\n")) {
          f`${g}`;
        } else {
          const l = T(g.stack);
          g.stack = l;
          h && f`${g}`;
        }
        q(g);
      });
      c && Da(this, c).pipe(this);
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
const Fa = async a => {
  ({i:a} = new Ea({rs:a, u:Ca(!0)}));
  return await a;
};
async function Ga(a, b) {
  return Ha(a, b);
}
class Ia extends ra {
  constructor(a, b) {
    super(b);
    this.i = (Array.isArray(a) ? a : [a]).filter(ta);
    this.g = !1;
    this.j = b;
  }
  async replace(a, b) {
    const c = new Ia(this.i, this.j);
    b && Object.assign(c, b);
    a = await Ga(c, a);
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
        const f = b.replace(c, (k, ...q) => {
          h = Error();
          try {
            if (this.g) {
              return e.length ? e.push(Promise.resolve(k)) : k;
            }
            const g = d.call(this, k, ...q);
            g instanceof Promise && e.push(g);
            return g;
          } catch (g) {
            S(h, g);
          }
        });
        if (e.length) {
          try {
            const k = await Promise.all(e);
            b = b.replace(c, () => k.shift());
          } catch (k) {
            S(h, k);
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
      a = T(d.stack), d.stack = a, c(d);
    }
  }
}
async function Ha(a, b) {
  b instanceof qa ? b.pipe(a) : a.end(b);
  return await Fa(a);
}
;var Ja = tty;
const {format:Ka, inspect:La} = util;
/*

 Copyright (c) 2016 Zeit, Inc.
 https://npmjs.org/ms
*/
function Ma(a) {
  var b = {}, c = typeof a;
  if ("string" == c && 0 < a.length) {
    return Na(a);
  }
  if ("number" == c && isFinite(a)) {
    return b.C ? (b = Math.abs(a), a = 864E5 <= b ? U(a, b, 864E5, "day") : 36E5 <= b ? U(a, b, 36E5, "hour") : 6E4 <= b ? U(a, b, 6E4, "minute") : 1000 <= b ? U(a, b, 1000, "second") : a + " ms") : (b = Math.abs(a), a = 864E5 <= b ? Math.round(a / 864E5) + "d" : 36E5 <= b ? Math.round(a / 36E5) + "h" : 6E4 <= b ? Math.round(a / 6E4) + "m" : 1000 <= b ? Math.round(a / 1000) + "s" : a + "ms"), a;
  }
  throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(a));
}
function Na(a) {
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
const Oa = /\B(?=(\d{3})+(?!\d))/g, Pa = /(?:\.0*|(\.[^0]+)0+)$/, V = {b:1, kb:1024, mb:1048576, gb:1073741824, tb:Math.pow(1024, 4), pb:Math.pow(1024, 5)};
function W(a, b) {
  if (!Number.isFinite(a)) {
    return null;
  }
  const c = Math.abs(a), d = b && b.D || "", e = b && b.G || "", h = b && void 0 !== b.s ? b.s : 2, f = !(!b || !b.B);
  (b = b && b.F || "") && V[b.toLowerCase()] || (b = c >= V.pb ? "PB" : c >= V.tb ? "TB" : c >= V.gb ? "GB" : c >= V.mb ? "MB" : c >= V.kb ? "KB" : "B");
  a = (a / V[b.toLowerCase()]).toFixed(h);
  f || (a = a.replace(Pa, "$1"));
  d && (a = a.replace(Oa, d));
  return a + e + b;
}
;/*
 diff package https://github.com/kpdecker/jsdiff
 BSD License
 Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>
*/
const Qa = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90};
function X(a, b) {
  return (b = Qa[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;var Ra = {f:W, ["fy"](a) {
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
const Y = Object.keys(process.env).filter(a => /^debug_/i.test(a)).reduce((a, b) => {
  const c = b.substring(6).toLowerCase().replace(/_([a-z])/g, (d, e) => e.toUpperCase());
  b = process.env[b];
  /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : "null" === b ? b = null : b = Number(b);
  a[c] = b;
  return a;
}, {}), Z = {init:function(a) {
  a.inspectOpts = {...Y};
}, log:function(...a) {
  return process.stderr.write(Ka(...a) + "\n");
}, formatArgs:function(a) {
  const {namespace:b, useColors:c, color:d, diff:e} = this;
  if (c) {
    const h = "\u001b[3" + (8 > d ? d : "8;5;" + d), f = `  ${h};1m${b} \u001B[0m`;
    a[0] = f + a[0].split("\n").join("\n" + f);
    a.push(h + "m+" + Ma(e) + "\u001b[0m");
  } else {
    a[0] = (Y.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
  }
}, save:function(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}, load:function() {
  return process.env.DEBUG;
}, useColors:function() {
  return "colors" in Y ? !!Y.colors : Ja.isatty(process.stderr.fd);
}, colors:[6, 2, 3, 4, 5, 1], inspectOpts:Y, formatters:{o:function(a) {
  return La(a, {...this.inspectOpts, colors:this.useColors}).replace(/\s*\n\s*/g, " ");
}, O:function(a) {
  return La(a, {...this.inspectOpts, colors:this.useColors});
}, ...Ra}};
function Sa(a) {
  function b(...f) {
    if (b.enabled) {
      var k = Number(new Date);
      b.diff = k - (h || k);
      b.prev = h;
      h = b.curr = k;
      f[0] = Ta(f[0]);
      "string" != typeof f[0] && f.unshift("%O");
      var q = 0;
      f[0] = f[0].replace(/%([a-zA-Z%]+)/g, (g, l) => {
        if ("%%" == g) {
          return g;
        }
        q++;
        if (l = c[l]) {
          g = l.call(b, f[q]), f.splice(q, 1), q--;
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
function Ua(a) {
  const b = Sa(a);
  "function" == typeof a.init && a.init(b);
  a.g.push(b);
  return b;
}
function Va(a, b) {
  let c = 0;
  for (let d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d), c |= 0;
  }
  return a.colors[Math.abs(c) % a.colors.length];
}
function Wa(a) {
  var b = Z.load();
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
class Xa {
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
function Ta(a) {
  return a instanceof Error ? a.stack || a.message : a;
}
;const Ya = a => {
  const b = Object.keys(a);
  return `{
    ${b.map(c => `${/-/.test(c) ? `'${c}'` : c}: '${a[c]}'`).join(",\n")}${b.length ? "," : ""}
  }`;
}, Za = a => {
  const b = [];
  b.push(`key: '${a.key}'`);
  b.push(`id: '${a.id}'`);
  Object.keys(a.props).length && b.push(`props: ${Ya(a.props)}`);
  a.children.filter(Boolean).length && b.push(`children: ${JSON.stringify(a.children)}`);
  return `{
${b.map(c => `  ${c}`).join(",\n") + ","}
}`;
}, $a = (a = !0) => a ? `${"function makeIo(rootMargin = '0px 0px 76px 0px') {\n  const io = new IntersectionObserver((entries) => {\n    entries.forEach(({ target, isIntersecting }) => {\n      if (isIntersecting) {\n        if (target.render) {\n          console.warn('rendering component %s into the element %s ',\n            target.render.meta.key, target.render.meta.id)\n          target.render()\n          io.unobserve(target)\n        }\n      }\n    })\n  }, { rootMargin })\n  return io\n}"}
const io = makeIo(${"string" == typeof a ? `'${a}'` : ""});` : "";
var ab;
ab = function() {
  const a = new Xa(Z);
  return function(b) {
    const c = Ua(a);
    c.namespace = b;
    c.useColors = Z.useColors();
    c.enabled = a.enabled(b);
    c.color = Va(a, b);
    c.destroy = function() {
      a.destroy(this);
    };
    c.extend = function(d, e) {
      d = this.namespace + (void 0 === e ? ":" : e) + d;
      d.log = this.log;
      return d;
    };
    Wa(a);
    return c;
  };
}()("competent");
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
  async function c(t, z, I, v, m, L) {
    ab("render %s", v);
    try {
      const n = a[v], y = L.slice(0, m), D = L.slice(m + t.length);
      if (/\x3c!--\s*$/.test(y) && /^\s*--\x3e/.test(D)) {
        return t;
      }
      const [{content:r = "", props:B}] = pa(v, I);
      I = [r];
      let x = !1, C = !0, w = !1, J, M, ja, ka;
      const la = e.call(this, {...B, children:I}, {export(p = !0) {
        x = p;
      }, setPretty(p, H) {
        J = p;
        H && (M = H);
      }, renderAgain(p = !0, H = !1) {
        C = p;
        w = H;
      }, setChildContext(p) {
        ka = p;
      }}, v);
      let A;
      try {
        const p = n.call(this, la);
        A = p instanceof Promise ? await p : p;
      } catch (p) {
        if (!p.message.startsWith("Class constructor")) {
          throw p;
        }
        A = (new n).render(la);
      }
      x && !A.attributes.id && (ja = d.call(this), A.attributes.id = ja);
      const ma = {pretty:J, lineLength:M};
      let E;
      "string" == typeof A ? E = A : Array.isArray(A) ? E = A.map(p => "string" == typeof p ? p : O(p, ma)).join("\n") : E = O(A, ma);
      E = E.replace(/^/gm, z);
      if (C) {
        let p;
        l ? p = l.call(this, v, w) : w ? p = {re:new RegExp(u.source.replace(new RegExp(`([|(])${v}([|)])`), (na, bb, cb) => bb && cb ? "|" : ""), u.flags), replacement:c} : p = {re:u, replacement:c};
        const H = new Ia(p);
        if (g) {
          const na = g.call(this, ka);
          Object.assign(H, na);
        }
        E = await Ga(H, E);
      }
      x && h.call(this, v, A.attributes.id, B, I);
      f && f.call(this, v);
      return E;
    } catch (n) {
      return k && k.call(this, v, n, m, L), q ? "" : t;
    }
  }
  const {getId:d, getProps:e = (t, z) => ({...t, ...z}), markExported:h, onSuccess:f, onFail:k, removeOnError:q = !1, getContext:g, getReplacements:l} = b, u = new RegExp(`( *)(<${`(${Object.keys(a).join("|")})`}${"(?:\\s+(?!\\/>)[^>]*?)?"}(?:\\s*?/>|>[\\s\\S]*?<\\/\\3>))`, "gm");
  return {re:u, replacement:c};
}, _makeComponentsScript:(a, b, c = !1, d = {}, e = !1) => {
  const h = Object.keys(d).map(k => `props.${k} = ${d[k]}`).join("\n"), f = e ? "el.render = () => {\n      render(h(Comp, props, children), parent, el)\n    }\n    el.render.meta = { key, id }\n    io.observe(el)" : "render(h(Comp, props, children), parent, el)";
  return `import { render${c ? ", h" : ""} } from 'preact'
` + `import Components from '${b}'

${$a(e)}${"[" + a.map(Za).join(",\n") + "]"}
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
    ${f}
  })
`;
}};


//# sourceMappingURL=competent.js.map