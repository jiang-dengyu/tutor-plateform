# LEARNEZ: a tutor platform

使用 Node.js + Express + MySQL 完成，使用者可以註冊帳號、登入，並查看以及預約的家教課程平台，也可以申請成為老師開課。

## 專案內主要使用的技術

- 實施 MVC 架構 以及 前後端分離的 API
- 後端 API 架構下使用 jwt 進行 authenticate
- MVC 架構下使用 cookie based 方式進行 authenticate
- 使用 day.js 進行時間處理以及資料庫中有關「時間」的邏輯判斷
- 使用 passport 進行登入者資料比對與登入後驗證，另外提供使用者可以經由 google 進行登入註冊

## 主要功能 features

- https://www.notion.so/984cd1f1e73e438c8cdb87187e88b802?pvs=4

## 截圖

![image](https://github.com/jiang-dengyu/tutor-plateform/blob/main/screenshot/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202024-05-10%20145534.png)
![image](https://github.com/jiang-dengyu/tutor-plateform/blob/main/screenshot/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202024-05-10%20145754.png)
![image](https://github.com/jiang-dengyu/tutor-plateform/blob/main/screenshot/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202024-05-10%20145804.png)
![image](https://github.com/jiang-dengyu/tutor-plateform/blob/main/screenshot/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202024-05-10%20145840.png)
![image](https://github.com/jiang-dengyu/tutor-plateform/blob/main/screenshot/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202024-05-10%20145812.png)
![image](https://github.com/jiang-dengyu/tutor-plateform/blob/main/screenshot/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202024-05-10%20145852.png)

## 環境設置

- Node.js
- nodemon
- Express @4.18.2
- mysql@3.2.0
- sequelize@6.30.0
- sequelize-cli@6.6.0

## Installation and execution - 安裝與執行步驟

1. 先將此專案 Clone 到本地電腦:

```
git clone https://github.com/jiang-dengyu/tutor-plateform.git
```

2. 開啟終端機(Terminal)(windows 需用 cmd, shell 似乎不能)，進入此專案的資料夾

```
cd tutor-plateform
```

3. 使用 npm install 指令，安裝 package.json 當中顯示的套件

```
npm install
```

4. 先到 GOOGLE 申請 OAuth2.0 應用程式服務，並在「憑證 →OAuth2.0 用戶端 ID」取得 用戶端編號 id 與 用戶端金鑰

5. 設置.env 檔，首先將 `.env.example` 修改成 .env，並將內容的各個環境變數設定成自己的內容

   - SESSION_SECRECT：改成自己設定的字串
   - GOOGLE_CLIENT_ID 跟 GOOGLE_CLIENT_SECRET： 改成在前面 GOOGLE.OAUTH 申請到的資訊
   - JWT_SECRET:改成自己設定的字串

6. 連線資料庫：：

- 先確認 config.json 中，development 的"username""password"與您本地 mysql sever 設定的內容相符，
- 在 mysql workbench 中新增 learnez 資料庫(或與 config.json 中的"database"相符),建立後確認 MySQL server 有運行該資料庫
- 開始執行 migration 檔案(建立 schema)，再執行 npm run sedd 匯入種子檔案

```
npm run migrate
```

```
npm run seed
```

7. 在 cmd 中設置環境變數 NODE_ENV 為 development

```
set NODE_ENV=development
```

8. 輸入"npm run dev"或是"node app.js" 啟動伺服器，執行 app.js 檔案

```
npm run dev
```

9. 當 terminal 出現以下字樣，表示伺服器已啟動

> Example app listening on port 3000!
