function InstaractorLogout() {
  localStorage.removeItem('instructorLoginStatus');
  window.location.href = '/instructor-login';
  return <div></div>;
}

export default InstaractorLogout;
