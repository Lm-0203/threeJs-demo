export const fetchHeros = async () => {
  const res = await fetch("https://study.duyiedu.com/api/herolist");
  return res.json();
};
