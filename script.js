// JavaScript for folder interactions

document.addEventListener('DOMContentLoaded', function() {
  // Any additional folder interactions can be added here
  const folders = document.querySelectorAll('.folder-item');
  
  folders.forEach(folder => {
    folder.addEventListener('click', function(e) {
      // Folder click handling if needed
      console.log('Folder clicked');
    });
  });
});
