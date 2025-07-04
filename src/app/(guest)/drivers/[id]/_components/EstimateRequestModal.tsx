import React from "react";

function EstimateRequestModal() {
  return (
    <div className="bg-opacity-50 fixed inset-0 z-40 flex items-center justify-center bg-black">
      <div className="z-50 w-[90%] max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">모달 제목</h2>
        <p>모달 내용입니다</p>
        <button className="mt-4 text-blue-500 hover:underline">닫기</button>
      </div>
    </div>
  );
}

export default EstimateRequestModal;
