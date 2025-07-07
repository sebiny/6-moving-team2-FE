import React from "react";

function WritingIcon({ size = 10, fill = "gray-100" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M27.9615 12.1901C28.3517 12.5806 28.352 13.2139 27.9615 13.6043L16.3336 25.2322C15.9956 25.5702 15.5473 25.7753 15.0706 25.8115L10.5898 26.152C9.97913 26.1983 9.47036 25.6895 9.51669 25.0789L9.85643 20.5973C9.8927 20.1208 10.0986 19.673 10.4365 19.335L18.0544 11.717L23.9509 17.6135L25.1303 16.4341L19.2339 10.5376L22.0644 7.70711C22.4549 7.31658 23.0881 7.31658 23.4786 7.70711L27.9615 12.1901Z"
        fill={fill}
      />
      <rect x="9" y="28" width="19" height="2" fill={fill} />
    </svg>
  );
}

export default WritingIcon;
