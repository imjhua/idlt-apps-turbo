'use client';

function LoadingSpiner() {
  return (
    <div className="relative h-screen">
      <div className="loading-box open" aria-live="assertive">
        <span className="ic-loading" role="alert">
          <span className="hidden">로드 중...</span>
        </span>
      </div>
    </div>
  );
}

export default LoadingSpiner;
