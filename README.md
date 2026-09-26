# Vũ trụ thông điệp

Web Next.js theme phi hành gia / vũ trụ, chia làm nhiều step trước khi mở
thông điệp.

## Chạy khi đang phát triển (tự reload khi save)

```bash
npm install
npm start
```

Mở http://localhost:3000 — `npm start` giờ chạy **dev server** (`next
dev`), mỗi lần save file Next.js sẽ tự động build lại và refresh trình
duyệt (Fast Refresh), không cần build/start thủ công.

> Chỉ khi nào muốn chạy chế độ **production** mới dùng:
>
> ```bash
> npm run build
> npm run start:prod
> ```
>
> Production build tĩnh một lần rồi chạy, **không** tự cập nhật khi bạn
> sửa code — đó là lý do trước đây thấy phải build lại mới thấy thay đổi.

Nếu `npm run dev` chạy nhưng sửa file không tự cập nhật (thường gặp khi
chạy trong Docker, WSL, máy ảo hoặc thư mục nằm trên ổ đĩa mạng — các môi
trường này không phát sự kiện đổi file cho watcher mặc định), bật chế độ
polling:

```bash
WATCH_POLL=true npm start
```

(Trên Windows PowerShell: `$env:WATCH_POLL="true"; npm start`)

## Cấu trúc

- `app/page.tsx` — điều phối step (step 1 và step 2)
- `components/StepOne.tsx` — màn hình xác nhận Yes/No, nút Yes to dần khi bấm No
- `components/StepTwo.tsx` — 4 khoang đặt sticky note + hiệu ứng tàu bay lộ chữ
- `components/ShuttleButton.tsx` — nút tàu con thoi dọc (dùng ở Step 1)
- `components/NavShuttleButton.tsx` — nút tàu con thoi ngang, hướng phải (dùng ở Step 2)
- `components/SlotFrame.tsx` — khung "khoang lưu trữ" để đặt sticky note
- `components/StarField.tsx` — nền sao, có sao băng và tinh vân mờ

## Ghi chú Step 2

- 4 khung: rộng 4cm, cao 8cm, cách nhau 2px.
- 4 ô chữ bên dưới: rộng bằng khung (4cm), cách hàng khung 1px.
- Bấm nút "Đi đến trạm kế tiếp": tàu lướt ngang hết chiều rộng 4 khung,
  sau đó 4 ô chữ B/I/N/H hiện ra, mỗi chữ chỉ hiện nửa dưới
  (`clip-path: inset(50% 0 0 0)`).

## Ghi chú chung

- Font dùng `next/font/google` (Orbitron, Space Grotesk, JetBrains Mono) nên
  cần mạng khi build/dev lần đầu để tải font.
- Đơn vị `cm` được trình duyệt quy đổi theo chuẩn 96dpi/2.54, nên kích
  thước gần đúng thực tế trên hầu hết màn hình/máy in, không tuyệt đối
  100% trên mọi thiết bị.
# thong-diep-vu-tru
