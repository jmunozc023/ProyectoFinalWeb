const express = require('express'); // Importa el módulo express
const path = require('path'); // Importa el módulo path
const {connectToDb , getDb} = require('./db'); // Importa las funciones de db.js
const exphbs = require('express-handlebars'); // Importa el módulo express-handlebars
//Inicializaciones
const app = express(); // Crea una instancia de express
//configuraciones
//app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); // Establece la carpeta de vistas
app.engine('hbs', exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.use(express.json()); // Middleware para parsear el body de las peticiones
let db; // Variable para almacenar la conexión a la base de datos
connectToDb((err) => { // Conecta a la base de datos
    if (!err) {
        app.listen(3001, () => {
            console.log('Server running on http://localhost:3001'); // Inicia el servidor
        });
        db = getDb(); // Obtiene la conexión a la base de datos
    }
});

app.get('/api/destinos', (req, res) => { // Ruta para obtener todos los destinos
    const page = req.query.page || 0; 
    const destinosPerPage = 20; // Número de destinos por página
    let destinos = []; // Arreglo para almacenar los destinos
    db.collection('destinos') // Consulta los destinos
    .find()
    .sort({ id: 1 }) // Ordena los destinos por id
    .skip(destinosPerPage * page) // Salta los destinos de las páginas anteriores
    .limit(destinosPerPage)
    .forEach(destino => destinos.push(destino)) // Almacena los destinos en el arreglo
    .then(() => {
        res.status(200).json(destinos); // Envia los destinos en formato JSON
    })
    .catch(() => {
        res.status(500).json({ error: 'Error al consultar los destinos' });
    });
});
app.get('/api/destinos/:id', (req, res) => { // Ruta para obtener un destino por id
    const destinoId = parseInt(req.params.id); // Obtiene el id del destino
    if(!isNaN(destinoId)){ // Verifica que el id sea un número
        db.collection('destinos')
        .findOne({ id: destinoId }) // Consulta el destino por id
        .then(destino => {
            if(destino){
                res.status(200).json(destino); // Envia el destino en formato JSON
            } else {
                res.status(404).json({ msg: 'Destino no encontrado' });
            }
        })
        .catch(() => {
            res.status(500).json({ msg: 'Error al consultar el destino' });
        })
    } else {
        res.status(400).json({ Error: 'Id de destino no valido' });
    }
});

app.post('/api/destinos', (req, res) => { // Ruta para insertar un destino
    const destino = req.body; // Obtiene el destino del body
    db.collection('destinos')
    .insertOne(destino) // Inserta el destino
    .then((result) => {
        res.status(201).json({ result });
    })
    .catch(() => {
        res.status(500).json({ msg: 'Error al insertar el destino' });
    })
});

app.patch('/api/destinos/:id', (req, res) => { // Ruta para actualizar un destino por id
    let update = req.body; // Obtiene los datos a actualizar del body
    const destinoId = parseInt(req.params.id); // Obtiene el id del destino
    if(!isNaN(destinoId)){ // Verifica que el id sea un número
        db.collection('destinos')
        .updateOne({ id: destinoId }, { $set: update }) // Actualiza el destino por id
        .then((result) => {
            if(result.matchedCount > 0){
                res.status(200).json({ result });
            } else {
                res.status(404).json({ msg: 'Destino no encontrado' });
            }
        })
        .catch(() => {
            res.status(500).json({ msg: 'Error al actualizar el destino' });
        })
    } else {
        res.status(400).json({ Error: 'Id de destino no valido' });
    }
});

app.delete('/api/destinos/:id', (req, res) => { // Ruta para eliminar un destino por id
    const destinoId = parseInt(req.params.id); // Obtiene el id del destino
    if(!isNaN(destinoId)){ // Verifica que el id sea un número
        db.collection('destinos')
        .deleteOne({ id: destinoId }) // Elimina el destino por id
        .then((result) => {
            res.status(204).json({ result });
        })
        .catch(() => {
            res.status(500).json({ msg: 'Error al eliminar el destino' });
        })
    } else {
        res.status(400).json({ Error: 'Id de destino no valido' });
    }
});
app.get('/api/usuarios', (req, res) => { // Ruta para obtener todos los usuarios
    const page = req.query.page || 0; 
    const usuariosPerPage = 20; // Número de usuarios por página
    let usuarios = []; // Arreglo para almacenar los usuarios
    db.collection('usuarios') // Consulta los usuarios
    .find()
    .sort({ id: 1 }) // Ordena los usuarios por id
    .skip(usuariosPerPage * page) // Salta los usuarios de las páginas anteriores
    .limit(usuariosPerPage)
    .forEach(usuario => usuarios.push(usuario)) // Almacena los usuarios en el arreglo
    .then(() => {
        res.status(200).json(usuarios); // Envia los usuarios en formato JSON
    })
    .catch(() => {
        res.status(500).json({ error: 'Error al consultar los usuarios' });
    });
});
app.get('/api/usuarios/:id', (req, res) => { // Ruta para obtener un usuario por id
    const usuarioId = parseInt(req.params.id); // Obtiene el id del usuario
    if(!isNaN(usuarioId)){ // Verifica que el id sea un número
        db.collection('usuarios')
        .findOne({ id: usuarioId }) // Consulta el usuario por id
        .then(usuario => {
            if(usuario){
                res.status(200).json(usuario); // Envia el destino en formato JSON
            } else {
                res.status(404).json({ msg: 'Usuario no encontrado' });
            }
        })
        .catch(() => {
            res.status(500).json({ msg: 'Error al consultar el usuario' });
        })
    } else {
        res.status(400).json({ Error: 'Id de usuario no valido' });
    }
});
app.post('/api/usuarios', (req, res) => { // Ruta para insertar un usuario
    const usuario = req.body; // Obtiene el destino del body
    db.collection('usuarios')
    .insertOne(usuario) // Inserta el usuario
    .then((result) => {
        res.status(201).json({ result });
    })
    .catch(() => {
        res.status(500).json({ msg: 'Error al insertar el usuario' });
    })
})
app.patch('/api/usuarios/:id', (req, res) => { // Ruta para actualizar un usuario por id
    let update = req.body; // Obtiene los datos a actualizar del body
    const usuarioId = parseInt(req.params.id); // Obtiene el id del usuario
    if(!isNaN(usuarioId)){ // Verifica que el id sea un número
        db.collection('usuarios')
        .updateOne({ id: usuarioId }, { $set: update }) // Actualiza el usuario por id
        .then((result) => {
            if(result.matchedCount > 0){
                res.status(200).json({ result });
            } else {
                res.status(404).json({ msg: 'Usuario no encontrado' });
            }
        })
        .catch(() => {
            res.status(500).json({ msg: 'Error al actualizar el usuario' });
        })
    } else {
        res.status(400).json({ Error: 'Id de usuario no valido' });
    }
})
app.delete('/api/usuarios/:id', (req, res) => { // Ruta para eliminar un usuario por id
    const usuarioId = parseInt(req.params.id); // Obtiene el id del usuario
    if(!isNaN(usuarioId)){ // Verifica que el id sea un número
        db.collection('usuarios')
        .deleteOne({ id: usuarioId }) // Elimina el usuario por id
        .then((result) => {
            res.status(204).json({ result });
        })
        .catch(() => {
            res.status(500).json({ msg: 'Error al eliminar el usuario' });
        })
    } else {
        res.status(400).json({ Error: 'Id de usuario no valido' });
    }
})
app.get('/api/resenas', (req, res) => { // Ruta para obtener todos las reseñas
    const page = req.query.page || 0; 
    const resenasPerPage = 20; // Número de reseñas por página
    let resenas = []; // Arreglo para almacenar los reseñas
    db.collection('resenas') // Consulta las reseñas
    .find()
    .sort({ id: 1 }) // Ordena las reseñas por id
    .skip(resenasPerPage * page) // Salta las reseñas de las páginas anteriores
    .limit(resenasPerPage)
    .forEach(resena => resenas.push(resena)) // Almacena las reseñas en el arreglo
    .then(() => {
        res.status(200).json(resenas); // Envia las reseñas en formato JSON
    })
    .catch(() => {
        res.status(500).json({ error: 'Error al consultar las reseñas' });
    });
})
app.get('/api/resenas/:id', (req, res) => { // Ruta para obtener una reseña por id
    const resenaId = parseInt(req.params.id); // Obtiene el id de la reseña
    if(!isNaN(resenaId)){ // Verifica que el id sea un número
        db.collection('resenas')
        .findOne({ id: resenaId }) // Consulta la reseña por id
        .then(resena => {
            if(resena){
                res.status(200).json(resena); // Envia el destino en formato JSON
            } else {
                res.status(404).json({ msg: 'Reseña no encontrada' });
            }
        })
        .catch(() => {
            res.status(500).json({ msg: 'Error al consultar la reseña' });
        })
    } else {
        res.status(400).json({ Error: 'Id de reseña no valido' });
    }
})
app.post('/api/resenas', (req, res) => { // Ruta para insertar una reseña
    const resena = req.body; // Obtiene el destino del body
    db.collection('resenas')
    .insertOne(resena) // Inserta la reseña
    .then((result) => {
        res.status(201).json({ result });
    })
    .catch(() => {
        res.status(500).json({ msg: 'Error al insertar la reseña' });
    })
})
app.patch('/api/resenas/:id', (req, res) => { // Ruta para actualizar una reseña por id
    let update = req.body; // Obtiene los datos a actualizar del body
    const resenaId = parseInt(req.params.id); // Obtiene el id de la reseña
    if(!isNaN(resenaId)){ // Verifica que el id sea un número
        db.collection('resenas')
        .updateOne({ id: resenaId }, { $set: update }) // Actualiza la reseña por id
        .then((result) => {
            if(result.matchedCount > 0){
                res.status(200).json({ result });
            } else {
                res.status(404).json({ msg: 'Reseña no encontrada' });
            }
        })
        .catch(() => {
            res.status(500).json({ msg: 'Error al actualizar la reseña' });
        })
    } else {
        res.status(400).json({ Error: 'Id de reseña no valido' });
    }
})
app.delete('/api/resenas/:id', (req, res) => { // Ruta para eliminar una reseña por id
    const resenaId = parseInt(req.params.id); // Obtiene el id de la reseña
    if(!isNaN(resenaId)){ // Verifica que el id sea un número
        db.collection('resenas')
        .deleteOne({ id: resenaId }) // Elimina la reseña por id
        .then((result) => {
            res.status(204).json({ result });
        })
        .catch(() => {
            res.status(500).json({ msg: 'Error al eliminar la reseña' });
        })
    } else {
        res.status(400).json({ Error: 'Id de reseña no valido' });
    }
})

app.get('/api/reservas', (req, res) => { // Ruta para obtener todos las reservas
    const page = req.query.page || 0; 
    const reservasPerPage = 20; // Número de reservas por página
    let reservas = []; // Arreglo para almacenar los reservas
    db.collection('reservas') // Consulta las reservas
    .find()
    .sort({ id: 1 }) // Ordena las reservas por id
    .skip(reservasPerPage * page) // Salta las reseñas de las páginas anteriores
    .limit(reservasPerPage)
    .forEach(reserva => reservas.push(reserva)) // Almacena las reservas en el arreglo
    .then(() => {
        res.status(200).json(reservas); // Envia las reservas en formato JSON
    })
    .catch(() => {
        res.status(500).json({ error: 'Error al consultar las reservas' });
    });
})
app.get('/api/reservas/:id', (req, res) => { // Ruta para obtener una reserva por id
    const reservaId = parseInt(req.params.id); // Obtiene el id de la reseña
    if(!isNaN(reservaId)){ // Verifica que el id sea un número
        db.collection('reservas')
        .findOne({ id: reservaId }) // Consulta la reserva por id
        .then(reserva => {
            if(reserva){
                res.status(200).json(reserva); // Envia el destino en formato JSON
            } else {
                res.status(404).json({ msg: 'Reserva no encontrada' });
            }
        })
        .catch(() => {
            res.status(500).json({ msg: 'Error al consultar la reserva' });
        })
    } else {
        res.status(400).json({ Error: 'Id de reserva no valido' });
    }
})
app.post('/api/reservas', (req, res) => { // Ruta para insertar una reserva
    const reserva = req.body; // Obtiene el destino del body
    db.collection('reservas')
    .insertOne(reserva) // Inserta la reserva
    .then((result) => {
        res.status(201).json({ result });
    })
    .catch(() => {
        res.status(500).json({ msg: 'Error al insertar la reserva' });
    })
})
app.patch('/api/reservas/:id', (req, res) => { // Ruta para actualizar una reserva por id
    let update = req.body; // Obtiene los datos a actualizar del body
    const reservaId = parseInt(req.params.id); // Obtiene el id de la reserva
    if(!isNaN(reservaId)){ // Verifica que el id sea un número
        db.collection('reservas')
        .updateOne({ id: reservaId }, { $set: update }) // Actualiza la reserva por id
        .then((result) => {
            if(result.matchedCount > 0){
                res.status(200).json({ result });
            } else {
                res.status(404).json({ msg: 'Reserva no encontrada' });
            }
        })
        .catch(() => {
            res.status(500).json({ msg: 'Error al actualizar la reserva' });
        })
    } else {
        res.status(400).json({ Error: 'Id de reserva no valido' });
    }
})
app.delete('/api/reserva/:id', (req, res) => { // Ruta para eliminar una reserva por id
    const reservaId = parseInt(req.params.id); // Obtiene el id de la reserva
    if(!isNaN(reservaId)){ // Verifica que el id sea un número
        db.collection('reservas')
        .deleteOne({ id: reservaId }) // Elimina la reserva por id
        .then((result) => {
            res.status(204).json({ result });
        })
        .catch(() => {
            res.status(500).json({ msg: 'Error al eliminar la reserva' });
        })
    } else {
        res.status(400).json({ Error: 'Id de reserva no valido' });
    }
})