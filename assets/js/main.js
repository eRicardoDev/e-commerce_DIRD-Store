/* DataBase GUITARRAS ELECTRICAS */
const productos = [
  {
    id: 1,
    nombre: 'Les Paul',
    imagen: '/assets/img/1.jpg',
    precio: 1000,
    unidades: 5
  },
  {
    id: 2,
    nombre: 'Stratocaster',
    imagen: '/assets/img/2.jpg',
    precio: 1500,
    unidades: 4
  },
  {
    id: 3,
    nombre: 'IbanezJeaa',
    imagen: '/assets/img/3.jpg',
    precio: 1200,
    unidades: 7
  },
  {
    id: 4,
    nombre: 'FlyingV',
    imagen: '/assets/img/4.jpg',
    precio: 2000,
    unidades: 5
  },
  {
    id: 5,
    nombre: 'Piano Electrónico',
    imagen: '/assets/img/5.jpg',
    precio: 2000,
    unidades: 10
  },
  {
    id: 6,
    nombre: 'Órgano Electrónico',
    imagen: '/assets/img/6.jpg',
    precio: 1200,
    unidades: 8
  },
  {
    id: 7,
    nombre: 'Órgano Acústica',
    imagen: '/assets/img/7.jpg',
    precio: 5000,
    unidades: 3
  },
  {
    id: 8,
    nombre: 'Órgano Sintetizador',
    imagen: '/assets/img/8.jpg',
    precio: 2500,
    unidades: 11
  },
  {
    id: 9,
    nombre: 'Batería Acústica',
    imagen: '/assets/img/9.jpg',
    precio: 1100,
    unidades: 9
  },
  {
    id: 10,
    nombre: 'Batería Electrónica',
    imagen: '/assets/img/10.jpg',
    precio: 1500,
    unidades: 6
  },
  {
    id: 11,
    nombre: 'Batería Mixta',
    imagen: '/assets/img/11.jpg',
    precio: 3200,
    unidades: 7
  },
  {
    id: 12,
    nombre: 'Batería MixPad',
    imagen: '/assets/img/12.jpg',
    precio: 1000,
    unidades: 5
  },
  {
    id: 13,
    nombre: 'Bajo Eléctrico Thunderbird',
    imagen: '/assets/img/13.jpg',
    precio: 1000,
    unidades: 5
  },
  {
    id: 14,
    nombre: 'Bajo Eléctrico Sterling',
    imagen: '/assets/img/14.jpg',
    precio: 1500,
    unidades: 4
  },
  {
    id: 15,
    nombre: 'Bajo Eléctrico Fender',
    imagen: '/assets/img/15.jpg',
    precio: 1200,
    unidades: 7
  },
  {
    id: 16,
    nombre: 'Bajo eléctrico Ibanez Gio',
    imagen: '/assets/img/16.jpg',
    precio: 2000,
    unidades: 5
  }
]

/* Productos - GUITARRAS ELECTRICAS */
const productosContenedor = document.querySelector('.products__container')

function pintarProductos () {
  let html = ''
  
  for (const { id, nombre, imagen, precio, unidades } of productos) {
    html += `
    <div>
    <article class="products__item">
    <div class="products__price">$${precio}</div>


      <img class="products__image" src="${imagen}" alt="${nombre}">

      <div class="products__data">
        <div class="products__info">
          <h2 class="products__title">${nombre}</h2>
          <span class="products__stock">Cant: ${unidades}</span>
        </div>

        <div class="products__button">
          <button type="button" class="agregar button" data-id="${id}"><i class='bx bxs-cart-add'></i></button>
        </div>
      </div>
    </article>
  </div>
    `
  }
  productosContenedor.innerHTML = html
}

pintarProductos()


/* Carrito */
let carrito = []

const articulosContenedor = document.querySelector('.cart__container .cart__list')
const contadorDeArticulos = document.getElementById('cart-count')
const totalPrecio = document.getElementById('cart-total')
const botonComprar = document.querySelector('.btn--checkout')

function pintarCarrito () {
  let html = ''

  for (const { id, cantidad } of carrito) {
    const { nombre, imagen } = productos.find(producto => producto.id === id)
    html += `
    <li class="cart__item">
    <article class="cart__article grid">
      <img class="cart__image" src="${imagen}" alt="${nombre}">

      <div class="cart__data">
        <h2 class="cart__name">${nombre}</h2>

        <div class="cart__minmax">
          <button type="button" class="cart__button btn--remove" id="cart-remove" data-id="${id}"><i class='bx bx-minus' ></i></button>
          <span id="cart-qty">${cantidad}</span>
          <button type="button" class="cart__button btn--add" id="cart-add" data-id="${id}"><i class='bx bx-plus' ></i></button>
        </div>

      </div>
      <div class="cart__delete">
        <button type="button" class="cart__button btn--delete" id="cart-delete" data-id="${id}"><i class='bx bx-trash' ></i></button>
      </div>
    </article>
  </li>
    `
  }

  articulosContenedor.innerHTML = html
  contadorDeArticulos.innerHTML = contarArticulos()
  totalPrecio.innerHTML = total()
}

function agregarAlCarrito (id) {
  const cantidad = 1

  // si el producto (x) en su propiedad id es igual al id que pasamos como párametro, retornalo.
  const productoEncontrado = productos.find(producto => producto.id === id)

  if (productoEncontrado && productoEncontrado.unidades > 0) {
    // si el articulo (x) en su propiedad id es igual al id que pasamos como párametro, retornalo.
    const articuloEncontrado = carrito.find(articulo => articulo.id === id)

    if (articuloEncontrado) {
    // console.log('aumenta su cantidad')

      // verificar las unidades dispobibles
      if (checarUnidades(id, cantidad + articuloEncontrado.cantidad)) {
        articuloEncontrado.cantidad += cantidad
      } else {
        window.alert('supera las unidades disponibles')
      }
    } else {
      carrito.push({ id, cantidad })
    }
  } else {
    window.alert('Lo sentimos no contamos con unidades disponibles')
  }
  pintarCarrito()
}

function checarUnidades (id, cantidad) {
  const productoEncontrado = productos.find(producto => producto.id === id)

  // console.log('id: ', id)
  // console.log('cantidad: ', cantidad)

  return productoEncontrado.unidades - cantidad >= 0
}

function removerDelCarrito (id) {
  const cantidad = 1

  // si el articulo (x) en su propiedad id es igual al id que pasamos como párametro, retornalo.
  const articuloEncontrado = carrito.find(articulo => articulo.id === id)

  if (articuloEncontrado && articuloEncontrado.cantidad - cantidad > 0) {
    articuloEncontrado.cantidad -= cantidad
  } else {
    carrito = carrito.filter(articulo => articulo.id !== id)
  }
  pintarCarrito()
}

function eliminarArticulo (id) {
  carrito = carrito.filter(articulo => articulo.id !== id)
  pintarCarrito()
}

function contarArticulos () {
  let suma = 0
  for (const articulo of carrito) {
    suma += articulo.cantidad
  }
  return suma
}

function total () {
  let suma = 0

  for (const articulo of carrito) {
    const productoEncontrado = productos.find(producto => producto.id === articulo.id)
    suma += articulo.cantidad * productoEncontrado.precio
  }

  return suma
}

function comprar () {
  for (const articulo of carrito) {
    const productoEncontrado = productos.find(producto => producto.id === articulo.id)

    productoEncontrado.unidades -= articulo.cantidad
  }

  window.alert('gracias por su compra')
  carrito = []
  pintarCarrito()
  pintarProductos()
}

pintarCarrito()

productosContenedor.addEventListener('click', e => {
  if (e.target.closest('.agregar')) {
    const id = +e.target.closest('.agregar').dataset.id
    agregarAlCarrito(id)
  }
})

articulosContenedor.addEventListener('click', e => {
  if (e.target.closest('#cart-add')) {
    const id = +e.target.closest('#cart-add').dataset.id
    agregarAlCarrito(id)
  }

  if (e.target.closest('#cart-remove')) {
    const id = +e.target.closest('#cart-remove').dataset.id
    removerDelCarrito(id)
  }

  if (e.target.closest('#cart-delete')) {
    const id = +e.target.closest('#cart-delete').dataset.id
    eliminarArticulo(id)
  }
})

botonComprar.addEventListener('click', () => {
  comprar()
})