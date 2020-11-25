const colors = require( 'colors' );
const argv = require( './config/yargs' );
const { cargarData, crearTodo, actualizarTodo, eliminarTodo, filtrarDataDescripcion, filtrarDataCompletado } = require('./todos/todos');

const comando = argv._[ 0 ];
const { descripcion, completado } = argv;

switch( comando ) {
    case 'listar':
        cargarData()
            .then( todos => {
                for( let todo of todos ) {
                    const { description, complete } = todo;

                    console.log( `Descripción: ${ description }`.yellow );
                    console.log( `Completado: ${ colors.magenta( complete ) }`.yellow );
                    console.log( '*********************************************'.white );
                }
            } );
        break;

    case 'crear':
        crearTodo( descripcion )
            .then( todo => console.log( colors.yellow( todo ) ) )
            .catch( err => console.log( err.red ) );
        break;

    case 'actualizar':
        actualizarTodo( descripcion, completado )
            .then( todo => console.log( colors.yellow( todo ) ) )
            .catch( err => console.log( err.red ) );
        break;

    case 'eliminar':
        eliminarTodo( descripcion )
            .then( todo => console.log( colors.yellow( todo ) ) )
            .catch( err => console.log( err.red ) );
        break;
    
    case 'filtrarD':
        filtrarDataDescripcion( descripcion )
            .then( todo => {
                const { description, complete } = todo;

                console.log( `Descripción: ${ description }`.yellow );
                console.log( `Completado: ${ colors.magenta( complete ) }`.yellow );
                console.log( '*********************************************'.white );
            } )
            .catch( err => console.log( err.red ) );
        break;

    case 'filtrarC':
        filtrarDataCompletado( completado )
            .then( todos => {
                for( let todo of todos ) {
                    const { description, complete } = todo;

                    console.log( `Descripción: ${ description }`.yellow );
                    console.log( `Completado: ${ colors.magenta( complete ) }`.yellow );
                    console.log( '*********************************************'.white );
                }
            } )
            .catch( err => console.log( err ) );
        break;
    
    default:
        console.log( 'Comando no reconocido.'.red );
        break;
}
