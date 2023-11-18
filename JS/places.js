const url = "https://655895c4e93ca47020a97c19.mockapi.io/comments";
 
async function postData(url) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        placeId: 2,
        userId: 1,
        ratingValue: 3,
        commentBody:
          "اكبر حديقة في حي الروضه. واسعه مليئه بالاشجار والمسطحات الخضراء منعش التمشي بها صباحا. ومناسبة جدا لذوي الإعاقة ومتوفرة جميع الخدمات",
      }),
    });
    return await response.json();
  } catch (error) {
    return console.error("Error:", error);
  }
}
