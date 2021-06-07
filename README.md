# Clase N° 36 - Tercer entrega del desafio final.

Para esta entrega utilice como arquitectura el modelo vista controlador como base modificado, utilizando domain driven design; y como BDaaS use MySql. 
Para la entrega incorporé a mi proyecto un menú de registro y autenticación de usuarios, guardando en la bases de datos las credenciales y los datos cargados al momento del registro, con los datos sencibles encriptados. Una vez un nuevo usuario sea registrado a este se le otrorgara un user_id con el cual podra ver los articulos de su carrito y automaticamente se me enviará un Gmail a mi cuenta especificandome que un nuevo usuario se registró.
Al momento del logIn el usuario ingresara su user_name y su password, y a este se le ortogará un token generado por JWT, con el que puede navegar por los diferentes endpoints.
Tambien agregue la loggers reemplazando todos los mensajes de consola, y en caso de error o warning quedará guardado en un file.err o file.warn dependiendo del caso.
Le sume tambien un validador en la capa de controller, que me valida el que la información enviada por el body es la que realmente necesito, para esto use la librería Joi.

La ruta del login (api/user/login) dispondrá del siguiente body: 
{
    "user": {
        "username": "user",
        "password": "Pass123."
    }
}

La ruta del register (api/user/register) dispondrá del siguiente body:
{
    "user": {
        "username": "user",
        "password": "Pass123.",
        "personal_details": {
            "first_name": "firstName",
            "last_name": "lastName",
            "email": "user@gmail.com",
            "age": "20",
            "phone_number": "123345456"
        }
    }
}

