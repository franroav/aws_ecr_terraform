const sonarqubeScanner = require("sonarqube-scanner");

sonarqubeScanner(
  {
    serverUrl: "http://localhost:9000",
    options: {
      // "sonar.projectKey": "your-project-key", // Add your project key
      "sonar.sources": "src",                // Set the source directory
      "sonar.inclusions": "**",              // Include all files in the src directory
    },
  },
  () => {
    console.log("SonarQube scan complete.");
  }
);


