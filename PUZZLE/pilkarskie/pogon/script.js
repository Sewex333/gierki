document.addEventListener("DOMContentLoaded", function() {
    let puzzlePiece = null;
    let offsetX = 0;
    let offsetY = 0;

    document.querySelectorAll(".puzzle-piece").forEach(function(piece) {
        piece.addEventListener("mousedown", function(e) {
            puzzlePiece = piece;
            offsetX = e.clientX - puzzlePiece.getBoundingClientRect().left;
            offsetY = e.clientY - puzzlePiece.getBoundingClientRect().top;

            puzzlePiece.style.zIndex = "2";
        });

        document.addEventListener("mousemove", function(e) {
            if (puzzlePiece) {
                puzzlePiece.style.left = e.clientX - offsetX + "px";
                puzzlePiece.style.top = e.clientY - offsetY + "px";
            }
        });

        document.addEventListener("mouseup", function() {
            if (puzzlePiece) {
                puzzlePiece.style.zIndex = "1";
                puzzlePiece = null;
            }
        });
    });
});
