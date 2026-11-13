# Năng lực sáng tạo — trang đọc tương tác

Trang web một trang (single-page) dựng từ bản đặc tả `dac-ta.md` và văn bản
`nang-luc-sang-tao.md` của GS.TSKH Phan Đình Diệu (Ngữ văn 12, Bài 3).

## Chạy

Không cần cài đặt hay build. Có thể mở trực tiếp `index.html` bằng trình duyệt.
Nếu muốn một server tĩnh (khuyến nghị khi kiểm tra):

```bash
python3 -m http.server 8765
```

Mở `http://127.0.0.1:8765/`.

## Cấu trúc

```
index.html                 # markup ngữ nghĩa của toàn trang
css/
  tokens.css               # biến thiết kế: màu, chữ, bán kính, chuyển động
  base.css                 # reset, typography, layout, reveal, in ấn
  components.css           # nav, button, segmented, card, dialog
  sections.css             # hero, tác giả, 4 trạm, bento, spotlight, footer
  responsive.css           # breakpoint 1080 / 900 / 820 / 720 / 480 / 360
js/
  utils.js                 # helper dùng chung, tôn trọng reduced-motion
  nav.js                   # nav nổi, active section, scroll progress
  reveal.js                # hiện dần theo IntersectionObserver
  flashcards.js            # lật 3D + nghiêng theo con trỏ (desktop)
  video.js                 # <dialog> video, play/pause, khóa cuộn
  tabs.js                  # tab tác giả + 5 thao tác (ARIA, bàn phím)
  timeline.js              # cột mốc hover/focus/click
  expand.js                # các panel "Góc mở rộng" / "Góc nhìn"
  stepper.js               # trạm đang xem trên thanh rail
  app.js                   # năm ở footer, chi tiết nhỏ
assets/
  fonts/                   # Inter + Newsreader, self-host, subset tiếng Việt
  spark.svg                # favicon
images/                    # ảnh tư liệu đã xử lý duotone + poster video
video/
  think-different.mp4      # bản H.264 + AAC để phát được cả Safari
  Apple - Think Different - Full Version [5sMBhDv4sik].mp4  # nguồn gốc
```

## Tương tác

- Nav nổi: cuộn để đổi mục đang đọc; thanh tiến độ 2px ở đầu trang.
- Hero: 3 flashcard 3D lật khi bấm/chạm; thẻ được lật bằng bàn phím (Enter/Space).
- Mục I: chuyển 2 tab; timeline 4 mốc đổi nội dung khi hover/focus/bấm;
  kệ sách 3D nghiêng nhẹ khi hover.
- Mục II: thanh rail dính theo 4 trạm; mỗi trạm có "Góc mở rộng".
  5 thao tác nghị luận là tab có hỗ trợ phím mũi tên/Home/End.
- Spotlight: mở đoạn văn 150 chữ; nút video mở dialog, tự phát, đóng thì dừng.
- Tôn trọng `prefers-reduced-motion`, `prefers-reduced-transparency`,
  `prefers-contrast`; màu chữ đã kiểm tra WCAG AA (axe-core: 0 violation).

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
