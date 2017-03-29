import {routesConfig} from "../routesConfig";
import {ENV} from "../environment/env";
import {Injectable} from "@angular/core";

@Injectable()
export class RoutesConfigService {

  public routes;

  constructor() {
    this.routes = routesConfig;
    for (let k in this.routes){
      if(this.routes[k].indexOf("http") === -1) {
        this.routes[k] = ENV + this.routes[k]
      }
    }
  }

}
