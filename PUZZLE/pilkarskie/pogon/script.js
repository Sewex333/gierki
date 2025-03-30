document.addEventListener('DOMContentLoaded', function() {
    const originalImage = document.getElementById('original-image');
    const puzzleContainer = document.getElementById('puzzle-container');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const showImageBtn = document.getElementById('show-image-btn');
    const difficultySelect = document.getElementById('difficulty');
    const thumbnailsContainer = document.getElementById('thumbnails-container');
    
    // Lista dostępnych zdjęć z folderu zdjecia
    const availableImages = [
        'zdjecia/1.png',
        'zdjecia/2.png',
        'zdjecia/3.png',
        'zdjecia/4.png',
        'zdjecia/5.png'
    ];
    
    let selectedImage = '';
    let pieces = [];
    let pieceSize = 0;
    let rows = 0;
    let cols = 0;
    let isDragging = false;
    let draggedPiece = null;
    let offsetX, offsetY;
    let originalImageShown = false;
    
    // Wyświetlanie miniaturek zdjęć
    function displayThumbnails() {
        thumbnailsContainer.innerHTML = '';
        
        availableImages.forEach(imagePath => {
            const img = document.createElement('img');
            img.src = imagePath;
            img.className = 'thumbnail';
            img.alt = 'Miniaturka zdjęcia';
            img.title = 'Kliknij, aby wybrać to zdjęcie';
            
            img.addEventListener('click', function() {
                // Usuń klasę selected ze wszystkich miniaturek
                document.querySelectorAll('.thumbnail').forEach(thumb => {
                    thumb.classList.remove('selected');
                });
                
                // Dodaj klasę selected do wybranej miniaturki
                img.classList.add('selected');
                
                // Ustaw wybrane zdjęcie jako oryginalne
                originalImage.src = imagePath;
                originalImage.style.display = 'block';
                selectedImage = imagePath;
                startBtn.disabled = false;
            });
            
            thumbnailsContainer.appendChild(img);
        });
    }
    
    // Inicjalizacja - wyświetl miniatureki
    displayThumbnails();
    
    // Rozpoczęcie układania puzzli
    startBtn.addEventListener('click', function() {
        if (!selectedImage) return;
        
        // Pobranie poziomu trudności
        const difficulty = parseInt(difficultySelect.value);
        rows = difficulty;
        cols = difficulty;
        
        // Przygotowanie kontenera
        puzzleContainer.innerHTML = '';
        puzzleContainer.style.width = '500px';
        puzzleContainer.style.height = '500px';
        
        // Utworzenie puzzli
        createPuzzle();
        
        // Zmiana stanu przycisków
        startBtn.disabled = true;
        resetBtn.disabled = false;
        showImageBtn.disabled = false;
        originalImage.style.display = 'none';
        originalImageShown = false;
    });
    
    // Resetowanie puzzli
    resetBtn.addEventListener('click', function() {
        if (pieces.length === 0) return;
        
        // Wymieszanie puzzli
        shufflePieces();
    });
    
    // Pokazanie oryginalnego obrazu
    showImageBtn.addEventListener('click', function() {
        originalImageShown = !originalImageShown;
        originalImage.style.display = originalImageShown ? 'block' : 'none';
        showImageBtn.textContent = originalImageShown ? 'Ukryj obraz' : 'Pokaż obraz';
    });
    
    // Funkcja tworząca puzzle
    function createPuzzle() {
        pieces = [];
        const containerWidth = puzzleContainer.offsetWidth;
        const containerHeight = puzzleContainer.offsetHeight;
        
        pieceSize = Math.min(
            Math.floor(containerWidth / cols),
            Math.floor(containerHeight / rows)
        );
        
        // Dopasowanie rozmiaru kontenera do wielokrotności rozmiaru puzzli
        puzzleContainer.style.width = `${pieceSize * cols}px`;
        puzzleContainer.style.height = `${pieceSize * rows}px`;
        
        // Tworzenie canvas do przycięcia obrazka
        const canvas = document.createElement('canvas');
        canvas.width = pieceSize * cols;
        canvas.height = pieceSize * rows;
        const ctx = canvas.getContext('2d');
        
        // Rysowanie obrazka na canvas z zachowaniem proporcji
        const img = new Image();
        img.onload = function() {
            // Obliczenie proporcji
            const imgRatio = img.width / img.height;
            const canvasRatio = canvas.width / canvas.height;
            
            let drawWidth, drawHeight, offsetX = 0, offsetY = 0;
            
            if (imgRatio > canvasRatio) {
                // Obrazek szerszy niż canvas - dopasowanie do wysokości
                drawHeight = canvas.height;
                drawWidth = img.width * (drawHeight / img.height);
                offsetX = (canvas.width - drawWidth) / 2;
            } else {
                // Obrazek wyższy niż canvas - dopasowanie do szerokości
                drawWidth = canvas.width;
                drawHeight = img.height * (drawWidth / img.width);
                offsetY = (canvas.height - drawHeight) / 2;
            }
            
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            
            // Tworzenie puzzli
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    // Pomijanie ostatniego puzzla (zostanie puste miejsce)
                    if (row === rows - 1 && col === cols - 1) continue;
                
                    // Wycinanie fragmentu obrazka
                    const pieceCanvas = document.createElement('canvas');
                    pieceCanvas.width = pieceSize;
                    pieceCanvas.height = pieceSize;
                    const pieceCtx = pieceCanvas.getContext('2d');
                    
                    pieceCtx.drawImage(
                        canvas,
                        col * pieceSize, row * pieceSize, pieceSize, pieceSize,
                        0, 0, pieceSize, pieceSize
                    );
                    
                    // Tworzenie elementu puzzla
                    const piece = document.createElement('div');
                    piece.className = 'puzzle-piece';
                    piece.style.width = `${pieceSize}px`;
                    piece.style.height = `${pieceSize}px`;
                    piece.style.backgroundImage = `url(${pieceCanvas.toDataURL()})`;
                    piece.dataset.row = row;
                    piece.dataset.col = col;
                    
                    puzzleContainer.appendChild(piece);
                    pieces.push({
                        element: piece,
                        originalRow: row,
                        originalCol: col,
                        currentRow: row,
                        currentCol: col
                    });
                    
                    // Dodanie obsługi przeciągania
                    addDragHandlers(piece);
                }
            }
            
            // Wymieszanie puzzli
            shufflePieces();
        };
        
        img.src = selectedImage;
    }
    
    // Funkcja mieszająca puzzle
    function shufflePieces() {
        const emptyRow = rows - 1;
        const emptyCol = cols - 1;
        
        // Przypisanie początkowych pozycji
        pieces.forEach(piece => {
            piece.currentRow = parseInt(piece.element.dataset.row);
            piece.currentCol = parseInt(piece.element.dataset.col);
        });
        
        // Wykonanie wielu losowych ruchów
        const shuffleMoves = 100 * rows * cols;
        let currentEmptyRow = emptyRow;
        let currentEmptyCol = emptyCol;
        
        for (let i = 0; i < shuffleMoves; i++) {
            // Znalezienie możliwych ruchów
            const possibleMoves = [];
            
            // Sprawdzenie sąsiadów
            if (currentEmptyRow > 0) possibleMoves.push({row: currentEmptyRow - 1, col: currentEmptyCol});
            if (currentEmptyRow < rows - 1) possibleMoves.push({row: currentEmptyRow + 1, col: currentEmptyCol});
            if (currentEmptyCol > 0) possibleMoves.push({row: currentEmptyRow, col: currentEmptyCol - 1});
            if (currentEmptyCol < cols - 1) possibleMoves.push({row: currentEmptyRow, col: currentEmptyCol + 1});
            
            // Wybór losowego ruchu
            const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            
            // Znalezienie puzzla do przesunięcia
            const pieceIndex = pieces.findIndex(p => 
                p.currentRow === move.row && p.currentCol === move.col
            );
            
            if (pieceIndex !== -1) {
                // Przesunięcie puzzla
                const piece = pieces[pieceIndex];
                piece.currentRow = currentEmptyRow;
                piece.currentCol = currentEmptyCol;
                
                // Aktualizacja pozycji wizualnej
                updatePiecePosition(piece);
                
                // Aktualizacja pustego miejsca
                currentEmptyRow = move.row;
                currentEmptyCol = move.col;
            }
        }
    }

    // Funkcja aktualizująca pozycję puzzla
    function updatePiecePosition(piece) {
        piece.element.style.left = `${piece.currentCol * pieceSize}px`;
        piece.element.style.top = `${piece.currentRow * pieceSize}px`;
    }
    
    // Dodanie obsługi przeciągania
    function addDragHandlers(piece) {
        piece.addEventListener('mousedown', startDrag);
        piece.addEventListener('touchstart', startDrag, {passive: false});
        
        // Zapobieganie domyślnej akcji dla touch events (aby uniknąć przewijania strony)
        piece.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, {passive: false});
    }
    
    // Rozpoczęcie przeciągania
    function startDrag(e) {
        e.preventDefault();
        isDragging = true;
        draggedPiece = pieces.find(p => p.element === e.currentTarget);
        
        // Obliczenie offsetu kursora względem puzzla
        if (e.type === 'mousedown') {
            offsetX = e.clientX - draggedPiece.element.offsetLeft;
            offsetY = e.clientY - draggedPiece.element.offsetTop;
        } else if (e.type === 'touchstart') {
            const touch = e.touches[0];
            offsetX = touch.clientX - draggedPiece.element.offsetLeft;
            offsetY = touch.clientY - draggedPiece.element.offsetTop;
        }
        
        // Podniesienie puzzla
        draggedPiece.element.style.zIndex = '10';
        
        // Dodanie nasłuchiwaczy
        document.addEventListener('mousemove', dragPiece);
        document.addEventListener('touchmove', dragPiece, {passive: false});
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);
    }
    
    // Przeciąganie puzzla
    function dragPiece(e) {
        if (!isDragging || !draggedPiece) return;
        e.preventDefault();
        
        let clientX, clientY;
        
        if (e.type === 'mousemove') {
            clientX = e.clientX;
            clientY = e.clientY;
        } else if (e.type === 'touchmove') {
            const touch = e.touches[0];
            clientX = touch.clientX;
            clientY = touch.clientY;
        }
        
        // Aktualizacja pozycji puzzla
        draggedPiece.element.style.left = `${clientX - offsetX}px`;
        draggedPiece.element.style.top = `${clientY - offsetY}px`;
    }
    
    // Zakończenie przeciągania
    function stopDrag(e) {
        if (!isDragging || !draggedPiece) return;
        e.preventDefault();
        
        // Usunięcie nasłuchiwaczy
        document.removeEventListener('mousemove', dragPiece);
        document.removeEventListener('touchmove', dragPiece);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchend', stopDrag);
        
        // Sprawdzenie, czy puzzle można upuścić w nowym miejscu
        tryToMovePiece();
        
        // Resetowanie stanu
        isDragging = false;
        draggedPiece.element.style.zIndex = '1';
        draggedPiece = null;
    }
    
    // Próba przesunięcia puzzla
    function tryToMovePiece() {
        // Znalezienie najbliższej pozycji
        const centerX = draggedPiece.element.offsetLeft + pieceSize / 2;
        const centerY = draggedPiece.element.offsetTop + pieceSize / 2;
        
        const targetCol = Math.round(centerX / pieceSize);
        const targetRow = Math.round(centerY / pieceSize);
        
        // Sprawdzenie, czy pozycja jest pusta i sąsiaduje z oryginalną pozycją
        const isEmpty = !pieces.some(p => 
            p !== draggedPiece && p.currentRow === targetRow && p.currentCol === targetCol
        );
        
        const isAdjacent = (
            (Math.abs(draggedPiece.currentRow - targetRow) === 1 && draggedPiece.currentCol === targetCol) ||
            (Math.abs(draggedPiece.currentCol - targetCol) === 1 && draggedPiece.currentRow === targetRow)
        );
        
        if (targetRow >= 0 && targetRow < rows && 
            targetCol >= 0 && targetCol < cols && 
            isEmpty && isAdjacent) {
            
            // Aktualizacja pozycji puzzla
            draggedPiece.currentRow = targetRow;
            draggedPiece.currentCol = targetCol;
            updatePiecePosition(draggedPiece);
            
            // Sprawdzenie, czy puzzle są ułożone
            checkCompletion();
        } else {
            // Powrót do oryginalnej pozycji
            updatePiecePosition(draggedPiece);
        }
    }
    
    // Sprawdzenie, czy puzzle są ułożone
    function checkCompletion() {
        const isComplete = pieces.every(piece => 
            piece.currentRow === piece.originalRow && 
            piece.currentCol === piece.originalCol
        );
        
        if (isComplete) {
            setTimeout(() => {
                alert('Gratulacje! Ułożyłeś puzzle!');
            }, 100);
        }
    }
});