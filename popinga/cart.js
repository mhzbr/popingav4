let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
localStorage.setItem("cart", JSON.stringify(cart));
updateCartCount();
}

function addToCart(product){

let existing = cart.find(item => item.id === product.id);

if(existing){

existing.qty++;

}else{

cart.push({
...product,
qty:1
});

}

saveCart();

alert("Produto adicionado ao carrinho");

}

function removeFromCart(id){

cart = cart.filter(item => item.id !== id);

saveCart();

renderCart();

}

function updateCartCount(){

let total = cart.reduce((sum,item)=>sum+item.qty,0);

document.querySelectorAll(".cart-count").forEach(el=>{
el.innerText = total;
});

}

function renderCart(){

let container = document.getElementById("cart-items");

if(!container) return;

container.innerHTML="";

let total=0;

cart.forEach(item=>{

total += item.price * item.qty;

container.innerHTML+=`

<div class="cart-item">

<img src="${item.image}" width="80">

<div>

<h3>${item.name}</h3>

<p>Qtd: ${item.qty}</p>

<strong>R$ ${(item.price * item.qty).toFixed(2)}</strong>

</div>

<button onclick="removeFromCart('${item.id}')">

Remover

</button>

</div>

`;

});

document.getElementById("cart-total").innerText =
"R$ "+total.toFixed(2);

}

function sendToWhats(){

if(cart.length==0){

alert("Carrinho vazio");

return;

}

let message="Pedido POP INGÁ:%0A%0A";

let total=0;

cart.forEach(item=>{

message += `${item.name}%0A`;
message += `Qtd: ${item.qty}%0A`;
message += `Valor: R$ ${(item.price*item.qty).toFixed(2)}%0A%0A`;

total += item.price*item.qty;

});

message+=`TOTAL: R$ ${total.toFixed(2)}`;

window.open(

`https://wa.me/5544991009184?text=${message}`,

"_blank"

);

}

updateCartCount();