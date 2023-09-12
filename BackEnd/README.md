# segunda practica integradora

base de datos mongo:
database: ecommerce
collections: products, carts, messages

para iniciar el repositorio utilizo:
-mongod --dbpath E:\BD-mongo
npm i (de requerir)
npm test

## ENDPOINTS:

# "/":
 Pagina de inicio de la api, solo muestra un mensaje para ver que funciona (json). en la ruta /src/servidor.js se encuentran tanto los datos de este endpoint, como el SOCKET.io

# "/home":
 Muestra una lista de todos los productos de la base de datos, con un boton que redirige a cada producto en particular para poder agregarlos al carrito. /Accesible para todo usuario logueado/

# "/realtimeproducts":
 muestra la misma lista que "/home" pero en esta misma, se pueden cargar datos para eliminar productos y agregar un nuevo producto a la base de datos, cuenta con actualizacion automatica
Actualmente presenta problemas, "cargar" el producto pedido pero entra en un loop lo cual puede o cargarlo reiteradas veces o tildar el programa.
"eliminar" elimina el producto por medio del ID pasado, tambien entra en loop, pero al eliminar 1 solo producto se aprecia que funciona bien y no se rompe. 
Esta trabajado con express-handlebars, siendo su vista /views/realTimeProducts.handlebars  y estando su JS de frontend en /public/js/indexHome.js
Su código base y endpoints se encuentran dentro de la ruta src/routes/productRouter.js.

# "api/products/admin/":
 es el reemplazo para /realtimeproducts sin depender del socket.io. Permite ver una lista de productos, tiene funcionalidad para agregar o eliminar productos y para ver el producto deseado. Solo "Admin" y usuarios "Premium"

# "/api/products":
 Este endpoint muestra una lista completa de todos los productos de la base de datos. Esta trabajado con express-handlebars, siendo su vista /views/products.handlebars, estando su codigo base en src/routes/productRouter.js
por medio de la renderizacion de express y el paginate, se le agregaron tanto las opciones de paginacion como de busqueda (por pagina y criterio). La busqueda por query aun no esta probada del todo, pero deberia recibir un objeto con un criterio de busqueda como los del find en mongoDB ej: {_id:ejemplo}. Metodo GET
Los botones para Sort ascendente y descendente se basan en el campo "precio" y esta funcional. Solo accesible para "Admin"

# "/api/products/pid":
 METODO GET. este endpoint renderiza por medios de busqueda a la base de datos, el producto especificado por su pid ("_id" autogenerado por mongo), estando su codigo base en src/routes/productRouter.js. Permite agreegar dicho producto al carrito x 1 unidad o volver a la liesta de productos "/realtimeproducts" si el usuario es un Admin, o a "/home" si el usuario es un User. 

# "/api/products/pid":
 METODO PUT. este endpoint actualiza por medios de busqueda a la base de datos, el producto especificado por su pid ("_id" autogenerado por mongo), y recibiendo en el body un producto de estructura:
{
    "_id": 
    "title": 
    "description":
    "price": 
    "thumbnail": 
    "stock": 
    "code": 
    "category": 
    "status":
    "id": 
  }
 estando su codigo base en src/routes/productRouter.js. Metodo GET

# "/api/carts":
 Este endpoint muestra una lista completa de todos los carritos de la base de datos. Esta trabajado con express-handlebars, siendo su vista /views/carts.handlebars, estando su codigo base en src/routes/cartsRouter.js
por medio de la renderizacion de express y el paginate, se le agregaron las opciones de paginacion (aunque aun no se trabajo sobre las mismas). Metodo GET. esta POPULADO.
solamente falta realizar el metodo delete del carrito entero y de cada producto particular.
Formato carrito:
[
  {
    "_id": 
    "id": 
    "quantity": 
    "products": [
      {
        "productID": {
          "_id": 
          "title": 
          "description": 
          "price":
          "thumbnail": 
          "stock":
          "code": 
          "category": 
          "status": 
          "id": 
        },
        "quantity": 
        "_id":
      }
    ]
  }
]

# "/api/carts/cid":
 MEOTODO GET. este endpoint renderiza por medios de busqueda a la base de datos, el carrito especificado por su cid ("_id" autogenerado por mongo), estando su codigo base en src/routes/cartsRouter.js. Metodo GET

# "/api/carts/cid":
 MEOTODO DELETE. este endpoint elimina por medios de busqueda a la base de datos, el carrito especificado por su cid ("_id" autogenerado por mongo), estando su codigo base en src/routes/cartsRouter.js. 

# "/api/carts/cid/product/pid":
 METODO POST. Este endpoint utiliza un metodo POST para cargar en el carrito especificado ("_id" -autogenerado por mongoose- del mismo, en este caso CID) el producto que deseo ("_id" del producto), al poseer el id del producto pasado por parametro dentro, este se ajusta solamente en +1 la cantidad del mismo. si el producto no existe en el carrito (no se encontro el _id pasado), este se carga en el carrito como un objeto { productID: ObjectId(""), quantity: 1, _id:ObjectId("643ffc0aec109cce37251944")} dentro del array "products" del carrito. tanto el carrito como cada producto distinto cargado al carrito genera su propio ID por mongoose tipo ObjectID.
Su código base y endpoints se encuentran dentro de la ruta src/routes/cartsRouter.js   Solo se permite el ingreso a usuarios registrados y logueados.

# "api/carts/json/cartsJSON":
 este endpoint muestra un JSON de los carritos sin renderizar por express

# "api/products/productSelected/:pid":
 Metodo PUT. esta ruta presenta un input en el cual cargo el CID (_id autogenerado por mongoose) del carrito al que quiero cargarle el prooducto al cual ingrese. al hacer click se agrega automaticamente al carrito.

# "api/sessions":
 muestra un inicio con redireccion a registro y login

# "api/sessions/register":
 permite el registro del usuario, completando un formulario con metodo post que hace un fetch a /api/usuarios. carga el usuario en una base de datos y crea la sesion. actualmente le saque la obligatoriedad de que sea unico el mail para poder probarla. Al cruzar el mail "adminCoder@coder.com" con el password "adminCod3r123", siempre va a ser registrado como ADMIN.
Formato de usuario : {
    "_id": 
    "email": 
    "password": 
    "first_name": 
    "last_name": 
    "age": 
    "rol": 
    "cart": 
  }

# "api/sessions/current":
  muestra a travez de un view handlebars muestra los datos del perfil del usuario, sin la contraseña . el fetch de su logica se realiza hacia fetch('/api/usuarios'). dicha ruta esta creada en server.js . Solo permite el intreso a usuarios logueados. Permite cerrar sesion

# "api/sessions/login":
 muestra actualmente un formulario para realizar el login, con su funcionalidad finalizada para reconocer al email y contraseña del usuario para encontrarlo y logear.  El fetch de su logica se realiza hacia fetch('/api/usuariosLogin'), dicha ruta esta creada en server.js . Actualmente renderiza una lista de usuarios creados solo con la finalidad de poder seleccionar los datos de la base de datos para poder realizar las pruebas.  Solo permite el intreso a usuarios sin loguear.

# "api/sessions/reestablecer":
 es la ruta designada para reestablecer la contraseña del usuario. Utiliza en este caso la sesion del usuario ya logeado (pensado para cambiar cotnraseña y no para reestablecerla por olvido), ya que se plantea en el desafio opcional y queria dejar planteada la lògica funcional, por mas de no hacerlo en base a un email como se pedia. La logica funciona, cruza el email, nombre y apellido del usuario (como controles) para cambiar la misma.

# "/chat":
 muestra un chat funcional con socket.io. Solo permite el intreso a usuarios logueados

# "/:cid/purchase":
 realiza la compra del carrito. Para ingresar a esta parte, el usuario debe estar logueado. al ingresar, se toma el carrito por su CID y se cruza con los datos del usuario. 

# "/api/tickets":
 permite a los Admin visualizar los tickets que haya creados y eliminarlos ya sea de a 1 o a todos juntos.

# "/mockingproducts":
 permite a los Admin acceder a una lista de productos falsos creados de forma aleatoria. 100 productos

# "/loggerTest":
 permite apreciar por consola todos los mensajes del winsterlogger 

# "/api/docs":
 permite obtener la documentacion de todos los endpoints


Todos los productos cargados tienen un ID propio que les doy autogenerado por el randomUUII, pero para realizar las operaciones internas actualmente cambie al uso del _id (object ID que brinda mongoose)
Todos estos endpoints a grandes rasgos funcionan, salvo las cosas que marque puntualmente.

## DATOS A TENER EN CUENTA 

- FUNCIONA MAL /realtimeproducts, creando multiples productos en loop al crear o eliminar 1 producto. En Reparacion. Por ahora hay productos de prueba en la base de datos, aunque puede probarse su funcionalidad, sabiendo que se creara mas de 1. su reemplazo sin socket es /api/products/admin  
