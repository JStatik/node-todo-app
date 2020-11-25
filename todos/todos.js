const fs = require( 'fs' );
const colors = require( 'colors' );

const cargarData = () => {
    return new Promise( ( resolve ) => {
        try {
            const todos = require( '../db/data.json' );

            return resolve( todos );
        } catch( err ) {
            const todos = [];

            return resolve( todos );
        }
    } ); 
};

const guardarData = ( todos, message ) => {
    return new Promise( ( resolve, reject ) => {
        const data = JSON.stringify( todos );

        fs.writeFile( 'db/data.json', data, ( err ) => {
            if( err ) return reject( err );

            return resolve( message );
        } );
    } );
};

const crearTodo = ( description ) => {
    return new Promise( async( resolve, reject ) => {
        if( !description ) return reject( `Ingrese una descripción válida: ${ colors.magenta( description ) }` );

        let todos = await cargarData();

        const todo = todos.find( todo => todo.description === description );

        if( todo ) return reject( `El todo ya existe: ${ colors.magenta( description ) }` );

        const newTodo = {
            description,
            complete: false
        };

        todos.push( newTodo );

        guardarData( todos, 'Todo creado' )
            .then( res => console.log( res.white ) )
            .catch( err => console.log( err.red ) );

        return resolve( newTodo );
    } );
};

const actualizarTodo = ( description, complete = true ) => {
    return new Promise( async( resolve, reject ) => {
        let todos = await cargarData();

        let todo = todos.find( todo => todo.description === description );

        if( todo ) {
            todo.complete = complete;

            guardarData( todos, 'Todo actualizado' )
                .then( res => console.log( res.white ) )
                .catch( err => console.log( err.red ) );

            return resolve( todo );
        }

        return reject( `No hay TODOS relacionados al TODO ingresado: ${ colors.magenta( description ) }` );
    } );
};

const eliminarTodo = ( description ) => {
    return new Promise( async( resolve, reject ) => {
        let todos = await cargarData();

        const todo = todos.find( todo => todo.description === description );

        if( todo ) {
            const newsTodos = todos.filter( todo => todo.description !== description );

            guardarData( newsTodos, 'Todo eliminado' )
                .then( res => console.log( res.white ) )
                .catch( err => console.log( err.red ) );

            return resolve( todo );
        }

        return reject( `No hay TODOS relacionados al TODO ingresado: ${ colors.magenta( description ) }` );
    } );
};

const filtrarDataDescripcion = ( description ) => {
    return new Promise( async( resolve, reject ) => {
        let todos = await cargarData();

        let todo = todos.find( todo => todo.description === description );

        if( todo ) {
            return resolve( todo );
        }

        return reject( `No hay TODOS relacionados al TODO ingresado: ${ colors.magenta( description ) }` );
    } ); 
};

const filtrarDataCompletado = ( complete = true ) => {
    return new Promise( async( resolve, reject ) => {
        let todos = await cargarData();

        const todosByComplete = todos.filter( todo => todo.complete === complete );

        if( todosByComplete ) {
            return resolve( todosByComplete );
        }

        return reject( `No hay TODOS de acuerdo a su propiedad complete: ${ colors.magenta( complete ) }` );
    } ); 
};

module.exports = {
    cargarData,
    eliminarTodo,
    crearTodo,
    actualizarTodo,
    filtrarDataDescripcion,
    filtrarDataCompletado
};
