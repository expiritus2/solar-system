/* eslint-disable */
const ghpages = require('gh-pages');

ghpages.publish('dist', {
  branch: 'master',
  repo: 'git@expiritus2.github.com:expiritus2/solar-system.git',
}, (err) => {
  if(err) { console.log(err) }
  else { console.log('Deploy is successfull'); }
});
