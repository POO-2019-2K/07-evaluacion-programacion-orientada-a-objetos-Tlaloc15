export default class Tareas{
    constructor(tareas){
        this.nombreTa = tareas.nombreTa;
        this.fLimite = tareas.fLimite;

    }
    get nombreTa() {
        return this._nombreTa;
    }
    get fLimite() {
        return this._fLimite;
    }

    _obNum2D(numero) {
        if(numero < 0) {
            return "0"+ numero;
        }

        return numero;
    }

    obCumpleD() {
        let { cumple } = this;
    
        let dia = cumple.getFullYear() +
         "-" + 
         this._obNum2D(cumple.getMonth()) +
          "-" +
          this._obNum2D(cumple.getDay());
    
        console.log(dia);
        return dia;
      }

      obTaLimite() {
        let dia = 
        this._fLimite.getDate() + 
        '/' + 
        this._fLimite.getMonth() + 
        '/' + 
        this._fLimite.getFullYear();

        return dia;
      }
  
        obEdad() {
          let unDia = 24 * 60 * 60 * 1000;
          let unAnio = unDia * 365;
          let difEdad = new Date() - this._cumple;
          let age = Math.trunc(difEdad / unAnio);
      
          return age;
        }


    }