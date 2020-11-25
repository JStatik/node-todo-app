const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea'
};

const completado = {
    alias: 'c',
    default: true,
    desc: 'Marcar como completada o pendiente la tarea',
    type: 'boolean'
};

const { argv } = require( 'yargs' )
    .command( 'listar', 'Mostrar tareas' )
    .command( 'eliminar', 'Eliminar tarea', { descripcion } )
    .command( 'crear', 'Crear tarea', { descripcion } )
    .command( 'actualizar', 'Actualizar tarea', { descripcion, completado } )
    .command( 'filtrarD', 'Filtrar tarea por descripcion', { descripcion } )
    .command( 'filtrarC', 'Filtrar tareas por completado', { completado } )
    .help();

module.exports = argv;
