'use client';

import { Typography, Button, Flex, Space } from 'antd';
import { HomeOutlined, HeartOutlined, SmileOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styled from 'styled-components';
import { SafePageContainer } from '@/components/layout/SafePageContainer';
import { getAllHolidaySlugs, getHolidayBySlug } from '@/lib/holidays';
import { holidayThemes } from '@/lib/themes/tokens';
import { minTablet, minTabletLarge } from '@/styles/mediaQueries';

const { Title, Text } = Typography;

// Simple icon mapping
const getIcon = (iconName: string) => {
  const icons = {
    home: HomeOutlined,
    heart: HeartOutlined,
    smile: SmileOutlined,
  };
  return icons[iconName as keyof typeof icons] || HomeOutlined;
};

// Clean styled components
const ErrorNumber = styled(Title)`
  font-size: 80px !important;
  font-weight: 800 !important;
  color: #4a5568 !important;
  margin: 0 !important;
  line-height: 1 !important;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

  @media ${minTablet} {
    font-size: 120px !important;
  }

  @media ${minTabletLarge} {
    font-size: 180px !important;
  }
`;

const ErrorMessage = styled(Title)`
  font-size: 18px !important;
  font-weight: 600 !important;
  color: #2d3748 !important;
  margin: 0 0 12px 0 !important;

  @media ${minTablet} {
    font-size: 24px !important;
    margin: 0 0 16px 0 !important;
  }

  @media ${minTabletLarge} {
    font-size: 32px !important;
  }
`;

const Description = styled(Text)`
  font-size: 14px !important;
  color: #4a5568 !important;
  margin-bottom: 24px !important;
  text-align: center !important;
  line-height: 1.4 !important;

  @media ${minTablet} {
    font-size: 16px !important;
    margin-bottom: 32px !important;
  }

  @media ${minTabletLarge} {
    font-size: 18px !important;
  }
`;

const HolidayButton = styled(Button)<{ $theme: string; $isPrimary: boolean }>`
  height: 40px !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  border-radius: 8px !important;
  min-width: 140px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
  transition: all 0.3s ease !important;

  @media ${minTablet} {
    height: 48px !important;
    font-size: 16px !important;
    min-width: 180px !important;
  }

  ${({ $theme, $isPrimary }) => {
    const colors = holidayThemes[$theme as keyof typeof holidayThemes];
    if ($isPrimary) {
      return `
        background-color: ${colors.primary} !important;
        border-color: ${colors.primary} !important;
        color: ${colors.background === colors.primary ? colors.text : colors.background} !important;
        &:hover {
          background-color: ${colors.secondary} !important;
          border-color: ${colors.secondary} !important;
        }
      `;
    } else {
      return `
        background-color: white !important;
        border-color: ${colors.primary} !important;
        color: ${colors.primary} !important;
        &:hover {
          background-color: ${colors.primary} !important;
          color: white !important;
        }
      `;
    }
  }}
`;

/**
 * 404 Not Found Page
 *
 * Simple, clean implementation following Next.js best practices.
 * Uses responsive design with styled-components and Ant Design.
 */
export function NotFoundPage() {
  return (
    <SafePageContainer background="linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)">
      <Flex
        vertical
        justify="center"
        align="center"
        style={{ height: '100%', textAlign: 'center', gap: '24px' }}
      >
        <Space direction="vertical" size={16} align="center">
          <ErrorNumber level={1}>404</ErrorNumber>
          <ErrorMessage level={2}>Oops! Page not found</ErrorMessage>
          <Description>
            The page you&apos;re looking for seems to have wandered off into the
            holiday spirit.
            <br />
            Let&apos;s get you back to celebrating!
          </Description>
        </Space>

        <Space direction="vertical" size={16} align="center">
          <Text
            style={{ fontSize: '16px', color: '#4a5568', marginBottom: '8px' }}
          >
            Try one of these festive destinations:
          </Text>

          <Space direction="vertical" size={12} align="center">
            {getAllHolidaySlugs().map(slug => {
              const holiday = getHolidayBySlug(slug)!;
              const IconComponent = getIcon(holiday.iconName);
              const isChristmas = slug === 'christmas';
              const href = isChristmas ? '/' : `/${slug}`;

              return (
                <Link key={slug} href={href} style={{ textDecoration: 'none' }}>
                  <HolidayButton
                    type={isChristmas ? 'primary' : 'default'}
                    icon={<IconComponent />}
                    $theme={holiday.theme}
                    $isPrimary={isChristmas}
                  >
                    {holiday.name.toLowerCase()}
                  </HolidayButton>
                </Link>
              );
            })}
          </Space>
        </Space>
      </Flex>
    </SafePageContainer>
  );
}
