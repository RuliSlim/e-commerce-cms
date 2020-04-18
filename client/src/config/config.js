let config;

if (process.env.NODE_ENV === "production") {
  config = {
    $url: "",
  };
} else {
  config = {
    $url: "http://localhost:3000",
  };
}

export { config }