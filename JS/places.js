const url = "https://65575798bd4bcef8b6127831.mockapi.io/places";

async function postData(url) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        placeName: "فندق بريرا النخيل",
        location: { lat: 24.770301939825114, lng: 46.71512273087495 }, //,
        category: "فندق",
        placeImages: {
          img: "https://lh3.googleusercontent.com/p/AF1QipNdCLHDJsHFi5df_DqxouVzr-0S3nqgMu90OGxF=s0",
          img2: "https://lh3.googleusercontent.com/p/AF1QipMSZVrgAKb3L_7BKGbEPq2RvXofmhOm4AGxm9ix=s0",
          img3: "https://lh3.googleusercontent.com/p/AF1QipPc3MAdzRAfwD8p5hWjFoFTDnDyOwkwBB633kCP=s0",
        },
        services: {
          toilets: true,
          parking: true,
          ramps: true,
          autoDoors: true,
          tables: true,
          elevators: true,
        },
      }),
    });
    return await response.json();
  } catch (error) {
    return console.error("Error:", error);
  }
}
