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
