'use client'
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number | string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
                                            name,
                                            size = 24,
                                            fill = 'currentColor',
                                            stroke = 'none',
                                            strokeWidth = 1,
                                            className = '',
                                            ...props
                                          }) => (
  <svg
    width={size}
    height={size}
    className={`icon ${className}`}
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <use xlinkHref={`/symbol/sprite.svg#${name}`} />
  </svg>
);