<template>
    <div class="inventory">
      <h1>Inventory</h1>
      <div class="inventory-grid">
        <!-- Example items, replace with dynamic content -->
        <div class="inventory-item" v-for="(item, index) in items" :key="index">
          <img :src="item.icon" alt="item.name" class="item-icon" />
          <div class="item-details">
            <p class="item-name">{{ item.name }}</p>
            <p class="item-quantity">x{{ item.quantity }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [
          { name: "Potion", quantity: 5, icon: "path/to/potion.png" },
          { name: "Sword", quantity: 1, icon: "path/to/sword.png" },
          { name: "Shield", quantity: 1, icon: "path/to/shield.png" },
          // Add more items dynamically
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  /* Container styling */
  .inventory {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    background-color: #f4f4f4;
    border-radius: 10px;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
  }
  
  /* Title styling */
  h1 {
    font-family: 'Arial', sans-serif;
    font-size: 1.5em;
    margin-bottom: 10px;
  }
  
  /* Responsive grid styling */
  .inventory-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    width: 100%;
  }
  
  /* Item box styling */
  .inventory-item {
    background-color: #fff;
    border: 2px solid #ddd;
    border-radius: 8px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  /* Item icon styling */
  .item-icon {
    width: 48px;
    height: 48px;
  }
  
  /* Item text styling */
  .item-details {
    text-align: center;
    margin-top: 8px;
  }
  
  .item-name {
    font-size: 1em;
    font-weight: bold;
  }
  
  .item-quantity {
    color: #888;
    font-size: 0.8em;
  }
  
  /* Responsive adjustments for small screens */
  @media (max-width: 600px) {
    .inventory-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  
    .item-icon {
      width: 40px;
      height: 40px;
    }
  
    h1 {
      font-size: 1.2em;
    }
  
    .item-name {
      font-size: 0.9em;
    }
  
    .item-quantity {
      font-size: 0.7em;
    }
  }
  </style>
  