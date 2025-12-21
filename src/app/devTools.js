export function isDev() {
  try {
    return new URLSearchParams(window.location.search).get('dev') === '1';
  } catch {
    return false;
  }
}

export function resetDemoSession() {
  // Group/session data
  localStorage.removeItem('cbsgo_group_counts_v1');
  localStorage.removeItem('cbsgo_group_roles_v1');

  // Progress (XP/completed)
  localStorage.removeItem('cbsgo_state_v1');

  // This tab id
  sessionStorage.removeItem('cbsgo_tab_id_v1');

  // Reload clean
  window.location.reload();
}
