import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }

  requestWeather(data, callback){
    console.log(data.coords.latitude)
    this.http.get('https://api.openweathermap.org/data/2.5/weather?lat='+data.coords.latitude+'&lon='+data.coords.longitude+'&units=metric&appid=8fbadca1e05c1885835bfb7b87310d0d').subscribe(x => {
      callback(x)
    })
  }

  requestNextDays(data, callback){
    this.http.get('https://api.openweathermap.org/data/2.5/forecast?lat='+data.coords.latitude+'&lon='+data.coords.longitude+'&units=metric&appid=8fbadca1e05c1885835bfb7b87310d0d').subscribe(x => {
      callback(x)
    })
  }
}
