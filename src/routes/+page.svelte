<script lang="ts">
	import Genre from './Genre.svelte';
	import MixedGenres from '$lib/components/mixedGenres.svelte';
	import InfoButton from '$lib/components/InfoButton.svelte';
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<div><Genre /></div>
	<MixedGenres />
	<InfoButton onClose={() => 'G'} />
</div>
