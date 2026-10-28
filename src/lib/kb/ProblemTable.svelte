<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { problemsIn, type Problem } from '#lib/kb/problems';
  import { tenantOf } from '#lib/kb/locales';

  // tickets: problem → link to the ticket filed for it.
  let { ticket, tickets }: { ticket: number; tickets: Partial<Record<Problem, { label: string; href: string }>> } = $props();

  const LABEL: Record<Problem, string> = {
    parser: 'shared parser reads dates month first',
    hint: 'booking-v3 form hints MM/DD/YYYY',
    shift: 'date moves by one day',
    unplaced: 'no cause found',
  };

  const result = $derived(problemsIn(reports as never, ticket, tenantOf, notes.oneDayMove));
</script>

<p class="sum">
  <strong>{result.unique}</strong> reports in #{ticket} ({result.rows - result.unique} rows exported twice, counted once) ·
  <strong>{result.groups.length}</strong> {result.groups.length === 1 ? 'problem' : 'problems'}
</p>

<table>
  <thead>
    <tr><th>problem</th><th>reports</th><th>tenants</th><th>way in</th><th>seen</th><th>ticket</th></tr>
  </thead>
  <tbody>
    {#each result.groups as g (g.problem)}
      <tr>
        <td><code>{g.problem}</code> {LABEL[g.problem]}</td>
        <td>{g.reports.length}</td>
        <td>{g.tenants}</td>
        <td>{g.channels.join(', ')}</td>
        <td>{g.firstSeen} → {g.lastSeen}</td>
        <td>{#if tickets[g.problem]}<a href={tickets[g.problem]?.href}>{tickets[g.problem]?.label}</a>{:else}none{/if}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .sum { font-size: 1.1rem; }
</style>
