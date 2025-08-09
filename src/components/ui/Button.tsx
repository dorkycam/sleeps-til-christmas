'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { tokens } from '@/lib/themes/tokens';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
}

const buttonSizes = {
  sm: {
    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    fontSize: tokens.fontSize.sm,
  },
  md: {
    padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
    fontSize: tokens.fontSize.base,
  },
  lg: {
    padding: `${tokens.spacing.lg} ${tokens.spacing.xl}`,
    fontSize: tokens.fontSize.xl,
  },
};

const buttonVariants = {
  primary: {
    background: '#007bff',
    color: '#ffffff',
    border: '1px solid #007bff',
    '&:hover': {
      background: '#0056b3',
      border: '1px solid #0056b3',
    },
  },
  secondary: {
    background: '#e9e9e9',
    color: '#000000',
    border: '1px solid #e9e9e9',
    '&:hover': {
      background: '#d6d6d6',
      border: '1px solid #d6d6d6',
    },
  },
  ghost: {
    background: 'transparent',
    color: '#007bff',
    border: '1px solid #007bff',
    '&:hover': {
      background: '#007bff',
      color: '#ffffff',
    },
  },
};

const BaseButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${tokens.borderRadius.lg};
  font-weight: ${tokens.fontWeight.bold};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${props => {
    const variant = buttonVariants[props.variant || 'primary'];
    const size = buttonSizes[props.size || 'md'];

    return `
      background: ${variant.background};
      color: ${variant.color};
      border: ${variant.border};
      padding: ${size.padding};
      font-size: ${size.fontSize};
    `;
  }}

  width: ${props => (props.fullWidth ? '100%' : 'auto')};

  &:hover {
    ${props => {
      const variant = buttonVariants[props.variant || 'primary'];
      return variant['&:hover']
        ? `
        background: ${variant['&:hover'].background};
        color: ${variant['&:hover'].color || variant.color};
        border: ${variant['&:hover'].border || variant.border};
      `
        : '';
    }}
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (min-width: ${tokens.breakpoints.md}) {
    margin: 0 ${tokens.spacing.sm};
  }
`;

export const Button = BaseButton;

export const ButtonLink = styled(Link)<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${tokens.borderRadius.lg};
  font-weight: ${tokens.fontWeight.bold};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${props => {
    const variant = buttonVariants[props.variant || 'secondary'];
    const size = buttonSizes[props.size || 'lg'];

    return `
      background: ${variant.background};
      color: ${variant.color};
      border: ${variant.border};
      padding: ${size.padding};
      font-size: ${size.fontSize};
    `;
  }}

  width: ${props => (props.fullWidth ? '100%' : 'auto')};
  margin: ${tokens.spacing.sm} 0;

  &:hover {
    ${props => {
      const variant = buttonVariants[props.variant || 'secondary'];
      return variant['&:hover']
        ? `
        background: ${variant['&:hover'].background};
        color: ${variant['&:hover'].color || variant.color};
        border: ${variant['&:hover'].border || variant.border};
      `
        : '';
    }}
  }

  @media (min-width: ${tokens.breakpoints.md}) {
    margin: 0 ${tokens.spacing.sm};
  }
`;
