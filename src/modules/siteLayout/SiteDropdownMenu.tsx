import { MenuOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';

const MenuButton = styled(Button)`
  position: fixed;
  bottom: 40px;
  right: 40px;
`;

const menuItems: MenuProps['items'] = [
  {
    label: <Link href={{ pathname: '/' }}>Christmas</Link>,
    key: 'christmas',
  },
  {
    label: (
      <Link href={{ pathname: '/valentines-day' }}>Valentine&apos;s Day</Link>
    ),
    key: 'valentines',
  },
  {
    label: <Link href={{ pathname: '/halloween' }}>Halloween</Link>,
    key: 'halloween',
  },
  {
    label: <Link href={{ pathname: '/create' }}>Custom</Link>,
    key: 'custom',
  },
];

export function SiteDropdownMenu(): JSX.Element {
  return (
    <Dropdown menu={{ items: menuItems }} trigger={['click']}>
      <MenuButton icon={<MenuOutlined />} shape="circle" size="large" />
    </Dropdown>
  );
}
