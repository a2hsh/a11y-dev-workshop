import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, useNavigate, useParams } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
  import("@axe-core/react").then((axe) => {
    import("react").then((React2) => {
      import("react-dom").then((ReactDOM) => {
        axe.default(React2, ReactDOM, 1e3);
      });
    });
  });
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, false, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const logo = "data:image/svg+xml,%3csvg%20width='48'%20height='48'%20viewBox='0%200%2048%2048'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='4'%20y='10'%20width='40'%20height='28'%20rx='6'%20fill='%232563eb'/%3e%3crect%20x='10'%20y='16'%20width='28'%20height='4'%20rx='2'%20fill='%23fff'/%3e%3crect%20x='10'%20y='24'%20width='18'%20height='3'%20rx='1.5'%20fill='%23dbeafe'/%3e%3crect%20x='10'%20y='30'%20width='12'%20height='3'%20rx='1.5'%20fill='%23dbeafe'/%3e%3ccircle%20cx='38'%20cy='32'%20r='3'%20fill='%231e293b'/%3e%3c/svg%3e";
const logoDark = "data:image/svg+xml,%3csvg%20width='48'%20height='48'%20viewBox='0%200%2048%2048'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='4'%20y='10'%20width='40'%20height='28'%20rx='6'%20fill='%2360a5fa'/%3e%3crect%20x='10'%20y='16'%20width='28'%20height='4'%20rx='2'%20fill='%23fff'/%3e%3crect%20x='10'%20y='24'%20width='18'%20height='3'%20rx='1.5'%20fill='%23bae6fd'/%3e%3crect%20x='10'%20y='30'%20width='12'%20height='3'%20rx='1.5'%20fill='%23bae6fd'/%3e%3ccircle%20cx='38'%20cy='32'%20r='3'%20fill='%23f1f5f9'/%3e%3c/svg%3e";
function IconButton({ onClick, className = "" }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      onClick: (e) => onClick(e),
      className: `cursor-pointer hover:bg-red-100 rounded-full p-2 transition-colors ${className}`,
      children: /* @__PURE__ */ jsxs(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          className: "text-red-500 hover:text-red-700",
          children: [
            /* @__PURE__ */ jsx("polyline", { points: "3,6 5,6 21,6" }),
            /* @__PURE__ */ jsx("path", { d: "m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" }),
            /* @__PURE__ */ jsx("line", { x1: "10", y1: "11", x2: "10", y2: "17" }),
            /* @__PURE__ */ jsx("line", { x1: "14", y1: "11", x2: "14", y2: "17" })
          ]
        }
      )
    }
  );
}
const AUTH_KEY = "isLoggedIn";
const isBrowser = typeof window !== "undefined";
const login$1 = (username, password) => {
  if (username === "admin" && password === "admin") {
    if (isBrowser) {
      localStorage.setItem(AUTH_KEY, "true");
    }
    return true;
  }
  return false;
};
const logout = () => {
  if (isBrowser) {
    localStorage.removeItem(AUTH_KEY);
  }
};
const isLoggedIn = () => {
  if (!isBrowser) {
    return false;
  }
  return localStorage.getItem(AUTH_KEY) === "true";
};
function NewsCard({ article: article2, onDelete }) {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const handleCardClick = () => {
    navigate(`/article/${article2.id}`);
  };
  const handleDeleteClick = (e) => {
    e == null ? void 0 : e.stopPropagation();
    onDelete(article2.id);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onClick: handleCardClick,
      className: "bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden group relative",
      children: [
        loggedIn && /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsx(IconButton, { onClick: handleDeleteClick }) }),
        /* @__PURE__ */ jsx("div", { className: "aspect-video overflow-hidden", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: article2.image,
            className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xl font-semibold text-gray-400 mb-3 line-clamp-2", children: article2.title }),
          /* @__PURE__ */ jsx("div", { className: "text-gray-300 text-sm mb-4 line-clamp-3", children: article2.content.length > 100 ? `${article2.content.substring(0, 100)}...` : article2.content }),
          /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-sm font-medium hover:text-gray-400 transition-colors", children: "Read More →" })
        ] })
      ]
    }
  );
}
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 bg-black bg-opacity-50",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex items-center justify-center p-4", children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          onClick: onClose,
          className: "absolute top-4 right-4 cursor-pointer hover:bg-gray-100 rounded-full p-1 transition-colors",
          children: /* @__PURE__ */ jsxs(
            "svg",
            {
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              className: "text-gray-500 hover:text-gray-700",
              children: [
                /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
              ]
            }
          )
        }
      ),
      children
    ] }) }) })
  ] });
}
function LoginModal({ isOpen, onClose, onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = { username: "", password: "" };
    if (!username) {
      newErrors.username = "Username is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    if (newErrors.username || newErrors.password) {
      return;
    }
    if (login$1(username, password)) {
      setUsername("");
      setPassword("");
      setErrors({ username: "", password: "" });
      onSuccess();
      onClose();
    } else {
      setErrors({ username: "Invalid credentials", password: "Invalid credentials" });
    }
  };
  return /* @__PURE__ */ jsx(Modal, { isOpen, onClose, children: /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
    /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Login" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Username",
            value: username,
            onChange: (e) => setUsername(e.target.value),
            className: `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.username ? "border-red-500" : "border-gray-300"}`
          }
        ),
        errors.username && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.username })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            placeholder: "Password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            className: `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? "border-red-500" : "border-gray-300"}`
          }
        ),
        errors.password && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.password })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium",
          children: "Login"
        }
      )
    ] })
  ] }) });
}
function AddNewsModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({ title: "", image: "", content: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = { title: "", image: "", content: "" };
    if (!title) {
      newErrors.title = "Title is required";
    }
    if (!image) {
      newErrors.image = "Image URL is required";
    }
    if (!content) {
      newErrors.content = "Content is required";
    }
    setErrors(newErrors);
    if (newErrors.title || newErrors.image || newErrors.content) {
      return;
    }
    onAdd({ title, image, content });
    setTitle("");
    setImage("");
    setContent("");
    setErrors({ title: "", image: "", content: "" });
    onClose();
  };
  return /* @__PURE__ */ jsx(Modal, { isOpen, onClose, children: /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
    /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Add News Article" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Article Title",
            value: title,
            onChange: (e) => setTitle(e.target.value),
            className: `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? "border-red-500" : "border-gray-300"}`
          }
        ),
        errors.title && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.title })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "url",
            placeholder: "Image URL",
            value: image,
            onChange: (e) => setImage(e.target.value),
            className: `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.image ? "border-red-500" : "border-gray-300"}`
          }
        ),
        errors.image && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.image })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "textarea",
          {
            rows: 4,
            placeholder: "Article Content",
            value: content,
            onChange: (e) => setContent(e.target.value),
            className: `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.content ? "border-red-500" : "border-gray-300"}`
          }
        ),
        errors.content && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.content })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium",
          children: "Add Article"
        }
      )
    ] })
  ] }) });
}
const newsData = [
  {
    id: 1,
    title: "Breaking: Revolutionary AI Technology Transforms Healthcare",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: "Scientists have developed groundbreaking artificial intelligence technology that can diagnose diseases with unprecedented accuracy. This revolutionary system analyzes medical imaging data and patient records to provide instant, precise diagnoses that could save millions of lives worldwide. The technology has been tested in over 500 hospitals across 30 countries with remarkable success rates exceeding 99.7% accuracy."
  },
  {
    id: 2,
    title: "Climate Change Solution: New Carbon Capture Technology",
    image: "https://images.unsplash.com/photo-1569163139394-de44cb4e4388?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: "Researchers at leading universities have unveiled a breakthrough carbon capture technology that can remove CO2 from the atmosphere at an industrial scale. This innovative solution uses advanced materials and renewable energy to capture and convert carbon dioxide into useful products, potentially reversing decades of environmental damage."
  },
  {
    id: 3,
    title: "Space Exploration Milestone: Mars Colony Preparation",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: "Space agencies worldwide have announced significant progress in preparing for human colonization of Mars. Advanced life support systems, sustainable food production methods, and radiation protection technologies have all reached critical milestones, bringing the dream of a Mars colony closer to reality than ever before."
  },
  {
    id: 4,
    title: "Education Revolution: Virtual Reality Learning Platforms",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: "Educational institutions are embracing virtual reality technology to create immersive learning experiences. Students can now explore ancient civilizations, conduct virtual science experiments, and practice complex procedures in safe, controlled environments. This technology is showing remarkable improvements in student engagement and learning outcomes."
  },
  {
    id: 5,
    title: "Medical Breakthrough: Gene Therapy Cures Rare Diseases",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: "Medical researchers have achieved stunning success using gene therapy to cure previously incurable rare diseases. The treatment modifies patients' genetic code to correct defective genes, offering hope to millions of people worldwide who suffer from inherited disorders. Clinical trials show 100% success rates in treating certain conditions."
  }
];
function meta$1() {
  return [{
    title: "News Hub - Stay Informed"
  }, {
    name: "description",
    content: "Your premier destination for breaking news and insights"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  const [articles, setArticles] = useState(newsData);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);
  const handleLoginSuccess = () => {
    setLoggedIn(true);
    window.location.reload();
  };
  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    window.location.reload();
  };
  const handleAddArticle = (newArticle) => {
    const id = Math.max(...articles.map((a) => a.id)) + 1;
    setArticles([{
      ...newArticle,
      id
    }, ...articles]);
  };
  const handleDeleteArticle = (id) => {
    setArticles(articles.filter((article2) => article2.id !== id));
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-50",
    children: [/* @__PURE__ */ jsx("div", {
      className: "bg-white shadow-sm border-b",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 py-6",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex justify-between items-center",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-4",
            children: [/* @__PURE__ */ jsx("img", {
              src: logo,
              className: "block h-10 w-auto dark:hidden",
              draggable: "false"
            }), /* @__PURE__ */ jsx("img", {
              src: logoDark,
              className: "hidden h-10 w-auto dark:block",
              draggable: "false"
            }), /* @__PURE__ */ jsx("div", {
              children: /* @__PURE__ */ jsx("div", {
                className: "text-gray-600 mt-1",
                children: "Your premier source for breaking news"
              })
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "flex items-center space-x-4",
            children: loggedIn ? /* @__PURE__ */ jsxs(Fragment, {
              children: [/* @__PURE__ */ jsx("div", {
                onClick: () => setIsAddModalOpen(true),
                className: "bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer font-medium",
                children: "Add News"
              }), /* @__PURE__ */ jsx("div", {
                onClick: handleLogout,
                className: "bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer font-medium",
                children: "Logout"
              })]
            }) : /* @__PURE__ */ jsx("div", {
              onClick: () => setIsLoginModalOpen(true),
              className: "bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer font-medium",
              children: "Login"
            })
          })]
        })
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "max-w-7xl mx-auto px-4 py-8",
      children: articles.length === 0 ? /* @__PURE__ */ jsxs("div", {
        className: "text-center py-12",
        children: [/* @__PURE__ */ jsx("div", {
          className: "text-2xl font-bold text-gray-500 mb-4",
          children: "No articles available"
        }), loggedIn && /* @__PURE__ */ jsx("div", {
          onClick: () => setIsAddModalOpen(true),
          className: "text-blue-600 hover:text-blue-800 cursor-pointer",
          children: "Add the first article →"
        })]
      }) : /* @__PURE__ */ jsx("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
        children: articles.map((article2) => /* @__PURE__ */ jsx(NewsCard, {
          article: article2,
          onDelete: handleDeleteArticle
        }, article2.id))
      })
    }), /* @__PURE__ */ jsx(LoginModal, {
      isOpen: isLoginModalOpen,
      onClose: () => setIsLoginModalOpen(false),
      onSuccess: handleLoginSuccess
    }), /* @__PURE__ */ jsx(AddNewsModal, {
      isOpen: isAddModalOpen,
      onClose: () => setIsAddModalOpen(false),
      onAdd: handleAddArticle
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const login = UNSAFE_withComponentProps(function LoginPage() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    if (isLoggedIn()) {
      navigate("/");
    }
  }, [navigate]);
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center",
    children: /* @__PURE__ */ jsxs("div", {
      className: "bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "text-center mb-8",
        children: [/* @__PURE__ */ jsx("div", {
          className: "text-3xl font-bold text-gray-900 mb-2",
          children: "Welcome Back"
        }), /* @__PURE__ */ jsx("div", {
          className: "text-gray-600",
          children: "Please sign in to continue"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "space-y-6",
        children: [/* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx("input", {
            type: "text",
            placeholder: "Username",
            className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          })
        }), /* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx("input", {
            type: "password",
            placeholder: "Password",
            className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          })
        }), /* @__PURE__ */ jsx("div", {
          onClick: () => navigate("/"),
          className: "w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center cursor-pointer",
          children: "Sign In"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "mt-6 text-center text-sm text-gray-600",
        children: ["Don't have an account? ", /* @__PURE__ */ jsx("span", {
          className: "text-blue-600 hover:text-blue-800 cursor-pointer",
          children: "Sign up"
        })]
      })]
    })
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: login
}, Symbol.toStringTag, { value: "Module" }));
function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article2, setArticle] = useState(null);
  useEffect(() => {
    const articleId = parseInt(id || "0");
    const found = newsData.find((a) => a.id === articleId);
    if (found) {
      setArticle(found);
    }
  }, [id]);
  if (!article2) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Article Not Found" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          onClick: () => navigate("/"),
          className: "text-blue-600 hover:text-blue-800 cursor-pointer",
          children: "← Back to Home"
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        onClick: () => navigate("/"),
        className: "text-blue-600 hover:text-blue-800 cursor-pointer mb-8 inline-flex items-center",
        children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              className: "mr-2",
              children: /* @__PURE__ */ jsx("polyline", { points: "15,18 9,12 15,6" })
            }
          ),
          "Back to Home"
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-lg overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "aspect-video w-full overflow-hidden", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: article2.image,
          className: "w-full h-full object-cover"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-gray-900 mb-6", children: article2.title }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-700 text-lg leading-relaxed whitespace-pre-line", children: article2.content })
      ] })
    ] })
  ] }) });
}
function meta({
  params
}) {
  const article2 = newsData.find((a) => a.id === Number(params.id));
  return [{
    title: article2 ? `${article2.title} - News Hub` : "Article - News Hub"
  }, {
    name: "description",
    content: article2 ? article2.content.slice(0, 150) : "News article page"
  }];
}
const article = UNSAFE_withComponentProps(function Article() {
  return /* @__PURE__ */ jsx(ArticlePage, {});
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: article,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/a11y-dev-workshop/assets/entry.client-DAhQln1T.js", "imports": ["/a11y-dev-workshop/assets/chunk-EF7DTUVF-C8ZeIkme.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/a11y-dev-workshop/assets/root-BIoI8mMo.js", "imports": ["/a11y-dev-workshop/assets/chunk-EF7DTUVF-C8ZeIkme.js"], "css": ["/a11y-dev-workshop/assets/root-CNrcXUWO.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/a11y-dev-workshop/assets/home-2mV92U5N.js", "imports": ["/a11y-dev-workshop/assets/chunk-EF7DTUVF-C8ZeIkme.js", "/a11y-dev-workshop/assets/auth-CA36DVzc.js", "/a11y-dev-workshop/assets/news-BqSAnt7V.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "/login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/a11y-dev-workshop/assets/login-B6A6lsfs.js", "imports": ["/a11y-dev-workshop/assets/chunk-EF7DTUVF-C8ZeIkme.js", "/a11y-dev-workshop/assets/auth-CA36DVzc.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/article": { "id": "routes/article", "parentId": "root", "path": "/article/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/a11y-dev-workshop/assets/article-CotUkGoI.js", "imports": ["/a11y-dev-workshop/assets/chunk-EF7DTUVF-C8ZeIkme.js", "/a11y-dev-workshop/assets/news-BqSAnt7V.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/a11y-dev-workshop/assets/manifest-f8cc8ad6.js", "version": "f8cc8ad6", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/a11y-dev-workshop/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "/login",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/article": {
    id: "routes/article",
    parentId: "root",
    path: "/article/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
