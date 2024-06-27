function toggleDropdown() {
  const dropdown = document.getElementById('profileDropdown');
  dropdown.classList.toggle('show');
}
window.onclick = function(event) {
  if (!event.target.matches('.user-profile') && !event.target.matches('.user-profile *')) {
    const dropdowns = document.getElementsByClassName("dropdown-menu");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
// Profile 
function showProfileDialog() {
  const dialog = document.getElementById('profileDialog');
  dialog.classList.remove('d-none');
  setTimeout(() => dialog.classList.add('show'), 10);
}

function closeProfileDialog() {
  const dialog = document.getElementById('profileDialog');
  dialog.classList.remove('show');
  setTimeout(() => dialog.classList.add('d-none'), 300);
}

// Modify the existing toggleDropdown function to close the dropdown when clicking outside
document.addEventListener('click', function(event) {
  const dropdown = document.getElementById('profileDropdown');
  const userProfile = document.querySelector('.user-profile');
  if (!userProfile.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.classList.remove('show');
  }
});