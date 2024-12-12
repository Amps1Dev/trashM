// JavaScript to handle popup notifications
function checkBinStatus() {
    fetch('bin_status.php')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'full') {
          showPopup();
        }
      })
      .catch(error => console.error('Error fetching bin status:', error));
  }
  
  // Show the popup
  function showPopup() {
    document.getElementById('popup').classList.remove('hidden');
  }
  
  // Close the popup
  function closePopup() {
    document.getElementById('popup').classList.add('hidden');
  }
  
  // Poll for bin status every 5 seconds
  setInterval(checkBinStatus, 5000);
  