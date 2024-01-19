import React, { useState, useEffect } from 'react';

const PageButtons = ({ onLeftButtonClick, onRightButtonClick }) => {
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    const handleScrollAndResize = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;

      const isNarrowWidth = window.innerWidth <= 450;
      const isShortHeight = window.innerHeight < 881;

      setHasContent(window.scrollY > 0);

      if (window.innerWidth > 700 && hasContent) {
        setIsAtBottom(scrolledToBottom);
        return;
      }

      setIsAtBottom(isNarrowWidth || isShortHeight || scrolledToBottom);
    };

    window.addEventListener('scroll', handleScrollAndResize);
    window.addEventListener('resize', handleScrollAndResize);

    handleScrollAndResize();

    return () => {
      window.removeEventListener('scroll', handleScrollAndResize);
      window.removeEventListener('resize', handleScrollAndResize);
    };
  }, [hasContent]);

  return (
    <div>
      <div style={{ marginTop: '120px' }}></div>

      {isAtBottom && (
        <div
          style={{
            position: 'fixed',
            bottom: '10px',
            left: '50px',  // Adjusted left positioning
            right: '50px', // Adjusted right positioning
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'column-reverse',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: '100%',
              minWidth: '430px',
              margin: '2vh',
              display: 'flex',
              justifyContent: 'space-between',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                backgroundColor: '#313B54',
              }}
            ></div>

            <button
              onClick={onLeftButtonClick}
              style={{
                color: '#FFF',
                fontFamily: 'Poppins',
                fontSize: '4vw',
                backgroundColor: 'transparent',
                border: 'none',
              }}
            >
              {'<'}
            </button>
            <button
              onClick={onRightButtonClick}
              style={{
                color: '#FFF',
                fontFamily: 'Poppins',
                fontSize: '4vw',
                backgroundColor: 'transparent',
                border: 'none',
              }}
            >
              {'>'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageButtons;
