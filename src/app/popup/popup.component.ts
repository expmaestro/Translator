import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  public result: any = {};
  public hasResult = false;
  public form: FormGroup;
  private client = "gtx";
  private sl = "en";
  private tl = "ru";
  private hl = "en-US";
  private dj = "1";
  private source = "bubble";

  connectWithContentScript = () => {
    const tabQueryData = { active: true, currentWindow: true };
    chrome.tabs.query(tabQueryData, (tabs) => {
      const port = chrome.tabs.connect(tabs[0].id);
      port.postMessage('Hello!');
      port.onMessage.addListener((response) => {
        alert('Content script responded: ' + response);
      });
    });
  }
  sendContentScriptCommand() {
    const tabQueryData = { active: true, currentWindow: true };
    chrome.tabs.query(tabQueryData, (tabs) => {
      const commandMessage = { command: 'salute' };
      chrome.tabs.sendMessage(tabs[0].id, commandMessage, (response) => {
        const responseMessage = response['message'];
        console.log('Content script responded: ' + responseMessage);
      });
    });
  }

  public translate() {
    const headers = new HttpHeaders();
    let params = new HttpParams()
      .set('client', 'gtx')
      .set('q', this.form.value.text)
      .set('sl', this.sl)
      .set('tl', this.tl)
      .set('dj', this.dj)
      .set('source', this.source)
    headers.set('Content-Type', 'application/json; charset=utf-8');

    var url = "https://translate.googleapis.com/translate_a/single?dt=t&dt=bd";

    this.http.get(url, { responseType: 'json', params: params, headers: headers })
      .subscribe((data: any) => {
        this.result = data;
        this.hasResult = true;
        console.log(data);
      })
    console.log(this.form.value.text);
  }

  public initForm() {
    this.form = this.fb.group({
      text: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.initForm();
    this.connectWithContentScript();
    this.sendContentScriptCommand();
  }

}
