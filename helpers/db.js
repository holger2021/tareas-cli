const fs = require('fs');
const path = './db/data.json';

const guardarInformacion = (data) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data));
    }
    catch (error) {
        throw error;
    }
}

const leerInformacion = async () => {
    try {
        const tareas = await fs.readFileSync(path, { encoding: 'utf8' });
        return tareas;
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    guardarInformacion, leerInformacion
}
