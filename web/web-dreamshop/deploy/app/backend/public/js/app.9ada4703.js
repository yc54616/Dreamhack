(function(t) {
	function e(e) {
		for (var i, a, u = e[0], s = e[1], c = e[2], f = 0, p = []; f < u.length; f++) a = u[f], Object.prototype.hasOwnProperty.call(r, a) && r[a] && p.push(r[a][0]), r[a] = 0;
		for (i in s) Object.prototype.hasOwnProperty.call(s, i) && (t[i] = s[i]);
		l && l(e);
		while (p.length) p.shift()();
		return o.push.apply(o, c || []), n()
	}

	function n() {
		for (var t, e = 0; e < o.length; e++) {
			for (var n = o[e], i = !0, u = 1; u < n.length; u++) {
				var s = n[u];
				0 !== r[s] && (i = !1)
			}
			i && (o.splice(e--, 1), t = a(a.s = n[0]))
		}
		return t
	}
	var i = {},
		r = {
			app: 0
		},
		o = [];

	function a(e) {
		if (i[e]) return i[e].exports;
		var n = i[e] = {
			i: e,
			l: !1,
			exports: {}
		};
		return t[e].call(n.exports, n, n.exports, a), n.l = !0, n.exports
	}
	a.m = t, a.c = i, a.d = function(t, e, n) {
		a.o(t, e) || Object.defineProperty(t, e, {
			enumerable: !0,
			get: n
		})
	}, a.r = function(t) {
		"undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
			value: "Module"
		}), Object.defineProperty(t, "__esModule", {
			value: !0
		})
	}, a.t = function(t, e) {
		if (1 & e && (t = a(t)), 8 & e) return t;
		if (4 & e && "object" === typeof t && t && t.__esModule) return t;
		var n = Object.create(null);
		if (a.r(n), Object.defineProperty(n, "default", {
				enumerable: !0,
				value: t
			}), 2 & e && "string" != typeof t)
			for (var i in t) a.d(n, i, function(e) {
				return t[e]
			}.bind(null, i));
		return n
	}, a.n = function(t) {
		var e = t && t.__esModule ? function() {
			return t["default"]
		} : function() {
			return t
		};
		return a.d(e, "a", e), e
	}, a.o = function(t, e) {
		return Object.prototype.hasOwnProperty.call(t, e)
	}, a.p = "/";
	var u = window["webpackJsonp"] = window["webpackJsonp"] || [],
		s = u.push.bind(u);
	u.push = e, u = u.slice();
	for (var c = 0; c < u.length; c++) e(u[c]);
	var l = s;
	o.push([1, "chunk-vendors"]), n()
})({
	0: function(t, e) {},
	"034f": function(t, e, n) {
		"use strict";
		var i = n("85ec"),
			r = n.n(i);
		r.a
	},
	1: function(t, e, n) {
		t.exports = n("56d7")
	},
	10: function(t, e) {},
	11: function(t, e) {},
	12: function(t, e) {},
	13: function(t, e) {},
	14: function(t, e) {},
	15: function(t, e) {},
	16: function(t, e) {},
	17: function(t, e) {},
	18: function(t, e) {},
	19: function(t, e) {},
	2: function(t, e) {},
	3: function(t, e) {},
	4: function(t, e) {},
	5: function(t, e) {},
	"56d7": function(t, e, n) {
		"use strict";
		n.r(e);
		n("c975"), n("d3b7"), n("e260"), n("e6cf"), n("cca6"), n("a79d");
		var i = n("2b0e"),
			r = function() {
				var t = this,
					e = t.$createElement,
					n = t._self._c || e;
				return n("div", {
					attrs: {
						id: "app"
					}
				}, [n("b-navbar", {
					staticClass: "nav",
					attrs: {
						type: "dark",
						variant: "dark"
					}
				}, [n("b-navbar-nav", [n("router-link", {
					attrs: {
						to: {
							name: "index"
						}
					}
				}, [n("b-navbar-item", [t._v("Home")])], 1)], 1), n("b-navbar-nav", {
					staticClass: "ml-auto"
				}, [n("router-link", {
					attrs: {
						to: {
							name: "report"
						}
					}
				}, [n("b-navbar-item", [t._v("Report")])], 1), t.info ? n("b-navbar-item", [n("a", {
					attrs: {
						href: "javascript:document.cookie='token=';location.href=''"
					}
				}, [t._v("Logout")])]) : n("router-link", {
					attrs: {
						to: {
							name: "login"
						}
					}
				}, [n("b-navbar-item", [t._v("Login")])], 1)], 1)], 1), n("div", {
					staticClass: "main"
				}, [n("router-view")], 1)], 1)
			},
			o = [],
			a = {
				name: "app",
				data: function() {
					return {
						info: this.info
					}
				},
				created: function() {
					var t = this;
					this.$http.get("/user/info").then((function() {
						t.info = !0
					})).catch((function() {
						t.$cookie.delete("token")
					}))
				}
			},
			u = a,
			s = (n("034f"), n("2877")),
			c = Object(s["a"])(u, r, o, !1, null, null, null),
			l = c.exports,
			f = n("00e7"),
			p = n.n(f),
			d = n("5f5b"),
			m = (n("ab8b"), n("2dd8"), n("8c4f")),
			h = function() {
				var t = this,
					e = t.$createElement,
					n = t._self._c || e;
				return n("div", {
					staticClass: "wrap"
				}, [t.info ? n("h1", [t._v("Hello, " + t._s(t.info.uid) + " ($" + t._s(t.info.amount) + ")")]) : t._e(), n("ul", {
					staticClass: "items"
				}, t._l(t.items, (function(e) {
					return n("li", {
						key: e.id,
						staticClass: "item"
					}, [n("router-link", {
						attrs: {
							to: {
								name: "detail",
								params: {
									id: e.id
								}
							}
						}
					}, [n("div", {
						staticClass: "detail",
						staticStyle: {
							"text-align": "center"
						}
					}, [n("img", {
						staticStyle: {
							width: "250px"
						},
						attrs: {
							src: e.poster
						}
					}), n("br"), n("strong", {
						staticClass: "name"
					}, [t._v(t._s(e.name))]), n("br"), n("span", [t._v("가격 "), n("span", {
						staticClass: "num"
					}, [t._v("$" + t._s(e.price))])]), n("br")])])], 1)
				})), 0)])
			},
			b = [],
			v = {
				created: function() {
					var t = this;
					this.items = [], this.$http.get("/items").then((function(e) {
						t.items = e.data
					})), this.$http.get("/user/info").then((function(e) {
						t.info = e.data
					})).catch((function() {
						t.$cookie.delete("token")
					}))
				},
				data: function() {
					return {
						items: this.items,
						info: this.info
					}
				}
			},
			_ = v,
			g = Object(s["a"])(_, h, b, !1, null, null, null),
			y = g.exports,
			k = function() {
				var t = this,
					e = t.$createElement,
					n = t._self._c || e;
				return n("div", {
					staticClass: "detail"
				}, [n("b-form", {
					on: {
						submit: t.onSubmit
					}
				}, [n("img", {
					staticStyle: {
						width: "500px"
					},
					attrs: {
						src: t.item.poster
					}
				}), n("br"), n("h1", [t._v(t._s(t.item.name))]), n("section", [n("p", [t._v("가격: $" + t._s(t.item.price))]), n("p", {
					domProps: {
						innerHTML: t._s(t.item.detail)
					}
				})]), n("b-button", {
					attrs: {
						variant: "success",
						type: "submit"
					}
				}, [t._v("Buy")]), n("router-link", {
					staticClass: "link",
					attrs: {
						to: {
							name: "index"
						}
					}
				}, [n("b-button", [t._v("Back")])], 1)], 1)], 1)
			},
			w = [],
			$ = {
				created: function() {
					var t = this;
					this.id = this.$route.params.id, this.item = [], this.$http.get("/".concat(this.id, "/info")).then((function(e) { // %2fgoogle.com%23 -> //google.com#
						t.item = e.data; // -> json {"detail":"asdfasdfasdf"}
						var i = n("c0c4"),
							r = n("7a7a"),
							o = r.JSDOM,
							a = new o("").window,
							u = i(a);
						t.item.detail = u.sanitize(t.item.detail) // xss -> 
						// fetch("").then(res=>res.text()).then(text=>fetch("/"+text))
					})).catch((function() {
						location.href = "/"
					}))
				},
				data: function() {
					return {
						item: this.item
					}
				},
				methods: {
					onSubmit: function(t) {
						var e = this;
						t.preventDefault(), this.$http.post("/".concat(this.id, "/buy")).then((function(t) {
							e.$cookie.set("token", t.data.token), alert("buy item!"), location.href = t.data.data
						})).catch((function(t) {
							alert(t.response.data)
						}))
					}
				}
			},
			x = $,
			O = Object(s["a"])(x, k, w, !1, null, null, null),
			j = O.exports,
			S = function() {
				var t = this,
					e = t.$createElement,
					n = t._self._c || e;
				return n("div", [n("b-form", {
					on: {
						submit: t.onSubmit
					}
				}, [n("b-form-group", {
					attrs: {
						id: "input-group-1",
						label: "id",
						"label-for": "input-1"
					}
				}, [n("b-form-input", {
					attrs: {
						id: "uid",
						type: "text",
						required: "",
						placeholder: "Enter user id"
					},
					model: {
						value: t.form.uid,
						callback: function(e) {
							t.$set(t.form, "uid", e)
						},
						expression: "form.uid"
					}
				})], 1), n("b-form-group", {
					attrs: {
						id: "input-group-2",
						label: "pw",
						"label-for": "input-2"
					}
				}, [n("b-form-input", {
					attrs: {
						id: "upw",
						type: "password",
						required: "",
						placeholder: "Enter user pw"
					},
					model: {
						value: t.form.upw,
						callback: function(e) {
							t.$set(t.form, "upw", e)
						},
						expression: "form.upw"
					}
				})], 1), n("b-button", {
					attrs: {
						type: "submit",
						variant: "primary"
					}
				}, [t._v("Login")])], 1)], 1)
			},
			C = [],
			P = {
				created: function() {
					window.login = this.login
				},
				data: function() {
					return {
						form: {
							uid: "",
							upw: ""
						}
					}
				},
				methods: {
					onSubmit: function(t) {
						t.preventDefault(), this.login(this.form)
					},
					login: function(t) {
						var e = this;
						this.$http.post("/login", t).then((function(t) {
							e.$cookie.set("token", t.data.token), location.href = "/"
						})).catch((function(t) {
							alert(t.response.data)
						}))
					}
				}
			},
			E = P,
			L = Object(s["a"])(E, S, C, !1, null, null, null),
			M = L.exports,
			q = function() {
				var t = this,
					e = t.$createElement,
					n = t._self._c || e;
				return n("div", [n("b-form", {
					on: {
						submit: t.onSubmit
					}
				}, [n("b-form-group", {
					attrs: {
						id: "input-group-1",
						label: "input url path",
						"label-for": "input-1"
					}
				}, [n("div", {
					staticStyle: {
						display: "inline"
					}
				}, [n("div", {
					domProps: {
						textContent: t._s(t.host)
					}
				}), n("b-form-input", {
					attrs: {
						id: "path",
						type: "text",
						required: "",
						placeholder: "Enter url path"
					},
					model: {
						value: t.form.path,
						callback: function(e) {
							t.$set(t.form, "path", e)
						},
						expression: "form.path"
					}
				})], 1)]), n("b-button", {
					attrs: {
						type: "submit",
						variant: "primary"
					}
				}, [t._v("Submit")])], 1)], 1)
			},
			D = [],
			T = (n("3ca3"), n("ddb0"), n("2b3d"), {
				data: function() {
					return {
						form: {
							path: ""
						},
						host: '"' + new URL(location.href).origin + '" + /yoururl'
					}
				},
				methods: {
					onSubmit: function(t) {
						t.preventDefault(), this.$http.post("/report", this.form).then((function() {
							alert("report!"), location.href = "/"
						})).catch((function(t) {
							alert(t.response.data)
						}))
					}
				}
			}),
			H = T,
			J = Object(s["a"])(H, q, D, !1, null, null, null),
			R = J.exports;
		i["default"].use(m["a"]);
		var B = new m["a"]({
				routes: [{
					path: "/",
					name: "index",
					component: y
				}, {
					path: "/:id/detail",
					name: "detail",
					component: j
				}, {
					path: "/login/",
					name: "login",
					component: M
				}, {
					path: "/report",
					name: "report",
					component: R
				}]
			}),
			U = n("bc3a"),
			z = n.n(U);
		i["default"].config.productionTip = !1, i["default"].use(p.a), i["default"].use(d["a"]);
		var A = z.a.create({
			baseURL: "http://" + location.host + "/",
			timeout: 1e3
		});
		A.interceptors.request.use((function(t) {
			return t.url.indexOf("..") > -1 ? (alert("hack detected"), Promise.reject()) : (t.headers["token"] = p.a.get("token"), t)
		}), (function(t) {
			return Promise.reject(t)
		})), i["default"].prototype.$http = A, new i["default"]({
			render: function(t) {
				return t(l)
			},
			router: B
		}).$mount("#app")
	},
	6: function(t, e) {},
	7: function(t, e) {},
	8: function(t, e) {},
	"85ec": function(t, e, n) {},
	9: function(t, e) {}
});