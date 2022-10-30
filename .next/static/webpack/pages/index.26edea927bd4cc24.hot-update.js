"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__N_SSP\": function() { return /* binding */ __N_SSP; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/esm/index.js\");\n/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/layout */ \"./components/layout/index.tsx\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _utility_Store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utility/Store */ \"./utility/Store.js\");\n/* harmony import */ var _components_ProductItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/ProductItem */ \"./components/ProductItem.tsx\");\n/* harmony import */ var react_material_ui_carousel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-material-ui-carousel */ \"./node_modules/react-material-ui-carousel/dist/index.js\");\n/* harmony import */ var react_material_ui_carousel__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_material_ui_carousel__WEBPACK_IMPORTED_MODULE_8__);\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\nconst Home = (props)=>{\n    _s();\n    // const { products } = props;\n    const { topRatedProducts , featuredProducts  } = props;\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();\n    const { state , dispatch  } = (0,react__WEBPACK_IMPORTED_MODULE_5__.useContext)(_utility_Store__WEBPACK_IMPORTED_MODULE_6__.Store);\n    const addToCartHandler = async (product)=>{\n        const existItem = state.cart.cartItems.find((x)=>x._id === product._id);\n        const quantity = existItem ? existItem.quantity + 1 : 1;\n        const { data  } = await axios__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"/api/products/\".concat(product._id));\n        if (data.countInStock < quantity) {\n            window.alert(\"Sorry. Product is out of stock\");\n            return;\n        }\n        dispatch({\n            type: \"CART_ADD_ITEM\",\n            payload: {\n                ...product,\n                quantity\n            }\n        });\n        router.push(\"/cart\");\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_layout__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((react_material_ui_carousel__WEBPACK_IMPORTED_MODULE_8___default()), {\n                animation: \"slide\",\n                children: featuredProducts.map((product)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                        href: \"/product/\".concat(product.slug),\n                        passHref: true,\n                        legacyBehavior: true,\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Link, {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                                src: product.featuredImage,\n                                alt: product.name\n                            }, void 0, false, {\n                                fileName: \"F:\\\\mansour\\\\projects\\\\next-store\\\\pages\\\\index.tsx\",\n                                lineNumber: 45,\n                                columnNumber: 15\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"F:\\\\mansour\\\\projects\\\\next-store\\\\pages\\\\index.tsx\",\n                            lineNumber: 44,\n                            columnNumber: 13\n                        }, undefined)\n                    }, product._id, false, {\n                        fileName: \"F:\\\\mansour\\\\projects\\\\next-store\\\\pages\\\\index.tsx\",\n                        lineNumber: 38,\n                        columnNumber: 11\n                    }, undefined))\n            }, void 0, false, {\n                fileName: \"F:\\\\mansour\\\\projects\\\\next-store\\\\pages\\\\index.tsx\",\n                lineNumber: 36,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Typography, {\n                variant: \"h2\",\n                children: \"Popular Products\"\n            }, void 0, false, {\n                fileName: \"F:\\\\mansour\\\\projects\\\\next-store\\\\pages\\\\index.tsx\",\n                lineNumber: 50,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Grid, {\n                container: true,\n                spacing: 3,\n                children: topRatedProducts.map((product)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Grid, {\n                        item: true,\n                        md: 4,\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ProductItem__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                            product: product,\n                            addToCartHandler: addToCartHandler\n                        }, void 0, false, {\n                            fileName: \"F:\\\\mansour\\\\projects\\\\next-store\\\\pages\\\\index.tsx\",\n                            lineNumber: 54,\n                            columnNumber: 13\n                        }, undefined)\n                    }, product.name, false, {\n                        fileName: \"F:\\\\mansour\\\\projects\\\\next-store\\\\pages\\\\index.tsx\",\n                        lineNumber: 53,\n                        columnNumber: 11\n                    }, undefined))\n            }, void 0, false, {\n                fileName: \"F:\\\\mansour\\\\projects\\\\next-store\\\\pages\\\\index.tsx\",\n                lineNumber: 51,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"F:\\\\mansour\\\\projects\\\\next-store\\\\pages\\\\index.tsx\",\n        lineNumber: 35,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Home, \"TVJFR0REv4uRQqgLjfqrLwPssls=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter\n    ];\n});\n_c = Home;\nvar __N_SSP = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUF1RDtBQUViO0FBQ1Q7QUFHUDtBQUNjO0FBQ0w7QUFDTTtBQUNXO0FBQ0Y7QUFFbEQsTUFBTVcsT0FBaUIsQ0FBQ0MsUUFBZTs7SUFDckMsOEJBQThCO0lBQzlCLE1BQU0sRUFBRUMsaUJBQWdCLEVBQUVDLGlCQUFnQixFQUFFLEdBQUdGO0lBRS9DLE1BQU1HLFNBQVNULHNEQUFTQTtJQUN4QixNQUFNLEVBQUVVLE1BQUssRUFBRUMsU0FBUSxFQUFFLEdBQUdWLGlEQUFVQSxDQUFDQyxpREFBS0E7SUFFNUMsTUFBTVUsbUJBQW1CLE9BQU9DLFVBQWlCO1FBQy9DLE1BQU1DLFlBQVlKLE1BQU1LLElBQUksQ0FBQ0MsU0FBUyxDQUFDQyxJQUFJLENBQ3pDLENBQUNDLElBQVdBLEVBQUVDLEdBQUcsS0FBS04sUUFBUU0sR0FBRztRQUVuQyxNQUFNQyxXQUFXTixZQUFZQSxVQUFVTSxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3ZELE1BQU0sRUFBRUMsS0FBSSxFQUFFLEdBQUcsTUFBTXRCLGlEQUFTLENBQUMsaUJBQTZCLE9BQVpjLFFBQVFNLEdBQUc7UUFDN0QsSUFBSUUsS0FBS0UsWUFBWSxHQUFHSCxVQUFVO1lBQ2hDSSxPQUFPQyxLQUFLLENBQUM7WUFDYjtRQUNGLENBQUM7UUFDRGQsU0FBUztZQUFFZSxNQUFNO1lBQWlCQyxTQUFTO2dCQUFFLEdBQUdkLE9BQU87Z0JBQUVPO1lBQVM7UUFBRTtRQUNwRVgsT0FBT21CLElBQUksQ0FBQztJQUNkO0lBQ0EscUJBQ0UsOERBQUMvQiwwREFBTUE7OzBCQUNMLDhEQUFDTyxtRUFBUUE7Z0JBQUN5QixXQUFVOzBCQUNqQnJCLGlCQUFpQnNCLEdBQUcsQ0FBQyxDQUFDakIsd0JBQ3JCLDhEQUFDZixrREFBUUE7d0JBRVBpQyxNQUFNLFlBQXlCLE9BQWJsQixRQUFRbUIsSUFBSTt3QkFDOUJDLFFBQVE7d0JBQ1JDLGNBQWM7a0NBRWQsNEVBQUN0QywrQ0FBSUE7c0NBQ0gsNEVBQUN1QztnQ0FBSUMsS0FBS3ZCLFFBQVF3QixhQUFhO2dDQUFFQyxLQUFLekIsUUFBUTBCLElBQUk7Ozs7Ozs7Ozs7O3VCQU4vQzFCLFFBQVFNLEdBQUc7Ozs7Ozs7Ozs7MEJBV3RCLDhEQUFDeEIscURBQVVBO2dCQUFDNkMsU0FBUTswQkFBSzs7Ozs7OzBCQUN6Qiw4REFBQzlDLCtDQUFJQTtnQkFBQytDLFNBQVM7Z0JBQUNDLFNBQVM7MEJBQ3RCbkMsaUJBQWlCdUIsR0FBRyxDQUFDLENBQUNqQix3QkFDckIsOERBQUNuQiwrQ0FBSUE7d0JBQUNpRCxJQUFJO3dCQUFDQyxJQUFJO2tDQUNiLDRFQUFDekMsK0RBQVdBOzRCQUNWVSxTQUFTQTs0QkFDVEQsa0JBQWtCQTs7Ozs7O3VCQUhDQyxRQUFRMEIsSUFBSTs7Ozs7Ozs7Ozs7Ozs7OztBQVU3QztHQWpETWxDOztRQUlXTCxrREFBU0E7OztLQUpwQks7O0FBbUROLCtEQUFlQSxJQUFJQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3BhZ2VzL2luZGV4LnRzeD8wN2ZmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdyaWQsIFR5cG9ncmFwaHksIExpbmsgfSBmcm9tIFwiQG11aS9tYXRlcmlhbFwiO1xuaW1wb3J0IHR5cGUgeyBOZXh0UGFnZSB9IGZyb20gXCJuZXh0XCI7XG5pbXBvcnQgTGF5b3V0IGZyb20gXCIuLi9jb21wb25lbnRzL2xheW91dFwiO1xuaW1wb3J0IE5leHRMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcbmltcG9ydCBkYiBmcm9tIFwiLi4vdXRpbGl0eS9kYlwiO1xuaW1wb3J0IFByb2R1Y3QgZnJvbSBcIi4uL21vZGVscy9Qcm9kdWN0XCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcbmltcG9ydCB7IHVzZUNvbnRleHQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSBcIi4uL3V0aWxpdHkvU3RvcmVcIjtcbmltcG9ydCBQcm9kdWN0SXRlbSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qcm9kdWN0SXRlbVwiO1xuaW1wb3J0IENhcm91c2VsIGZyb20gXCJyZWFjdC1tYXRlcmlhbC11aS1jYXJvdXNlbFwiO1xuXG5jb25zdCBIb21lOiBOZXh0UGFnZSA9IChwcm9wczogYW55KSA9PiB7XG4gIC8vIGNvbnN0IHsgcHJvZHVjdHMgfSA9IHByb3BzO1xuICBjb25zdCB7IHRvcFJhdGVkUHJvZHVjdHMsIGZlYXR1cmVkUHJvZHVjdHMgfSA9IHByb3BzO1xuXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBjb25zdCB7IHN0YXRlLCBkaXNwYXRjaCB9ID0gdXNlQ29udGV4dChTdG9yZSk7XG5cbiAgY29uc3QgYWRkVG9DYXJ0SGFuZGxlciA9IGFzeW5jIChwcm9kdWN0OiBhbnkpID0+IHtcbiAgICBjb25zdCBleGlzdEl0ZW0gPSBzdGF0ZS5jYXJ0LmNhcnRJdGVtcy5maW5kKFxuICAgICAgKHg6IGFueSkgPT4geC5faWQgPT09IHByb2R1Y3QuX2lkXG4gICAgKTtcbiAgICBjb25zdCBxdWFudGl0eSA9IGV4aXN0SXRlbSA/IGV4aXN0SXRlbS5xdWFudGl0eSArIDEgOiAxO1xuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgYXhpb3MuZ2V0KGAvYXBpL3Byb2R1Y3RzLyR7cHJvZHVjdC5faWR9YCk7XG4gICAgaWYgKGRhdGEuY291bnRJblN0b2NrIDwgcXVhbnRpdHkpIHtcbiAgICAgIHdpbmRvdy5hbGVydChcIlNvcnJ5LiBQcm9kdWN0IGlzIG91dCBvZiBzdG9ja1wiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGlzcGF0Y2goeyB0eXBlOiBcIkNBUlRfQUREX0lURU1cIiwgcGF5bG9hZDogeyAuLi5wcm9kdWN0LCBxdWFudGl0eSB9IH0pO1xuICAgIHJvdXRlci5wdXNoKFwiL2NhcnRcIik7XG4gIH07XG4gIHJldHVybiAoXG4gICAgPExheW91dD5cbiAgICAgIDxDYXJvdXNlbCBhbmltYXRpb249XCJzbGlkZVwiPlxuICAgICAgICB7ZmVhdHVyZWRQcm9kdWN0cy5tYXAoKHByb2R1Y3Q6IGFueSkgPT4gKFxuICAgICAgICAgIDxOZXh0TGlua1xuICAgICAgICAgICAga2V5PXtwcm9kdWN0Ll9pZH1cbiAgICAgICAgICAgIGhyZWY9e2AvcHJvZHVjdC8ke3Byb2R1Y3Quc2x1Z31gfVxuICAgICAgICAgICAgcGFzc0hyZWZcbiAgICAgICAgICAgIGxlZ2FjeUJlaGF2aW9yXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPExpbms+XG4gICAgICAgICAgICAgIDxpbWcgc3JjPXtwcm9kdWN0LmZlYXR1cmVkSW1hZ2V9IGFsdD17cHJvZHVjdC5uYW1lfT48L2ltZz5cbiAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICA8L05leHRMaW5rPlxuICAgICAgICApKX1cbiAgICAgIDwvQ2Fyb3VzZWw+XG4gICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiaDJcIj5Qb3B1bGFyIFByb2R1Y3RzPC9UeXBvZ3JhcGh5PlxuICAgICAgPEdyaWQgY29udGFpbmVyIHNwYWNpbmc9ezN9PlxuICAgICAgICB7dG9wUmF0ZWRQcm9kdWN0cy5tYXAoKHByb2R1Y3Q6IGFueSkgPT4gKFxuICAgICAgICAgIDxHcmlkIGl0ZW0gbWQ9ezR9IGtleT17cHJvZHVjdC5uYW1lfT5cbiAgICAgICAgICAgIDxQcm9kdWN0SXRlbVxuICAgICAgICAgICAgICBwcm9kdWN0PXtwcm9kdWN0fVxuICAgICAgICAgICAgICBhZGRUb0NhcnRIYW5kbGVyPXthZGRUb0NhcnRIYW5kbGVyfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0dyaWQ+XG4gICAgICAgICkpfVxuICAgICAgPC9HcmlkPlxuICAgIDwvTGF5b3V0PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSG9tZTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlcnZlclNpZGVQcm9wcygpIHtcbiAgLy8gYXdhaXQgZGIuY29ubmVjdCgpO1xuICAvLyBjb25zdCBwcm9kdWN0cyA9IGF3YWl0IFByb2R1Y3QuZmluZCh7fSwgXCItcmV2aWV3c1wiKS5sZWFuKCk7XG5cbiAgLy8gYXdhaXQgZGIuZGlzY29ubmVjdCgpO1xuICAvLyByZXR1cm4ge1xuICAvLyAgIHByb3BzOiB7XG4gIC8vICAgICBwcm9kdWN0czogcHJvZHVjdHMubWFwKGRiLmNvbnZlcnREb2NUb09iaiksXG4gIC8vICAgfSxcbiAgLy8gfTtcblxuICBhd2FpdCBkYi5jb25uZWN0KCk7XG4gIGNvbnN0IGZlYXR1cmVkUHJvZHVjdHNEb2NzID0gYXdhaXQgUHJvZHVjdC5maW5kKFxuICAgIHsgaXNGZWF0dXJlZDogdHJ1ZSB9LFxuICAgIFwiLXJldmlld3NcIlxuICApXG4gICAgLmxlYW4oKVxuICAgIC5saW1pdCgzKTtcbiAgY29uc3QgdG9wUmF0ZWRQcm9kdWN0c0RvY3MgPSBhd2FpdCBQcm9kdWN0LmZpbmQoe30sIFwiLXJldmlld3NcIilcbiAgICAubGVhbigpXG4gICAgLnNvcnQoe1xuICAgICAgcmF0aW5nOiAtMSxcbiAgICB9KVxuICAgIC5saW1pdCg2KTtcbiAgYXdhaXQgZGIuZGlzY29ubmVjdCgpO1xuICByZXR1cm4ge1xuICAgIHByb3BzOiB7XG4gICAgICBmZWF0dXJlZFByb2R1Y3RzOiBmZWF0dXJlZFByb2R1Y3RzRG9jcy5tYXAoZGIuY29udmVydERvY1RvT2JqKSxcbiAgICAgIHRvcFJhdGVkUHJvZHVjdHM6IHRvcFJhdGVkUHJvZHVjdHNEb2NzLm1hcChkYi5jb252ZXJ0RG9jVG9PYmopLFxuICAgIH0sXG4gIH07XG59XG4iXSwibmFtZXMiOlsiR3JpZCIsIlR5cG9ncmFwaHkiLCJMaW5rIiwiTGF5b3V0IiwiTmV4dExpbmsiLCJheGlvcyIsInVzZVJvdXRlciIsInVzZUNvbnRleHQiLCJTdG9yZSIsIlByb2R1Y3RJdGVtIiwiQ2Fyb3VzZWwiLCJIb21lIiwicHJvcHMiLCJ0b3BSYXRlZFByb2R1Y3RzIiwiZmVhdHVyZWRQcm9kdWN0cyIsInJvdXRlciIsInN0YXRlIiwiZGlzcGF0Y2giLCJhZGRUb0NhcnRIYW5kbGVyIiwicHJvZHVjdCIsImV4aXN0SXRlbSIsImNhcnQiLCJjYXJ0SXRlbXMiLCJmaW5kIiwieCIsIl9pZCIsInF1YW50aXR5IiwiZGF0YSIsImdldCIsImNvdW50SW5TdG9jayIsIndpbmRvdyIsImFsZXJ0IiwidHlwZSIsInBheWxvYWQiLCJwdXNoIiwiYW5pbWF0aW9uIiwibWFwIiwiaHJlZiIsInNsdWciLCJwYXNzSHJlZiIsImxlZ2FjeUJlaGF2aW9yIiwiaW1nIiwic3JjIiwiZmVhdHVyZWRJbWFnZSIsImFsdCIsIm5hbWUiLCJ2YXJpYW50IiwiY29udGFpbmVyIiwic3BhY2luZyIsIml0ZW0iLCJtZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/index.tsx\n"));

/***/ })

});