// Demo notifications shared by the NotificationsPanel stories and the sample-screen shell.
import type { NotificationItem } from '../components/NotificationsPanel';

export const demoNotifications: NotificationItem[] = [
  { id: 'n1', group: 'Today', tone: 'error', unread: true, time: '12:19 AM', source: 'System', title: 'SLA breached: complaint EC-20260813-0007', body: 'The complaint assigned to you passed its expected resolution date. Reassign it or update the customer.' },
  { id: 'n2', group: 'Today', tone: 'warning', unread: true, time: '9:42 AM', source: 'Payroll', title: 'November payroll is waiting for your approval', body: 'HR approved the run for 54 employees. Review and approve it before 25 Nov to pay on time.' },
  { id: 'n3', group: 'Today', tone: 'success', unread: true, time: '8:05 AM', source: 'Sales', title: 'Invoice INV-0142 was paid', body: 'Northwind Foods paid ₦1,250,000 by bank transfer.' },
  { id: 'n4', group: 'Yesterday', tone: 'info', time: '4:30 PM', source: 'Chidi Okafor', title: 'Chidi Okafor shared a report with you', body: 'Q3 expense summary by department.' },
  { id: 'n5', group: 'Yesterday', tone: 'error', time: '12:15 AM', source: 'System', title: 'SLA breached: complaint EC-20260812-0003', body: 'The complaint assigned to you passed its expected resolution date.' },
  { id: 'n6', group: 'Earlier', tone: 'info', time: 'Sun, 10:11 AM', source: 'System', title: 'Scheduled maintenance on Saturday', body: 'wBizManager will be unavailable from 1:00 to 2:00 AM.' },
];
