module.exports = {
  reactStrictMode: true,
  output: 'export',
  env: {
    apiServer: "https://nsrapi.xyz/",
    // production api
    apiEndPoint: "https://nsrapi.xyz/nsr_wsb.php"
    //apiEndPoint: "https:bien.nceas.ucsb.edu/nsr/nsr_wsb.php",
    // development api
    // apiEndPoint: "http://vegbiendev.nceas.ucsb.edu:9875/gnrs_api.php",
    // apiEndPoint: "http://vegbiendev.nceas.ucsb.edu:9865/nsr_wsb.php",
  },
};
