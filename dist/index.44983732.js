document.addEventListener("DOMContentLoaded", ()=>{
    const boxes = document.querySelectorAll(".box");
    // Crear un observador con un callback
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Deja de observar el elemento después de que se ha hecho visible
            }
        });
    }, {
        threshold: 0.1 // Ajusta el umbral según necesites
    });
    // Comienza a observar cada caja
    boxes.forEach((box)=>{
        observer.observe(box);
    });
});

//# sourceMappingURL=index.44983732.js.map
