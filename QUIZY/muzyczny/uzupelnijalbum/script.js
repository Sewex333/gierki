function showTracklist(album) {
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('tracklistPage').style.display = 'block';
    document.getElementById('albumName').innerText = album === 'paktofonika' ? 'Paktofonika - Kinematografia' : 'Dr Dre - 2001';
  }
  
  function addTrack() {
    let trackInput = document.getElementById('trackInput').value;
    if (trackInput) {
      let tracklist = document.getElementById('tracklist');
      let newTrack = document.createElement('li');
      newTrack.innerText = trackInput;
      tracklist.appendChild(newTrack);
    }
  }
  
  function autoFillTracklist() {
    let tracklist = document.getElementById('tracklist');
    tracklist.innerHTML = "<li>Utwór 1</li><li>Utwór 2</li><li>Utwór 3</li>"; // Tutaj wstaw prawdziwą tracklistę
    document.getElementById('trackInput').disabled = true;
    document.getElementById('trackInput').placeholder = "Tracklista uzupełniona automatycznie";
  }
  
  function goBack() {
    document.getElementById('mainPage').style.display = 'block';
    document.getElementById('tracklistPage').style.display = 'none';
    document.getElementById('trackInput').value = '';
    document.getElementById('trackInput').disabled = false;
    document.getElementById('trackInput').placeholder = "Wpisz nazwę utworu";
  }