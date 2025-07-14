export const RESTRICTED_KEYWORDS = [
  'pricing', 'templates', 'about', 'contact', 'login', 'signup', 'register',
  'dashboard', 'admin', 'api', 'docs', 'help', 'support', 'terms', 'privacy',
  'blog', 'home', 'index', 'www', 'mail', 'email', 'ftp', 'root', 'user',
  'test', 'demo', 'example', 'sample', 'null', 'undefined', 'true', 'false',
  'app', 'application', 'system', 'config', 'settings', 'error', 'delete', 'remove',
];


export function isRestrictedKeyword(id: string): boolean {
  const lowercaseId = id.toLowerCase();
  return RESTRICTED_KEYWORDS.some(keyword => 
    lowercaseId === keyword || 
    lowercaseId.includes(keyword)
  );
}
