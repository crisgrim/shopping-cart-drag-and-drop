const items = document.querySelectorAll('.products__list-item__image');
items.forEach(item => {
    item.addEventListener('dragstart', dragStart);
});

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.dataTransfer.dropEffect = 'copy';
    e.dataTransfer.effectAllowed = 'copy';
}

const box = document.querySelector('.shopping-cart');
box.addEventListener('dragenter', dragEnter)
box.addEventListener('dragover', dragOver);
box.addEventListener('dragleave', dragLeave);
box.addEventListener('drop', drop);

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('shopping-cart--drag-over');
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('shopping-cart--drag-over');
    e.dataTransfer.dropEffect = 'copy';
}

function dragLeave(e) {
    e.target.classList.remove('shopping-cart--drag-over');
}

function getTotal() {
    const prices = document.querySelectorAll('.shopping-cart__product__price');
    let total = 0;
    prices.forEach((item) => {
        total = Number(item.innerHTML) + total;
    });
    return total;
}

function deleteItem(event) {
    const parent = event?.currentTarget?.parentNode;
    parent.remove();
    updateTotal();
}

function updateTotal() {
    const total = document.querySelector('.shopping-cart #total');
    total.innerHTML = `${getTotal()} €`;
}

function drop(e) {
    e.target.classList.remove('shopping-cart--drag-over');
    const id = e.dataTransfer.getData('text/plain');
    const product = document.getElementById(id);
    const src = product.getAttribute('src');
    const name = product.getAttribute('alt');
    const price = product.getAttribute('data-price');

    const markup = `
    <div class="shopping-cart__product">
        <img class="shopping-cart__product__image" src="${src}">
        <h2 class="shopping-cart__product__name">${name}</h2>
        <p class="shopping-cart__product__price">${price}</p>
        <button class="shopping-cart__product__delete-button">X</button>
    </div>`;

    if (e.target.getAttribute('class') === 'shopping-cart') {
        e.target.innerHTML += markup;
        const items = document.querySelectorAll('.shopping-cart__product__delete-button');
        items.forEach(item => {
            item.addEventListener('click', deleteItem);
        });
        updateTotal();
    }
}
