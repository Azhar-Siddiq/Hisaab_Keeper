function generateDummyData() {
    const data = [];
    const statuses = ['Active', 'Inactive', 'Pending'];
    const categories = ['A', 'B', 'C', 'D'];

    for (let i = 1; i <= 5; i++) {
        data.push({
            id: i,
            name: `Person ${i}`,
            email: `person${i}@example.com`,
            phone: `+1 ${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}`,
            date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            category: categories[Math.floor(Math.random() * categories.length)],
            amount: `$${(Math.random() * 1000).toFixed(2)}`,
            notes: `Note for Person ${i}`
        });
    }
    return data;
}

function populateTable(data) {
    const tbody = document.querySelector('#dataTable tbody');
    tbody.innerHTML = '';
    data.forEach(row => {
        const tr = document.createElement('tr');
        Object.values(row).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

function filterTable() {
    const filter = document.getElementById('filterInput').value.toUpperCase();
    const table = document.getElementById('dataTable');
    const rows = table.querySelectorAll('tbody tr');
    let foundMatch = false;

    rows.forEach(row => {
        const text = row.textContent.toUpperCase();
        if (text.includes(filter)) {
            row.style.display = '';
            foundMatch = true;
        } else {
            row.style.display = 'none';
        }
    });

    let noResultsRow = table.querySelector('.no-results-row');
    if (!foundMatch) {
        if (!noResultsRow) {
            noResultsRow = table.insertRow();
            noResultsRow.className = 'no-results-row';
            const cell = noResultsRow.insertCell();
            cell.colSpan = table.rows[0].cells.length; // Span all columns
            cell.textContent = 'Sorry, No Record Found';
            cell.style.textAlign = 'center';
            cell.style.padding = '20px';
        }
        noResultsRow.style.display = '';
    } else if (noResultsRow) {
        noResultsRow.style.display = 'none';
    }
}
const dummyData = generateDummyData();
populateTable(dummyData);
document.getElementById('filterInput').addEventListener('keyup', filterTable);





//Dropdown
// function toggleDropdown() {
//     const dropdown = document.getElementById('profileDropdown');
//     dropdown.classList.toggle('show');
//   }
//   window.onclick = function(event) {
//     if (!event.target.matches('.user-profile') && !event.target.matches('.user-profile *')) {
//       const dropdowns = document.getElementsByClassName("dropdown-menu");
//       for (let i = 0; i < dropdowns.length; i++) {
//         const openDropdown = dropdowns[i];
//         if (openDropdown.classList.contains('show')) {
//           openDropdown.classList.remove('show');
//         }
//       }
//     }
//   }
// //Popup js
// // function toggle() {
// //     let blur = document.getElementById("profileBlur");
// //     blur.classList.toggle('profileActive');
// //     let popUp = document.getElementById("profilePopup");
// //     popUp.classList.toggle('profileActive');
// // }
// function toggle() {
//     document.getElementById('profilePopup').classList.toggle('profileActive');
//     document.getElementById('profileBlur').classList.toggle('profileActive');
//   }

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