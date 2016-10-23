function getRepos() {
  const req = new XMLHttpRequest()
  req.addEventListener('load', showRepos);
  req.open('GET', 'https://api.github.com/users/octocat/repos')
  req.send()
}

function showRepos(event, data) {
  const repos = JSON.parse(this.responseText);

  let repoList = `<ul>${
    repos.map(r => 
    "<li>" + 
    r.name + " | <a href='#' data-repo=" + r.name + " onclick='getCommits(this)'>see commits</a>"
    + "</li>").join("")
  }</ul>`
  document.querySelector("#repos").innerHTML = repoList
}

function getCommits(el) {
  var name = el.dataset.repo
  const req = new XMLHttpRequest();
  req.addEventListener('load', showCommits)
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}

function showCommits(event, data) {
  const commits = JSON.parse(this.responseText);

  let commitList = `<ul>${commits.map(commit => '<li><strong>' + commit.committer.login +
  '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.querySelector("#commits").innerHTML = commitList
}