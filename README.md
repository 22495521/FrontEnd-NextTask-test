### 安裝套件

```bash
npm install
```

### 環境變數設定

請在終端機輸入 `cp .env.example .env` 來複製 .env.example 檔案，並依據 `.env` 內容調整相關欄位。

### 環境變數範例與說明

> 底下皆為假的資料，請依照自己的資料來設定

```bash

# 後端URL
NEXT_PUBLIC_API_URL=http://localhost:3005

```

### 運行專案

```bash
npm run dev
```

### 開啟專案

在瀏覽器網址列輸入以下即可看到畫面

```bash

http://localhost:3000/

```

## 資料夾說明

```bash

├─ src
    ├─ app
        └─page.js              // 主要就就一支而已

```

## 專案技術

- next.js "14.2.5"
- axios: "^1.7.3",

## 專案指令列表

```bash
# 開發指令 : 使用 tsx watch 來監聽檔案變化，並且自動編譯成 js 檔案，適用於開發環境
npm run dev

# 打包指令 : 使用 esbuild 來編譯、打包專案，適用於正式環境
npm run build

# 啟動指令 : 使用 node 來啟動專案，適用於正式環境
npm run start

```
