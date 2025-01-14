// Handle item creation in index.html
document.getElementById('createItemForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
  
    axios.post('http://localhost:5000/api/items', { name, description })
      .then(response => {
        // Redirect to view.html after successful creation
        window.location.href = `view.html?id=${response.data._id}`;
      })
      .catch(error => {
        console.error('Error creating item:', error);
      });
  });
  
  // Handle item display in view.html
  function loadItemDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');
  
    if (itemId) {
      axios.get(`http://localhost:5000/api/items/${itemId}`)
        .then(response => {
          const item = response.data;
          document.getElementById('itemDetails').innerHTML = `
            <p><strong>Name:</strong> ${item.name}</p>
            <p><strong>Description:</strong> ${item.description}</p>
          `;
        })
        .catch(error => {
          console.error('Error fetching item:', error);
          document.getElementById('itemDetails').innerHTML = `<p>Item not found.</p>`;
        });
    } else {
      document.getElementById('itemDetails').innerHTML = `<p>No item ID provided.</p>`;
    }
  }
  