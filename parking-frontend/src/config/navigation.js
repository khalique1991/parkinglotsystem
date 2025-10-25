// navigation.js
export const Navigation = [
  { key: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: '📊', roles: ['ADMIN','OPERATOR'] },
  { key: 'parking-spaces', label: 'Parking Spaces', path: '/parking', icon: '🅿️', roles: ['ADMIN','OPERATOR'] },
  { key: 'vehicles', label: 'Vehicles', path: '/vehicles', icon: '🚗', roles: ['ADMIN','OPERATOR'] },
  { key: 'customers', label: 'Customers', path: '/customers', icon: '👤', roles: ['ADMIN','OPERATOR'] },
  { key: 'bookings', label: 'Bookings', path: '/sessions', icon: '📆', roles: ['ADMIN','OPERATOR'] },
  { key: 'payments', label: 'Payments', path: '/payments', icon: '💳', roles: ['ADMIN','OPERATOR'] },
  { key: 'reports', label: 'Reports', path: '/reports', icon: '📈', roles: ['ADMIN'] },
  { key: 'users', label: 'Users', path: '/users', icon: '👥', roles: ['ADMIN'] },
  { key: 'notifications', label: 'Notifications', path: '/notifications', icon: '🔔', roles: ['ADMIN','OPERATOR'] },
  { key: 'tickets', label: 'Tickets', path: '/tickets', icon: '🎫', roles: ['ADMIN','OPERATOR'] },
  { key: 'create-ticket', label: 'Create Ticket', path: '/tickets/create', icon: '➕', roles: ['OPERATOR'] }
];
