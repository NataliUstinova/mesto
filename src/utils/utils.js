export function renderLoading(parentElement) {
  let childElement = null;
  parentElement.childNodes.forEach(node => {
    if (node?.classList?.contains('popup__save')) {
      childElement = node;
    }
  });
  return childElement;
}