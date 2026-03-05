# صانع الكاروسيل السعودي الاحترافي

مشروع تفاعلي لإنشاء كاروسيل وسائل تواصل اجتماعي بتصاميم سعودية احترافية.

## 🚀 النشر على Vercel

### الطريقة 1: ربط Git (موصى به)

1. ارفع المشروع على GitHub/GitLab/Bitbucket
2. اذهب إلى [Vercel](https://vercel.com)
3. اضغط **Add New Project**
4. اختر المستودع الخاص بك
5. اضغط **Deploy**

### الطريقة 2: Vercel CLI

```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# رفع المشروع
vercel
```

### الطريقة 3: رفع مباشر من الموقع

1. اذهب إلى [Vercel](https://vercel.com)
2. اضغط **Add New Project**
3. اختر **Import Git Repository** أو **Deploy from Directory**

## ⚙️ إعدادات البناء

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## 🔑 متغيرات البيئة

إذا كنت تستخدم Gemini API، أضف المتغير التالي في Vercel:

1. اذهب إلى مشروعك في Vercel
2. **Settings** → **Environment Variables**
3. أضف:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: مفتاح API الخاص بك

أو أنشئ ملف `.env.local`:
```
GEMINI_API_KEY=your_api_key_here
```

## 📝 ملاحظات مهمة

✅ **لا ترفع ملف `.env`** - يحتوي على مفاتيح سرية
✅ استخدم `.env.example` كمرجع
✅ تأكد من أن `vercel.json` موجود في المشروع

## 🛠️ التطوير المحلي

```bash
# تثبيت المكتبات
npm install

# تشغيل وضع التطوير
npm run dev

# بناء للإنتاج
npm run build

# معاينة الإنتاج محلياً
npm run preview
```

## 📦 هيكل المشروع

```
├── index.html          # نقطة الدخول
├── styles.css          # التنسيقات
├── App.tsx             # المكون الرئيسي
├── components/         # المكونات
│   ├── Editor.tsx
│   └── SlideRenderer.tsx
├── services/           # خدمات API
│   └── geminiService.ts
├── vercel.json         # إعدادات Vercel
└── package.json
```

## 📄 الترخيص

مشروع مفتوح المصدر للاستخدام الشخصي والتعليمي.
