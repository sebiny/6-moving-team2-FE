# Moving — Simplify Your Move

**URL:** https://www.moving-2.click

**Frontend:** https://github.com/sebiny/6-moving-team2-FE

**Backend:** https://github.com/sebiny/6-moving-team2-BE

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Demo](#2-demo)
3. [System Architecture](#3-system-architecture)
4. [Tech Stack](#4-tech-stack)
5. [Key Libraries](#5-key-libraries)
6. [Team & Documentation](#6-team--documentation)
7. [My Contributions](#7-my-contributions)
8. [Troubleshooting](#8-troubleshooting)
9. [Optimization](#9-optimization)
10. [Folder Structure](#10-folder-structure)

---

## 1. Project Overview

**Moving** is a platform that connects customers with professional moving service providers.

* Customers can submit their moving requirements and receive quotes from multiple verified moving companies.
* Customers can compare different quotes at a glance and choose the option that best fits their budget and requirements.
* Customer reviews help users evaluate and verify moving service providers.
* Moving aims to make the moving process more transparent and accessible while reducing the financial burden on customers.

---

## 2. Demo

| Landing Page                                                                                             | Real-time Notifications                                                                                  | Request a Quote                                                                                          |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/a41cfa4d-33ca-4beb-b673-c4d2c8375db7" width="230"/> | <img src="https://github.com/user-attachments/assets/370fa061-78f3-4d94-a416-5c941e27d650" width="230"/> | <img src="https://github.com/user-attachments/assets/ebbaec8b-1810-4b86-9376-4e8ce9a43722" width="230"/> |

| Find Drivers                                                                                             | Reviews                                                                                                  | Multilingual Support                                                                                     |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/bdd5e59c-0769-4bf7-a0db-db2cc6db0371" width="230"/> | <img src="https://github.com/user-attachments/assets/71567cdc-ea2f-49b3-8be5-e4cca35f284d" width="230"/> | <img src="https://github.com/user-attachments/assets/7f8ca29a-5724-47b5-91ed-252c49d5267a" width="230"/> |

| My Quotes                                                                                                | Favorite Drivers                                                                                         | Send a Quote                                                                                             |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/45467ed7-4ce2-4a49-a1b5-011a0293b1e2" width="230"/> | <img src="https://github.com/user-attachments/assets/39893cb5-79c4-46ed-a791-c1de2c760fe5" width="230"/> | <img src="https://github.com/user-attachments/assets/c4d39b17-cebe-4629-88cb-628ae58692ca" width="230"/> |

| Decline Quote                                                                                            | Driver Quote Details                                                                                     |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/aeb4c538-b243-43e6-a3bf-f0edbca2a864" width="230"/> | <img src="https://github.com/user-attachments/assets/3546da2a-d762-4738-998f-3056cc319437" width="230"/> |

---

## 3. System Architecture

<img width="1792" height="1063" alt="System Architecture" src="https://github.com/user-attachments/assets/31e81a2c-a227-4640-b9ff-2d69022a2952" />

---

## 4. Tech Stack

### Language

* JavaScript
* TypeScript

### Framework & Libraries

* React
* Next.js
* TanStack Query
* Tailwind CSS
* Sentry
* DeepL

### Hosting & Deployment

* Vercel

### Version Control

* Git
* GitHub

---

## 5. Key Libraries

* **@tanstack/react-query** — Server-state management and data synchronization
* **clsx** — Conditional CSS class management
* **event-source-polyfill** — SSE support for older browsers
* **html-react-parser** — Converts HTML strings into React components
* **use-media** — Detects media query changes
* **react-simple-star-rating** — Star-rating UI component
* **react-toastify** — Toast notification messages

---

## 6. Team & Documentation

### Project Management

* 📁 [Notion](https://hungry-plate-76c.notion.site/217fff3108c98098bd43fdc393e922a1?v=217fff3108c981078f8c000cd9c3e859&pvs=74)
* 🗒️ [Kanban Board](https://hungry-plate-76c.notion.site/225fff3108c98096a904feb9f4227256?v=232fff3108c980f69543000c31ed8e93)

### Individual Development Reports

* 📓 [Sebin An — Development Report](https://www.notion.so/22afff3108c98004a243e75597d21347)
* 📓 [Boram Oh — Development Report](https://www.notion.so/218b7087731a805da4aaec67b7074aa5)
* 📓 [Sujeong Hwang — Development Report](https://hungry-plate-76c.notion.site/Moving-217fff3108c980c8a0b1e8cb1c83d33f)
* 📓 [Dani Kim — Development Report](https://danikim8.notion.site/part4-217826aac9d580268449cb2cab6e2a57)
* 📓 [Daeun Kim — Development Report](https://rain-quartz-d59.notion.site/21733256dfa4800a88b7c0699dd76be7)
* 📓 [Minkyung Choi — Development Report](https://www.notion.so/218950ee37c980758568e076529feb1c)
* 📓 [Jisoo Lee — Development Report](https://sage-jonquil-a5b.notion.site/217ad69e00578019867af3efad427833?pvs=74)

---

## 7. My Contributions

### Team Members & Responsibilities

| Team Member                        | Area                              | Key Features                                                                               |
| ---------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------ |
| **Sebin An (Team Lead)**           | Reviews, Multilingual Support     | Customers can leave reviews for drivers. Reviews are available in multiple languages.      |
| **Minkyung Choi (Vice Team Lead)** | Driver My Page, Find Drivers, AWS | Driver list filtering by rating, location, and experience; favorites; search functionality |
| **Dani Kim**                       | Driver Quotes, Schema             | Drivers can submit quotes for customer requests and decline designated quote requests.     |
| **Daeun Kim**                      | Customer Quotes, Favorite Drivers | Customers can view and confirm received quotes or decline them.                            |
| **Jisoo Lee**                      | Authentication & Users, AWS       | Customer/driver registration and login, profile management, and social login               |
| **Boram Oh**                       | Customer Quote Requests           | Customers can submit moving requests and enter addresses using the Kakao API.              |
| **Sujeong Hwang**                  | Notifications, Landing Page       | Real-time notifications and moving-day notifications                                       |

---

## 8. Troubleshooting

<details>
<summary><strong>1. Incorrect Styling Caused by Duplicated HTML Tags During DeepL Translation</strong></summary>

### Problem

The backend included HTML markup for styling text.

During translation, HTML tags were duplicated in English and Chinese, causing styles to be incorrectly applied to the entire message.

### Product Context & Goals

* Prevent duplicated HTML tags
* Maintain consistent styling across languages
* Prevent usernames from being translated

### Solution

For the `WELCOME` notification type:

* Exclude text that requires HTML styling, such as usernames, from the translation request.
* Replace `<span>` tags with temporary placeholders.
* Translate only the text without the HTML tags.
* Restore the original `<span>` tags after translation.

This approach preserved both the translated content and the intended HTML structure.

[View Source Code](https://github.com/sebiny/6-moving-team2-FE/blob/main/src/components/notification/_components/NotificationItem.tsx)

### Lesson Learned

**Limitations of HTML Processing in Translation APIs**

* Translation services such as DeepL may interpret HTML tags as part of the text and modify their structure.
* This can result in duplicated tags and unintended styling.
* Separating HTML structure from translatable text is a safer approach.

**Effectiveness of Placeholder-Based Processing**

HTML tags can be temporarily replaced with placeholders before translation and restored afterward.

The implementation used the pattern:

`__SPAN_PLACEHOLDER_${index}__`

This helped preserve the HTML structure while maintaining translation quality.

</details>

<details>
<summary><strong>2. Preventing XSS When Rendering User-Provided HTML</strong></summary>

### Problem

If user-provided values such as names or messages, or data received from external services, are rendered directly as HTML, malicious scripts could potentially be executed.

### Solution

**Escape dynamic user-generated data**

An `escapeHTML` function was implemented to convert special characters into HTML entities before rendering untrusted data.

```jsx
function escapeHTML(str: string | undefined | null): string {
  if (str == null) return "";

  return str.replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[m] || m));
}
```

**html-react-parser**

`html-react-parser` was used to convert HTML strings into React components while preserving the intended HTML structure.

```jsx
<li
  ref={itemRef}
  role={role}
  aria-describedby={ariaDescribedBy}
  className="border-line-200 text-black-400 flex flex-col gap-[2px] border-b p-3 text-sm font-medium transition-colors"
>
  <p>{parse(displayMessage)}</p>

  <time
    dateTime={item.createdAt}
    className={`text-[13px] ${
      isInitiallyRead ? "text-gray-300" : "text-gray-400"
    }`}
  >
    {displayTime}
  </time>
</li>
```

</details>

---

## 9. Optimization

<details>
<summary><strong>Review Page Lighthouse Performance Optimization</strong></summary>

### Before

The original implementation translated each review sequentially using `for...of` and `await`.

```jsx
useEffect(() => {
  const translateAllIntros = async () => {
    const translations: Record<string, string> = {};

    for (const item of reviewables) {
      const shortIntro = item.estimates[0].driver.shortIntro;

      if (!shortIntro) continue;

      try {
        const translated = await translateWithDeepL(
          shortIntro,
          locale.toUpperCase()
        );

        translations[item.id] = translated;
      } catch (e) {
        console.warn(`Translation failed (ID: ${item.id})`, e);
        translations[item.id] = shortIntro;
      }
    }

    setTranslatedIntros(translations);
  };

  translateAllIntros();
}, [reviewables, locale]);
```

### After

The implementation was changed to use `Promise.all()` and `map()` so that translation requests could run in parallel.

```jsx
useEffect(() => {
  const translateAllIntros = async () => {
    try {
      const translationEntries = await Promise.all(
        reviewables.map(async (item) => {
          const shortIntro = item.estimates[0].driver.shortIntro;

          if (!shortIntro) return [item.id, ""];

          try {
            const translated = await translateWithDeepL(
              shortIntro,
              locale.toUpperCase()
            );

            return [item.id, translated];
          } catch (e) {
            console.warn(`Translation failed (ID: ${item.id})`, e);
            return [item.id, shortIntro];
          }
        })
      );

      const translations = Object.fromEntries(translationEntries);

      setTranslatedIntros(translations);
    } catch (error) {
      console.error("Translation failed", error);
    }
  };

  translateAllIntros();
}, [reviewables, locale]);
```

### Key Changes

| Category                | Before                   | After                                   |
| ----------------------- | ------------------------ | --------------------------------------- |
| **Processing**          | `for...of` + `await`     | `Promise.all()` + `map()`               |
| **Execution**           | Sequential               | Parallel                                |
| **Data Transformation** | Direct object assignment | `Object.fromEntries()`                  |
| **Error Handling**      | Per-item handling        | Per-item fallback + overall `try/catch` |

### Performance Impact

The translation requests were previously processed sequentially, which increased the time required to complete all translations.

By processing the requests in parallel, the overall translation time was significantly reduced, resulting in faster rendering and improved Lighthouse performance.

### Background

The original review translation logic used `for...of` with `await`, causing each network request to wait for the previous request to finish.

### Improvements

**Parallel Processing**

The `reviewables` array is processed with `map()`, and `Promise.all()` executes multiple translation requests concurrently.

**Data Transformation**

Translation results are returned as `[id, translation]` pairs and converted into an object using `Object.fromEntries()`.

**Improved Error Handling**

Individual translation failures fall back to the original text, while an outer `try/catch` handles unexpected failures in the overall process.

### Results

* Reduced the overall translation processing time
* Improved the user experience
* Improved code readability and maintainability
* Added more robust error handling

</details>

---

## 10. Folder Structure

```bash
.
├── README.md
├── package.json
├── next.config.ts
├── tailwind.config.mjs
├── tsconfig.json
├── public
│   ├── assets/          # Icons, images, fonts, and other static resources
│   ├── lottie/          # Lottie animations
│   └── og-image*.webp   # Open Graph images
├── src
│   ├── app/              # Next.js App Router pages
│   │   ├── [locale]/     # Multilingual routing
│   │   ├── api/          # API routes
│   │   └── globals.css
│   ├── components/       # Shared UI components
│   ├── constant/         # Constants
│   ├── hooks/             # Custom hooks
│   ├── i18n/              # Internationalization routing/navigation
│   ├── lib/               # API clients and utilities
│   ├── messages/          # Translation JSON files
│   ├── providers/         # Context providers
│   ├── types/             # TypeScript interfaces and type definitions
│   └── utills/            # Shared utility modules
```
