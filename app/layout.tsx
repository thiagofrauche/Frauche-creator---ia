const themeInit = `
try {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") document.documentElement.classList.add('dark');
} catch(e){}
`;
