function deleteUser(userId) {
    fetch(`/deleteUser/${userId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        window.location.href = '/'; // Redirect to home page after deletion
      } else {
        console.error('Error deleting user');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }