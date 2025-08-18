<img width="1353" height="740" alt="og-image" src="https://github.com/user-attachments/assets/7200effd-f56f-457d-b07a-212cf2234e0f" />

# 복잡한 이사, 무빙으로 끝!

## 목차
1. [프로젝트 소개](#1-프로젝트-소개)
2. [영상](#2-영상)
3. [시스템 아키텍처](#3-시스템-아키텍처)
4. [기술 스택](#4-기술-스택)
5. [주요 라이브러리](#5-주요-라이브러리)
6. [팀 소개 및 문서](#6-팀-소개-및-문서)


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
- ✅ tanstack/react-query : 서버 상태 관리를 위한 데이터 동기화
- ✅ clsx : 조건부 CSS 클래스 적용
- ✅ event-source-polyfill : 구형 브라우저에서 SSE 통신 지원
- ✅ html-react-parser : HTML 문자열을 리액트 컴포넌트로 변환할 때 사용
- ✅ use-media : 미디어 쿼리 변화를 감지하는 커스텀 훅
- ✅ react-simple-star-rating : 별점 UI를 구현하는 리액트 컴포넌트
- ✅ react-toastify : 토스트 알림 메시지 표시

## 6. 팀 소개 및 문서
깃헙 주소
FE: https://github.com/sebiny/6-moving-team2-FE
BE: https://github.com/sebiny/6-moving-team2-BE
개인 개발 보고서

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
1. DeepL 번역 시 HTML 태그 중복으로 인한 스타일 오적용 문제
### Problem

- 백엔드에서 (텍스트 색상 변경)  html코드를 함께 전송하고 있음
- 영어/중국어의 경우  HTML 태그가 중복 생성되어 스타일이 전체 텍스트에 잘못 적용됨

![스크린샷 2025-08-01 오후 1.07.55.png](attachment:c6cfb815-1e8d-4f1b-92c5-add898705c03:스크린샷_2025-08-01_오후_1.07.55.png)

![스크린샷 2025-08-01 오후 1.07.45.png](attachment:f7ae1205-4bb7-4a9d-8796-7dfba63f683c:스크린샷_2025-08-01_오후_1.07.45.png)

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

### Product Context & Goals

- HTML 태그 중복 문제 해결
- 모든 언어에서 일관된 스타일 적용
- 닉네임은 번역되지 않도록 적용

### Solutions

- 회원가입 축하 알림 타입(WELCOME)일 경우
- HTML이 적용되어야 할 텍스트(닉네임)를 제외하고 API 적용
- Placeholder 방식으로 구현
    - <span> 태그를 임시 플레이스 홀더로 교체
    - <span>이 제거된 텍스트만 번역
    - 번역 후 원본 span 태그 복원

```jsx
  useEffect(() => {
    const translateAllMeta = async () => {
      if (!item || translatedMeta[item.id]) return;

      setIsTranslating(true);

      try {
        let { message } = item;
        let translatedMessage: any;

        // WELCOME 타입인 경우 특별 처리
        if (item.type?.toString() === "WELCOME") { // 회원가입 축하 알림 타입
          // <span> 태그와 그 내용을 임시로 플레이스홀더로 교체
          const spanRegex = /<span[^>]*>(.*?)<\/span>/g;
          const spanMatches: string[] = [];

          // span 태그들을 찾아서 저장하고 플레이스홀더로 교체
          const messageForTranslation = message.replace(spanRegex, (match) => {
            const index = spanMatches.length;
            spanMatches.push(match);
            return `__SPAN_PLACEHOLDER_${index}__`;
          });

          // span이 제거된 텍스트만 번역
          translatedMessage = await translateWithDeepL(messageForTranslation, locale.toUpperCase());

          // 번역된 텍스트에 원래 span 태그들을 다시 삽입
          spanMatches.forEach((spanContent, index) => {
            translatedMessage = translatedMessage.replace(`__SPAN_PLACEHOLDER_${index}__`, spanContent);
          });
        } else {
          // 일반 알림은 전체 번역
          translatedMessage = await translateWithDeepL(message, locale.toUpperCase());
        }

        // 번역 결과를 state에 저장
        setTranslatedMeta((prev) => ({
          ...prev,
          [item.id]: {
            message: translatedMessage,
            createdAt: formatTimeFromNow(item.createdAt) // 날짜는 포맷팅만
          }
        }));
      } catch (e) {
        console.warn("번역 실패, 원문 사용", e);
        // 번역 실패시 원문 사용
        setTranslatedMeta((prev) => ({
          ...prev,
          [item.id]: {
            message: item.message,
            createdAt: formatTimeFromNow(item.createdAt)
          }
        }));
      } finally {
        setIsTranslating(false);
      }
    };
    translateAllMeta();
  }, [item, locale, translatedMeta]);
  
  const displayMessage = translatedMeta[item.id]?.message || item.message;
  
  return (
    <li
      ref={itemRef}
      role={role}
      aria-describedby={ariaDescribedBy}
      className={`border-line-200 text-black-400 flex flex-col gap-[2px] border-b p-3 text-sm font-medium transition-colors`}
    >
      <p>{parse(displayMessage)}</p> // 번역된 메시지
      <time dateTime={item.createdAt} className={`text-[13px] ${isInitiallyRead ? "text-gray-300" : "text-gray-400"}`}>
        {displayTime}
      </time>
    </li>
  );
```

- 해결
    
    
    ![스크린샷 2025-08-04 오후 1.25.52.png](attachment:c852cb74-0879-46ab-952c-12cdcf0465f8:스크린샷_2025-08-04_오후_1.25.52.png)
    
    ![스크린샷 2025-08-04 오후 1.24.55.png](attachment:56074cde-67e1-4719-9cad-f0a25693c6a2:스크린샷_2025-08-04_오후_1.24.55.png)
    

### Lesson Learned

- **번역 API의 HTML 처리 한계**
    - **배운 점**: DeepL 등 번역 서비스는 HTML 태그를 텍스트로 인식하여 구조가 변형될 수 있음
    - **영향**: 의도치 않은 태그 중복 및 스타일 오적용 발생
    - **향후 적용**: HTML과 텍스트를 분리하여 처리하는 것이 안전함
- **정규식 기반 Placeholder 패턴의 효과**
    - **배운 점**: HTML 태그를 임시 플레이스홀더로 치환 후 번역하는 방식이 매우 효과적
    - **구현**: **`__SPAN_PLACEHOLDER_${index}__`** 패턴 사용
    - **장점**: 번역 품질 유지 + HTML 구조 보존

2. 보안을 위해 사용자 입력을 HTML로 직접 렌더링하지 않게 하는 방법 (XSS 방지)
### Problem

- BE 에서 아무 검증 없이 사용자 제공값(이름, 메시지 등)이나 외부 연동 데이터를 그대로 내려주면, FE가 HTML로 직접 렌더링할 때 악성 스크립트가 실행될 수 있음

### Research

- **XSS(크로스사이트 스크립팅) 정의**
    - 웹사이트에 악성 스크립트(주로 자바스크립트 등)를 삽입하여, 해당 사이트를 이용하는 사용자의 브라우저에서 공격자가 원하는 명령이 실행되도록 만드는 보안 취약점
    - **피해 예시:**
        - 사용자 세션/쿠키 탈취 및 계정 탈취
        - 악성 웹사이트로 자동 이동(피싱)
        - 페이지 내용 위조, 악성 입력 양식 노출 등
- **XSS 방지**
    - 입력값 검증, 출력 escape, 필터링 등은 BE에서 반드시 보안 대응이 필요한 부분
    - API라고 해서 예외가 아님, API에서 리턴하는 모든 동적 텍스트는 “그대로 사용자에게 노출될 수 있다”는 전제로 설계해야 함
- **보안이 필요한 데이터**
    - 사용자 입력값 (회원명, 메시지, 자유 입력, 별명 등)
    - 외부 API 결과값 (타 시스템/파트너에서 들어온 데이터)
    - 관리자/운영툴 입력 (내부라도 신뢰할 수 없는 채널)
    - 하드코딩된 문구(정적 텍스트)는 보안 처리가 불필요함. ****그러나 조합·합성되는 부분에 동적 입력이 섞여 있으면 그 부분만 escape 등 처리 필수
- HTML 컨텍스트로 내려갈 데이터라면 반드시 **HTML 이스케이프(escape) 또는 정제**해야 함
- JSON이나 API 응답이라도, 최종적으로 클라이언트가 렌더링에 사용할 수 있는 데이터라면 같은 원칙 적용
- 조합·합성되는 부분에 동적 입력이 섞여 있으면 그 부분만 escape 등 처리 필요

### Solutions

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
        
- **isomorphic-dompurify**
    - DOMPurify를 브라우저(클라이언트)와 서버(Node.js SSR 등) 양쪽에서 동일하게 사용할 수 있도록 감싸주는 래퍼 라이브러리
    - 내부적으로 DOMPurify를 감싸서 클라이언트(브라우저)와 서버(Node.js, SSR) 모두에서 일관되게 sanitize(정제) 기능을 제공함
    - **HTML로 랜더링할 때 일부 태그는 허용(화이트리스트), 그 외는 제거 같은 목적이 있을 때 사용**
    - 일반 dompurify는 브라우저 전용(DOM API 필요)이라 서버사이드(Node.js)에서 바로 쓸 수 없음
    - isomorphic-dompurify는 서버 환경에서도 동작하도록 가짜 DOM(jSDOM 등)을 내부적으로 처리하므로, 같은 코드로 양쪽 모두 안전하게 사용할 수 있음
    - Next.js 등 SSR 환경에서 "일부 태그만 허용해 HTML 뷰에 노출"이 서비스 요건이 되면, 그 때는 반드시 isomorphic-dompurify를 사용해야 함
        
        ```jsx
        function createSignUpSuccessPayload(name: string) {
          const safeName = escapeHTML(name ?? "회원");
          const messageHtml = DOMPurify.sanitize(`${pointedStyle(safeName)}님, 무빙 회원가입을 축하합니다!`);
          
          return {
            type: $Enums.NotificationType.WELCOME,
            payload: {
              receivedName: name,
              message: messageHtml,
              timeStamp: new Date().toISOString()
            }
          };
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
        

### Lesson Learned

- 동적 입력 값을 HTML에 직접 삽입하면 인코딩(escape)이 누락되어 XSS 공격에 취약하다는 개념을 알게되었음
- DOMPurify는 “허용 태그 화이트리스트”가 있을 때 유효함
- 출력 컨텍스트 기반 인코딩은 필수
- escape → parse 순서가 중요함, 엔티티 변환 후 파싱해야 태그 해석이 일어나지 않음
## 9. 최적화
리뷰 라이트 하우스 성능 최적화
- **전 코드**
    
    ```jsx
    
    useEffect(() => {
        // To only get one data;;
        const translateAllIntros = async () => {
          if (!reviewables.length || locale === "ko") return;
    
          const translations: Record<string, string> = {};
    
          for (const item of reviewables) {
            const shortIntro = item.estimates[0].driver.shortIntro;
            if (!shortIntro) continue;
    
            try {
              const translated = await translateWithDeepL(shortIntro, locale.toUpperCase());
              translations[item.id] = translated;
            } catch (e) {
              console.warn(`번역 실패 (ID: ${item.id})`, e);
              translations[item.id] = shortIntro; // fallback
            }
          }
    
          setTranslatedIntros(translations);
        };
    
        translateAllIntros();
      }, [reviewables, locale]);
    ```
    
- **후 코드**
    
    ```jsx
    useEffect(() => {
      const translateAllIntros = async () => {
        if (!reviewables.length || locale === "ko") return;
    
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
                return [item.id, shortIntro]; // fallback
              }
            })
          );
    
          // 배열을 객체로 변환하여 상태 저장
          const translations = Object.fromEntries(translationEntries);
          setTranslatedIntros(translations);
        } catch (error) {
          console.error("전체 번역 실패", error);
        }
      };
    
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

![라이팅하우스.png](attachment:af4e66b5-056e-4889-8505-1eb6c8622197:라이팅하우스.png)

![image.png](attachment:96e4a289-9576-4191-bf8d-893ed39830c1:image.png)

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
