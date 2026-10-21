import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Plumbing');
  const [quantity, setQuantity] = useState('');

  
  const [editingId, setEditingId] = useState(null);

  
  const fetchItems = () => {
    fetch('http://localhost:8080/api/items')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch items');
        }
        return res.json();
      })
      .then((data) => setItems(data))
      .catch((err) => console.error('Error fetching items:', err));
  };

  useEffect(() => {
    fetchItems();
  }, []);


  const resetForm = () => {
    setEditingId(null);
    setName('');
    setCategory('Plumbing');
    setQuantity('');
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: name,
      category: category,
      quantity: parseInt(quantity, 10),
      minLimit: 10
    };

    if (editingId) {
      
      fetch(`http://localhost:8080/api/items/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to update item');
          }
          return res.json();
        })
        .then(() => {
          fetchItems();
          resetForm();
        })
        .catch((err) => {
          console.error('Error updating item:', err);
          alert('Could not update item. Make sure Spring Boot backend is running!');
        });
    } else {
      
      fetch('http://localhost:8080/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to save in backend');
          }
          return res.json();
        })
        .then(() => {
          fetchItems();
          resetForm();
        })
        .catch((err) => {
          console.error('Error adding item:', err);
          alert('Could not save item to MySQL. Make sure the Spring Boot backend is running!');
        });
    }
  };

 
  const handleEdit = (item) => {
    setEditingId(item.id);
    setName(item.name);
    setCategory(item.category);
    setQuantity(item.quantity);
  };

 
  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    fetch(`http://localhost:8080/api/items/${id}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete item');
        }
        fetchItems();
      })
      .catch((err) => {
        console.error('Error deleting item:', err);
        alert('Could not delete item. Make sure Spring Boot backend is running!');
      });
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '850px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#0056b3', marginBottom: '20px' }}>
        HD Supply - Simple Stock Manager
      </h2>

      {}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '25px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', flex: '2', minWidth: '150px' }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', flex: '1', minWidth: '120px' }}
        >
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Hardware">Hardware</option>
          <option value="Software">Software</option>
        </select>
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', width: '90px' }}
        />
        <button
          type="submit"
          style={{
            padding: '8px 20px',
            background: editingId ? '#28a745' : '#0056b3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {editingId ? 'Update Item' : 'Add Item'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            style={{
              padding: '8px 14px',
              background: '#6c757d',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {}
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', borderColor: '#ddd' }}>
        <thead>
          <tr style={{ background: '#f5f5f5', color: '#555' }}>
            <th>Item Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const isLowStock = item.quantity <= (item.minLimit ?? 10);
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td style={{ color: isLowStock ? 'red' : 'green', fontWeight: 'bold' }}>
                  {isLowStock ? 'LOW STOCK' : 'In Stock'}
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleEdit(item)}
                    style={{
                      marginRight: '8px',
                      padding: '4px 10px',
                      background: '#ffc107',
                      color: '#000',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    style={{
                      padding: '4px 10px',
                      background: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
