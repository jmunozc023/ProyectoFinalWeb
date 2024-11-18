const express = require('express'); // Importa el módulo express
const {connectToDb , getDb} = require('./db'); // Importa las funciones de db.js
const app = express(); // Crea una instancia de express
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
})
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
})

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
})

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
})

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
})