#!/usr/bin/env node
             
const stream = require('stream');
const os = require('os');             
const da = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
let I = a => `${a}`.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), ea = a => 40 < `${a}`.length || -1 != `${a}`.indexOf("\n") || -1 !== `${a}`.indexOf("<");
const J = {};
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
;const ha = (a, b, {allAttributes:c, xml:d, o:e, sort:l, g} = {}) => {
  let k;
  const r = Object.keys(a);
  l && r.sort();
  return {s:r.map(f => {
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
          let t = "";
          for (var u in m) {
            let x = m[u];
            null != x && (t && (t += " "), t += J[u] || (J[u] = u.replace(/([A-Z])/g, "-$1").toLowerCase()), t += ": ", t += x, "number" == typeof x && !1 === da.test(u) && (t += "px"), t += ";");
          }
          m = t || void 0;
        }
      }
      if ("dangerouslySetInnerHTML" == f) {
        k = m && m.__html;
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
          return `${u}${f}="${I(m)}"`;
        }
      }
    }
  }).filter(Boolean), m:k, g};
};
const K = [], ia = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/, M = (a, b = {}) => {
  const {addDoctype:c, pretty:d} = b;
  a = L(a, b, {});
  return c ? `<!doctype html>${d ? "\n" : ""}${a}` : a;
};
function L(a, b = {}, c = {}, d = !1, e = !1, l) {
  if (null == a || "boolean" == typeof a) {
    return "";
  }
  const {pretty:g = !1, shallow:k = !1, renderRootComponent:r = !1, shallowHighOrder:f = !1, sortAttributes:m, allAttributes:u, xml:t, lineLength:x = 40, closeVoidTags:D = !1} = b;
  let {nodeName:h, attributes:F = {}} = a;
  var n = ["textarea", "pre"].includes(h);
  const v = "string" == typeof g ? g : "  ";
  if ("object" != typeof a && !h) {
    return I(a);
  }
  if ("function" == typeof h) {
    if (!k || !d && r) {
      return a = fa(a), h.prototype && "function" == typeof h.prototype.render ? (n = new h(a, c), n._disable = n.__x = !0, n.props = a, n.context = c, h.getDerivedStateFromProps ? n.state = {...n.state, ...h.getDerivedStateFromProps(n.props, n.state)} : n.componentWillMount && n.componentWillMount(), a = n.render(n.props, n.state, n.context), n.getChildContext && (c = {...c, ...n.getChildContext()})) : a = h(a, c), L(a, b, c, f, e, l);
    }
    h = h.displayName || h !== Function && h.name || ja(h);
  }
  let p = "";
  ({s:z, m:d, g:l} = ha(F, h, {allAttributes:u, xml:t, o:e, sort:m, g:l}));
  if (g) {
    let A = `<${h}`.length;
    p = z.reduce((w, E) => {
      const G = A + 1 + E.length;
      if (G > x) {
        return A = v.length, `${w}\n${v}${E}`;
      }
      A = G;
      return `${w} ${E}`;
    }, "");
  } else {
    p = z.length ? " " + z.join(" ") : "";
  }
  p = `<${h}${p}>`;
  if (`${h}`.match(/[\s\n\\/='"\0<>]/)) {
    throw p;
  }
  var z = `${h}`.match(ia);
  D && z && (p = p.replace(/>$/, " />"));
  let B = [];
  if (d) {
    g && (ea(d) || d.length + P(p) > x) && (d = "\n" + v + `${d}`.replace(/(\n+)/g, "$1" + (v || "\t"))), p += d;
  } else {
    if (a.children) {
      let A = g && ~p.indexOf("\n");
      B = a.children.map(w => {
        if (null != w && !1 !== w && (w = L(w, b, c, !0, "svg" == h ? !0 : "foreignObject" == h ? !1 : e, l))) {
          return g && w.length + P(p) > x && (A = !0), w;
        }
      }).filter(Boolean);
      if (g && A && !n) {
        for (a = B.length; a--;) {
          B[a] = "\n" + v + `${B[a]}`.replace(/(\n+)/g, "$1" + (v || "\t"));
        }
      }
    }
  }
  if (B.length) {
    p += B.join("");
  } else {
    if (t) {
      return p.substring(0, p.length - 1) + " />";
    }
  }
  z || (!n && g && ~p.indexOf("\n") && (p += "\n"), p += `</${h}>`);
  return p;
}
function ja(a) {
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
  b.replace(a, (e, ...l) => {
    e = l.slice(0, l.length - 2).reduce((g, k, r) => {
      r = c[r];
      if (!r || void 0 === k) {
        return g;
      }
      g[r] = k;
      return g;
    }, {});
    d.push(e);
  });
  return d;
}
;const R = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), ka = new RegExp(`\\s*((?:${R.source}\\s*)*)`);
const ma = (a, b) => Q(new RegExp(`<${a}${ka.source}?(?:${/\s*\/>/.source}|${(new RegExp(`>([\\s\\S]+?)?</${a}>`)).source})`, "g"), b, ["a", "v", "v1", "v2", "c"]).map(({a:c = "", c:d = ""}) => {
  c = c.replace(/\/$/, "").trim();
  c = la(c);
  return {content:d, props:c};
}), la = a => Q(R, a, ["key", "val", "def", "f"]).reduce((b, {key:c, val:d}) => {
  if (void 0 === d) {
    return b[c] = !0, b;
  }
  b[c] = "true" == d ? !0 : "false" == d ? !1 : /^\d+$/.test(d) ? parseInt(d, 10) : d;
  return b;
}, {});
var na = stream;
const {Transform:oa, Writable:pa} = stream;
function qa(a) {
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
const {homedir:ra} = os;
const T = /\s+at.*(?:\(|\s)(.*)\)?/, sa = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, ta = ra(), U = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = new RegExp(sa.source.replace("IGNORED_MODULES", c.join("|")));
  return a.replace(/\\/g, "/").split("\n").filter(e => {
    e = e.match(T);
    if (null === e || !e[1]) {
      return !0;
    }
    e = e[1];
    return e.includes(".app/Contents/Resources/electron.asar") || e.includes(".app/Contents/Resources/default_app.asar") ? !1 : !d.test(e);
  }).filter(e => e.trim()).map(e => b ? e.replace(T, (l, g) => l.replace(g, g.replace(ta, "~"))) : e).join("\n");
};
const V = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, ua = (a, b = !1) => V(a, 2 + (b ? 1 : 0)), W = a => {
  ({callee:{caller:a}} = a);
  return a;
};
function va(a, b, c = !1) {
  return function(d) {
    var e = W(arguments), {stack:l} = Error();
    const g = V(l, 2, !0), k = (l = d instanceof Error) ? d.message : d;
    e = [`Error: ${k}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = U(e);
    return Object.assign(l ? d : Error(), {message:k, stack:e});
  };
}
;function X(a) {
  var {stack:b} = Error();
  const c = W(arguments);
  b = ua(b, a);
  return va(c, b, a);
}
;const wa = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class xa extends pa {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {j:e = X(!0), proxyError:l} = a || {}, g = (k, r) => e(r);
    super(d);
    this.b = [];
    this.i = new Promise((k, r) => {
      this.on("finish", () => {
        let f;
        b ? f = Buffer.concat(this.b) : f = this.b.join("");
        k(f);
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
        r(f);
      });
      c && wa(this, c).pipe(this);
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
const ya = async a => {
  ({f:a} = new xa({rs:a, j:X(!0)}));
  return await a;
};
async function Y(a, b) {
  return za(a, b);
}
class Z extends oa {
  constructor(a, b) {
    super(b);
    this.f = (Array.isArray(a) ? a : [a]).filter(qa);
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
        const g = b.replace(c, (k, ...r) => {
          l = Error();
          try {
            if (this.b) {
              return e.length ? e.push(Promise.resolve(k)) : k;
            }
            const f = d.call(this, k, ...r);
            f instanceof Promise && e.push(f);
            return f;
          } catch (f) {
            S(l, f);
          }
        });
        if (e.length) {
          try {
            const k = await Promise.all(e);
            b = b.replace(c, () => k.shift());
          } catch (k) {
            S(l, k);
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
async function za(a, b) {
  b instanceof na ? b.pipe(a) : a.end(b);
  return await ya(a);
}
;const Aa = a => {
  const b = Object.keys(a);
  return `{
    ${b.map(c => `${/-/.test(c) ? `'${c}'` : c}: '${a[c]}'`).join(",\n")}${b.length ? "," : ""}
  }`;
}, Ba = a => {
  const b = [];
  b.push(`key: '${a.key}'`);
  b.push(`id: '${a.id}'`);
  Object.keys(a.props).length && b.push(`props: ${Aa(a.props)}`);
  a.children.filter(Boolean).length && b.push(`children: ${JSON.stringify(a.children)}`);
  return `{
${b.map(c => `  ${c}`).join(",\n") + ","}
}`;
}, Ca = (a = !0) => a ? `${"function makeIo(rootMargin = '0px 0px 76px 0px') {\n  const io = new IntersectionObserver((entries) => {\n    entries.forEach(({ target, isIntersecting }) => {\n      if (isIntersecting) {\n        if (target.render) {\n          console.warn('rendering component %s into the element %s ',\n            target.render.meta.key, target.render.meta.id)\n          target.render()\n          io.unobserve(target)\n        }\n      }\n    })\n  }, { rootMargin })\n  return io\n}"}
const io = makeIo(${"string" == typeof a ? `'${a}'` : ""});` : "";
module.exports = {_competent:(a, b = {}) => {
  async function c(t, x, D, h, F, n) {
    try {
      const p = a[h], z = n.slice(0, F), B = n.slice(F + t.length);
      if (/\x3c!--\s*$/.test(z) && /^\s*--\x3e/.test(B)) {
        return t;
      }
      const [{content:A = "", props:w}] = ma(h, D);
      if (D = A) {
        var v = new Z({re:u, replacement:c});
        if (f) {
          const q = f.call(this);
          Object.assign(v, q);
        }
        D = await Y(v, D);
      }
      v = [D];
      let E = !1, G = !1, aa = !1, N, O, ba;
      const ca = e.call(this, {...w, children:v}, {export(q = !0) {
        E = q;
      }, setPretty(q, H) {
        N = q;
        H && (O = H);
      }, renderAgain(q = !1) {
        G = !0;
        aa = q;
      }}, h);
      let y;
      try {
        y = await p(ca);
      } catch (q) {
        if (!q.message.startsWith("Class constructor")) {
          throw q;
        }
        y = (new p).render(ca);
      }
      E && !y.attributes.id && (ba = d.call(this), y.attributes.id = ba);
      let C;
      "string" == typeof y ? C = y : Array.isArray(y) ? C = y.map(q => "string" == typeof q ? q : M(q, {pretty:N, lineLength:O})).join("\n") : C = M(y, {pretty:N, lineLength:O});
      C = C.replace(/^/gm, x);
      if (G) {
        let q;
        m ? q = m.call(this, h, aa) : q = {re:u, replacement:c};
        const H = new Z(q);
        if (f) {
          const Da = f.call(this);
          Object.assign(H, Da);
        }
        C = await Y(H, C);
      }
      E && l.call(this, h, y.attributes.id, w, v);
      g && g.call(this, h);
      return C;
    } catch (p) {
      return k && k.call(this, h, p, F, n), r ? "" : t;
    }
  }
  const {getId:d, getProps:e = (t, x) => ({...t, ...x}), markExported:l, onSuccess:g, onFail:k, removeOnError:r = !1, getContext:f, getReplacements:m} = b, u = new RegExp(`( *)(<${`(${Object.keys(a).join("|")})`}${"(?:\\s+(?!\\/>)[^>]*?)?"}(?:\\s*?/>|>[\\s\\S]*?<\\/\\3>))`, "gm");
  return {re:u, replacement:c};
}, _makeComponentsScript:(a, b, c = !1, d = {}, e = !1) => {
  const l = Object.keys(d).map(k => `props.${k} = ${d[k]}`).join("\n"), g = e ? "el.render = () => {\n      render(h(Comp, props, children), parent, el)\n    }\n    el.render.meta = { key, id }\n    io.observe(el)" : "render(h(Comp, props, children), parent, el)";
  return `import { render${c ? ", h" : ""} } from 'preact'
` + `import Components from '${b}'

${Ca(e)}${"[" + a.map(Ba).join(",\n") + "]"}
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