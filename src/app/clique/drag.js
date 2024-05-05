document.addEventListener("DOMContentLoaded", function() {
    // Mettez tout le code qui dépend des éléments du DOM ici
    const statsOverlay = document.getElementById("stats-overlay");
    const dragBars = document.querySelectorAll(".drag-bar");
    
    let offsetX, offsetY, isDragging = false;

    // Début du déplacement
    function startDragging(e) {
        isDragging = true;
        offsetX = e.clientX - statsOverlay.offsetLeft;
        offsetY = e.clientY - statsOverlay.offsetTop;
    }

    // Pendant le déplacement
    function drag(e) {
        if (isDragging) {
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;
            statsOverlay.style.left = newX + "px";
            statsOverlay.style.top = newY + "px";
        }
    }

    // Fin du déplacement
    function stopDragging() {
        isDragging = false;
    }

    // Ajouter des écouteurs d'événements aux barres de drag-and-drop
    dragBars.forEach(dragBar => {
        dragBar.addEventListener("mousedown", startDragging);
    });

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDragging);
});
