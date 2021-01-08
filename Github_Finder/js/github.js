class Github {
  constructor() {
    this.clientID = 'ce0cfa50e8ae6b2ce93c';
    this.clientSecret = '630f789d5a7094770b271315bedf75f7cd6aad84';
    this.reposCount = 5;
    this.reposSort = 'created: asc';
  }

  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?clientID=${this.clientID}&clientSecret=${this.clientSecret}`);
    const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.reposCount}&sort=${this.reposSort}&clientID=${this.clientID}&clientSecret=${this.clientSecret}`);

    const profile = await profileResponse.json();
    const repos = await reposResponse.json();

    return { profile, repos }
  }
}