import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'loteria';

  status = 'ONLINE';
  isConnected = true;

  constructor(private connectionService: ConnectionService) {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = "ONLINE";
      }
      else {
        this.status = "OFFLINE";
      }
      console.log('cambio');
      
    })
  }

  ngOnInit(){
    $('[data-toggle="tooltip"]').tooltip()

  }

}
