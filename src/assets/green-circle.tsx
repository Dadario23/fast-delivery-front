import React from "react";

export const GreenCircle = ({ percentage }: { percentage: string }) => {
  return (
    <svg
      width="71"
      height="77"
      viewBox="0 0 71 77"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 35.5C3 17.5507 17.5507 3 35.5 3C53.4493 3.00001 68 17.5508 68 35.5C68 53.4493 53.4493 68 35.5 68C17.5507 68 2.99999 53.4492 3 35.5Z"
        stroke="#626262"
        stroke-opacity="0.1"
        stroke-width="6"
      />
      <path
        d="M35.5 3C53.4493 3.00001 68 17.5508 68 35.5C68 53.4493 53.4493 68 35.5 68"
        stroke="url(#gradient_green)"
        stroke-width="6"
      />
      <g filter="url(#filter0_d_3_4092)">
        <circle
          cx="5.5"
          cy="5.5"
          r="5.5"
          transform="matrix(1 0 0 -1 26 73)"
          fill="#00EA77"
        />
      </g>
      <text
        x="36"
        y="40"
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="#3d1df3"
        fontSize="16px"
        color="#3d1df3"
        fontWeight="600"
      >
        <tspan className="font-semibold">{percentage}</tspan>
      </text>
      <defs>
        <filter
          id="filter0_d_3_4092"
          x="24"
          y="62"
          width="15"
          height="15"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3_4092"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3_4092"
            result="shape"
          />
        </filter>
        <radialGradient
          id="paint0_angular_3_4092"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(35.5 35.5) rotate(-90) scale(32.5 32.5)"
        >
          <stop stop-color="#C7FFB1" />
          <stop offset="1" stop-color="#00EA77" />
        </radialGradient>
        <linearGradient
          id="gradient_green"
          x1="70%"
          y1="-50%"
          x2="-60%"
          y2="-20%"
        >
          <stop offset="0%" style={{ stopColor: "#C7FFB1", stopOpacity: 1 }} />
          {/* <stop offset="40%" style={{ stopColor: "#C7FFB1", stopOpacity: 1 }} /> */}
          <stop offset="90%" style={{ stopColor: "#00EA77", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
  );
};
export const FullCircle = ({ percentage }: { percentage: string }) => {
  return (
    <svg
      width="71"
      height="71"
      viewBox="0 0 71 71"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 35.5C3 17.5507 17.5507 3 35.5 3C53.4493 3.00001 68 17.5508 68 35.5C68 53.4493 53.4493 68 35.5 68C17.5507 68 2.99999 53.4492 3 35.5Z"
        stroke="url(#paint0_angular_3_4097)"
        stroke-opacity="0.6"
        stroke-width="6"
      />
      <g filter="url(#filter0_d_3_3974)">
        <circle
          cx="5.5"
          cy="-5.5" // Cambiado a un valor negativo para subir el círculo
          r="5.5"
          transform="matrix(1 0 0 -1 5.00001 -14)" // Ajusta el valor de la transformación según tus necesidades
          fill="#00EA77"
        />
      </g>
      <defs>
        <radialGradient
          id="paint0_angular_3_4097"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(35.5 35.5) rotate(-90) scale(35.5 35.5)"
        >
          <stop stop-color="#C7FFB1" />
          <stop offset="1" stop-color="#00EA77" />
        </radialGradient>
      </defs>

      <text
        x="36"
        y="40"
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="#3d1df3"
        fontSize="16px"
        color="#3d1df3"
        fontWeight="600"
      >
        <tspan className="font-semibold">{percentage}</tspan>
      </text>
    </svg>
  );
};

export const Circle80 = ({ percentage }: { percentage: string }) => {
  return (
    <svg
      width="71"
      height="71"
      viewBox="0 0 71 71"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 35.5C3 17.5507 17.5507 3 35.5 3C53.4493 3.00001 68 17.5508 68 35.5C68 53.4493 53.4493 68 35.5 68C17.5507 68 2.99999 53.4492 3 35.5Z"
        stroke="#626262"
        stroke-opacity="0.1"
        stroke-width="6"
      />
      <path
        d="M35.5 3C53.4493 3.00001 68 17.5508 68 35.5C68 53.4493 53.4493 68 35.5 68C17.5507 68 2.99999 53.4492 3 35.5C3 28.7089 5.08293 22.4043 8.64478 17.1901"
        stroke="url(#gradient_green)"
        stroke-width="6"
      />
      <g filter="url(#filter0_d_3_3974)">
        <circle
          cx="5.5"
          cy="5.5"
          r="5.5"
          transform="matrix(1 0 0 -1 5.00001 21)"
          fill="#00EA77"
        />
      </g>
      <text
        x="36"
        y="40"
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="#3d1df3"
        fontSize="16px"
        color="#3d1df3"
        fontWeight="600"
      >
        <tspan className="font-semibold">{percentage}</tspan>
      </text>
      <defs>
        <filter
          id="filter0_d_3_3974"
          x="3.00001"
          y="10"
          width="15"
          height="15"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3_3974"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3_3974"
            result="shape"
          />
        </filter>
        <radialGradient
          id="paint0_angular_3_3974"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(35.5 35.5) rotate(-90) scale(32.5 32.5)"
        >
          <stop stop-color="#C7FFB1" />
          <stop offset="1" stop-color="#00EA77" />
        </radialGradient>
        <linearGradient
          id="gradient_green"
          x1="80%"
          y1="-20%"
          x2="-20%"
          y2="-20%"
        >
          <stop offset="0%" style={{ stopColor: "#C7FFB1", stopOpacity: 1 }} />
          <stop offset="40%" style={{ stopColor: "#C7FFB1", stopOpacity: 1 }} />
          <stop offset="90%" style={{ stopColor: "#00EA77", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
  );
};
export const Circle20 = ({ percentage }: { percentage: any }) => {
  const strokeWidth = 6;
  const radius = 30; // la mitad del ancho y alto del viewBox

  // Calcular el ángulo correspondiente al porcentaje dado
  const angle = (percentage / 100) * 360;

  return (
    <svg
      width="71"
      height="71"
      viewBox="0 0 71 71"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 35.5C3 17.5507 17.5507 3 35.5 3C53.4493 3.00001 68 17.5508 68 35.5C68 53.4493 53.4493 68 35.5 68C17.5507 68 2.99999 53.4492 3 35.5Z"
        stroke="#626262"
        stroke-opacity="0.1"
        stroke-width="6"
      />
      <path
        d="M35.5 3C53.4493 3.00001 68 17.5508 68 35.5C68 53.4493 53.4493 68 35.5 68C17.5507 68 2.99999 53.4492 3 35.5C3 28.7089 5.08293 22.4043 8.64478 17.1901"
        stroke="url(#paint0_angular_3_3974)"
        stroke-width="6"
      />
      <g filter="url(#filter0_d_3_3974)">
        <circle
          cx="5.5"
          cy="5.5"
          r="5.5"
          transform="matrix(1 0 0 -1 5.00001 21)"
          fill="#00EA77"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_3_3974"
          x="3.00001"
          y="10"
          width="15"
          height="15"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3_3974"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3_3974"
            result="shape"
          />
        </filter>
        <radialGradient
          id="paint0_angular_3_3974"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(35.5 35.5) rotate(-90) scale(32.5 32.5)"
        >
          <stop stop-color="#C7FFB1" />
          <stop offset="1" stop-color="#00EA77" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export const Circle0 = ({ percentage }: { percentage: any }) => {
  return (
    <svg
      width="71"
      height="71"
      viewBox="0 0 71 71"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 35.5C3 17.5507 17.5507 3 35.5 3C53.4493 3.00001 68 17.5508 68 35.5C68 53.4493 53.4493 68 35.5 68C17.5507 68 2.99999 53.4492 3 35.5Z"
        stroke="#626262"
        stroke-opacity="0.1"
        stroke-width="6"
      />
      <text
        x="36"
        y="40"
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="#3d1df3"
        fontSize="16px"
        color="#3d1df3"
        fontWeight="600"
      >
        <tspan className="font-semibold">{percentage}</tspan>
      </text>
    </svg>
  );
};
