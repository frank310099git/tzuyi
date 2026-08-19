# TZ YI → Vercel 搬移版

這個版本以 HTTrack 抓取的公開前端為基礎，**不重寫原始視覺**，只修補 Vercel 上會失效的伺服器功能。

## 保留原樣
- HTML / CSS / jQuery
- 首頁 bxSlider 動畫與時間
- ScrollReveal
- Titan lightbox
- 中 / 日文頁面
- 原始圖片與 RWD breakpoint
- 原有 `.html` URL

## 已修復
- 聯絡表單：舊 PHP → `/api/contact` Vercel Function + Resend
- 商品「我要詢問」：導向同語系聯絡表單並自動帶入產品名稱
- 行動版搜尋：靜態搜尋結果頁會依 `?key=` 篩選
- 原站失效的 OG image / Apple touch icon 已替換為有效檔案
- 移除舊 reCAPTCHA site-key 依賴，加入 honeypot 防垃圾欄位

## Vercel 環境變數
在 Project → Settings → Environment Variables 設定：

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=...
CONTACT_FROM_EMAIL=TZ YI Website <website@已驗證的寄件網域>
```

`CONTACT_FROM_EMAIL` 的網域必須先在 Resend 驗證。

## 部署
最簡單：把整個資料夾推到 GitHub，於 Vercel Import Project，Framework Preset 選 Other / No Framework。

或 CLI：
```bash
vercel
vercel --prod
```

## 注意
原站公開鏡像無法取得原 PHP/CMS/資料庫。這個版本把公開前端完整保留，並以 Vercel Function 替代公開網站目前可辨識的後端表單依賴。
