# Năng lực sáng tạo — trang đọc tương tác

Trang web một trang (single-page) dựng từ bản đặc tả `dac-ta.md`, văn bản
`nang-luc-sang-tao.md` của GS.TSKH Phan Đình Diệu (Ngữ văn 12, Bài 3) và danh
sách góp ý trong `to-do-next.txt`.

Phiên bản hiện tại là một **gallery tối, tràn viền**: nền than ấm, accent cam
tia lửa, hero video toàn màn hình, nội dung đọc dạng accordion, ảnh nhân vật
lớn xuất hiện theo tương tác và một lớp glare chạy theo con trỏ.

## Chạy

Không cần cài đặt hay build. Có thể mở trực tiếp `index.html` bằng trình duyệt
(vẫn chạy ảnh, font, JS và video qua `file://`). Nếu muốn một server tĩnh
(khuyến nghị khi kiểm tra):

```bash
python3 -m http.server 8765
```

Mở `http://127.0.0.1:8765/`.

## Cấu trúc

```
index.html                 # markup ngữ nghĩa của toàn trang
css/
  tokens.css               # màu, chữ, nhịp điệu, container 1920px
  base.css                 # reset, typography, atmosphere, reveal, in ấn
  components.css           # nav, button, segmented, card, bento, dialog
  sections.css             # hero video, tác giả, accordion, spotlight, footer
  responsive.css           # breakpoint 1280 → 380 + laptop thấp
js/
  utils.js                 # helper dùng chung, tôn trọng reduced-motion
  cursor.js                # glare/vệt sáng theo con trỏ (desktop)
  nav.js                   # nav nổi, active section, scroll progress
  reveal.js                # hiện dần theo IntersectionObserver
  hero.js                  # video nền: lazy load, autoplay, pause, parallax
  flashcards.js            # lật 3D + nghiêng theo con trỏ (desktop)
  video.js                 # <dialog> video, play/pause, khóa cuộn
  tabs.js                  # tab tác giả + 5 thao tác (ARIA, bàn phím)
  timeline.js              # cột mốc hover/focus/click
  expand.js                # các panel "Góc mở rộng" / "Góc nhìn"
  accordion.js             # 4 trạm: mở một trạm, tự đóng trạm trước
  portrait.js              # hé lộ / ghim chân dung tác giả
  glow.js                  # vệt sáng theo con trỏ trên card
  share.js                 # sao chép link chia sẻ, có fallback
  app.js                   # năm ở footer, chi tiết nhỏ
assets/
  fonts/                   # Inter + Newsreader, self-host, subset tiếng Việt
  spark.svg                # favicon
  share-qr.svg             # QR trỏ tới trang đã deploy
images/                    # ảnh tư liệu đã xử lý + poster video
video/
  think-different.mp4      # bản đầy đủ H.264 + AAC (1:09), dùng cho dialog
  think-different-loop.mp4 # bản 30 giây không tiếng cho video nền desktop
  think-different-loop-mobile.mp4 # bản 640×360 nhẹ cho mobile
  Apple - Think Different - Full Version [5sMBhDv4sik].mp4 # nguồn gốc
```

## Tương tác

- **Hero video**: video nền tự phát, lặp, không tiếng; có nút tạm dừng/tiếp tục.
  Video tạm dừng khi cuộn ra khỏi màn hình. Nút "Xem video đầy đủ" mở dialog có
  tiếng. Bản mobile nhẹ hơn; tôn trọng `prefers-reduced-motion` và Save-Data.
- **Ba câu hỏi**: 3 flashcard 3D lật khi bấm/chạm; hỗ trợ bàn phím.
- **Mục I**: tab Chân dung/Hồ sơ; chân dung lớn mặc định được che, hé lộ khi rê
  chuột vào phần nội dung hoặc bấm "Ghim chân dung"; timeline 4 mốc; kệ sách 3D.
- **Mục II**: 4 trạm là accordion — mỗi lần chỉ mở một trạm, trạm trước tự đóng,
  header được giữ nguyên vị trí khi trang co giãn. Ảnh Einstein, Poincaré,
  Edison, Picasso lớn hơn và hiện dần khi mở trạm.
- **Mục III/V**: 3 thẻ bento có vệt sáng theo con trỏ; spotlight tối với quote
  lớn; mở đoạn văn 150 chữ.
- **Video dialog**: có nút đóng, phím Escape, tự dừng khi đóng và kèm bản tóm tắt
  lời bình (transcript) cho người dùng trình đọc màn hình.
- **Con trỏ**: một quầng sáng cam chạy theo con trỏ (chỉ desktop có pointer
  chính xác, tự tắt khi reduced-motion).
- **Chia sẻ**: cuối footer có QR, đường link công khai và nút sao chép. QR được
  tạo cục bộ bằng `qrencode`; nút sao chép dùng Clipboard API, có fallback chọn
  liên kết nếu trình duyệt chặn.
- **In ấn**: `@media print` chuyển toàn bộ về nền trắng, mở hết accordion và
  panel, giữ ảnh, QR và nội dung đọc được.

## Kiểm tra

- axe-core: **0 vi phạm** WCAG 2 A/AA ở desktop 1440×900 và mobile 390×844.
- Không tràn ngang ở 320, 360, 390, 414, 768, 820, 1024, 1280, 1366, 1440,
  1920 và 2560 px.
- Bàn phím: flashcard, tab, timeline, accordion (Arrow/Home/End/Escape),
  "Góc mở rộng", dialog (Escape, focus trả về nút mở).
- `prefers-reduced-motion`: không tải/không phát video nền, không glare, reveal
  hiện ngay; `prefers-reduced-transparency` và `prefers-contrast` có override.
- Chạy được cả `file://` và HTTP; 0 lỗi console.
- QR đã quét thử và giải mã đúng `https://ken021109.github.io/nang-luc-sang-tao/`.

## Tư liệu & ảnh

- Văn bản: Phan Đình Diệu, *Năng lực sáng tạo*, in trong *Một góc nhìn của trí
  thức*, tập 4, NXB Trẻ, TP. Hồ Chí Minh, 2004, tr. 200–205.
- Chân dung tác giả: Tia Sáng. Ảnh tư liệu phòng máy: TTĐN.
- Chân dung A. Einstein, H. Poincaré, T. Edison, P. Picasso: Wikimedia Commons
  (public domain/ảnh lịch sử).
- Video: Apple — *Think Different* (1997). Poster lấy từ một khung hình của video.
- Font: Inter (Rasmus Andersson) và Newsreader (Production Type), SIL Open Font License.
- Tư liệu mở rộng: VOV, Tia Sáng, TTĐN, The New York Times (20% time),
  Quote Investigator (câu nói của Picasso), Harvard (giai thoại Poincaré).

Các ảnh được xử lý duotone ấm cho mục đích trình bày học tập; vui lòng giữ
credit khi tái sử dụng.
