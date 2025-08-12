document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const boundingRect = target.getBoundingClientRect();
  const message = {
    message: "clicked",
    id: target.id,
    styles: {
     
    },
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
  (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const el = e.target as HTMLElement | null;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const styles = window.getComputedStyle(el);

    // remove old overlay
    const oldHighlight = document.getElementById("__highlight-border");
    if (oldHighlight) oldHighlight.remove();

    // create overlay highlight
    const highlight = document.createElement("div");
    highlight.id = "__highlight-border";
    highlight.style.position = "absolute";
    highlight.style.top = `${rect.top + window.scrollY}px`;
    highlight.style.left = `${rect.left + window.scrollX}px`;
    highlight.style.width = `${rect.width}px`;
    highlight.style.height = `${rect.height}px`;
    highlight.style.border = "1.5px solid red";
    highlight.style.pointerEvents = "none"; // không chặn click tiếp theo
    highlight.style.zIndex = "999999";

    document.body.appendChild(highlight);

    // send data for parent site
    window.parent.postMessage(
      {
        type: "GET_ELEMENT",
        id: el.id || null,
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
        ) as Record<string, string>,
      },
      "*"
    );
  },
  true
);