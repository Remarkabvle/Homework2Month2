document.addEventListener('DOMContentLoaded', function() {
    const productsGrid = document.getElementById('products');
    const sidebarMenu = document.querySelector('.sidebar-menu');
    
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            const categories = [...new Set(products.map(product => product.category))];
            displayCategories(categories);
            displayProducts(products);
        });

    function displayCategories(categories) {
        categories.forEach(category => {
            const categoryItem = document.createElement('li');
            categoryItem.textContent = category;
            categoryItem.addEventListener('click', () => filterProductsByCategory(category));
            sidebarMenu.appendChild(categoryItem);
        });
    }

    function filterProductsByCategory(category) {
        fetch('https://fakestoreapi.com/products/category/' + category)
            .then(response => response.json())
            .then(products => {
                displayProducts(products);
            });
    }

    function displayProducts(products) {
        productsGrid.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <h3 class="product-title">${product.title}</h3>
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <p>${product.price} $</p>
            `;
            productsGrid.appendChild(productDiv);
        });
    }
});
