# رابط - لوحة الإدارة

منصة التسويق الذكي - لوحة إدارة آمنة

## 🚀 النشر على GitHub Pages

### الخطوة 1: تعديل اسم المستودع
افتح `vite.config.ts` واستبدل `REPO_NAME` باسم مستودعك:

```ts
base: '/my-repo-name/',
```

إذا كان اسم المستخدم `ahmed` والمستودع `admin-panel`:
```ts
base: '/admin-panel/',
```

### الخطوة 2: رفع الملفات
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git push -u origin main
```

### الخطوة 3: تفعيل GitHub Pages
1. اذهب إلى **Settings → Pages**
2. **Source**: GitHub Actions
3. ادفع أي تغيير لتفعيل الـ workflow

### الخطوة 4: الوصول
بعد 2-3 دقائق، افتح:
```
https://USERNAME.github.io/REPO_NAME/#/admin
```

## 🔐 الدخول للإدارة
1. اضغط مطولاً (8 ثواني) على المنطقة الفارغة
2. أدخل كلمة المرور: `Sunset88@`

## 📁 الملفات المهمة
- `src/App.tsx` - التطبيق الكامل (صفحة الدخول + لوحة التحكم)
- `vite.config.ts` - إعدادات البناء (عدل `base` حسب اسم المستودع)
- `.github/workflows/deploy.yml` - الإعداد التلقائي للنشر
