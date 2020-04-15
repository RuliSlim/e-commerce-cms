let config;

if (process.env.NODE_ENV === "production") {
  config = {
    $api_url: "https://kanban-alan.herokuapp.com",
  };
} else {
  config = {
    $api_url: "http://localhost:3000",
  };
}

export { config }