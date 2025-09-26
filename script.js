let modal = document.getElementById("itemModal");
let qty = 1;
let currentItem = null;
let cartPanel = document.getElementById("cartPanel");
let cartOverlay = document.querySelector(".cart-overlay");
let cart = [];

// Check login status on homepage
function updateAuthStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const authLink = document.getElementById('auth-link');
    
    if (currentUser && authLink) {
        authLink.innerHTML = `👤 ${currentUser.name} | <a href="#" onclick="logout()">Logout</a>`;
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    updateAuthStatus();
    showToast('Logged out successfully');
}

// Modal functions
function openModal(item) {
    currentItem = item;
    let title = item.querySelector("h4").innerText;
    let desc = item.querySelector("p") ? item.querySelector("p").innerText : "";
    let price = item.querySelector(".price").innerText;
    
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalDesc").innerText = desc;
    document.getElementById("modalPrice").innerText = price;

    qty = 1;
    document.getElementById("quantity").innerText = qty;
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
    currentItem = null;
}

function increaseQty() {
    qty++;
    document.getElementById("quantity").innerText = qty;
}

function decreaseQty() {
    if (qty > 1) qty--;
    document.getElementById("quantity").innerText = qty;
}

// Cart functions
function openCart() {
    cartPanel.classList.add("open");
    cartOverlay.classList.add("active");
    updateCartDisplay();
}

function closeCart() {
    cartPanel.classList.remove("open");
    cartOverlay.classList.remove("active");
}

function updateCart() {
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("nav-cart-count").innerText = totalItems;

    if (cartPanel.classList.contains('open')) {
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    let cartItemsContainer = document.getElementById("cartItemsContainer");
    let cartSummary = document.getElementById("cartSummary");
    
    cartItemsContainer.innerHTML = "";
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartSummary.innerHTML = '';
        return;
    }

    let subtotal = 0;
    
    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        let cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">Rs. ${item.price} x ${item.quantity}</div>
            </div>
            <div class="cart-item-controls">
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="changeCartItemQty(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="changeCartItemQty(${index}, 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    let deliveryCharge = subtotal > 0 ? 150 : 0;
    let total = subtotal + deliveryCharge;

    cartSummary.innerHTML = `
        <div class="summary-row">
            <span>Subtotal:</span>
            <span>Rs. ${subtotal}</span>
        </div>
        <div class="summary-row">
            <span>Delivery Charge:</span>
            <span>Rs. ${deliveryCharge}</span>
        </div>
        <div class="summary-row summary-total">
            <span>Total:</span>
            <span>Rs. ${total}</span>
        </div>
        <button class="checkout-btn" onclick="proceedToCheckout()">Proceed to Checkout</button>
    `;
}

function changeCartItemQty(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        updateCart();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    showToast("Item removed from cart");
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showToast("Your cart is empty!");
        return;
    }
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) {
        showToast("Please login to proceed to checkout");
        window.location.href = 'auth.html';
        return;
    }
    
    showToast("Redirecting to payment...");
    // openPaymentModal(); // You'll implement this later
}

// Toast notification
function showToast(message) {
    let toast = document.getElementById("toast");
    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

// Smooth scrolling and section transitions
function initSmoothScrolling() {
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        const scrollPos = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('nav a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });
}

// Event listeners and initialization
document.addEventListener('DOMContentLoaded', function() {
    updateAuthStatus();
    initSmoothScrolling();
    
    // Modal event listeners
    document.querySelectorAll(".add-to-cart").forEach(icon => {
        icon.addEventListener("click", (e) => {
            e.stopPropagation();
            let menuItem = icon.closest(".menu-item");
            openModal(menuItem);
        });
    });

    document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("click", (e) => {
            if (!e.target.classList.contains('add-to-cart')) {
                openModal(item);
            }
        });
    });

    // Modal close events
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
        if (event.target == cartOverlay) {
            closeCart();
        }
    }

    // Add to cart button in modal
    document.querySelector(".add-btn").addEventListener("click", () => {
        if (currentItem) {
            let name = document.getElementById("modalTitle").innerText;
            let priceText = document.getElementById("modalPrice").innerText.replace("Rs. ", "");
            let price = parseInt(priceText);
            let quantity = qty;

            let existing = cart.find(item => item.name === name);
            if (existing) {
                existing.quantity += quantity;
            } else {
                cart.push({ name, price, quantity });
            }

            updateCart();
            closeModal();
            showToast("Added to cart successfully!");
        }
    });
});

// Close cart with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCart();
        closeModal();
    }
});