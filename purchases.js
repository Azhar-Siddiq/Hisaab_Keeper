function generateDummyData() {
    return [
        {
            invoiceNumber: "PI-001-00000001",
            vendorName: "Vendor-1",
            invoiceAmount: 123456,
            invoiceDate: "11-06-2024",
            status: "<div class='d-flex gap-1'><button class='OpenTagBtn'>Open</button><button class='OpenTagBtn'>Open</button><button class='OpenTagBtn'>Open</button></div>",
            createdBy: "Admin",
            createdOn: "11-07-2024",
            actions: "<button class='actionBtn'>Action</button>"
        },
        {
            invoiceNumber: "PI-002-00000002",
            vendorName: "Vendor-2",
            invoiceAmount: 123456,
            invoiceDate: "12-06-2024",
            status: "<div class='d-flex gap-1'><button class='OpenTagBtn'>Open</button><button class='OpenTagBtn'>Open</button><button class='OpenTagBtn'>Open</button></div>",
            createdBy: "Admin",
            createdOn: "12-07-2024",
            actions: "<button class='actionBtn'>Action</button>"
        }
    ];
}

function populateTable(data) {
    const thead = document.querySelector('#dataTable thead');
    const tbody = document.querySelector('#dataTable tbody');
    
    // Populate table header
    thead.innerHTML = `
        <tr>
            <th>Invoice Number</th>
            <th>Vendor Name</th>
            <th>Amount</th>
            <th>Invoice Date</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Created On</th>
            <th>Actions</th>
        </tr>
    `;

    // Populate table body
    tbody.innerHTML = '';
    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td data-label='Invoice Number'>${row.invoiceNumber}</td>
            <td data-label='Vendor Name'>${row.vendorName}</td>
            <td data-label='Amount'>${row.invoiceAmount}</td>
            <td data-label='Invoice Date'>${row.invoiceDate}</td>
            <td data-label='Status'>${row.status}</td>
            <td data-label='Created By'>${row.createdBy}</td>
            <td data-label='Created On'>${row.createdOn}</td>
            <td data-label='Actions' class="mb-2">${row.actions}</td>
        `;
        tbody.appendChild(tr);
    });
}

function filterTable() {
    const filter = document.getElementById('filterInput').value.toUpperCase();
    const tbody = document.querySelector('#dataTable tbody');
    const rows = tbody.querySelectorAll('tr');
    let recordFound = false;

    const existingNoRecord = tbody.querySelector('.no-record-message');
    if (existingNoRecord) {
        existingNoRecord.remove();
    }
    rows.forEach(row => {
        const text = row.textContent.toUpperCase();
        if (text.includes(filter)) {
            row.style.display = '';
            recordFound = true;
        } else {
            row.style.display = 'none';
        }
    });

    // Check if no records were found
    if (!recordFound) {
        const noRecordRow = document.createElement('tr');
        noRecordRow.className = 'no-record-message';
        noRecordRow.innerHTML = '<td colspan="8" style="text-align: center;">Sorry, no record found</td>';
        tbody.appendChild(noRecordRow);
    }
}
const dummyData = generateDummyData();
populateTable(dummyData);
document.getElementById('filterInput').addEventListener('keyup', filterTable);

// //Popup js
// function toggle() {
//     let blur = document.getElementById("profileBlur");
//     blur.classList.toggle('profileActive');
//     let popUp = document.getElementById("profilePopup");
//     popUp.classList.toggle('profileActive');
// }
// //Dropdown
// function toggleDropdown() {
//     const dropdown = document.getElementById('profileDropdown');
//     dropdown.classList.toggle('show');
//   }

//   // Close the dropdown if the user clicks outside of it
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