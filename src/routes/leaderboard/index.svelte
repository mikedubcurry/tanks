<script context="module" lang="ts">
import type { Handle, Load } from "@sveltejs/kit";


    export const load: Load = async ({fetch}) => {
        const response = await fetch('/leaderboard/scores');
        const scores = await response.json();
        return {
            props: scores,
        }
    }
</script>
<script lang="ts">
    export let scores;
    console.log(scores);
    
</script>

<h2>Leaderboard</h2>

{#each scores as score}
    <div class="score">
        <p>{score.game}</p>
        <p>{score.initials}</p>
        <p>{score.score}</p>
    </div>
{/each}