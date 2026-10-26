// Snapshots the signed-in `gh` user's contribution calendar into
// content/github-activity.json, so the About page needs no runtime call to a
// third-party API. Run: node scripts/update-github-activity.mjs
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const query = `query {
  viewer {
    login
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { color contributionCount contributionLevel date } }
      }
    }
  }
}`;

const raw = execFileSync("gh", ["api", "graphql", "-f", `query=${query}`], {
  encoding: "utf8",
});
const { viewer } = JSON.parse(raw).data;
const calendar = viewer.contributionsCollection.contributionCalendar;

const snapshot = {
  contributions: calendar.weeks.map((week) => week.contributionDays),
  login: viewer.login,
  totalContributions: calendar.totalContributions,
  updatedAt: new Date().toISOString().slice(0, 10),
};

const target = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "content",
  "github-activity.json",
);
writeFileSync(target, `${JSON.stringify(snapshot)}\n`);
console.log(
  `wrote ${snapshot.totalContributions} contributions for ${snapshot.login} (${snapshot.updatedAt})`,
);
