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


//Dummy data table
let users = [
    { id: 1, username: 'john_doe', fullName: 'John Doe', email: 'john@example.com', createdBy: 'Admin', createdOn: '2024-03-15' },
    { id: 2, username: 'jane_smith', fullName: 'Jane Smith', email: 'jane@example.com', createdBy: 'Manager', createdOn: '2024-03-16' },
  ];

  let roles = [
    { id: 1, name: 'Admin', email: 'admin@example.com' },
    { id: 2, name: 'Editor', email: 'editor@example.com' },
    { id: 3, name: 'Viewer', email: 'viewer@example.com' }
  ];

  function populateTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    if (data.length === 0) {
      const noRecordsRow = `
        <tr>
          <td colspan="6" class="text-center">
            <div class="bg-white m-0" role="alert">
              Sorry, no record found.
            </div>
          </td>
        </tr>
      `;
      tableBody.innerHTML = noRecordsRow;
      return;
    }

    data.forEach(user => {
      const row = `
        <tr>
          <td>${user.username}</td>
          <td>${user.fullName}</td>
          <td>${user.email}</td>
          <td>${user.createdBy}</td>
          <td>${user.createdOn}</td>
          <td>
            <button class="btn btn-sm btn-primary me-1 edit-btn" data-id="${user.id}"><i class="fas fa-edit"></i> Edit</button>
            <button class="btn btn-sm btn-danger me-1 delete-btn" data-id="${user.id}"><i class="fas fa-trash"></i> Delete</button>
            <button class="btn btn-sm btn-secondary roles-btn"><i class="fas fa-user-tag"></i> Roles</button>
          </td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', handleEdit);
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', handleDelete);
    });
    document.querySelectorAll('.roles-btn').forEach(btn => {
      btn.addEventListener('click', handleRolesClick);
    });
  }

  function handleEdit(e) {
    const userId = e.target.closest('.edit-btn').dataset.id;
    const user = users.find(u => u.id == userId);

    document.getElementById('editUsername').value = user.username;
    document.getElementById('editFullName').value = user.fullName;
    document.getElementById('editEmail').value = user.email;

    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();

    document.getElementById('saveEditBtn').onclick = function() {
      user.username = document.getElementById('editUsername').value;
      user.fullName = document.getElementById('editFullName').value;
      user.email = document.getElementById('editEmail').value;

      editModal.hide();
      populateTable(users);
    };
  }

  function handleDelete(e) {
    const userId = e.target.closest('.delete-btn').dataset.id;
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();

    document.getElementById('confirmDeleteBtn').onclick = function() {
      users = users.filter(u => u.id != userId);
      deleteModal.hide();
      populateTable(users);
    };
  }

  document.getElementById('filterInput').addEventListener('input', function(e) {
    const filterValue = e.target.value.toLowerCase();
    const filteredUsers = users.filter(user => 
      user.username.toLowerCase().includes(filterValue) ||
      user.fullName.toLowerCase().includes(filterValue) ||
      user.email.toLowerCase().includes(filterValue) ||
      user.createdBy.toLowerCase().includes(filterValue) ||
      user.createdOn.toLowerCase().includes(filterValue)
    );
    populateTable(filteredUsers);
  });

  function populateRoles() {
    const rolesList = document.getElementById('rolesList');
    rolesList.innerHTML = '';

    roles.forEach(role => {
      const listItem = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>${role.name}</strong>
            <div>${role.email}</div>
          </div>
          <div>
            <button class="btn btn-sm btn-primary me-1 edit-role-btn" data-id="${role.id}"><i class="fas fa-edit"></i></button>
            <button class="btn btn-sm btn-danger delete-role-btn" data-id="${role.id}"><i class="fas fa-trash"></i></button>
          </div>
        </li>
      `;
      rolesList.innerHTML += listItem;
    });

    document.querySelectorAll('.edit-role-btn').forEach(btn => {
      btn.addEventListener('click', handleEditRole);
    });

    document.querySelectorAll('.delete-role-btn').forEach(btn => {
      btn.addEventListener('click', handleDeleteRole);
    });
  }

  function handleRolesClick() {
    const rolesModal = new bootstrap.Modal(document.getElementById('rolesModal'));
    rolesModal.show();
    populateRoles();
  }

  function handleAddRole() {
    const roleName = document.getElementById('roleName').value;
    const roleEmail = document.getElementById('roleEmail').value;
    if (roleName && roleEmail) {
      const newRole = {
        id: roles.length ? roles[roles.length - 1].id + 1 : 1,
        name: roleName,
        email: roleEmail
      };
      roles.push(newRole);
      document.getElementById('roleName').value = '';
      document.getElementById('roleEmail').value = '';
      populateRoles();
    }
  }

  function handleEditRole(e) {
    const roleId = e.target.closest('.edit-role-btn').dataset.id;
    const role = roles.find(r => r.id == roleId);

    document.getElementById('roleName').value = role.name;
    document.getElementById('roleEmail').value = role.email;

    const saveEditBtn = document.getElementById('addRoleBtn');
    saveEditBtn.textContent = 'Save Changes';
    saveEditBtn.onclick = function() {
      role.name = document.getElementById('roleName').value;
      role.email = document.getElementById('roleEmail').value;
      saveEditBtn.textContent = 'Add Role';
      saveEditBtn.onclick = handleAddRole;
      populateRoles();
    };
  }

  function handleDeleteRole(e) {
    const roleId = e.target.closest('.delete-role-btn').dataset.id;
    roles = roles.filter(r => r.id != roleId);
    populateRoles();
  }

  document.getElementById('addRoleBtn').addEventListener('click', handleAddRole);

  document.addEventListener('DOMContentLoaded', function() {
    populateTable(users);
  });