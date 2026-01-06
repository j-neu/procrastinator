import React from 'react';

interface SvgIconProps {
  name: string;
  size?: number;
  className?: string;
}

const svgIcons: Record<string, string> = {
  search: `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
    <g>
      <ellipse cx="29.5854" cy="24.8305" rx="14.6372" ry="14.6372" transform="matrix(0.8006 -0.5992 0.5992 0.8006 -8.979 22.6778)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      <ellipse cx="29.5854" cy="24.8305" rx="11.1656" ry="11.1657" transform="matrix(0.8006 -0.5992 0.5992 0.8006 -8.979 22.6777)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M38.6805,41.7876l4.1839-3.1316l11.6927,15.622c0.8354,1.1162,0.5758,2.7219-0.5795,3.5867l0,0 c-1.1554,0.8647-2.7691,0.661-3.6045-0.4551L38.6805,41.7876z"/>
    </g>
  </svg>`,
  
  target: `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
    <g>
      <line x1="11.4659" x2="2.5131" y1="11.4989" y2="11.4989" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      <line x1="11.4662" x2="11.4663" y1="11.4989" y2="2.546" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      <line x1="15.5067" x2="6.5538" y1="15.5473" y2="15.5473" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      <line x1="15.5086" x2="15.5086" y1="15.5454" y2="6.5925" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      <line x1="39.4865" x2="7.4778" y1="39.4644" y2="7.5188" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M21.9689,16.3467c4.8593-3.674,10.9579-5.8915,17.5193-5.8915c16.0163,0,29,12.9837,29,29s-12.9837,29-29,29s-29-12.9837-29-29 c0-6.5467,2.1693-12.5867,5.8283-17.4404"/>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M26.2567,20.6399c3.7421-2.6364,8.306-4.1847,13.2315-4.1847c12.7025,0,23,10.2975,23,23s-10.2975,23-23,23s-23-10.2975-23-23 c0-4.8704,1.5138-9.3872,4.0966-13.1056"/>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M32.04,26.4321c2.1945-1.2578,4.7374-1.9769,7.4482-1.9769c8.2843,0,15,6.7157,15,15s-6.7157,15-15,15s-15-6.7157-15-15 c0-2.6162,0.7305-5.1268,1.9079-7.268"/>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M40.0779,34.4744c2.4674,0.3067,4.3769,2.4111,4.3769,4.9616c0,2.7614-2.2386,5-5,5c-2.4824,0-4.5422-1.809-4.9332-4.1806"/>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M35.7775,30.1663c1.1474-0.4587,2.3996-0.7111,3.7107-0.7111c5.5228,0,10,4.4772,10,10s-4.4772,10-10,10s-10-4.4771-10-10 c0-1.2548,0.252-2.4731,0.6858-3.5895"/>
    </g>
  </svg>`,
  
  sparkles: `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M20,32l2.1418-11.1605l0.6996,4.1763c0.1122,0.6679,2.3298,13.9055,2.3298,13.9055c0.2615,1.5604,1.6435,2.8154,3.5205,3.1974 L40,44.4198l-11.3161,2.3026c-1.8724,0.381-3.2513,1.6356-3.5127,3.1963L22.1422,68l-3.029-18.0806 c-0.2615-1.5607-1.6405-2.8153-3.5131-3.1964L4.2836,44.4205l11.3171-2.3031C17.4727,41.7362,18.7387,39.5604,19,38"/>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M42.5556,13.4499l1.5469-8.0604l0.5052,3.0162c0.081,0.4824,1.6827,10.0429,1.6827,10.0429 c0.1889,1.1269,1.1869,2.0334,2.5426,2.3092L57,22.4198l-8.1728,1.663c-1.3523,0.2752-2.3482,1.1812-2.5369,2.3084l-2.1876,13.0587 l-2.1876-13.0582c-0.1889-1.1272-1.1848-2.0333-2.5372-2.3085l-8.173-1.6629l8.1735-1.6634 c1.352-0.2753,2.2663-1.8467,2.455-2.9736"/>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M53.8482,44.267l1.2335-6.4275l0.4029,2.4052c0.0646,0.3847,1.3418,8.0084,1.3418,8.0084 c0.1506,0.8986,0.9465,1.6215,2.0275,1.8414l6.5126,1.3253l-6.5171,1.3261c-1.0783,0.2194-1.8725,0.9419-2.023,1.8408L55.0819,65 l-1.7445-10.4129c-0.1506-0.8988-0.9448-1.6214-2.0232-1.8409l-6.5174-1.326l6.5177-1.3264 c1.0781-0.2195,1.8072-1.4726,1.9577-2.3712"/>
    </g>
  </svg>`,
  
  chart: `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="m18.03 59.01v-21.41h8v21.41"/>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="m45.97 59.01v-14.62h8v14.62"/>
      <line x1="12.75" x2="28.49" y1="31.28" y2="31.28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      <line x1="43.51" x2="59.45" y1="40.82" y2="40.82" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      <line x1="57.48" x2="59.17" y1="50.37" y2="50.37" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      <rect x="12.05" y="12.05" width="47.9" height="47.9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="m32 59.01v-37.28h8v37.28"/>
      <line x1="12.39" x2="14.52" y1="40.82" y2="40.82" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      <line x1="12.39" x2="14.52" y1="50.37" y2="50.37" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      <line x1="43.51" x2="59.45" y1="31.28" y2="31.28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      <line x1="43.51" x2="59.45" y1="21.74" y2="21.74" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      <line x1="12.75" x2="28.49" y1="21.74" y2="21.74" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
    </g>
  </svg>`,
  
  refresh: `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M20.7713,30.421l-3.7092,4.0991c0.6829-7.7072,5.6421-14.3554,12.9628-17.0134c2.1314-0.774,4.3519-1.1663,6.5997-1.1663 c5.4828,0,10.7603,2.375,14.4775,6.5161l0.61,0.6795l3.8565-3.6084l-0.61-0.6795C50.2532,14.0063,43.5725,11,36.6282,11 c-2.8472,0-5.6591,0.4963-8.3556,1.4755C19.0651,15.819,12.7121,24.3037,11.8404,34.059L8.549,30.421L5.205,33.5375l9.4546,10.4502 l9.4537-10.4493L20.7713,30.421z"/>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M67,38.3473l-9.4546-10.4502l-9.4537,10.4493l3.3421,3.1174l3.6932-4.0815c-0.6491,7.749-5.6209,14.4422-12.9728,17.1119 c-2.1306,0.7731-4.3501,1.1654-6.5997,1.1654c-5.4828,0-10.7603-2.375-14.4775-6.5157l-0.61-0.6795l-3.8565,3.6079l0.61,0.6795 C21.925,57.9933,28.6066,61,35.5509,61c2.8481,0,5.6591-0.4968,8.3556-1.475c9.2481-3.3574,15.6194-11.9025,16.4463-21.7122 l3.3032,3.6511L67,38.3473z"/>
    </g>
  </svg>`,
  
  home: `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
    <g>
      <rect x="25" y="40" width="9" height="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      <rect x="40" y="40" width="8" height="7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      <polygon fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" points="53,32 19,32.0003 19,31 35,15 53,31"/>
      <rect x="19" y="32" width="34" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      <polygon fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" points="29,21 24,26 24,17 29,17"/>
    </g>
  </svg>`,
  
  books: `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
    <g>
      <polygon fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" points="37.638 16 60.944 22.603 37.638 29.255 15.044 22.627 37.638 16"/>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.08,22.6425a4.4,4.4,0,0,0-.4554,8.4813l23.0141,6.713,23.3057-6.6516"/>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.08,31.2942a4.4,4.4,0,0,0-.4554,8.4813l23.0141,6.713,23.3057-6.6516"/>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.08,40.04a4.4,4.4,0,0,0-.4554,8.4813l23.0141,6.713,23.3057-6.6516"/>
    </g>
  </svg>`,
  
  brain: `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
    <g>
      <line x1="16" x2="25.875" y1="35" y2="35" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M25.875,35c3.4167,0,4.75-2.9167,4.75-6.1667"/>
      <line x1="16" x2="19.75" y1="45.5" y2="45.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      <line x1="35.2997" x2="35.2997" y1="45.5" y2="39.4375" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M35.2997,39.4375c0-2.2455,1.2003-5.25,5.0756-5.25"/>
      <line x1="58.4583" x2="49.875" y1="34.5417" y2="34.5417" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M40.375,45.5c0,0,0.1642,10.5-7.9583,10.5H16c-7.2083,0-7.6667-10.5,0-10.5C8.7917,45.5,8.3333,35,16,35 c-8.1667-7.25,1.875-13.5625,6.5-8.6875c-4.799-6.625,5.375-10.3125,8.875-5C30.9627,16,36.2222,15.0417,41.1003,19.024 l-0.4336,0.351c2.375-2.375,10.1776-1.0833,10.1776,5.3141l-2.2192,1.6234c6.8646-6.8646,14.2083,4.1875,8.5,8.2292h1.3333 c4.75,0,5.2917,10.9583-1.3333,10.9583H29.2917"/>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M40.6667,19.375c-2.4167,2.4167-0.2822,3.1782-4.2707,7.1667"/>
    </g>
  </svg>`,

  share: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="18" cy="5" r="3"/>
      <circle cx="6" cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </g>
  </svg>`,

  close: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </g>
  </svg>`,

  copy: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </g>
  </svg>`,

  check: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 6L9 17l-5-5"/>
    </g>
  </svg>`
};

export default function SvgIcon({ name, size = 24, className = '' }: SvgIconProps) {
  const icon = svgIcons[name];
  
  if (!icon) {
    return null;
  }

  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: icon }}
    />
  );
}