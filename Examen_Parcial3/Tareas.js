export default class Tarea{
    constructor(tareas){
        this._tNombre = tareas.tNombre;
        this._fLimite = new Date(tareas.fLimite);
        this._meses = [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic"
      ];

    }
    get tNombre() {
        return this._tNombre;
    }
    get fLimite() {
        return this._fLimite;
    }

    _obNum2D(numero) {
        if(numero < 10) {
            return "0"+ numero;
        }

        return numero;
    }

    obDiasD() {
        let dia2 = this._fLimite.getFullYear() +
         "-" + 
         this._obNum2D(this._fLimite.getMonth()+1) +
          "-" +
          this._obNum2D(this._fLimite.getDate());
    
        console.log(dia2);
        return dia2;
      }

      obFLimiteS() {
        let dia = 
        this._fLimite.getDate() + 
        '/' + 
        this._meses[this._fLimite.getMonth()] + 
        '/' + 
        this._fLimite.getFullYear();

        return dia;
      }

      obDia() {
        let unDia = 24 * 60 * 60 * 1000;
        let diferencia = this._fLimite - new Date();
        let Dias = Math.trunc(diferencia / unDia) + 1;
        return Dias;
    }

    }