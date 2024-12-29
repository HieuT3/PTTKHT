const fetchPhones = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.log(res.statusText);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching phones:", error);
    return null;
  }
};

export default fetchPhones;
