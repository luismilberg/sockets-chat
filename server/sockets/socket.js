const { io } = require('../server');
const {Usuarios} = require('../classes/usuarios');
const {crearMensaje} = require('../utils/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (usuario, callback) => {

        if( !usuario.nombre){
            return callback({
                error: true,
                mensaje: 'El nombre es necesario'
            });
        }

        let personas = usuarios.agregarPersona( client.id, usuario.nombre);

        client.broadcast.emit('listaPersonas', usuarios.getPersonas());

        return callback(personas); //sin el return crashea 'callback is not a function'
    });

    client.on('crearMensaje', (data) => {
        
        let persona = usuarios.getPersona(client.id);
        
        let mensaje = crearMensaje(persona.nombre, data.mensaje);

        client.broadcast.emit('crearMensaje', mensaje);

    });

    client.on('disconnect', () => {
        
        let personaBorrada = usuarios.borrarPersona(client.id);
        
        client.broadcast.emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió`));
        client.broadcast.emit('listaPersonas', usuarios.getPersonas());
        
    })

    client.on('mensajePrivado', (data) => {

        const persona = usuarios.getPersona(client.id);
        //Validar que llegue el mensaje

        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    });


});