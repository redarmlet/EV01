var CUENTAS_INICIALES = [
    {
        id: "USR000",
        tipo: "admin",
        nombre: "Administrador",
        apellido: "Sistema",
        correo: "admin@milsabores.cl",
        password: "admin1234",
        fechaNacimiento: "1980-01-01",
        direccion: { comuna: "Santiago", calle: "Av. Principal", numero: "100" },
        codigoReferencia: "",
        fechaRegistro: "2024-01-01"
    },
    {
        id: "USR001",
        tipo: "cliente",
        nombre: "María",
        apellido: "González",
        correo: "maria@ejemplo.cl",
        password: "cliente123",
        fechaNacimiento: "1965-03-15",
        direccion: { comuna: "Providencia", calle: "Av. Providencia", numero: "1234" },
        codigoReferencia: "FELICES50",
        fechaRegistro: "2024-06-01"
    },
    {
        id: "USR002",
        tipo: "cliente",
        nombre: "Pedro",
        apellido: "Ramírez",
        correo: "pedro.ramirez@duocuc.cl",
        password: "duoc2024",
        fechaNacimiento: "2001-09-05",
        direccion: { comuna: "Ñuñoa", calle: "Gran Avenida", numero: "567" },
        codigoReferencia: "",
        fechaRegistro: "2024-08-01"
    }
];

var COMUNAS_SANTIAGO = [
    "Cerrillos","Cerro Navia","Conchalí","El Bosque","Estación Central",
    "Huechuraba","Independencia","La Cisterna","La Florida","La Granja",
    "La Pintana","La Reina","Las Condes","Lo Barnechea","Lo Espejo",
    "Lo Prado","Macul","Maipú","Ñuñoa","Pedro Aguirre Cerda",
    "Peñalolén","Providencia","Pudahuel","Quilicura","Quinta Normal",
    "Recoleta","Renca","San Joaquín","San Miguel","San Ramón",
    "Santiago","Vitacura"
];

var productos = [
    {
        "id": "TC001",
        "categoria": "Tortas_cuadradas",
        "titulo": "Torta Cuadrada de Chocolate",
        "imagen": "img/pasteles/TC001.png",
        "precio": "45,000",
        "descripcion": "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.",
        "permiteMensaje": true
    },
    {
        "id": "TC002",
        "categoria": "Tortas_cuadradas",
        "titulo": "Torta Cuadrada de Frutas",
        "imagen": "img/pasteles/TC002.png",
        "precio": "50,000",
        "descripcion": "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.",
        "permiteMensaje": true
    },
    {
        "id": "TT001",
        "categoria": "Tortas_circulares",
        "titulo": "Torta Circular de Vainilla",
        "imagen": "img/pasteles/TT001.png",
        "precio": "40,000",
        "descripcion": "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.",
        "permiteMensaje": true
    },
    {
        "id": "TT002",
        "categoria": "Tortas_circulares",
        "titulo": "Torta Circular de Manjar",
        "imagen": "img/pasteles/TT002.png",
        "precio": "42,000",
        "descripcion": "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.",
        "permiteMensaje": true
    },
    {
        "id": "PI001",
        "categoria": "Postres_individuales",
        "titulo": "Mousse de Chocolate",
        "imagen": "img/pasteles/PI001.png",
        "precio": "5,000",
        "descripcion": "Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate."
    },
    {
        "id": "PI002",
        "categoria": "Postres_individuales",
        "titulo": "Tiramisú Clásico",
        "imagen": "img/pasteles/PI002.png",
        "precio": "5,500",
        "descripcion": "Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida."
    },
    {
        "id": "PSA001",
        "categoria": "Postres_sin_azucar",
        "titulo": "Torta Sin Azúcar de Naranja",
        "imagen": "img/pasteles/PSA001.png",
        "precio": "48,000",
        "descripcion": "Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.",
        "permiteMensaje": true
    },
    {
        "id": "PSA002",
        "categoria": "Postres_sin_azucar",
        "titulo": "Cheesecake Sin Azúcar",
        "imagen": "img/pasteles/PSA002.png",
        "precio": "47,000",
        "descripcion": "Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa."
    },
    {
        "id": "PT001",
        "categoria": "Pasteleria_tradicional",
        "titulo": "Empanada de Manzana",
        "imagen": "img/pasteles/PT001.png",
        "precio": "3,000",
        "descripcion": "Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda."
    },
    {
        "id": "PT002",
        "categoria": "Pasteleria_tradicional",
        "titulo": "Tarta de Santiago",
        "imagen": "img/pasteles/PT002.png",
        "precio": "6,000",
        "descripcion": "Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos."
    },
    {
        "id": "PG001",
        "categoria": "Producto_sin_gluten",
        "titulo": "Brownie Sin Gluten",
        "imagen": "img/pasteles/PG001.png",
        "precio": "4,000",
        "descripcion": "Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor."
    },
    {
        "id": "PG002",
        "categoria": "Producto_sin_gluten",
        "titulo": "Pan Sin Gluten",
        "imagen": "img/pasteles/PG002.png",
        "precio": "3,500",
        "descripcion": "Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida."
    },
    {
        "id": "PV001",
        "categoria": "Producto_vegano",
        "titulo": "Torta Vegana de Chocolate",
        "imagen": "img/pasteles/PV001.png",
        "precio": "50,000",
        "descripcion": "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.",
        "permiteMensaje": true
    },
    {
        "id": "PV002",
        "categoria": "Producto_vegano",
        "titulo": "Galletas Veganas de Avena",
        "imagen": "img/pasteles/PV002.png",
        "precio": "4,500",
        "descripcion": "Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano."
    },
    {
        "id": "TE001",
        "categoria": "Tortas_especiales",
        "titulo": "Torta Especial de Cumpleaños",
        "imagen": "img/pasteles/TE001.png",
        "precio": "55,000",
        "descripcion": "Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.",
        "permiteMensaje": true
    },
    {
        "id": "TE002",
        "categoria": "Tortas_especiales",
        "titulo": "Torta Especial de Boda",
        "imagen": "img/pasteles/TE002.png",
        "precio": "60,000",
        "descripcion": "Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.",
        "permiteMensaje": true
    }
];

var NOMBRES_CATEGORIA = {
    "Tortas_cuadradas": "Tortas Cuadradas",
    "Tortas_circulares": "Tortas Circulares",
    "Postres_individuales": "Postres Individuales",
    "Postres_sin_azucar": "Productos Sin Azúcar",
    "Pasteleria_tradicional": "Pastelería Tradicional",
    "Producto_sin_gluten": "Productos Sin Gluten",
    "Producto_vegano": "Productos Veganos",
    "Tortas_especiales": "Tortas Especiales"
};