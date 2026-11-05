import { Building2, CreditCard, House, KeyRound, Layers, Package, Settings2, Shield, Users } from 'lucide-react';
import type { NavItem } from './Sidebar';

/** The SSO portal's primary navigation, in order. */
export const SSO_NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <House />, href: '#dashboard' },
  { id: 'tenants', label: 'Tenants', icon: <Building2 />, href: '#tenants' },
  { id: 'entities', label: 'Entities', icon: <Layers />, href: '#entities' },
  { id: 'products', label: 'Products', icon: <Package />, href: '#products' },
  { id: 'users', label: 'Users', icon: <Users />, href: '#users' },
  { id: 'roles', label: 'Roles', icon: <Shield />, href: '#roles' },
  { id: 'approval-admin', label: 'Approval Admin', icon: <Settings2 />, href: '#approval-admin' },
  { id: 'subscriptions', label: 'Subscriptions', icon: <CreditCard />, href: '#subscriptions' },
  { id: 'sso-config', label: 'SSO Config', icon: <KeyRound />, href: '#sso-config' },
];
