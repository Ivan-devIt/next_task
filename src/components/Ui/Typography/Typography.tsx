import { E_TagVariant } from '@/types';
import React from 'react';

interface TypographyProps<T extends React.ElementType> {
  children: React.ReactNode;
  tag?: T;
  className?: string;
}

export const Typography = <T extends React.ElementType>({
  children,
  tag,
  className = ''
}: TypographyProps<T>) => {
  const Tag = tag || E_TagVariant.p;

  const classes = (() => {
    switch (String(tag)) {
      case String(E_TagVariant.h3):
        return 'font-semibold text-xl';
      default:
        return 'text-base';
    }
  })();

  const preparedClasses = `${classes} ${className}`;

  return <Tag className={preparedClasses}>{children}</Tag>;
};
