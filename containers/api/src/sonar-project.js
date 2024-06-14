const sonarqubeScanner = require("sonarqube-scanner");

sonarqubeScanner(
  {
    serverUrl: "http://localhost:9000",
    token: "sqp_51f3ed6475105aa2f72e2ef4c6be37d456d4f8d4",
    options: {
      // "sonar.projectKey": "your-project-key", // Add your project key
      "sonar.sources": ".",                // Set the source directory
      "sonar.inclusions": "**",              // Include all files in the src directory
      'sonar.testExecutionReportPaths': 'report.xml',
      'sonar.projectKey': 'webkonce',
      'sonar.projectName': 'webkonce',
      // 'sonar.login' : 'admin',
      'sonar.sources':  '.',
      'sonar.tests':  '.',
      'sonar.inclusions'  :  'server.js', 
      'sonar.test.inclusions':  './test/routesTest.js',
      'sonar.javascript.lcov.reportPaths':  './coverage/lcov.info',
      'sonar.language': 'js', // Language of your project
      'sonar.sourceEncoding': 'UTF-8', // Encoding of your source files
      'sonar.dynamicAnalysis': 'reuseReports', // Analyze using existing reports
      'sonar.javascript.lcov.reportPaths': './coverage/lcov.info', // Path to the coverage report
      'sonar.exclusions': './node_modules/**'
    },
  },
  () => {
    console.log("SonarQube scan complete.");
  }
);

// const sonarqubeScanner = require("sonarqube-scanner");

// sonarqubeScanner(
//   {
//     serverUrl: "http://localhost:9000",
//     options: {
//       "sonar.sources": ".",
//       "sonar.inclusions": "src/**", // Entry point of your code
//     },
//   },
//   () => {}
// );
