document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const boundingRect = target.getBoundingClientRect();
  const message = {
    message: "clicked",
    id: target.id,
    styles: {},
    boundingRect,
    pointer: {
      pageX: e.pageX,
      pageY: e.pageY,
    },
  };
  window.parent?.postMessage(message);
});

//script trigger node element
document.addEventListener(
  "click",
  (e) => {
    e.preventDefault();
    e.stopPropagation();

     const el = e.target as HTMLElement | null;
    if (!el) return;
    
    const rect = el.getBoundingClientRect();
    const styles = window.getComputedStyle(el);

    window.parent.postMessage(
      {
        type: "GET_NODE_ELEMENT",
        id: el?.id || null,
        rect: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        },
        scroll: {
          top: window.scrollY,
          left: window.scrollX,
        },
        styles: Object.fromEntries(
          [...styles].map((key) => [key, styles.getPropertyValue(key)])
        ),
      },
      "*"
    );
  },
  true
);

window.addEventListener("scroll", () => {
  window.parent.postMessage(
    {
      type: "IFRAME_SCROLL",
    },
    "*"
  );
});
