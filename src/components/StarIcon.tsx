import React from "react";

function StarIcon({ width = 200, height = 40, rating = 5 }) {
  const fullStars = Math.floor(rating);
  const partial = rating - fullStars;
  const starPath =
    "M13.7297 8.11256C15.6297 4.70419 16.5797 3 18 3C19.4203 3 20.3703 4.70419 22.2703 8.11256L22.7618 8.99435C23.3017 9.9629 23.5717 10.4472 23.9926 10.7667C24.4135 11.0862 24.9377 11.2049 25.9862 11.4421L26.9407 11.658C30.6302 12.4928 32.475 12.9102 32.9139 14.3216C33.3528 15.733 32.0951 17.2036 29.5799 20.1449L28.9291 20.9058C28.2144 21.7417 27.857 22.1596 27.6962 22.6766C27.5354 23.1936 27.5895 23.7512 27.6975 24.8663L27.7959 25.8816C28.1762 29.8059 28.3663 31.7681 27.2173 32.6403C26.0682 33.5126 24.341 32.7173 20.8865 31.1268L19.9928 30.7153C19.0111 30.2633 18.5203 30.0373 18 30.0373C17.4797 30.0373 16.9889 30.2633 16.0072 30.7153L15.1135 31.1268C11.659 32.7173 9.93176 33.5126 8.78272 32.6403C7.63368 31.7681 7.82382 29.8059 8.20409 25.8816L8.30248 24.8663C8.41054 23.7512 8.46457 23.1936 8.30379 22.6766C8.14302 22.1596 7.78564 21.7417 7.07088 20.9058L6.42015 20.1449C3.90487 17.2036 2.64724 15.733 3.08613 14.3216C3.52503 12.9102 5.36979 12.4928 9.0593 11.658L10.0138 11.4421C11.0623 11.2049 11.5865 11.0862 12.0074 10.7667C12.4283 10.4472 12.6983 9.9629 13.2382 8.99435L13.7297 8.11256Z";

  return (
    <svg width={width} height={height} viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[0, 1, 2, 3, 4].map((i) => {
        const fillColor = i < fullStars ? "#FFC149" : "#D9D9D9";
        return (
          <g key={i} transform={`translate(${i * 40}, 0)`}>
            {i === fullStars && partial > 0 ? (
              <>
                <path d={starPath} fill="#D9D9D9" />
                <clipPath id={`clip${i}`}>
                  <rect width={partial * 36} height={36} />
                </clipPath>
                <path d={starPath} fill="#FFC149" clipPath={`url(#clip${i})`} />
              </>
            ) : (
              <path d={starPath} fill={fillColor} />
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default StarIcon;
