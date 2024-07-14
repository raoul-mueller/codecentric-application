// create a personal access token here: https://github.com/settings/tokens
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) throw new Error('GITHUB_TOKEN environment variable must be a string');

/** A user as returned from the GitHub rest api. */
type User = {
  /** The user's username. */
  login: string;
  // ...
};

/** A repo as returned from the GitHub rest api. */
type Repo = {
  /** The repo's name. */
  name: string;
  // ...
};

/**
 * Create the octokit client on demand.
 */
const getOctokit = async () => new (await import('@octokit/rest')).Octokit({ auth: GITHUB_TOKEN });

/**
 * Fetch members of an org from GitHub rest api.
 *
 * @param org The org's name, e.g. codecentric.
 */
const fetchMembersOfOrg = async (org: string): Promise<User[]> => {
  const octokit = await getOctokit();
  return (await octokit.orgs.listMembers({ org })).data;
};

/**
 * Fetch repos owned by a user from GitHub rest api.
 *
 * @param username The user's username (login).
 */
const fetchReposOfUser = async (username: string): Promise<Repo[]> => {
  const octokit = await getOctokit();
  return (await octokit.repos.listForUser({ username })).data;
};

/**
 * Fetch languages used in a repo from GitHub rest api.
 *
 * @param owner The repo's owner's username (login).
 * @param repo The repo's name.
 */
const fetchLanguagesOfRepo = async (owner: string, repo: string): Promise<string[]> => {
  const octokit = await getOctokit();
  return Object.keys((await octokit.repos.listLanguages({ owner, repo })).data);
};

/**
 * Fetch all members of an org from GitHub rest url.
 * For those members, fetch all repos owned by the members.
 * For those repos, fetch all languages used in the repos.
 *
 * Returns a record, where the keys are the members' usernames, and the values are the languages used in the repos owned by the members.
 *
 * @param org The org name, e.g. codecentric.
 */
const fetchLanguagesByMemberOfOrg = async (org: string): Promise<Record<string, string[]>> => {
  // fetch all members
  const members = (await fetchMembersOfOrg(org)).sort((a, b) => a.login.localeCompare(b.login));

  // fetch repos owned by the members
  const reposByMembers: Record<string, string[]> = {};
  await Promise.all(
    members.map(async (member) => {
      const reposOfMember = await fetchReposOfUser(member.login);

      reposByMembers[member.login] = reposOfMember.map((repo) => repo.name);
    })
  );

  // fetch languages used in the repos owned by the members
  const languagesByMember: Record<string, string[]> = {};
  await Promise.all(
    Object.entries(reposByMembers).map(async ([member, repos]) => {
      const nonUniqueLanguages = await Promise.all(repos.map((repo) => fetchLanguagesOfRepo(member, repo)));

      languagesByMember[member] = Array.from(new Set(...nonUniqueLanguages)).sort();
    })
  );

  return languagesByMember;
};

const main = async () => {
  // get languages by member
  const languagesByMember = await fetchLanguagesByMemberOfOrg('codecentric');

  // filter for users that know scala
  const membersThatKnowScala = Object.keys(languagesByMember)
    .filter((member) => languagesByMember[member].includes('Scala'))
    .sort();

  console.log(membersThatKnowScala);
};

void main();
