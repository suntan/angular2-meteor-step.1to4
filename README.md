# angular2-meteor-step.1 to 3

請先安裝 Meteor 指令如下:

$ curl https://install.meteor.com/ | sh

下載範例到專案根目錄，以　/usr/src 為例，並變更專案名稱 (以 my-app 為例 )，輸入指令如下 :

$ cd /usr/scr

$ git clone https://github.com/suntan/angular2-meteor-step.1to3.git

$ mv angular2-meteor-step.1to3 my-app

$ cd my-app

$ meteor add angular2-compilers

$ meteor npm install --save angular2-meteor

$ meteor npm install --save meteor-node-stubs

$ meteor remove blaze-html-templates

$ npm install typings -g

$ typings install es6-promise

$ typings install es6-shim --ambient

$ meteor npm install angular2-meteor-auto-bootstrap --save


用自己喜歡的 port 啟動(以下用1688為例)，輸入指令如下:

$ meteor -p  1688

=============================================================================================
# Step 1 - Static Template 靜態樣板

透過Step 0. 的介紹我們已知道Meteor 會自動將Angular 2 所有的View集成one head、one html、one body 標籤的完整的靜態 html，請將 client/app.html 檔案修改如下:

<ul>

  <li>
  
    <span>Dubstep-Free Zone</span>
    
    <p>
    
      Can we please just for an evening not listen to dubstep.
      
    </p>
    
  </li>
  
  <li>
  
    <span>All dubstep all the time</span>
    
    <p>
    
      Get it on!
      
    </p>
    
  </li>
  
</ul>

執行 meteor -p 3002 開啟網頁紀行測試，進入下一步，帶入資料產生動態的 View ( dynamic template ) .

# Step 2 - Dynamic Template 動態樣板

這一步驟 ，還是著重在 Angular 2產生動態網頁(Data Binding)，下一步再介紹Meteor 所帶來的好處。

# Data in the View
在 Angular 2 中，View是透過前面提到的編譯解析元件(@Component)塞到指定的tag節點中的，一個頁面可能會有眾多的編譯解析元件，當我們對編譯解析元件作了編輯(存檔)的動作，Angular 2就會針異動重新編譯並且自動對前端重新載入(hot load) 。

編輯 client/app.html 檔案如下 :

<div>

  <ul>
  
    <li *ngFor="#party of parties">
    
      {{party.name}}
      
      <p>{{party.description}}</p>
      
      <p>{{party.location}}</p>
      
    </li>
    
  </ul>
  
</div>

我們使用了Angular的兩個表達式(Angular expressions)，看起來有點像PHP 的 Smarty套件但又不盡相同。

. *ngFor="#party of parties"　，在 li 標籤中新增了 *ngFor屬性，將li當成html樣板，集合物件為 
  parties ，且樣板區域變數的 row 變數為 party 。
  
. 在聲明的樣板區域內，以雙大括號帶入區域變中的屬性值 {{party.description}}、{{party.location}}

關於Angular expressions 都在angular2/common ( https://angular.io/docs/ts/latest/api/common/ ) 套件中。對於 Angular expressions 必須認識的項目大概是 ngFo、ngIf、 ngClass在第四步驟我們會使用到，後續都會介紹到。

# Component as a Controller

在Angular 1.X 是使用ngController作為組件的控制器，而在Angular 2中在Step 0. 時我們介紹過編譯元組件(@Component) 跟他的Veiw是綁在一起的本身就可以進行Data-Binding。

修改 client/app.ts 將資料模型(Data Model)在Socially應用類別建構(constructor)時進行導入 :

import 'reflect-metadata';

import 'zone.js/dist/zone';

import {Component} from 'angular2/core';

import {bootstrap} from 'angular2/platform/browser';

@Component({

  selector: 'app',
  
  templateUrl: 'client/app.html'
  
})

class Socially {

  constructor() {
  
    this.parties = [
    
      {'name': 'Dubstep-Free Zone',
      
        'description': 'Can we please just for an evening not listen to dubstep.',
        
        'location': 'Palo Alto'
        
      },
      
      {'name': 'All dubstep all the time',
      
        'description': 'Get it on!',
        
        'location': 'Palo Alto'
        
      },
      
      {'name': 'Savage lounging',
      
        'description': 'Leisure suit required. And only fiercest manners.',
        
        'location': 'San Francisco'
        
      }
      
    ];
    
  }
  
}

bootstrap(Socially);

回到專案根目錄，啟動專案並開啟網頁進行測試 :

$ meteor -p 3002

使用TypeScript的好處其中之一就是可使用通用物件( Generic Object)宣告，以下我們將修改 /client/app.ts 將 parties 屬性宣告為通用物件陣列 :

  templateUrl: 'client/app.html'
  
})

class Socially {

  parties: Array<Object>; 
  
  constructor() {
  
    this.parties = [
    
      {'name': 'Dubstep-Free Zone',


雖然目前還是沒有作很多事，主要介紹的是我們使用 Angular 2 的一些概念，編譯元組件已解釋過了也就不再贅述；透過以上範例我們可以瞭解到 Component本身就是一個 Controller ，可以在Model與View之間直接進行 Data-Binging。

介紹進行到這裡，仍還是針對 client side 的介紹；下一步將開始介紹 Meteor 與上述功能結合的威力。

# Step 3 - Three-Way data binding

本教程是參考Meteor官網執行並進行步驟的修正，無意外可保證100%可順利執行，請依照按步執行、理解。

現在我們已經建立了一個簡單的client應用程序，在這一步驟中我們要演示如何讓client side連線到server side 並利用Meteor從MongoDB 資料庫中取得資料。

並且在資料庫中的資料異動(新增、刪除、修改)時，client將會即時更新(Real-time)。

# Data Model and Reactivity in Meteor

分散式的Client Code可以非常簡單的透過 Meteor與Server上的資料庫溝通。如果說
Angular-ish 架構式資料的雙向Data-Binding ( View & Model ) ，那使用Meteor後我們就可以把它稱之為三向資料綁定(3 way data binding - View & Model & Data-Model ) 。

Meteor 對於MongoDB的資料方式，是通過 Mongo.Collection ( 詳細資料參考 : http://docs.meteor.com/?__hstc=219992390.139adbc00edcdde736161e05a9d1b498.1461260715093.1461342468598.1461349766518.4&__hssc=219992390.1.1461349766518&__hsfp=1819641482#/full/mongo_collection ) 類別宣告定進行資料集合(Data-Collection)的操作。

這要感謝 Minimongo ( 詳細資料參考 : https://atmospherejs.com/meteor/minimongo?__hstc=219992390.139adbc00edcdde736161e05a9d1b498.1461260715093.1461342468598.1461349766518.4&__hssc=219992390.1.1461349766518&__hsfp=1819641482  ) ，讓Meteor 的用戶端模擬器可以在server 、client side 同時呼叫使用。

另外Meteor 的核心還有如下功能 :

. 透過socket進行即時反饋 (real-time reactivity through web sockets)

. 雙資料庫，一個為客戶端端的即時資料庫(暫存/即時)，另一個為伺服器端的正式資料庫，在後面
　作連動變化。
　
. 透過 DDP通訊協定，將上述兩個資料庫進行資料同步。

. 使用Meteor能更方便的進行微型應用的開發。

# Declare a Collection - 定義資料集合

首先，我們在專案根目錄建立一個 collection 資料夾並建立 parties.ts 檔案來存放我們的 parties 集合物件，建立parties.ts 檔案內容如下 :

import {Mongo} from 'meteor/mongo'; 

export var Parties = new Mongo.Collection('parties');

上述 "collection/parties.ts" 檔案將會被 TypeScript 編譯為 ES5，並註冊為一個CommonJS 模組。並且在上述檔案中透過 export 關鍵字告訴CommonJS將其進行編譯導出Parties物件的動作。

Meteor是一個client & server的架構；專案目錄下的client資料夾僅供用戶端應用存取，server 資料夾則是僅在伺服器端執行。而我們剛在專案根目錄下建立的collection資料夾，則同時提供給client (minimongo)與server (Mongo)共同存取。

我們只撰寫一個Data-Model，但通過Meteor會共構/同步成一個用戶端、一個伺服器端的 javascript 執行腳本。其中的管理工作都是交由Meteor來處理。

# Simple Binding to Angular - 簡單的加入Angular中

我們已經建立了parties資料集合物件，現在我們將他加入到 Step 3. 的用戶端Angular 2應用程序中。在一般情況下，Angular的 ngFor綁定數據是使用單純的物件陣列，而Meteor整合使用MongoDB API中的 find 及 findOne方法讓我們可以直接使用 Parties.find() 來取出資料。

首先修改 client/app.ts 檔案，將引入Parties資料模型 :

import 'zone.js/dist/zone';

import {Component} from 'angular2/core';

import {bootstrap} from 'angular2/platform/browser';

import {Parties} from '../collections/parties';
 
@Component({

  selector: 'app',
  
修改constructor 建構函式中的 parties 變數的賦值方式如下 :

  parties: Array<Object>; 
  
  constructor() {
  
    this.parties = Parties.find().fetch();
    
  }
  
但是如果server-side 的資料變更了，我們如何通知客戶端進行更新呢？

此時則可使用Meteor Tracker ( 參考: https://www.meteor.com/tracker?__hstc=219992390.139adbc00edcdde736161e05a9d1b498.1461260715093.1461342468598.1461349766518.4&__hssc=219992390.1.1461349766518&__hsfp=1819641482 ) ，並加入Angular 2監控更新功能NgZone將client/app.ts 檔案變更內容如下 :

import 'reflect-metadata';

import 'zone.js/dist/zone';

import {NgZone, Component} from 'angular2/core';

import {bootstrap} from 'angular2/bootstrap';

import {Parties} from '../collections/parties';

@Component({

  selector: 'app',
  
  templateUrl: "client/app.html"
  
})

class Socially {

  parties: Array<Object>;
  
  constructor (zone: NgZone) {
  
    Tracker.autorun(() => zone.run(() => {
    
      this.parties = Parties.find().fetch();
      
    }));
    
  }
  
}

bootstrap(Socially);

NgZone 是Angular 2 的區域變化檢測機制，zone.run 相當於Angular 1.x的scope.$apply() 方法；在Angular 2 相對比 1.x版本顯得更聰明及快速。至於Zone.js的相關資料可參考此連結 : https://github.com/angular/zone.js 

=> 符號的語法是來自於 ES2015，可以把它當作一種指定運算子，一層一層的指定執行上下文。

透過以上的修正，當資料有任何異動時，this.parties 將自動即時完成畫面更新並儲存到client-side Minimongo DB並同步到server-side MongoDB。

Initializing a Collection on the Server - 初始化伺服器端的資料集合
上述作完client-side的資料集合綁定，現在將Parties 資料集合進行server-side 的綁定，很慶幸的是CommonJS 模組將collection/parties導入到 server-side 的作法是跟 client-side 相同的。

就如同我們在client資料夾中建立 app.ts 檔案一樣，我們在server 資料夾內建立 main.ts 檔案，其他自動編譯的動作仍是交由 Meteor 來完成，建立 server.main.ts 檔案，並寫入內容如下 :
import {Parties} from '../collections/parties.ts';

如果現在執行 meteor -p <port> 瀏覽時我們會在 console log 中看到找不到 angular2/bootstrap 套件的錯誤訊息! 於Root Component類別建構時使用Parties.find()把值塞到this.parties中，其實Parties.find() 的實體(instance)是 Mongo.Cursor，就是透過這個實體讓我們可以對Mongo 中的Document作讀取、修改、刪除等動作。

實際上對Angular 2來說它並不認識Mongo的物件集合與方法。 但Angular 2 中導入了 differ-classes的概念所以我們才可透過 ngFor 成功的使用集合物件，且效率比1.x版本來的好，但在此我們並不對其作深入介紹。

而Angular2-Meteor套件的differ class是參照Mongo.Cursor而來，且Angular2-Meteor套件的bootstrap方法是改寫自 angular2/bootstrap 並增加了其他的功能，如Blaze (Meteor 的預設前端框架) ，要進行整合使用需透過NPM安裝，請回到專案根目錄並輸入指令如下 :
meteor npm install angular2-meteor-auto-bootstrap --save

並修改 client/app.ts 如下:

import 'reflect-metadata';

import 'zone.js/dist/zone';

import {NgZone, Component} from 'angular2/core';

import {bootstrap} from 'angular2-meteor-auto-bootstrap';

/* import {bootstrap} from 'angular2/bootstrap'; */

import {Parties} from '../collections/parties';

@Component({

  selector: 'app',
  
  templateUrl: "client/app.html"
  
})

class Socially {

  parties: Array<Object>;
  
  constructor (zone: NgZone) {
  
    Tracker.autorun(() => zone.run(() => {
    
      this.parties = Parties.find().fetch();
      
    }));
    
  }
  
}

bootstrap(Socially);

# Inserting Parties from the Console - 在主控台進行Parties資料新增

我們回顧一下，Step 0. ~ Step3. 我製作了一個Angular 2 app，定義了 parties集合物件並使用*ngFor進行 Data-Bind，於本節我們建立了 collection/parties Model 讓CommonJS各別導入 client/app.ts 與 server/main.ts 進行資料綁定；基本的三方資料綁定已經完成，所以我們回到專案根目錄將應用啟動 meteor -p <port>；並開啟另一個 SSH terminal並切換到專案根目錄執行 "meteor mongo" 指令來操作server-side MongoDB ．
 
在 meteor mongo 的terminal 進行資料新增 (新增幾筆資料進行) ，輸入指令如下 :

> db.parties.insert({ name: "A new party", description: "From the mongo console!" });

> db.parties.insert({ name: "A3 new party", description: "From the mongo console!" });

這邊您可用MongoDB語法進行資料庫操作，在此並非介紹重點。
新增完成請不要關閉任何視窗，直接用瀏覽器開啟測試位址並 meteor mongo 的terminal 輸入 "db.parties.find({});" 指令進行資料對照
  

# Blaze-like Binding to Angular

按照上述的理解我們將 client/app.ts 整理如下 :

import 'reflect-metadata';

import 'zone.js/dist/zone';

import {Component} from 'angular2/core';

import {bootstrap} from 'angular2-meteor-auto-bootstrap';

import {Parties} from '../collections/parties';

import {Tracker} from 'meteor/tracker';

 
@Component({

  selector: 'app',
  
  templateUrl: 'client/app.html'
  
})

class Socially {

  parties: Mongo.Cursor<Object>;
  
  constructor () {
  
    this.parties = Parties.find();
    
  }
  
} 

bootstrap(Socially);

看起來是不是簡潔許多，之後的資料操作基本格式大概就這樣確認下來囉!現在再回到專案根目錄下用 meteor 指令啟動應用，當然也可以開啟另一個 SSH terminal並切換到專案根目錄執行 "meteor mongo" 指令來搭配測試執行結果是否相同。

Initializing Data on Server Side – 在伺服器端進行資料初始化
我們剛確認往後使用Angular-Meteor的資料繫結與撰寫模式，並且使用Mongo console進行了資料新增、修改、刪除來測試我們的[三向資料綁定]。這一節我們將在伺服器端寫入一些資料使客戶端進入時就可以看到。

於server 資料夾內新增 load-parties.ts 檔案，並使用 export 並導出名為 loadParties 的方法，內容如下 :

import {Parties} from '../collections/parties.ts';
 
export function loadParties() {

  if (Parties.find().count() === 0) {
 
    var parties = [ {
    
        'name': 'Dubstep-Free Zone',
        
        'description': 'Can we please just for an evening not listen to dubstep.',
        
        'location': 'Palo Alto'
        
      }, {
      
        'name': 'All dubstep all the time',
        
        'description': 'Get it on!',
        
        'location': 'Palo Alto'
        
      }, {
      
        'name': 'Savage lounging',
        
        'description': 'Leisure suit required. And only fiercest manners.',
        
        'location': 'San Francisco'
        
      }];
 
    for (var i = 0; i < parties.length; i++) {
    
      Parties.insert(parties[i]);
      
    }
    
  }
  
};

1.  /collections/parties.ts 導出的 Parties是 Mongo.Collection('parties') 集合物件。
2.  loadParties 方法內定義了一個區域集合物件: parties，當loadParties 方法被呼叫時會以
   Parties.find().count() 判定 Parties集合物件的長度是否為 0，如果是   則透過 for 迴圈此用
   Parties.insert方法將區域集合物件parties資料寫入。

修改 server/main.ts 檔案並帶入 oadParties 方法，內容如下 :

import {loadParties} from './load-parties.ts';
 
Meteor.startup(loadParties);

回到專案根目錄執行以下指令，清除資料，並重新執行應用:

$ meteor reset

$ meteor -p 3002

開啟瀏覽器可見到初始化的資料呈現在畫面上，也可以開啟另一個 terminal 進到專案根目錄使用 meteor mongo 使用 db.parties.find({}) 指令進行資料庫查詢、新增、刪除來觀察執行情況。



# Summary – 概要說明

在本節中的其實是在說明上花了比較多時間，使用Angular2-Meteor 開發的Code少且簡潔、快速:

.	使用Angular2 封裝表單與資料繫結並進行資料新增，是一件非常容易的事。

.	使用Meteor資料模型來操作資料庫更輕鬆。

.  Metor 可以幫助我們快速的在server與client間作資料集合的繫結

.  Angular2-Meteor幫助我們將Mongo collection快速載入到Angular 2 專案中

.  在server 操作資料集合進行畫面資料的初始化

