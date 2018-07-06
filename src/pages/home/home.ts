import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Geolocation } from '@ionic-native/geolocation';
import { isLeapYear } from '../../../node_modules/ionic-angular/umd/util/datetime-util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  error: any;
  dados: any
  nextDays: any

  constructor(public navCtrl: NavController, public data: DataProvider, private pos: Geolocation, public alert: AlertController) {
    pos.getCurrentPosition().then((resp) => {
      data.requestWeather(resp, (x) => {
        this.dados = x
      })
      data.requestNextDays(resp, y => {
        this.nextDays = this.sortDays(y)
      })
     }).catch((error) => {
       error = 'localização não adquirida'
       let errorAlert = alert.create({
         title: 'Erro!',
         subTitle: 'Não foi possível obter sua localização :(',
         buttons: ['OK']
       })
       errorAlert.present()
     });
  }
  check(){
    console.log(this.dados)
    console.log(this.nextDays)
  }

  sortDays(array){
    console.log(array)
    var d = new Date()
    var dia
    var mes
    var ano = d.getUTCFullYear()
    var compilado
    if(d.getUTCDate() < 10){
      dia = '0'+d.getUTCDate().toString()
    }else{
      dia = d.getUTCDate().toString()
    }
    if(d.getUTCMonth() < 9){
      var tmp = d.getUTCMonth()+1
      mes = '0'+tmp
    }else{
      mes = d.getMonth()
    }
    compilado = ano+'-'+mes+'-'+dia
    var dias = []
    var day1 = 0;
    var day2 = 0;
    var day3 = 0;
    for(var i = 0; i < 40; i++){
      if(array.list[i].dt_txt.split()[0] != compilado){
        if(day1 == 0){
          day1 = array.list[i].dt_txt;
          if(array.list[i].dt_txt = day1){
            console.log(array.list[i].main.temp)
            dias.push(array.list[i].main.temp)
          }
        }else if(day2 == 0){
          day2 = array.list[i].dt_txt;
          if(array.list[i].dt_txt = day1){
            console.log(array.list[i].main.temp)
            dias.push(array.list[i].main.temp)
          }
        }else if(day3 == 0){
          day3 = array.list[i].dt_txt;
          if(array.list[i].dt_txt = day1){
            console.log(array.list[i].main.temp)
            dias.push(array.list[i].main.temp)
          }
        }
      }
    }
    return dias
  }

  show(){
    console.log(this.nextDays)
  }
}
