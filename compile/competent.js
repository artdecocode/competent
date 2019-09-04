#!/usr/bin/env node
             
const stream = require('stream');
const os = require('os');             
const ea = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
let K = a => `${a}`.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), fa = a => 40 < `${a}`.length || -1 != `${a}`.indexOf("\n") || -1 !== `${a}`.indexOf("<");
const L = {};
function ha(a) {
  const b = {...a.attributes, children:a.children};
  a = a.nodeName.defaultProps;
  if (void 0 !== a) {
    for (let c in a) {
      void 0 === b[c] && (b[c] = a[c]);
    }
  }
  return b;
}
;const ia = (a, b, {allAttributes:c, xml:d, o:e, sort:l, g} = {}) => {
  let h;
  const q = Object.keys(a);
  l && q.sort();
  return {s:q.map(f => {
    var m = a[f];
    if ("children" != f && !f.match(/[\s\n\\/='"\0<>]/) && (c || !["key", "ref"].includes(f))) {
      if ("className" == f) {
        if (a.class) {
          return;
        }
        f = "class";
      } else {
        if ("htmlFor" == f) {
          if (a.for) {
            return;
          }
          f = "for";
        } else {
          if ("srcSet" == f) {
            if (a.srcset) {
              return;
            }
            f = "srcset";
          }
        }
      }
      e && f.match(/^xlink:?./) && (f = f.toLowerCase().replace(/^xlink:?/, "xlink:"));
      if ("style" == f && m && "object" == typeof m) {
        {
          let r = "";
          for (var u in m) {
            let z = m[u];
            null != z && (r && (r += " "), r += L[u] || (L[u] = u.replace(/([A-Z])/g, "-$1").toLowerCase()), r += ": ", r += z, "number" == typeof z && !1 === ea.test(u) && (r += "px"), r += ";");
          }
          m = r || void 0;
        }
      }
      if ("dangerouslySetInnerHTML" == f) {
        h = m && m.__html;
      } else {
        if ((m || 0 === m || "" === m) && "function" != typeof m) {
          if (!0 === m || "" === m) {
            if (m = f, !d) {
              return f;
            }
          }
          u = "";
          if ("value" == f) {
            if ("select" == b) {
              g = m;
              return;
            }
            "option" == b && g == m && (u = "selected ");
          }
          return `${u}${f}="${K(m)}"`;
        }
      }
    }
  }).filter(Boolean), m:h, g};
};
const M = [], ja = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/, ka = /^(a|abbr|acronym|audio|b|bdi|bdo|big|br|button|canvas|cite|code|data|datalist|del|dfn|em|embed|i|iframe|img|input|ins|kbd|label|map|mark|meter|noscript|object|output|picture|progress|q|ruby|s|samp|slot|small|span|strong|sub|sup|svg|template|textarea|time|u|tt|var|video|wbr)$/, O = (a, b = {}) => {
  const {addDoctype:c, pretty:d} = b;
  a = N(a, b, {});
  return c ? `<!doctype html>${d ? "\n" : ""}${a}` : a;
};
function N(a, b = {}, c = {}, d = !1, e = !1, l) {
  if (null == a || "boolean" == typeof a) {
    return "";
  }
  const {pretty:g = !1, shallow:h = !1, renderRootComponent:q = !1, shallowHighOrder:f = !1, sortAttributes:m, allAttributes:u, xml:r, initialPadding:z = 0, closeVoidTags:F = !1} = b;
  let {lineLength:v = 40} = b;
  v -= z;
  let {nodeName:k, attributes:H = {}} = a;
  var n = ["textarea", "pre"].includes(k), y = " ".repeat(z);
  const D = "string" == typeof g ? g : `  ${y}`;
  if ("object" != typeof a && !k) {
    return K(a);
  }
  if ("function" == typeof k) {
    if (!h || !d && q) {
      return y = ha(a), k.prototype && "function" == typeof k.prototype.render ? (n = new k(y, c), n._disable = n.__x = !0, n.props = y, n.context = c, k.getDerivedStateFromProps ? n.state = {...n.state, ...k.getDerivedStateFromProps(n.props, n.state)} : n.componentWillMount && n.componentWillMount(), y = n.render(n.props, n.state, n.context), n.getChildContext && (c = {...c, ...n.getChildContext()})) : y = k(y, c), N(y, b, c, f, e, l);
    }
    k = k.displayName || k !== Function && k.name || la(k);
  }
  let p = "";
  ({s:B, m:d, g:l} = ia(H, k, {allAttributes:u, xml:r, o:e, sort:m, g:l}));
  if (g) {
    let C = `<${k}`.length;
    p = B.reduce((w, G) => {
      const I = C + 1 + G.length;
      if (I > v) {
        return C = D.length, `${w}\n${D}${G}`;
      }
      C = I;
      return `${w} ${G}`;
    }, "");
  } else {
    p = B.length ? " " + B.join(" ") : "";
  }
  p = `<${k}${p}>`;
  if (`${k}`.match(/[\s\n\\/='"\0<>]/)) {
    throw p;
  }
  var B = `${k}`.match(ja);
  F && B && (p = p.replace(/>$/, " />"));
  let x = [];
  if (d) {
    g && (fa(d) || d.length + P(p) > v) && (d = "\n" + D + `${d}`.replace(/(\n+)/g, "$1" + (D || "\t"))), p += d;
  } else {
    if (a.children) {
      let C = g && p.includes("\n");
      x = a.children.map(w => {
        if (null != w && !1 !== w && (w = N(w, b, c, !0, "svg" == k ? !0 : "foreignObject" == k ? !1 : e, l))) {
          return g && w.length + P(p) > v && (C = !0), w;
        }
      }).filter(Boolean);
      if (g && C && !n) {
        for (a = x.length; a--;) {
          x[a] = "\n" + D + `${x[a]}`.replace(/(\n+)/g, "$1" + (D || "\t"));
        }
      }
    }
  }
  if (x.length) {
    p += x.join("");
  } else {
    if (r) {
      return p.substring(0, p.length - 1) + " />";
    }
  }
  B || (a = x[x.length - 1], `${k}`.match(ka) && (a ? !/>$/.test(a) : 1) || n || !g || !p.includes("\n") || (p += `\n${y}`), p += `</${k}>`);
  return p;
}
function la(a) {
  var b = (Function.prototype.toString.call(a).match(/^\s*function\s+([^( ]+)/) || "")[1];
  if (!b) {
    b = -1;
    for (let c = M.length; c--;) {
      if (M[c] === a) {
        b = c;
        break;
      }
    }
    0 > b && (b = M.push(a) - 1);
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
  b.replace(a, (e, ...l) => {
    e = l.slice(0, l.length - 2).reduce((g, h, q) => {
      q = c[q];
      if (!q || void 0 === h) {
        return g;
      }
      g[q] = h;
      return g;
    }, {});
    d.push(e);
  });
  return d;
}
;const R = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), ma = new RegExp(`(?:\\s+((?:${R.source}\\s*)*))`);
const oa = (a, b) => Q(new RegExp(`<(${(Array.isArray(a) ? a : [a]).join("|")})${ma.source}?(?:${/\s*\/>/.source}|${/>([\s\S]+?)?<\/\1>/.source})`, "g"), b, "t a v v1 v2 c".split(" ")).map(({t:c, a:d = "", c:e = ""}) => {
  d = d.replace(/\/$/, "").trim();
  d = na(d);
  return {content:e, props:d, tag:c};
}), na = a => Q(R, a, ["key", "val", "def", "f"]).reduce((b, {key:c, val:d}) => {
  if (void 0 === d) {
    return b[c] = !0, b;
  }
  b[c] = "true" == d ? !0 : "false" == d ? !1 : /^\d+$/.test(d) ? parseInt(d, 10) : d;
  return b;
}, {});
var pa = stream;
const {Transform:qa, Writable:ra} = stream;
function sa(a) {
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
const {homedir:ta} = os;
const T = /\s+at.*(?:\(|\s)(.*)\)?/, ua = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, va = ta(), U = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = new RegExp(ua.source.replace("IGNORED_MODULES", c.join("|")));
  return a.replace(/\\/g, "/").split("\n").filter(e => {
    e = e.match(T);
    if (null === e || !e[1]) {
      return !0;
    }
    e = e[1];
    return e.includes(".app/Contents/Resources/electron.asar") || e.includes(".app/Contents/Resources/default_app.asar") ? !1 : !d.test(e);
  }).filter(e => e.trim()).map(e => b ? e.replace(T, (l, g) => l.replace(g, g.replace(va, "~"))) : e).join("\n");
};
const V = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, wa = (a, b = !1) => V(a, 2 + (b ? 1 : 0)), W = a => {
  ({callee:{caller:a}} = a);
  return a;
};
function xa(a, b, c = !1) {
  return function(d) {
    var e = W(arguments), {stack:l} = Error();
    const g = V(l, 2, !0), h = (l = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = U(e);
    return Object.assign(l ? d : Error(), {message:h, stack:e});
  };
}
;function X(a) {
  var {stack:b} = Error();
  const c = W(arguments);
  b = wa(b, a);
  return xa(c, b, a);
}
;const ya = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class za extends ra {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {j:e = X(!0), proxyError:l} = a || {}, g = (h, q) => e(q);
    super(d);
    this.b = [];
    this.i = new Promise((h, q) => {
      this.on("finish", () => {
        let f;
        b ? f = Buffer.concat(this.b) : f = this.b.join("");
        h(f);
        this.b = [];
      });
      this.once("error", f => {
        if (-1 == f.stack.indexOf("\n")) {
          g`${f}`;
        } else {
          const m = U(f.stack);
          f.stack = m;
          l && g`${f}`;
        }
        q(f);
      });
      c && ya(this, c).pipe(this);
    });
  }
  _write(a, b, c) {
    this.b.push(a);
    c();
  }
  get f() {
    return this.i;
  }
}
const Aa = async a => {
  ({f:a} = new za({rs:a, j:X(!0)}));
  return await a;
};
async function Y(a, b) {
  return Ba(a, b);
}
class Z extends qa {
  constructor(a, b) {
    super(b);
    this.f = (Array.isArray(a) ? a : [a]).filter(sa);
    this.b = !1;
    this.l = b;
  }
  async replace(a, b) {
    const c = new Z(this.f, this.l);
    b && Object.assign(c, b);
    a = await Y(c, a);
    c.b && this.brake();
    b && Object.keys(b).forEach(d => {
      b[d] = c[d];
    });
    return a;
  }
  brake() {
    this.b = !0;
  }
  async reduce(a) {
    return await this.f.reduce(async(b, {re:c, replacement:d}) => {
      b = await b;
      if (this.b) {
        return b;
      }
      if ("string" == typeof d) {
        b = b.replace(c, d);
      } else {
        const e = [];
        let l;
        const g = b.replace(c, (h, ...q) => {
          l = Error();
          try {
            if (this.b) {
              return e.length ? e.push(Promise.resolve(h)) : h;
            }
            const f = d.call(this, h, ...q);
            f instanceof Promise && e.push(f);
            return f;
          } catch (f) {
            S(l, f);
          }
        });
        if (e.length) {
          try {
            const h = await Promise.all(e);
            b = b.replace(c, () => h.shift());
          } catch (h) {
            S(l, h);
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
      a = U(d.stack), d.stack = a, c(d);
    }
  }
}
async function Ba(a, b) {
  b instanceof pa ? b.pipe(a) : a.end(b);
  return await Aa(a);
}
;const Ca = a => {
  const b = Object.keys(a);
  return `{
    ${b.map(c => `${/-/.test(c) ? `'${c}'` : c}: '${a[c]}'`).join(",\n")}${b.length ? "," : ""}
  }`;
}, Da = a => {
  const b = [];
  b.push(`key: '${a.key}'`);
  b.push(`id: '${a.id}'`);
  Object.keys(a.props).length && b.push(`props: ${Ca(a.props)}`);
  a.children.filter(Boolean).length && b.push(`children: ${JSON.stringify(a.children)}`);
  return `{
${b.map(c => `  ${c}`).join(",\n") + ","}
}`;
}, Ea = (a = !0) => a ? `${"function makeIo(rootMargin = '0px 0px 76px 0px') {\n  const io = new IntersectionObserver((entries) => {\n    entries.forEach(({ target, isIntersecting }) => {\n      if (isIntersecting) {\n        if (target.render) {\n          console.warn('rendering component %s into the element %s ',\n            target.render.meta.key, target.render.meta.id)\n          target.render()\n          io.unobserve(target)\n        }\n      }\n    })\n  }, { rootMargin })\n  return io\n}"}
const io = makeIo(${"string" == typeof a ? `'${a}'` : ""});` : "";
module.exports = {_competent:(a, b = {}) => {
  async function c(r, z, F, v, k, H) {
    try {
      const n = a[v], y = H.slice(0, k), D = H.slice(k + r.length);
      if (/\x3c!--\s*$/.test(y) && /^\s*--\x3e/.test(D)) {
        return r;
      }
      const [{content:p = "", props:B}] = oa(v, F);
      F = [p];
      let x = !1, C = !0, w = !1, G, I, aa;
      const ba = e.call(this, {...B, children:F}, {export(t = !0) {
        x = t;
      }, setPretty(t, J) {
        G = t;
        J && (I = J);
      }, renderAgain(t = !1) {
        C = !0;
        w = t;
      }}, v);
      let A;
      try {
        A = await n(ba);
      } catch (t) {
        if (!t.message.startsWith("Class constructor")) {
          throw t;
        }
        A = (new n).render(ba);
      }
      x && !A.attributes.id && (aa = d.call(this), A.attributes.id = aa);
      const ca = {pretty:G, lineLength:I};
      let E;
      "string" == typeof A ? E = A : Array.isArray(A) ? E = A.map(t => "string" == typeof t ? t : O(t, ca)).join("\n") : E = O(A, ca);
      E = E.replace(/^/gm, z);
      if (C) {
        let t;
        m ? t = m.call(this, v, w) : t = {re:new RegExp(u.source.replace(new RegExp(`(\\|)?${v}(\\|)?`), (da, Fa, Ga) => Fa && Ga ? "|" : ""), u.flags), replacement:c};
        const J = new Z(t);
        if (f) {
          const da = f.call(this);
          Object.assign(J, da);
        }
        E = await Y(J, E);
      }
      x && l.call(this, v, A.attributes.id, B, F);
      g && g.call(this, v);
      return E;
    } catch (n) {
      return h && h.call(this, v, n, k, H), q ? "" : r;
    }
  }
  const {getId:d, getProps:e = (r, z) => ({...r, ...z}), markExported:l, onSuccess:g, onFail:h, removeOnError:q = !1, getContext:f, getReplacements:m} = b, u = new RegExp(`( *)(<${`(${Object.keys(a).join("|")})`}${"(?:\\s+(?!\\/>)[^>]*?)?"}(?:\\s*?/>|>[\\s\\S]*?<\\/\\3>))`, "gm");
  return {re:u, replacement:c};
}, _makeComponentsScript:(a, b, c = !1, d = {}, e = !1) => {
  const l = Object.keys(d).map(h => `props.${h} = ${d[h]}`).join("\n"), g = e ? "el.render = () => {\n      render(h(Comp, props, children), parent, el)\n    }\n    el.render.meta = { key, id }\n    io.observe(el)" : "render(h(Comp, props, children), parent, el)";
  return `import { render${c ? ", h" : ""} } from 'preact'
` + `import Components from '${b}'

${Ea(e)}${"[" + a.map(Da).join(",\n") + "]"}
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
${l ? `    ${l}` : ""}
    ${g}
  })
`;
}};


//# sourceMappingURL=competent.js.map