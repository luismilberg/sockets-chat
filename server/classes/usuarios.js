class Usuarios {

    constructor(){

        this.personas = [];

    }

    agregarPersona(id, nombre){

        let persona = {
            id,
            nombre
        }

        this.personas.push(persona);

        return this.personas;

    }


    //Devuelve una persona recibiendo un id
    getPersona(id){

        let persona = this.personas.filter( persona => persona.id === id)[0]; //Usamos la posición 0 porque el método filter devuelve un array

        return persona;
    }

    //Retorna todas las personas del array
    getPersonas(){
        return this.personas;
    }

    getPersonasPorSala(sala){
        // ...
    }

    //Elimina una persona del array y devuelve los datos de la persona borrada
    borrarPersona(id){

        let personaBorrada = this.getPersona(id);

        this.personas = this.personas.filter( persona => persona.id != id );

        return personaBorrada; //Devuelve los datos de la persona borrada, si no la encuentra devuelve un undefined
    
    }

}

module.exports = {
    Usuarios
}