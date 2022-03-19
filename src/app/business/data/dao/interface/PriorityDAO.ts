import {Priority} from '../../model/Priority';
import {CommonDAO} from './CommonDAO';
import {PrioritySearchValues} from '../search/SearchObjects';
import {Observable} from 'rxjs';


export interface PriorityDAO extends CommonDAO<Priority> {

  findPriorities(prioritySearchValues: PrioritySearchValues): Observable<Priority[]>;

}
