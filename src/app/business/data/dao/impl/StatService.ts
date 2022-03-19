import {Observable} from 'rxjs';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StatDAO} from '../interface/StatDAO';
import {Stat} from '../../model/Stat';


// глобальная переменная для хранения URL
export const STAT_URL_TOKEN = new InjectionToken<string>('url');

// класс реализовывает методы доступа к данным с помощью RESTful запросов в формате JSON
// напоминает паттер Фасад (Facade) - выдает только то, что нужно для функционала

// JSON формируется автоматически для параметров и результатов


@Injectable({
  providedIn: 'root'
})

export class StatService implements StatDAO {

  constructor(@Inject(STAT_URL_TOKEN) private baseUrl,
              private http: HttpClient
  ) {
  }

  getOverallStat(email: string): Observable<Stat> {
    return this.http.post<Stat>(this.baseUrl, email);
  }


}
