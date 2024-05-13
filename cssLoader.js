function createStylesheet(cssString) {
  const styleElement = document.createElement('style');
  styleElement.setAttribute('type', 'text/css');
  if ('styleSheet' in styleElement) {
    styleElement.styleSheet.cssText = cssString;
  } else {
    const cssText = document.createTextNode(cssString);
    styleElement.appendChild(cssText);
  }
  document.head.appendChild(styleElement);
}
