import { Injectable, signal } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class ServerStatusServices {

    serverDown = signal(false)

    setServerDown(status: boolean) {
    this.serverDown.set(status);
  }

}