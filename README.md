# Project Đồ án CNPM

## Intro

```bash
git clone https://github.com/arc0social1slaver/DoAnTH-CNPM.git
cd DoAnTH-CNPM
# Both front and end
npm install
```

## Anh em muốn commit thì nên commit trên một nhánh khác, chỉ nên commit trên main khi đã xong

### Trường hợp chưa tạo nhánh

Syntanx tạo branch

```bash
git switch -C feature/abc
# or
git checkout -b feature/abc
```

Khi tạo branch, nên để prefix là feature (làm vậy cho chuyên nghiệp)
Tạo xong nhớ push

```bash
git push --set-upstream origin feature/abc
```

### Trường hợp đã có branch rùi

Chỉ cần

```bash
git switch feature/abc
# or
git checkout feature/abc
```

## Push lên repo

```bash
git add .
git commit -m "abcdef"
git push origin feature/abc
```

## Mún update project

Trước khi làm gì nên pull về máy trước để tránh conflict nha

```bash
git pull
```

## Start project

Anh em nào chưa tải mongodb thì comment những gì liên quan đến nó rồi mới chạy cái ở dưới

```bash
npm start
```

### Front end

Nhóm front end làm việc trong thư mục views. File .ejs không khác gì file .html nên anh em cứ code như bình thường nha.
Thư mục assets để chứa các file css và javascript.
Khi làm việc với file html, anh em nên có một layout bao gồm header và footer.
Nếu không có gì thay đổi thì chắc mình sẽ có 2 layout:

1. Layout cho users
2. Layout cho admin

#### Run Front End

```
npm run dev
```

Mục đích của layout là để tránh lặp đi lặp lại thui và giúp anh em tập trung vô phần content hơn.

### Back end

Anh em bên backend nên tải mongo trước nha. Chắc back end sẽ làm chủ yếu hai thứ:

1. CRUD: thêm, sửa, xóa
2. Chat giữa buyer và user (nếu rảnh thì làm)

Có gì thay đổi thì ấy sau. Giờ nhiu đó thui.

#### Run Back End

```
npm start
```
