let carrito = [];
let carritoVisible = false;

// Mostrar u ocultar carrito
function toggleCarrito() {
    const carritoDiv = document.getElementById("carrito-flotante");
    carritoVisible = !carritoVisible;
    carritoDiv.style.display = carritoVisible ? "block" : "none";
}

// Agregar al carrito
function addToCart(nombre, precio, talla = '', color = '') {
    carrito.push({ nombre, precio, talla, color });
    actualizarCarrito();
}

// Actualizar carrito
function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const total = document.getElementById("total");
    const contador = document.getElementById("contador-carrito");
    lista.innerHTML = "";
    let totalPrecio = 0;

    carrito.forEach((producto, index) => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - ${producto.precio}`;
        if (producto.talla) li.innerHTML += `<br><small>Talla: ${producto.talla}</small>`;
        if (producto.color) li.innerHTML += `<br><small>Color: ${producto.color}</small>`;
        lista.appendChild(li);
        totalPrecio += parseFloat(producto.precio.replace('$', ''));
    });

    total.textContent = totalPrecio.toFixed(2);
    contador.textContent = carrito.length;
}

// Vaciar carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

// Enviar por WhatsApp
function enviarPorWhatsApp(event) {
    event.preventDefault();

    if (carrito.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    let mensaje = "Hola, quiero hacer un pedido:\n\n";

    carrito.forEach(p => {
        mensaje += `- ${p.nombre} - ${p.precio}\n`;
        if (p.talla) mensaje += `  Talla: ${p.talla}\n`;
        if (p.color) mensaje += `  Color: ${p.color}\n`;
    });

    mensaje += "\n¿Me pueden dar más información sobre el envío y pago? \n\n✅ Aceptamos transferencias bancarias como método de pago.";
    const encoded = encodeURIComponent(mensaje);
    window.open(`https://wa.me/529221458012?text=${encoded}`);
}

// Carrusel automático de imágenes
document.addEventListener("DOMContentLoaded", () => {
    const productos = document.querySelectorAll(".producto-imagenes");
    productos.forEach(producto => {
        let images = producto.querySelectorAll("img");
        let current = 0;
        setInterval(() => {
            images.forEach(img => img.style.opacity = "0");
            images[current].style.opacity = "1";
            current = (current + 1) % images.length;
        }, 3000);
    });
});

// Filtro de productos
function filterProducts(category) {
    const items = document.querySelectorAll('.producto');
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Mostrar/ocultar descripción individual
function toggleDescripcion(id) {
    const descripcion = document.getElementById(id);
    const carrito = document.getElementById("carrito-flotante");
    carrito.style.display = "none";
    carritoVisible = false;
    descripcion.classList.toggle("activo");
}


// Mostrar/ocultar Diseños disponibles
function toggleDisenos() {
    const diseños = document.getElementById("disenos-disponibles");
    const btn = document.getElementById("btn-disenos");
    const galeria = document.querySelector(".galeria-disenos");

    if (!galeria.classList.contains("activo")) {
        diseños.style.display = "block";
        galeria.classList.add("activo");
        btn.textContent = "❌ Ocultar diseños";
    } else {
        diseños.style.display = "none";
        galeria.classList.remove("activo");
        btn.textContent = "🎨 Diseños disponibles";
    }
}

// Mostrar/ocultar Quienes somos
function toggleQuienes() {
    const quienes = document.querySelector(".quienes-somos");
    quienes.classList.toggle("activo");
}



// Mostrar/ocultar Guía de tallas Camisetas
function toggleGuiaCamisetas() {
    const modal = document.getElementById("guia-camisetas-modal");
    modal.classList.toggle("activo");
}

// Cerrar modal al hacer clic fuera de la imagen
document.getElementById("guia-camisetas-modal").addEventListener("click", function(e) {
    if (e.target === this) {
        this.classList.remove("activo");
    }
});
