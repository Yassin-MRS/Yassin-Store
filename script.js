document.addEventListener('DOMContentLoaded', () => {
    // وظيفة لإضافة منتج لسلة التسوق
    function addToCart(productId, productName, productPrice) {
        let cart = JSON.parse(localStorage.getItem('cart')) || []; // جلب السلة من التخزين المحلي أو إنشاء سلة فارغة

        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++; // زيادة الكمية لو المنتج موجود
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            }); // إضافة منتج جديد
        }

        localStorage.setItem('cart', JSON.stringify(cart)); // حفظ السلة في التخزين المحلي
        updateCartDisplay(); // تحديث عرض السلة (لو عندك مكان بتعرض فيه السلة)
        alert(`${productName} added to cart!`);
    }

    // وظيفة لتحديث عرض سلة التسوق (هتضيفها لو عندك عنصر بتعرض فيه السلة)
    function updateCartDisplay() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsContainer = document.getElementById('cart-items'); // افترض أن عندك div بالـ ID ده
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = ''; // مسح المحتوى الحالي
            let totalPrice = 0;
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            } else {
                cart.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.innerHTML = `<p>${item.name} (x${item.quantity}) - EGP ${item.price * item.quantity}.00</p>`;
                    cartItemsContainer.appendChild(itemDiv);
                    totalPrice += item.price * item.quantity;
                });
                const totalDiv = document.createElement('div');
                totalDiv.innerHTML = `<h3>Total: EGP ${totalPrice}.00</h3>`;
                cartItemsContainer.appendChild(totalDiv);
            }
        }
    }

    // إضافة مستمعي الأحداث لأزرار "Add to Cart"
    const addToCartButtons = document.querySelectorAll('.product button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // منع انتقال الصفحة

            const productDiv = event.target.closest('.product');
            const productId = productDiv.dataset.productId;
            const productName = productDiv.querySelector('h3').textContent;
            const productPriceText = productDiv.querySelector('p').textContent;
            const productPrice = parseFloat(productPriceText.replace('EGP ', '').replace(',', '')); // تحويل السعر لرقم

            addToCart(productId, productName, productPrice);
        });
    });

    // لو عايز تعمل وظيفة للانتقال لصفحة المنتج عند الضغط على الـ div (غير الزرار)
    const productDivs = document.querySelectorAll('.product');
    productDivs.forEach(productDiv => {
        productDiv.addEventListener('click', () => {
            const productId = productDiv.dataset.productId;
            // يمكنك توجيه المستخدم لصفحة تفاصيل المنتج هنا
            // window.location.href = `product-details.html?id=${productId}`;
            alert(`Navigating to details for product: ${productId}`);
        });
    });

    // تحديث عرض السلة عند تحميل الصفحة لأول مرة
    updateCartDisplay();
});