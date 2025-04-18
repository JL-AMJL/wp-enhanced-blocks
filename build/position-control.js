/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!********************************************!*\
  !*** ./block-supports/position-control.js ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






const POSITION_SUPPORT_BLOCKS = ['core/group', 'core/cover', 'core/column'];

// Function to dynamically set the width of fixed elements in the editor
const updateFixedElementWidth = () => {
  console.log('Running updateFixedElementWidth for .cbe-position-fixed');

  // Re-query skeletonContent and all fixed elements dynamically
  const skeletonContent = document.querySelector('.interface-interface-skeleton__content');
  const fixedElements = document.querySelectorAll('.cbe-position-fixed'); // Target all elements with the cbe-position-fixed class

  if (skeletonContent && fixedElements.length > 0) {
    console.log('Found skeletonContent:', skeletonContent);
    console.log('Found fixedElements:', fixedElements);

    // Calculate and apply the new width for each fixed element
    const newWidth = `${skeletonContent.offsetWidth}px`;
    fixedElements.forEach(fixedElement => {
      fixedElement.style.setProperty('width', newWidth, 'important'); // Apply with !important
      console.log('Updated width of fixedElement to:', newWidth, fixedElement);
    });
  } else {
    if (!skeletonContent) console.log('Skeleton content not found.');
    if (fixedElements.length === 0) console.log('No elements with class .cbe-position-fixed found.');
  }
};

// Higher-order component to add custom position controls
const withCustomPositionControls = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.createHigherOrderComponent)(BlockEdit => props => {
  if (!POSITION_SUPPORT_BLOCKS.includes(props.name)) return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(BlockEdit, {
    ...props
  });
  const {
    attributes,
    setAttributes,
    clientId
  } = props;
  const {
    cbePosition,
    cbeOffset,
    cbeZIndex,
    cbeWidth100,
    cbeEditorPositionOverride
  } = attributes;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    console.log('useEffect triggered for .bg-slider');

    // Only apply dynamic width in the editor
    if (cbePosition === 'fixed' && cbeWidth100 && !cbeEditorPositionOverride) {
      console.log('Conditions met for updating width.');
      updateFixedElementWidth();

      // Update the width on window resize
      const handleResize = () => {
        console.log('Window resized, updating width for .bg-slider');
        updateFixedElementWidth();
      };
      window.addEventListener('resize', handleResize);

      // Observe DOM changes to reapply width updates
      const observer = new MutationObserver(mutationsList => {
        console.log('DOM changed, reapplying width update.');
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList' || mutation.type === 'attributes') {
            console.log('Mutation detected:', mutation);
            updateFixedElementWidth();
          }
        }
      });

      // Observe the parent container of the editor and secondary panel
      const skeleton = document.querySelector('.interface-interface-skeleton');
      if (skeleton) {
        observer.observe(skeleton, {
          childList: true,
          subtree: true,
          attributes: true
        });
        console.log('MutationObserver is now observing:', skeleton);
      } else {
        console.log('Skeleton container not found.');
      }

      // Cleanup event listeners and observer on unmount
      return () => {
        console.log('Cleaning up resize listener and MutationObserver for .bg-slider');
        window.removeEventListener('resize', handleResize);
        observer.disconnect();
      };
    } else {
      console.log('Conditions not met for updating width.');
    }
  }, [cbePosition, cbeWidth100, cbeEditorPositionOverride]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(BlockEdit, {
      ...props
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
        title: "Advanced Positioning",
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
          label: "Breite auf 100% setzen",
          checked: attributes.cbeWidth100,
          onChange: value => setAttributes({
            cbeWidth100: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
          label: "Positon im Editor deaktivieren",
          checked: attributes.cbeEditorPositionOverride,
          onChange: value => setAttributes({
            cbeEditorPositionOverride: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
          className: "components-base-control__help",
          children: "Deaktiviert die CSS-Positionierung nur im Editor. N\xFCtzlich f\xFCr besseres Layout beim Bearbeiten."
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
          label: "CSS-Position",
          value: cbePosition,
          options: [{
            label: 'Standard',
            value: ''
          }, {
            label: 'Relative',
            value: 'relative'
          }, {
            label: 'Absolute',
            value: 'absolute'
          }, {
            label: 'Fixed',
            value: 'fixed'
          }, {
            label: 'Sticky',
            value: 'sticky'
          }],
          onChange: value => setAttributes({
            cbePosition: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          label: "Z-Index",
          value: cbeZIndex,
          onChange: v => setAttributes({
            cbeZIndex: v
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalBoxControl, {
          label: "Offset",
          values: attributes.cbeOffset || {},
          onChange: newValues => {
            setAttributes({
              cbeOffset: newValues
            });
          },
          units: ['px', '%', 'em', 'rem', 'vh', 'vw']
        })]
      })
    })]
  });
}, 'withCustomPositionControls');
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('editor.BlockEdit', 'cbe/custom-position-controls', withCustomPositionControls);
function addCustomAttributes(settings, name) {
  if (!POSITION_SUPPORT_BLOCKS.includes(name)) return settings;
  return {
    ...settings,
    attributes: {
      ...settings.attributes,
      cbePosition: {
        type: 'string'
      },
      cbeOffset: {
        type: 'object',
        default: {
          top: null,
          right: null,
          bottom: null,
          left: null
        }
      },
      cbeZIndex: {
        type: 'string'
      },
      cbeWidth100: {
        type: 'boolean',
        default: false
      },
      cbeEditorPositionOverride: {
        type: 'boolean',
        default: false
      }
    },
    supports: {
      ...settings.supports,
      className: true
    }
  };
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('blocks.registerBlockType', 'cbe/add-custom-attributes', addCustomAttributes);
function applyCustomClassNames(extraProps, blockType, attributes) {
  if (!POSITION_SUPPORT_BLOCKS.includes(blockType.name)) return extraProps;
  const classNames = [];
  if (attributes.cbeWidth100) {
    classNames.push('cbe-width-100');
  }
  if (attributes.cbePosition) {
    classNames.push(`cbe-position-${attributes.cbePosition}`);
  }
  if (classNames.length > 0) {
    extraProps.className = [extraProps.className || '', ...classNames].filter(Boolean).join(' ');
  }
  return extraProps;
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('blocks.getSaveContent.extraProps', 'cbe/apply-classnames', applyCustomClassNames);
function applyCustomStyles(extraProps, blockType, attributes) {
  if (!POSITION_SUPPORT_BLOCKS.includes(blockType.name)) return extraProps;
  const {
    cbePosition,
    cbeOffset,
    cbeZIndex
  } = attributes;
  extraProps.style = {
    ...extraProps.style,
    ...(cbeOffset?.top && {
      top: cbeOffset.top
    }),
    ...(cbeOffset?.right && {
      right: cbeOffset.right
    }),
    ...(cbeOffset?.bottom && {
      bottom: cbeOffset.bottom
    }),
    ...(cbeOffset?.left && {
      left: cbeOffset.left
    }),
    ...(cbeZIndex && !isNaN(parseInt(cbeZIndex)) ? {
      zIndex: parseInt(cbeZIndex)
    } : {})
  };
  return extraProps;
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('blocks.getSaveContent.extraProps', 'cbe/apply-custom-styles', applyCustomStyles);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('editor.BlockListBlock', 'cbe/editor-inline-style', BlockListBlock => props => {
  if (!['core/group', 'core/cover', 'core/column'].includes(props.name)) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(BlockListBlock, {
      ...props
    });
  }
  const {
    attributes
  } = props;
  const wrapperProps = {
    ...props.wrapperProps,
    style: {
      ...props.wrapperProps?.style,
      '--cbe-position': attributes.cbePosition || undefined,
      '--cbe-top': attributes.cbeOffset?.top || undefined,
      '--cbe-right': attributes.cbeOffset?.right || undefined,
      '--cbe-bottom': attributes.cbeOffset?.bottom || undefined,
      '--cbe-left': attributes.cbeOffset?.left || undefined,
      '--cbe-z-index': !isNaN(parseInt(attributes.cbeZIndex)) ? parseInt(attributes.cbeZIndex) : undefined
    },
    className: [props.wrapperProps?.className, attributes.cbeWidth100 ? 'cbe-width-100' : null, attributes.cbePosition ? `cbe-position-${attributes.cbePosition}` : null, attributes.cbeEditorPositionOverride ? 'cbe-editor-position-override' : null].filter(Boolean).join(' ')
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(BlockListBlock, {
    ...props,
    wrapperProps: wrapperProps
  });
});
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('blocks.getBlockAttributes', 'cbe/apply-classnames-to-edit', (attributes, blockType) => {
  if (!POSITION_SUPPORT_BLOCKS.includes(blockType.name)) return attributes;
  const classNames = [attributes.className || ''];
  if (attributes.cbeWidth100) {
    classNames.push('cbe-width-100');
  }
  if (attributes.cbePosition) {
    classNames.push(`cbe-position-${attributes.cbePosition}`);
  }
  if (attributes.cbeEditorPositionOverride) {
    classNames.push('cbe-editor-position-override');
  }
  return {
    ...attributes,
    className: classNames.join(' ').trim()
  };
});
})();

/******/ })()
;
//# sourceMappingURL=position-control.js.map