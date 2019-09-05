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
  const q = Object.keys(a);
  h && q.sort();
  return {A:q.map(g => {
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
  const {pretty:f = !1, shallow:l = !1, renderRootComponent:q = !1, shallowHighOrder:g = !1, sortAttributes:m, allAttributes:u, xml:t, initialPadding:y = 0, closeVoidTags:Q = !1} = b;
  let {lineLength:B = 40} = b;
  B -= y;
  let {nodeName:k, attributes:K = {}} = a;
  var p = ["textarea", "pre"].includes(k), v = " ".repeat(y);
  const D = "string" == typeof f ? f : `  ${v}`;
  if ("object" != typeof a && !k) {
    return G(a);
  }
  if ("function" == typeof k) {
    if (!l || !d && q) {
      return v = ca(a), k.prototype && "function" == typeof k.prototype.render ? (p = new k(v, c), p._disable = p.__x = !0, p.props = v, p.context = c, k.getDerivedStateFromProps ? p.state = {...p.state, ...k.getDerivedStateFromProps(p.props, p.state)} : p.componentWillMount && p.componentWillMount(), v = p.render(p.props, p.state, p.context), p.getChildContext && (c = {...c, ...p.getChildContext()})) : v = k(v, c), M(v, b, c, g, e, h);
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
    !p && f && (ba(d) || d.length + O(r) > B) && (d = "\n" + D + `${d}`.replace(/(\n+)/g, "$1" + (D || "\t"))), r += d;
  } else {
    if (a.children) {
      let z = f && r.includes("\n");
      x = a.children.map(w => {
        if (null != w && !1 !== w && (w = M(w, b, c, !0, "svg" == k ? !0 : "foreignObject" == k ? !1 : e, h))) {
          return f && w.length + O(r) > B && (z = !0), w;
        }
      }).filter(Boolean);
      if (f && z && !p) {
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
  E || (a = x[x.length - 1], `${k}`.match(fa) && (a ? !/>$/.test(a) : 1) || p || !f || !r.includes("\n") || (r += `\n${v}`), r += `</${k}>`);
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
    e = h.slice(0, h.length - 2).reduce((f, l, q) => {
      q = c[q];
      if (!q || void 0 === l) {
        return f;
      }
      f[q] = l;
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
    d = pa(d);
    return {content:e, props:d, tag:c};
  });
}, pa = a => P(R, a, ["key", "val", "def", "f"]).reduce((b, {key:c, val:d}) => {
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
const {homedir:va} = os;
const wa = /\s+at.*(?:\(|\s)(.*)\)?/, xa = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, ya = va(), T = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = new RegExp(xa.source.replace("IGNORED_MODULES", c.join("|")));
  return a.replace(/\\/g, "/").split("\n").filter(e => {
    e = e.match(wa);
    if (null === e || !e[1]) {
      return !0;
    }
    e = e[1];
    return e.includes(".app/Contents/Resources/electron.asar") || e.includes(".app/Contents/Resources/default_app.asar") ? !1 : !d.test(e);
  }).filter(e => e.trim()).map(e => b ? e.replace(wa, (h, f) => h.replace(f, f.replace(ya, "~"))) : e).join("\n");
};
const za = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, Aa = (a, b = !1) => za(a, 2 + (b ? 1 : 0)), Ba = a => {
  ({callee:{caller:a}} = a);
  return a;
};
function Ca(a, b, c = !1) {
  return function(d) {
    var e = Ba(arguments), {stack:h} = Error();
    const f = za(h, 2, !0), l = (h = d instanceof Error) ? d.message : d;
    e = [`Error: ${l}`, ...null !== e && a === e || c ? [b] : [f, b]].join("\n");
    e = T(e);
    return Object.assign(h ? d : Error(), {message:l, stack:e});
  };
}
;function Da(a) {
  var {stack:b} = Error();
  const c = Ba(arguments);
  b = Aa(b, a);
  return Ca(c, b, a);
}
;const Ea = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class Fa extends ta {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {u:e = Da(!0), proxyError:h} = a || {}, f = (l, q) => e(q);
    super(d);
    this.g = [];
    this.m = new Promise((l, q) => {
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
          const m = T(g.stack);
          g.stack = m;
          h && f`${g}`;
        }
        q(g);
      });
      c && Ea(this, c).pipe(this);
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
const Ga = async a => {
  ({i:a} = new Fa({rs:a, u:Da(!0)}));
  return await a;
};
async function Ha(a, b) {
  return Ia(a, b);
}
class Ja extends sa {
  constructor(a, b) {
    super(b);
    this.i = (Array.isArray(a) ? a : [a]).filter(ua);
    this.g = !1;
    this.j = b;
  }
  async replace(a, b) {
    const c = new Ja(this.i, this.j);
    b && Object.assign(c, b);
    a = await Ha(c, a);
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
        const f = b.replace(c, (l, ...q) => {
          h = Error();
          try {
            if (this.g) {
              return e.length ? e.push(Promise.resolve(l)) : l;
            }
            const g = d.call(this, l, ...q);
            g instanceof Promise && e.push(g);
            return g;
          } catch (g) {
            S(h, g);
          }
        });
        if (e.length) {
          try {
            const l = await Promise.all(e);
            b = b.replace(c, () => l.shift());
          } catch (l) {
            S(h, l);
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
async function Ia(a, b) {
  b instanceof ra ? b.pipe(a) : a.end(b);
  return await Ga(a);
}
;var Ka = tty;
const {format:La, inspect:Ma} = util;
/*

 Copyright (c) 2016 Zeit, Inc.
 https://npmjs.org/ms
*/
function Na(a) {
  var b = {}, c = typeof a;
  if ("string" == c && 0 < a.length) {
    return Oa(a);
  }
  if ("number" == c && isFinite(a)) {
    return b.C ? (b = Math.abs(a), a = 864E5 <= b ? U(a, b, 864E5, "day") : 36E5 <= b ? U(a, b, 36E5, "hour") : 6E4 <= b ? U(a, b, 6E4, "minute") : 1000 <= b ? U(a, b, 1000, "second") : a + " ms") : (b = Math.abs(a), a = 864E5 <= b ? Math.round(a / 864E5) + "d" : 36E5 <= b ? Math.round(a / 36E5) + "h" : 6E4 <= b ? Math.round(a / 6E4) + "m" : 1000 <= b ? Math.round(a / 1000) + "s" : a + "ms"), a;
  }
  throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(a));
}
function Oa(a) {
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
const Pa = /\B(?=(\d{3})+(?!\d))/g, Qa = /(?:\.0*|(\.[^0]+)0+)$/, V = {b:1, kb:1024, mb:1048576, gb:1073741824, tb:Math.pow(1024, 4), pb:Math.pow(1024, 5)};
function W(a, b) {
  if (!Number.isFinite(a)) {
    return null;
  }
  const c = Math.abs(a), d = b && b.D || "", e = b && b.G || "", h = b && void 0 !== b.s ? b.s : 2, f = !(!b || !b.B);
  (b = b && b.F || "") && V[b.toLowerCase()] || (b = c >= V.pb ? "PB" : c >= V.tb ? "TB" : c >= V.gb ? "GB" : c >= V.mb ? "MB" : c >= V.kb ? "KB" : "B");
  a = (a / V[b.toLowerCase()]).toFixed(h);
  f || (a = a.replace(Qa, "$1"));
  d && (a = a.replace(Pa, d));
  return a + e + b;
}
;/*
 diff package https://github.com/kpdecker/jsdiff
 BSD License
 Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>
*/
const Ra = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90};
function X(a, b) {
  return (b = Ra[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;var Sa = {f:W, ["fy"](a) {
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
  return process.stderr.write(La(...a) + "\n");
}, formatArgs:function(a) {
  const {namespace:b, useColors:c, color:d, diff:e} = this;
  if (c) {
    const h = "\u001b[3" + (8 > d ? d : "8;5;" + d), f = `  ${h};1m${b} \u001B[0m`;
    a[0] = f + a[0].split("\n").join("\n" + f);
    a.push(h + "m+" + Na(e) + "\u001b[0m");
  } else {
    a[0] = (Y.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
  }
}, save:function(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}, load:function() {
  return process.env.DEBUG;
}, useColors:function() {
  return "colors" in Y ? !!Y.colors : Ka.isatty(process.stderr.fd);
}, colors:[6, 2, 3, 4, 5, 1], inspectOpts:Y, formatters:{o:function(a) {
  return Ma(a, {...this.inspectOpts, colors:this.useColors}).replace(/\s*\n\s*/g, " ");
}, O:function(a) {
  return Ma(a, {...this.inspectOpts, colors:this.useColors});
}, ...Sa}};
function Ta(a) {
  function b(...f) {
    if (b.enabled) {
      var l = Number(new Date);
      b.diff = l - (h || l);
      b.prev = h;
      h = b.curr = l;
      f[0] = Ua(f[0]);
      "string" != typeof f[0] && f.unshift("%O");
      var q = 0;
      f[0] = f[0].replace(/%([a-zA-Z%]+)/g, (g, m) => {
        if ("%%" == g) {
          return g;
        }
        q++;
        if (m = c[m]) {
          g = m.call(b, f[q]), f.splice(q, 1), q--;
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
function Va(a) {
  const b = Ta(a);
  "function" == typeof a.init && a.init(b);
  a.g.push(b);
  return b;
}
function Wa(a, b) {
  let c = 0;
  for (let d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d), c |= 0;
  }
  return a.colors[Math.abs(c) % a.colors.length];
}
function Xa(a) {
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
class Ya {
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
function Ua(a) {
  return a instanceof Error ? a.stack || a.message : a;
}
;const Za = a => {
  const b = Object.keys(a);
  return `{
    ${b.map(c => `${/-/.test(c) ? `'${c}'` : c}: '${a[c]}'`).join(",\n")}${b.length ? "," : ""}
  }`;
}, $a = a => {
  const b = [];
  b.push(`key: '${a.key}'`);
  b.push(`id: '${a.id}'`);
  Object.keys(a.props).length && b.push(`props: ${Za(a.props)}`);
  a.children.filter(Boolean).length && b.push(`children: ${JSON.stringify(a.children)}`);
  return `{
${b.map(c => `  ${c}`).join(",\n") + ","}
}`;
}, ab = (a = !0) => a ? `${"function makeIo(rootMargin = '0px 0px 76px 0px') {\n  const io = new IntersectionObserver((entries) => {\n    entries.forEach(({ target, isIntersecting }) => {\n      if (isIntersecting) {\n        if (target.render) {\n          console.warn('rendering component %s into the element %s ',\n            target.render.meta.key, target.render.meta.id)\n          target.render()\n          io.unobserve(target)\n        }\n      }\n    })\n  }, { rootMargin })\n  return io\n}"}
const io = makeIo(${"string" == typeof a ? `'${a}'` : ""});` : "";
var bb;
bb = function() {
  const a = new Ya(Z);
  return function(b) {
    const c = Va(a);
    c.namespace = b;
    c.useColors = Z.useColors();
    c.enabled = a.enabled(b);
    c.color = Wa(a, b);
    c.destroy = function() {
      a.destroy(this);
    };
    c.extend = function(d, e) {
      d = this.namespace + (void 0 === e ? ":" : e) + d;
      d.log = this.log;
      return d;
    };
    Xa(a);
    return c;
  };
}()("competent");
const cb = (a, b) => new RegExp(a.source.replace(new RegExp(`([|(])${b}([|)])`), (c, d, e) => "|" == d && "|" == e ? "|" : ")" == e ? e : "(" == d ? d : ""), a.flags);
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
  async function c(t, y, Q, B, k, K, p) {
    bb("render %s", k);
    try {
      const v = a[k], D = p.slice(0, K), r = p.slice(K + t.length);
      if (/\x3c!--\s*$/.test(D) && /^\s*--\x3e/.test(r)) {
        return t;
      }
      const [{content:E = "", props:x}] = qa(k, B);
      B = [E];
      let z = !1, w = !0, F = !1, L, ja, ka, la, ma;
      const na = e.call(this, {...x, children:B}, {export(n = !0) {
        z = n;
      }, setPretty(n, I) {
        L = n;
        I && (ja = I);
      }, renderAgain(n = !0, I = !1) {
        w = n;
        F = I;
      }, setChildContext(n) {
        la = n;
      }, removeLine(n = !0) {
        ma = n;
      }}, k);
      let A;
      try {
        const n = v.call(this, na);
        A = n instanceof Promise ? await n : n;
      } catch (n) {
        if (!n.message.startsWith("Class constructor")) {
          throw n;
        }
        A = (new v).render(na);
      }
      z && !A.attributes.id && (ka = d.call(this), A.attributes.id = ka);
      const oa = {pretty:L, lineLength:ja};
      let C;
      "string" == typeof A ? C = A : Array.isArray(A) ? C = A.map(n => "string" == typeof n ? n : N(n, oa)).join("\n") : C = N(A, oa);
      if (!C && ma) {
        return f && f.call(this, k), "";
      }
      C = (y || "") + C.replace(/^/gm, Q);
      if (w) {
        let n;
        m ? n = m.call(this, k, F) : F ? n = {re:cb(u, k), replacement:c} : n = {re:u, replacement:c};
        const I = new Ja(n);
        if (g) {
          const db = g.call(this, la);
          Object.assign(I, db);
        }
        C = await Ha(I, C);
      }
      z && h.call(this, k, A.attributes.id, x, B);
      f && f.call(this, k);
      return C;
    } catch (v) {
      return l && l.call(this, k, v, K, p), q ? "" : t;
    }
  }
  const {getId:d, getProps:e = (t, y) => ({...t, ...y}), markExported:h, onSuccess:f, onFail:l, removeOnError:q = !1, getContext:g, getReplacements:m} = b, u = new RegExp(`(\\n)?( *)(<${`(${Object.keys(a).join("|")})`}${"(?:\\s+(?!\\/>)[^>]*?)?"}(?:\\s*?/>|>[\\s\\S]*?<\\/\\4>))`, "gm");
  return {re:u, replacement:c};
}, _makeComponentsScript:(a, b, c = !1, d = {}, e = !1) => {
  const h = Object.keys(d).map(l => `props.${l} = ${d[l]}`).join("\n"), f = e ? "el.render = () => {\n      render(h(Comp, props, children), parent, el)\n    }\n    el.render.meta = { key, id }\n    io.observe(el)" : "render(h(Comp, props, children), parent, el)";
  return `import { render${c ? ", h" : ""} } from 'preact'
` + `import Components from '${b}'

${ab(e)}${"[" + a.map($a).join(",\n") + "]"}
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