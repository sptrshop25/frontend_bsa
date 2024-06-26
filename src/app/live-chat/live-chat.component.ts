import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';

interface LiveChatWidget {
  _q: any[];
  _h: any | null;
  _v: string;
  on: (...args: any[]) => void;
  once: (...args: any[]) => void;
  off: (...args: any[]) => void;
  get: (...args: any[]) => void;
  call: (...args: any[]) => void;
  init: () => void;
}

interface WindowWithLiveChat extends Window {
  __lc: {
    license?: number;
    integration_name?: string;
    product_name?: string;
    asyncInit?: boolean;
  };
  LiveChatWidget?: LiveChatWidget;
}

declare var window: WindowWithLiveChat;

@Component({
  selector: 'app-live-chat',
  template: '',
  styleUrls: ['./live-chat.component.scss']
})
export class LiveChatComponent implements OnInit, OnDestroy {

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    if (!window.__lc) {
      window.__lc = {
        license: 18166401, // Ganti dengan license yang sesuai
        integration_name: "manual_onboarding",
        product_name: "livechat"
      };
    }

    if (!window.LiveChatWidget) {
      window.LiveChatWidget = {
        _q: [],
        _h: null,
        _v: "2.0",
        on: function () { this._q.push(["on", [].slice.call(arguments)]) },
        once: function () { this._q.push(["once", [].slice.call(arguments)]) },
        off: function () { this._q.push(["off", [].slice.call(arguments)]) },
        get: function () {
          if (!this._h) throw new Error("[LiveChatWidget] You can't use getters before load.");
          this._q.push(["get", [].slice.call(arguments)])
        },
        call: function () { this._q.push(["call", [].slice.call(arguments)]) },
        init: function () {
          console.log('Initializing LiveChat widget');
          const n = document.createElement("script");
          n.async = true;
          n.type = "text/javascript";
          n.src = "https://cdn.livechatinc.com/tracking.js";
          document.head.appendChild(n);
        }
      };

      if (!window.__lc.asyncInit) {
        window.LiveChatWidget.init();
      }
    }
  }

  ngOnDestroy() {
    // Optional: cleanup if needed
  }
}
