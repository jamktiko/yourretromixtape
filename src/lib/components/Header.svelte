<script lang="ts">
	// logo annetaan propsina, ja se näkyy headerissä. Jos logoa ei anneta, header on tyhjä.
	export interface Props {
		logo: string;
	}

	let { logo }: Props = $props();
</script>

<header>
	<!-- Kun logo on annettu, se näkyy -->
	{#if logo}
		<img src={logo} alt="Logo" />
	{/if}
</header>
<!-- Lisää tyylit logolle -->
