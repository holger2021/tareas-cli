const Tarea = require("./tarea");
const colors = require('colors');

/*
_listado = {
    'id-uuid': {
        id: 'id-uuid',
        descripcion: 'nueva tarea',
        fechaCompletado = '2021-01-17 10:00:00 pm'
     }
}
 */
class Tareas {
    _listado = {};
    constructor() {
        this._listado = {};
    }

    crearTarea = (descripcion) => {
        const tarea = new Tarea(descripcion);
        this._listado[tarea.id] = tarea;
    }

    get listadoArray () {
        const listado = [];
        Object.keys(this._listado).forEach((key) => {
            listado.push(this._listado[key]);
        });
        return listado;
    }

    listadoCompleto = (arrayTareas) => {
        for (const [index, tarea] of arrayTareas.entries()) {
            console.log(`${ (index + 1).toString().green } ${ tarea.descripcion } :: ${ tarea.fechaCompletado ? 'Completado'.green : 'Pendiente'.red }`);
        }
    }

    ListarPendientesCompletados = (estaCompletado) => {
        let i = 0;
        for (const [index, tarea] of this.listadoArray.entries()) {
            if (estaCompletado) {
                if (tarea.fechaCompletado) {
                    i += 1;
                    console.log(`${ i.toString().green } ${ tarea.descripcion } :: ${ tarea.fechaCompletado.green }`);
                }
            }
            else {
                if (!tarea.fechaCompletado) {
                    i += 1;
                    console.log(`${ i.toString().green } ${ tarea.descripcion } :: ${ 'Pendiente'.red }`);
                }
            }
        }

    }

    set setTareas (tareas) {
        this._listado = tareas;
    }

    get getTareas () {
        return this._listado;
    }

    borrarTarea = (id) => {
        if (this._listado[id]) {
            delete this._listado[id];
            console.log('Tarea eliminada...');
        }
    }

    marcarTareasCompletadas = (ids = []) => {
        ids.forEach((id) => {
            const tarea = this._listado[id];
            if (!tarea.fechaCompletado) {
                //tarea.fechaCompletado = new Date().toLocaleDateString();
                tarea.fechaCompletado = new Date(Date.now()).toLocaleString();
            }
        });

        this.listadoArray.forEach((tarea) => {
            if (!ids.includes(tarea.id)) {
                //tarea.fechaCompletado = null;
                this._listado[tarea.id].fechaCompletado = null;
            }
        });


    }


}

module.exports = Tareas;
