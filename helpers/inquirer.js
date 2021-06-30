require('colors');
const inquirer = require('inquirer');

// opciones a preguntar
const preguntas = [
    {
        type: 'list',
        name: 'opciones',
        message: 'Que desea hacer?',
        choices: [
            {
                name: `${ '1.'.green } Crear tarea`,
                value: '1'
            },
            {
                name: `${ '2.'.green } Listar tareas`,
                value: '2'
            },
            {
                name: `${ '3.'.green } Listar tareas completadas`,
                value: '3'
            },
            {
                name: `${ '4.'.green } Listar tareas pendientes`,
                value: '4'
            },
            {
                name: `${ '5.'.green } Completar tarea(s)`,
                value: '5'
            },
            {
                name: `${ '6.'.green } Borrar tarea`,
                value: '6'
            },
            {
                name: `${ '7.'.green } Salir\n`,
                value: '7'
            },
        ],
        loop: false
    }
];

const opcionesDeMenu = async () => {
    console.clear();
    console.log('=========================='.green);
    console.log('Seleccione una opcion:'.green);
    console.log(`==========================\n`.green);
    const { opciones } = await inquirer.prompt(preguntas);
    return opciones;
}

const pausa = async () => {
    const questions = [
        {
            type: 'input',
            name: 'enter',
            message: 'Presione enter para continuar...'
        }
    ];
    await inquirer.prompt(questions);
}

const leerInput = async () => {
    const question = [
        {
            type: 'input',
            name: 'descripcion',
            message: 'Descripcion:',
            validate: function (value) {
                if (value.length === 0) {
                    return `${ 'Debe digitar una descripcion'.red }`;
                }
                return true;
            }
        }
    ];
    const { descripcion } = await inquirer.prompt(question);
    return descripcion;
}

listaTareasBorrar = async (arrayTareas) => {
    const choices = arrayTareas.map((tarea, index) => {
        return {
            value: tarea.id,
            name: `${ (index + 1).toString().green }. ${ tarea.descripcion }`
        }
    });
    choices.unshift({
       value: '0',
       name: `${ '0'.green }. Cancelar`
    });
    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar:',
            choices
        }
    ];
    const { id } = await inquirer.prompt(question);
    return id;
    console.log(choices);
}

confirmar = async () => {
    const question = [{
        type: 'confirm',
        name: 'ok'
    }];
    const { ok: resp } = await inquirer.prompt(question);
    return resp;
}

mostrarTareasCompletar = async (arrayTareas) => {
    const choices = arrayTareas.map((tarea, index) => {
        return {
            value: tarea.id,
            name: `${ (index + 1).toString().green }. ${ tarea.descripcion }`,
            checked: (tarea.fechaCompletado) ? true : false
        }
    });
    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            choices,
        }
    ];
    const { ids } = await inquirer.prompt(question);
    return ids;
}

module.exports = {
    opcionesDeMenu,
    pausa,
    leerInput,
    listaTareasBorrar,
    confirmar,
    mostrarTareasCompletar
}
