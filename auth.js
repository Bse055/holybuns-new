// ---- Tab Switching ----
function showLogin() {
  document.getElementById('loginForm').classList.add('active');
  document.getElementById('signupForm').classList.remove('active');
  document.querySelectorAll('.auth-tab')[0].classList.add('active');
  document.querySelectorAll('.auth-tab')[1].classList.remove('active');
}
function showSignup() {
  document.getElementById('signupForm').classList.add('active');
  document.getElementById('loginForm').classList.remove('active');
  document.querySelectorAll('.auth-tab')[1].classList.add('active');
  document.querySelectorAll('.auth-tab')[0].classList.remove('active');
}

// ---- Cart Helpers ----
function getCartKey(email) { return `cart_${email}`; }
function loadUserCart(user) {
  if (!user) return;
  const cartKey = getCartKey(user.email);
  const savedCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
  localStorage.setItem('currentCart', JSON.stringify(savedCart));
  updateCartCount(savedCart.length);
}
function saveUserCart(user, cart) {
  if (!user) return;
  const cartKey = getCartKey(user.email);
  localStorage.setItem(cartKey, JSON.stringify(cart));
  localStorage.setItem('currentCart', JSON.stringify(cart));
  updateCartCount(cart.length);
}
function updateCartCount(count) {
  const cartCount = document.getElementById('nav-cart-count');
  if (cartCount) cartCount.textContent = count;
}

// ---- Login ----
function handleLogin() {
  const email = document.querySelector('#loginForm input[type="email"]').value;
  const password = document.querySelector('#loginForm input[type="password"]').value;
  if (!email || !password) { alert('Please fill in all fields'); return; }

  const users = JSON.parse(localStorage.getItem('holyBunsUsers') || '[]');
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    loadUserCart(user);
    alert('Login successful!');
    window.location.href = 'homepage.html';
  } else {
    alert('Invalid email or password');
  }
}

// ---- Signup ----
function handleSignup() {
  const name = document.querySelector('#signupForm input[type="text"]').value;
  const email = document.querySelector('#signupForm input[type="email"]').value;
  const phone = document.querySelector('#signupForm input[type="tel"]').value;
  const password = document.querySelectorAll('#signupForm input[type="password"]')[0].value;
  const address = document.querySelectorAll('#signupForm input[type="text"]')[1].value;
  const area = document.querySelectorAll('#signupForm input[type="text"]')[2].value;
  const city = document.querySelectorAll('#signupForm input[type="text"]')[3].value;

  if (!name || !email || !phone || !password || !address || !area || !city) {
    alert('Please fill in all fields'); return;
  }

  const users = JSON.parse(localStorage.getItem('holyBunsUsers') || '[]');
  if (users.find(u => u.email === email)) {
    alert('User already exists with this email'); return;
  }

  const newUser = {
    id: Date.now(), name, email, phone, password,
    address: { street: address, area, city },
    joined: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem('holyBunsUsers', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(newUser));

  localStorage.setItem(getCartKey(email), JSON.stringify([]));
  localStorage.setItem('currentCart', JSON.stringify([]));

  alert('Account created successfully!');
  window.location.href = 'homepage.html';
}

// ---- Status + Logout ----
function checkAuthStatus() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const authStatus = document.getElementById('auth-status');
  if (currentUser && authStatus) {
    authStatus.innerHTML = `👤 ${currentUser.name} | <a href="#" onclick="logout()">Logout</a>`;
    loadUserCart(currentUser);
  }
}
function logout() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('currentCart');
  window.location.href = 'auth.html';
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('loginForm').addEventListener('submit', e => { e.preventDefault(); handleLogin(); });
  document.getElementById('signupForm').addEventListener('submit', e => { e.preventDefault(); handleSignup(); });
  checkAuthStatus();
});
