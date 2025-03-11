document.addEventListener("mouseover", (event) => {
    const img = event.target;
    
    if (img.tagName === "IMG") {
        let highResSrc = getHighResImage(img);

        let zoomedImg = document.createElement("img");
        zoomedImg.src = highResSrc;
        zoomedImg.classList.add("hover-zoom");

        document.body.appendChild(zoomedImg);

        // Posicionar la imagen ampliada cerca del cursor
        img.addEventListener("mousemove", (e) => {
            zoomedImg.style.top = `${e.pageY + 10}px`;
            zoomedImg.style.left = `${e.pageX + 10}px`;
        });

        // Eliminar la imagen al salir
        img.addEventListener("mouseleave", () => {
            zoomedImg.remove();
        }, { once: true });
    }
});

// Función para obtener la mejor calidad disponible
function getHighResImage(img) {
    // Revisar si hay una mejor versión en srcset
    if (img.srcset) {
        let srcsetImages = img.srcset.split(",").map(entry => entry.trim().split(" ")[0]);
        return srcsetImages[srcsetImages.length - 1]; // Tomar la de mayor resolución
    }

    // Si la URL sigue un patrón de miniaturas, intenta cambiarlo (Ejemplo: algunas webs usan _thumb o _small)
    let modifiedSrc = img.src
        .replace(/(_thumb|_small|_medium)/, "")  // Eliminar sufijos de miniaturas comunes
        .replace(/w=\d+&h=\d+/g, "w=1920&h=1080"); // Si hay parámetros de tamaño, aumentarlos

    return modifiedSrc;
}
