import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-page',
  template: `
    <p>
      event-page works!
    </p>
  `,
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {

  constructor() {

    
   }

   public initContextMenuItem() {
    var contextMenuItem = {
      "id": "translate",
      "title": "Translate Text",
      "contexts": ["selection"] //chrome developer web page 'all'
    }
    chrome.contextMenus.create(contextMenuItem);
    console.log("initContextMenuItem");
   }

   public initListeners() {
    chrome.contextMenus.onClicked.addListener(function(clickData, tab) {    
      
      if(clickData.menuItemId == "translate" && clickData.selectionText) {
      //  if(clickData.selectionText) {
        alert(clickData.selectionText);
        chrome.tabs.sendMessage(tab.id, { command: 'open_type_and_translate' });
        console.log(tab.id);
       // chrome.extension.s
          // chrome.storage.sync.get(['total', 'limit'], function(budget) {
          
          //   chrome.storage.sync.set({'total': 777}, function() {
          //     var notifOptions = {
          //       type:'basic',
          //       iconUrl: 'assets/icon_38.png',
          //       title: 'Limit',
          //       message: clickData.selectionText
          //     };
          //     chrome.notifications.create('limitNotif', notifOptions);
          //   })
          // })
       // }
      }
    })
   }
  
  ngOnInit() {
    this.initContextMenuItem();
    this.initListeners();
  }

}
