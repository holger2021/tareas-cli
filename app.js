//const { mostrarMenu, pausa } = require('./helpers/mensajes');
const { opcionesDeMenu, pausa, leerInput, listaTareasBorrar, confirmar, mostrarTareasCompletar } = require('./helpers/inquirer');
const { guardarInformacion, leerInformacion } = require('./helpers/db');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

let tareas = new Tareas();

const main = async () => {
    let opcion = '';
    const data = await leerInformacion();
    if (data) {
        tareas.setTareas = JSON.parse(data);
    }
    do {
        // opcion = await mostrarMenu();
        // await pausa();
        opcion = await opcionesDeMenu();
        console.log('\n');
        await opciones(opcion);
        console.log('\n');
        await pausa();
    }while(opcion !== '7');
}

const opciones = async (opcion) => {
    switch (opcion) {
        case '1':
            let descripcion = await leerInput();
            tareas.crearTarea(descripcion);
            break;
        case '2':
            //console.log(tareas.listadoArray);
            tareas.listadoCompleto(tareas.listadoArray);
            break;
        case '3':
            tareas.ListarPendientesCompletados(true);
            break;
        case '4':
            tareas.ListarPendientesCompletados(false);
            break;
        case '5':
            const ids = await mostrarTareasCompletar(tareas.listadoArray);
            tareas.marcarTareasCompletadas(ids);
            break;
        case '6':
            const id = await listaTareasBorrar(tareas.listadoArray);
            if (id !== '0'){
                const ok = await confirmar();
                if (ok) {
                    tareas.borrarTarea(id);
                }
            }
            break;
    }
    try {
        guardarInformacion(tareas.getTareas);
    }
    catch (error) {
        console.log(error);
        await pausa();
        main();
    }
}

main();
