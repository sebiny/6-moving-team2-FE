<img width="1353" height="740" alt="og-image" src="https://github.com/user-attachments/assets/7200effd-f56f-457d-b07a-212cf2234e0f" />

# 복잡한 이사, 무빙으로 끝!
<h2>url : https://www.moving-2.click</h2>
<h2>
FE: https://github.com/sebiny/6-moving-team2-FE
</h2>
<h2>
BE: https://github.com/sebiny/6-moving-team2-BE
</h2>


## 목차
1. [프로젝트 소개](#1-프로젝트-소개)
2. [영상](#2-영상)
3. [시스템 아키텍처](#3-시스템-아키텍처)
4. [기술 스택](#4-기술-스택)
5. [주요 라이브러리](#5-주요-라이브러리)
6. [팀 소개 및 문서](#6-팀-소개-및-문서)
7. [개인별 주요 작업 내역](#7-개인별-주요-작업-내역)
8. [트러블 슈팅](#8-트러블-슈팅)
9. [최적화](#9-최적화)


## 1. 프로젝트 소개
- 무빙은 이사 전문가와 고객을 연결해주는 플랫폼
- 고객이 이사 정보를 요청하면, 여러 검증된 이사업체가 경쟁적으로 견적을 제시함
- 고객은 이사 업체들이 제안한 다양한 견적을 한눈에 비교하고, 가장 합리적인 가격과 조건을 선택할 수 있음
- 고객 리뷰를 통해 업체들의 자체적인 검증 가능
- 투명하고 공정한 이사 준비를 지원하며, 고객의 경제적 부담을 덜어 줄 수 있음

## 2. 영상


## 3. 시스템 아키텍처


## 4. 기술 스택
#### Language
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
#### Framework & Libraries
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next.js](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Tanstack Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
#### Hosting & Deployment
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
#### Version Control
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121212.svg?style=for-the-badge&logo=github&logoColor=white)

## 5. 주요 라이브러리
- tanstack/react-query : 서버 상태 관리를 위한 데이터 동기화
- clsx : 조건부 CSS 클래스 적용
- event-source-polyfill : 구형 브라우저에서 SSE 통신 지원
- html-react-parser : HTML 문자열을 리액트 컴포넌트로 변환할 때 사용
- use-media : 미디어 쿼리 변화를 감지하는 커스텀 훅
- react-simple-star-rating : 별점 UI를 구현하는 리액트 컴포넌트
- react-toastify : 토스트 알림 메시지 표시

## 6. 팀 소개 및 문서
#### 개인 개발 보고서
https://www.notion.so/22afff3108c98004a243e75597d21347
## 7. 개인별 주요 작업 내역
## 팀원 및 담당 역할

| 팀원 | 담당 영역 | 주요 기능 |
| --- | --- | --- |
| **안세빈 (팀장)** | 리뷰, 다국어 | - 고객은 기사에 대한 리뷰를 남길 수 있습니다.<br>- 리뷰는 다국어로 제공됩니다. |
| **최민경 (부팀장)** | 기사님 찾기, 기사님 마이페이지, AWS | - 기사 리스트를 평점/위치/경력 등으로 필터링하여 조회할 수 있습니다.<br>- 기사를 찜할 수 있습니다.<br>- 기사 리스트에서 검색 기능을 제공합니다. |
| **김단이** | 견적(기사), 스키마 | - 기사는 고객의 견적 요청서에 대한 견적을 제안할 수 있습니다.<br>- 기사는 지정 견적 요청서를 반려할 수 있습니다. |
| **김다은** | 견적(고객) | - 고객은 기사에게 받은 견적서를 조회하고 확정할 수 있습니다.<br>- 고객은 받은 견적서를 반려할 수 있습니다. |
| **이지수A** | 인증 및 유저, AWS | - 유저 유형별(고객/기사) 로그인 및 회원가입 가능<br>- 유저 유형별 프로필 등록/수정 가능<br>- 소셜 로그인 기능 지원 |
| **오보람** | 견적 요청서 작성(고객) | - 고객은 견적 요청서를 작성할 수 있습니다.<br>- 견적 요청서의 주소 입력 시 카카오 API 활용 가능 |
| **황수정** | 알림, 랜딩페이지 | - 실시간 알림 수신 가능<br>- 이사 당일 알림 제공 |

## 8. 트러블 슈팅
<details>
<summary><h3> 1. DeepL 번역 시 HTML 태그 중복으로 인한 스타일 오적용 문제</h3></summary>
	
#### Problem
- 백엔드에서 (텍스트 색상 변경)  html코드를 함께 전송하고 있음
- 영어/중국어의 경우  HTML 태그가 중복 생성되어 스타일이 전체 텍스트에 잘못 적용됨
<p align="center">
  <img width="350" height="368" alt="noti-kr" src="https://github.com/user-attachments/assets/8abdf1b2-a84b-4177-881e-8a03f20651f6" width="40%"/>
  &nbsp; 
  <img width="321" height="333" alt="noti-en" src="https://github.com/user-attachments/assets/282f445a-6ba7-45c3-94d2-0d0835d21d06" width="40%" />
</p>

```jsx
// 한국어
{
		...
    "message": "<span style=\"color: #F9502E\">요정십일</span>님, 무빙 회원가입을 축하합니다!",
		...
}

// 영어
{
    "translated": "<span style=\"color: #F9502E\">Congratulations, <span style=\"color: #F9502E\">FairySeventyEight</span>, on your Moving membership!"
}
```

#### Product Context & Goals
- HTML 태그 중복 문제 해결
- 모든 언어에서 일관된 스타일 적용
- 닉네임은 번역되지 않도록 적용


#### Solutions
- 회원가입 축하 알림 타입(WELCOME)일 경우
- HTML이 적용되어야 할 텍스트(닉네임)를 제외하고 API 적용
- Placeholder 방식으로 구현
    - <span> 태그를 임시 플레이스 홀더로 교체
    - <span>이 제거된 텍스트만 번역
    - 번역 후 원본 span 태그 복원
- 해결 ![소스코드 바로가기](https://github.com/sebiny/6-moving-team2-FE/blob/main/src/components/notification/_components/NotificationItem.tsx)
<p align="center">
	<img width="339" height="367" alt="tobe-noti-kr" src="https://github.com/user-attachments/assets/f37c983a-04da-4a86-adb2-379ad74105bb" width="40%" />
	&nbsp; 
	<img width="353" height="362" alt="tobe-noti-en" src="https://github.com/user-attachments/assets/0356599f-e620-430a-8dc0-fa0f77ff2ed7" width="40%" />
</p>

#### Lesson Learned
- **번역 API의 HTML 처리 한계**
    - **배운 점**: DeepL 등 번역 서비스는 HTML 태그를 텍스트로 인식하여 구조가 변형될 수 있음
    - **영향**: 의도치 않은 태그 중복 및 스타일 오적용 발생
    - **향후 적용**: HTML과 텍스트를 분리하여 처리하는 것이 안전함
- **정규식 기반 Placeholder 패턴의 효과**
    - **배운 점**: HTML 태그를 임시 플레이스홀더로 치환 후 번역하는 방식이 매우 효과적
    - **구현**: **`__SPAN_PLACEHOLDER_${index}__`** 패턴 사용
    - **장점**: 번역 품질 유지 + HTML 구조 보존
</details>
<details>
<summary><h3> 2. 보안을 위해 사용자 입력을 HTML로 직접 렌더링하지 않게 하는 방법 (XSS 방지)</h3></summary>

#### Problem
- BE 에서 아무 검증 없이 사용자 제공값(이름, 메시지 등)이나 외부 연동 데이터를 그대로 내려주면, FE가 HTML로 직접 렌더링할 때 악성 스크립트가 실행될 수 있음

#### Solutions

**동적 엔티티는 엔티티 변환으로 완전 무해화**
**의도한 스타일만 React 컴포넌트로 렌더링**

- **escapeHTML 함수 생성**
    - 사용자가 입력한 텍스트나 외부 데이터를 HTML에 직접 출력할 때 XSS 공격을 방지하기 위해 특수문자를 HTML 엔티티로 변환해주는 역할
    - escapeHTML 함수는 HTML에 신뢰할 수 없는 데이터를 보여줄 때 '스크립트 실행'이 아니라 '그냥 텍스트'만 보이게 해 XSS를 원천 차단하는 데 필수로 사용함
        
        ```jsx
        // 사용자가 입력한 값 중 아래 특수문자가 포함될 경우 변경처리해 보냄
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
        
- **html-react-parser**
    - HTML 코드 자체를 받아올 때 React 컴포넌트로 안전하게 변환하기 위해 사용
    - escapeHTML 단독으로 사용하는 것 보다 효과적
    - HTML 구조를 유지하면서도 보안을 확보할 수 있음
        
        ```jsx
        <li
            ref={itemRef}
            role={role}
            aria-describedby={ariaDescribedBy}
            className={`border-line-200 text-black-400 flex flex-col gap-[2px] border-b p-3 text-sm font-medium transition-colors`}
          >
            <p>{parse(displayMessage)}</p> // parse 적용해 
            <time dateTime={item.createdAt} className={`text-[13px] ${isInitiallyRead ? "text-gray-300" : "text-gray-400"}`}>
              {displayTime}
            </time>
          </li>
        ```
 
</details>



## 9. 최적화
<details>
<summary><h3> 리뷰 라이트 하우스 성능 최적화</h3></summary>
	
- **전 코드**
    ```jsx
    useEffect(() => {
        const translateAllIntros = async () => {
          const translations: Record<string, string> = {};
          for (const item of reviewables) {
            const shortIntro = item.estimates[0].driver.shortIntro;
            if (!shortIntro) continue;
            try {
              const translated = await translateWithDeepL(shortIntro, locale.toUpperCase());
              translations[item.id] = translated;
            } catch (e) {
              console.warn(`번역 실패 (ID: ${item.id})`, e);
              translations[item.id] = shortIntro; // fallback}}
          setTranslatedIntros(translations); };
        translateAllIntros();
      }, [reviewables, locale]);
    ```
- **후 코드**
    ```jsx
    useEffect(() => {
      const translateAllIntros = async () => {
        try {
          const translationEntries = await Promise.all(
            reviewables.map(async (item) => {
              const shortIntro = item.estimates[0].driver.shortIntro;
              if (!shortIntro) return [item.id, ""];
              try {
                const translated = await translateWithDeepL(shortIntro, locale.toUpperCase());
                return [item.id, translated];
              } catch (e) {
                console.warn(`번역 실패 (ID: ${item.id})`, e);
                return [item.id, shortIntro]; // fallback}
            }));
          // 배열을 객체로 변환하여 상태 저장
          const translations = Object.fromEntries(translationEntries);
          setTranslatedIntros(translations);
        } catch (error) {
          console.error("전체 번역 실패", error); }};
      translateAllIntros();
    }, [reviewables, locale]);
    ```
### 📌 변경 포인트 요약
| 항목 | 변경 전 | 변경 후 |
| --- | --- | --- |
| **루프 방식** | `for...of` + `await` | `Promise.all` + `map` |
| **속도** | 순차 처리 | 병렬 처리 |
| **변환 방식** | 직접 객체에 키 할당 | `Object.fromEntries()` 사용 |
| **에러 핸들링** | 각 항목 단위로만 | 전체 try/catch 추가 |

---
### 🔍 성능 효과

이렇게 변경하여 **번역이 동시에 진행되기 때문에 초기 렌더링이 훨씬 빨라지고**, Lighthouse 성능 점수도 더 높아진 것을 확인할 수 있었습니다.
### 배경

기존 리뷰 번역 로직은 `for...of`와 `await`를 사용하여 각 리뷰를 순차적으로 번역하였습니다. 이로 인해 네트워크 요청이 직렬로 처리되어 번역 완료까지 시간이 많이 소요되는 문제가 있었습니다.

### 개선 사항

- **병렬 처리 적용**
    
    `reviewables` 배열을 `map` 함수로 변환하여 모든 번역 요청을 동시에 실행하도록 변경하였으며, `Promise.all`을 사용해 병렬로 처리함으로써 번역 속도를 대폭 향상시켰습니다.
    
- **데이터 변환 최적화**
    
    번역 결과를 `[id, 번역문]` 형태의 배열로 받아, `Object.fromEntries`를 통해 객체로 한 번에 변환하여 코드의 간결성과 가독성을 높였습니다.
    
- **에러 처리 강화**
    
    개별 항목 번역 실패 시 원문을 대체하는 폴백 처리 외에, 전체 병렬 처리 구문을 `try/catch`로 감싸 예상치 못한 전반적 실패에도 대응 가능하도록 안정성을 개선하였습니다.
    

### 효과

- 전체 번역 처리 시간이 크게 단축되어 사용자 경험이 개선되었습니다.
- 코드 가독성과 유지보수성이 향상되었습니다.
- 안정적인 에러 핸들링으로 서비스 신뢰성이 증가하였습니다.
</details>
<details>
<summary><h3>📂 폴더 구조</h3></summary>

```bash
.
├── 📄 README.md
├── 📦 package.json
├── ⚙️ next.config.ts
├── 🎨 tailwind.config.mjs
├── 📝 tsconfig.json
├── 📁 public
│   ├── 🖼️ assets/        # 아이콘, 이미지, 폰트 등 정적 리소스
│   ├── 🎬 lottie/        # 로티 애니메이션
│   └── 🖼️ og-image*.webp # 메타 태그 이미지
├── 📁 src
│   ├── 📁 app/           # Next.js App Router 페이지
│   │   ├── 🌐 [locale]/  # 다국어 라우팅
│   │   ├── 🔌 api/       # API 라우트
│   │   └── 🎨 globals.css
│   ├── 🧩 components/    # 공용 UI 컴포넌트
│   ├── 📌 constant/      # 상수 정의
│   ├── 🪝 hooks/         # 커스텀 훅
│   ├── 🌍 i18n/          # 다국어 라우팅/내비게이션 설정
│   ├── 🔧 lib/           # API 클라이언트, 유틸리티
│   ├── 💬 messages/      # 다국어 번역 JSON
│   ├── ⚛️ providers/     # Context Providers
│   ├── 🗂️ types/         # 타입 정의 (TS Interfaces)
│   └── 🛠️ utills/        # 공용 함수/유틸 모듈

