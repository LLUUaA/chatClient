export function imgLoad(el, binding) {
    const { src , errorSrc } = binding.value;
    el.src = src;
    el.onerror= (err) => {
        el.src= errorSrc;
    }
}