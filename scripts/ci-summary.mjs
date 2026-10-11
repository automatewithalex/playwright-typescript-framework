import { appendFileSync, readFileSync } from 'node:fs';

const report = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const { expected, unexpected, flaky, skipped, duration } = report.stats;

const testsWithStatus = (status) =>
  report.suites
    .flatMap(function collect(suite) {
      return [
        ...(suite.specs ?? []).map((spec) => ({ spec, file: suite.file })),
        ...(suite.suites ?? []).flatMap(collect),
      ];
    })
    .flatMap(({ spec, file }) =>
      spec.tests.filter((t) => t.status === status).map((t) => `${file} › ${spec.title} [${t.projectName}]`),
    );

const list = (title, items) =>
  items.length ? `\n### ${title}\n${items.map((i) => `- ${i}`).join('\n')}\n` : '';

const summary = `## Test results

| Passed | Failed | Flaky | Skipped | Duration |
|---|---|---|---|---|
| ${expected} | ${unexpected} | ${flaky} | ${skipped} | ${Math.round(duration / 1000)}s |
${list('Failed', testsWithStatus('unexpected'))}${list('Flaky (passed on retry)', testsWithStatus('flaky'))}`;

appendFileSync(process.env.GITHUB_STEP_SUMMARY ?? '/dev/stdout', summary);
