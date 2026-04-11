const menu = {
  pizza: [
    {
      id: "pizza-margherita",
      name: "بيتزا مارجريتا",
      description: "صلصة طماطم، جبنة موزاريلا، ريحان طازج، وعجينة هشة",
      price: 135
    },
    {
      id: "pizza-pepperoni",
      name: "بيتزا بيبروني",
      description: "شرائح بيبروني مدخنة مع جبنة إضافية وصوص خاص",
      price: 170
    },
    {
      id: "pizza-veggie",
      name: "بيتزا خضار",
      description: "فلفل ألوان، زيتون، مشروم، بصل، وطماطم طازجة",
      price: 150
    },
    {
      id: "pizza-chicken-ranch",
      name: "بيتزا تشيكن رانش",
      description: "قطع دجاج متبلة مع رانش كريمي وموزاريلا",
      price: 185
    },
    {
      id: "pizza-meat-lovers",
      name: "بيتزا ميكس لحوم",
      description: "سجق، لحم مفروم، بيبروني، ومزيج جبن غني",
      price: 195
    },
    {
      id: "pizza-seafood",
      name: "بيتزا سي فود",
      description: "جمبري وكاليماري مع صوص ثوم ولمسة ليمون",
      price: 220
    }
  ],
  pasta: [
    {
      id: "pasta-alfredo",
      name: "مكرونة ألفريدو",
      description: "صوص كريمي مع دجاج مشوي ومشروم طازج",
      price: 160
    },
    {
      id: "pasta-arabiata",
      name: "مكرونة أرابياتا",
      description: "صوص طماطم حار مع ثوم وأعشاب إيطالية",
      price: 125
    },
    {
      id: "pasta-bolognese",
      name: "مكرونة بولونيز",
      description: "لحم مفروم وصوص طماطم مطهو ببطء بطعم غني",
      price: 155
    },
    {
      id: "pasta-seafood",
      name: "مكرونة سي فود",
      description: "جمبري وكاليماري بصوص روزيه مميز",
      price: 210
    },
    {
      id: "pasta-cheese",
      name: "مكرونة فور تشيز",
      description: "أربعة أنواع جبن بصوص كريمي غني",
      price: 175
    },
    {
      id: "pasta-sausage",
      name: "مكرونة بالسجق",
      description: "سجق شرقي متبل مع فلفل ألوان وصوص أحمر",
      price: 145
    }
  ]
};

const allItems = [...menu.pizza, ...menu.pasta];
const cart = JSON.parse(localStorage.getItem("pizz-store-cart") || "[]");

const pizzaList = document.getElementById("pizza-list");
const pastaList = document.getElementById("pasta-list");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartQuantity = document.getElementById("cart-quantity");
const cartTotal = document.getElementById("cart-total");
const clearCartButton = document.getElementById("clear-cart");
const checkoutForm = document.getElementById("checkout-form");
const orderMessage = document.getElementById("order-message");
const orderSummary = document.getElementById("order-summary");

function formatCurrency(value) {
  return `${value} جنيه`;
}

function saveCart() {
  localStorage.setItem("pizz-store-cart", JSON.stringify(cart));
}

function renderCategory(items, container, label) {
  container.innerHTML = items
    .map(
      (item) => `
        <article class="item-card">
          <span class="tag">${label}</span>
          <h5>${item.name}</h5>
          <p>${item.description}</p>
          <div class="item-footer">
            <span class="price">${formatCurrency(item.price)}</span>
            <button class="btn btn-primary" type="button" data-add-id="${item.id}">أضف للسلة</button>
          </div>
        </article>
      `
    )
    .join("");
}

function addToCart(itemId) {
  const existingItem = cart.find((item) => item.id === itemId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const item = allItems.find((entry) => entry.id === itemId);
    if (!item) {
      return;
    }
    cart.push({ ...item, quantity: 1 });
  }

  saveCart();
  renderCart();
  orderMessage.textContent = "تمت إضافة الصنف إلى السلة.";
}

function updateQuantity(itemId, change) {
  const item = cart.find((entry) => entry.id === itemId);
  if (!item) {
    return;
  }

  item.quantity += change;

  if (item.quantity <= 0) {
    const itemIndex = cart.findIndex((entry) => entry.id === itemId);
    cart.splice(itemIndex, 1);
  }

  saveCart();
  renderCart();
}

function clearCart() {
  cart.length = 0;
  saveCart();
  renderCart();
}

function renderCart() {
  if (!cart.length) {
    cartItemsContainer.innerHTML = '<p class="empty-state">السلة فارغة حاليًا، أضف أصنافك المفضلة للبدء.</p>';
  } else {
    cartItemsContainer.innerHTML = cart
      .map(
        (item) => `
          <div class="cart-entry">
            <div class="cart-row">
              <div>
                <strong>${item.name}</strong>
                <small>${formatCurrency(item.price)} للقطعة</small>
              </div>
              <span class="price">${formatCurrency(item.price * item.quantity)}</span>
            </div>
            <div class="cart-row">
              <div class="qty-controls">
                <button class="qty-btn" type="button" data-qty-id="${item.id}" data-change="1">+</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" type="button" data-qty-id="${item.id}" data-change="-1">-</button>
              </div>
              <button class="btn btn-secondary" type="button" data-remove-id="${item.id}">حذف</button>
            </div>
          </div>
        `
      )
      .join("");
  }

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  cartCount.textContent = totalQuantity;
  cartQuantity.textContent = totalQuantity;
  cartTotal.textContent = formatCurrency(totalPrice);
}

function resetOrderState() {
  clearCart();
  checkoutForm.reset();
}

document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add-id]");
  if (addButton) {
    addToCart(addButton.dataset.addId);
    return;
  }

  const quantityButton = event.target.closest("[data-qty-id]");
  if (quantityButton) {
    updateQuantity(quantityButton.dataset.qtyId, Number(quantityButton.dataset.change));
    return;
  }

  const removeButton = event.target.closest("[data-remove-id]");
  if (removeButton) {
    updateQuantity(removeButton.dataset.removeId, -999);
  }
});

clearCartButton.addEventListener("click", () => {
  clearCart();
  orderMessage.textContent = "تم تفريغ السلة.";
  orderSummary.classList.add("hidden");
  orderSummary.innerHTML = "";
});

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!cart.length) {
    orderMessage.textContent = "أضف منتجًا واحدًا على الأقل قبل تأكيد الطلب.";
    orderSummary.classList.add("hidden");
    return;
  }

  const customerName = document.getElementById("customer-name").value.trim();
  const customerPhone = document.getElementById("customer-phone").value.trim();
  const customerArea = document.getElementById("customer-area").value.trim();
  const customerAddress = document.getElementById("customer-address").value.trim();
  const paymentMethod = document.getElementById("payment-method").value;
  const notes = document.getElementById("order-notes").value.trim();

  if (!customerName || !customerPhone || !customerArea || !customerAddress) {
    orderMessage.textContent = "من فضلك أكمل الاسم والهاتف والمنطقة والعنوان بالتفصيل.";
    orderSummary.classList.add("hidden");
    return;
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const paymentLabel = paymentMethod === "cash" ? "الدفع عند الاستلام" : "فودافون كاش";
  const itemsSummary = cart.map((item) => `${item.name} × ${item.quantity}`).join(" - ");

  orderMessage.textContent = `شكرًا ${customerName}، تم تسجيل طلبك بنجاح وسنتواصل معك على ${customerPhone}.`;
  orderSummary.innerHTML = `
    <h4>ملخص الطلب</h4>
    <p><strong>الطلبات:</strong> ${itemsSummary}</p>
    <p><strong>الإجمالي:</strong> ${formatCurrency(totalPrice)}</p>
    <p><strong>العنوان:</strong> ${customerArea}، ${customerAddress}</p>
    <p><strong>طريقة الدفع:</strong> ${paymentLabel}</p>
    <p><strong>ملاحظات:</strong> ${notes || "لا توجد ملاحظات"}</p>
  `;
  orderSummary.classList.remove("hidden");

  resetOrderState();
}
);

renderCategory(menu.pizza, pizzaList, "بيتزا");
renderCategory(menu.pasta, pastaList, "مكرونة");
renderCart();
